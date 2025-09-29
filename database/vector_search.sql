-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the knowledge_items table if it doesn't exist
CREATE TABLE IF NOT EXISTS knowledge_items (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  embedding vector(1536), -- OpenAI text-embedding-3-small produces 1536 dimensions
  metadata JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on the embedding column for fast similarity search
CREATE INDEX IF NOT EXISTS knowledge_items_embedding_idx 
ON knowledge_items USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create the vector similarity search function
CREATE OR REPLACE FUNCTION match_knowledge_items(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.3,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id text,
  content text,
  similarity float,
  metadata jsonb
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    knowledge_items.id,
    knowledge_items.content,
    1 - (knowledge_items.embedding <=> query_embedding) as similarity,
    knowledge_items.metadata
  FROM knowledge_items
  WHERE 1 - (knowledge_items.embedding <=> query_embedding) > match_threshold
  ORDER BY knowledge_items.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update the updated_at column
DROP TRIGGER IF EXISTS update_knowledge_items_updated_at ON knowledge_items;
CREATE TRIGGER update_knowledge_items_updated_at
    BEFORE UPDATE ON knowledge_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
