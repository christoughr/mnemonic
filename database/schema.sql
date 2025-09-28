-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the knowledge_items table
CREATE TABLE IF NOT EXISTS knowledge_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    embedding VECTOR(1536), -- OpenAI text-embedding-3-small produces 1536-dimensional vectors
    metadata JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on the embedding column for efficient similarity search
CREATE INDEX IF NOT EXISTS knowledge_items_embedding_idx 
ON knowledge_items 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create an index on metadata for filtering
CREATE INDEX IF NOT EXISTS knowledge_items_metadata_idx 
ON knowledge_items 
USING GIN (metadata);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS knowledge_items_created_at_idx 
ON knowledge_items (created_at DESC);

-- Create a function to search for similar knowledge items
CREATE OR REPLACE FUNCTION match_knowledge_items(
    query_embedding VECTOR(1536),
    match_threshold FLOAT DEFAULT 0.7,
    match_count INT DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    content TEXT,
    embedding VECTOR(1536),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    similarity FLOAT
)
LANGUAGE SQL
AS $$
    SELECT
        knowledge_items.id,
        knowledge_items.content,
        knowledge_items.embedding,
        knowledge_items.metadata,
        knowledge_items.created_at,
        knowledge_items.updated_at,
        1 - (knowledge_items.embedding <=> query_embedding) AS similarity
    FROM knowledge_items
    WHERE 1 - (knowledge_items.embedding <=> query_embedding) > match_threshold
    ORDER BY knowledge_items.embedding <=> query_embedding
    LIMIT match_count;
$$;

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_knowledge_items_updated_at
    BEFORE UPDATE ON knowledge_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create a view for easy stats queries
CREATE OR REPLACE VIEW knowledge_stats AS
SELECT
    COUNT(*) as total_items,
    COUNT(*) FILTER (WHERE metadata->>'source' = 'slack') as slack_items,
    COUNT(*) FILTER (WHERE metadata->>'source' = 'notion') as notion_items,
    MAX(updated_at) as last_updated
FROM knowledge_items;

-- Grant necessary permissions (adjust as needed for your setup)
-- GRANT ALL ON knowledge_items TO your_app_user;
-- GRANT ALL ON knowledge_stats TO your_app_user;
-- GRANT EXECUTE ON FUNCTION match_knowledge_items TO your_app_user;
