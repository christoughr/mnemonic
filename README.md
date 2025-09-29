# 🧠 AI Knowledge Search MVP

A 48-hour build SaaS MVP that enables teams to search across Slack and Notion using AI-powered semantic search, get summarized answers, and find the right expert.

## 🚀 Features

- **AI-Powered Search**: Semantic search across Slack messages and Notion pages
- **Smart Summaries**: GPT-4o mini generates concise answers with sources
- **Expert Finder**: Identifies the best expert for each query
- **Real-time Integration**: Direct Slack DM links to contact experts
- **Admin Panel**: Easy data ingestion from Slack and Notion
- **Analytics**: Knowledge base statistics and usage insights

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Vector Database**: Supabase with pgvector extension
- **AI**: OpenAI (text-embedding-3-small, gpt-4o-mini)
- **Integrations**: Slack API, Notion API
- **Deployment**: Vercel

## 📋 Prerequisites

Before setting up the application, you'll need:

1. **OpenAI API Key** - For embeddings and chat completions
2. **Supabase Account** - For vector storage and database
3. **Slack App** - For accessing Slack data
4. **Notion Integration** - For accessing Notion data

## 🚀 Quick Start

### 1. Clone and Install

\`\`\`bash
git clone <repository-url>
cd ai-knowledge-search
npm install
\`\`\`

### 2. Environment Setup

Copy the environment template and fill in your API keys:

\`\`\`bash
cp env.template .env.local
\`\`\`

Update `.env.local` with your credentials:

\`\`\`env
# OpenAI Configuration
OPENAI_API_KEY=sk-your_openai_api_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Slack Configuration
SLACK_BOT_TOKEN=xoxb-your_slack_bot_token_here
SLACK_APP_TOKEN=xapp-your_slack_app_token_here

# Notion Configuration
NOTION_API_KEY=secret_your_notion_integration_key_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 3. Database Setup

1. Create a new Supabase project
2. Enable the pgvector extension in your Supabase dashboard
3. Run the database schema:

\`\`\`sql
-- Copy and run the contents of database/schema.sql in your Supabase SQL editor
\`\`\`

### 4. Slack Setup

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Create a new app or use an existing one
3. Add the following OAuth scopes:
   - `channels:history`
   - `channels:read`
   - `chat:read`
   - `users:read`
   - `links:read`
4. Install the app to your workspace
5. Copy the Bot User OAuth Token (starts with `xoxb-`)

### 5. Notion Setup

1. Go to [notion.so/my-integrations](https://notion.so/my-integrations)
2. Create a new integration
3. Copy the Internal Integration Token (starts with `secret_`)
4. Share your Notion pages/databases with the integration

### 6. Run the Application

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to access the application.

## 📖 Usage

### 1. Admin Panel Setup

1. Navigate to the **Admin** tab
2. Enter your workspace ID
3. Select Slack channels to ingest
4. Optionally specify a Notion database ID
5. Click **Ingest** buttons to populate your knowledge base

### 2. Search Your Knowledge

1. Go to the **Search** tab
2. Enter your question in natural language
3. Get AI-powered answers with sources
4. Contact experts directly via Slack

### 3. Monitor Usage

1. Check the **Stats** tab for knowledge base insights
2. View content distribution between Slack and Notion
3. Monitor last update times

## 🏗 Architecture

\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │    │   OpenAI API    │    │   Supabase DB   │
│                 │    │                 │    │                 │
│  • Frontend     │───▶│  • Embeddings   │    │  • Vector Store │
│  • API Routes   │    │  • Chat Complet.│    │  • Metadata     │
│  • Components   │    │                 │    │  • Similarity   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐    ┌─────────────────┐
│   Slack API     │    │  Notion API     │
│                 │    │                 │
│  • Messages     │    │  • Pages        │
│  • Channels     │    │  • Databases    │
│  • Users        │    │  • Content      │
└─────────────────┘    └─────────────────┘
\`\`\`

## 🔧 API Endpoints

- `POST /api/search` - Search knowledge base
- `POST /api/ingest/slack` - Ingest Slack messages
- `POST /api/ingest/notion` - Ingest Notion pages
- `GET /api/stats` - Get knowledge base statistics
- `GET /api/slack/channels` - List Slack channels

## 📊 Database Schema

The main table structure:

\`\`\`sql
CREATE TABLE knowledge_items (
    id UUID PRIMARY KEY,
    content TEXT NOT NULL,
    embedding VECTOR(1536),
    metadata JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
);
\`\`\`

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set all environment variables in your Vercel project settings.

## 💰 Monetization Strategy

**Target Market**: Startups (20-200 employees)
**Pricing**: $300-500/month per organization
**Value Proposition**: 
- Save 5-10 hours/week on knowledge searching
- Reduce duplicate questions and context switching
- Improve team collaboration and expertise sharing

## 🔮 Future Enhancements

- [ ] Google Drive integration
- [ ] Query logging and analytics
- [ ] Slack bot interface (`/ask refund policy`)
- [ ] Advanced filtering and faceted search
- [ ] Team collaboration features
- [ ] API rate limiting and usage tracking

## 🤝 Contributing

This is an MVP built in 48 hours. Contributions and improvements are welcome!

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For issues and questions:
1. Check the setup instructions above
2. Verify your API keys and permissions
3. Check the browser console for errors
4. Review the Supabase logs for database issues

---

## 📝 Development Log

### Latest Updates (Sep 29, 2024)
- ✅ **Analytics Integration**: Added Google Analytics component
- ✅ **SEO Improvements**: Enhanced metadata and OpenGraph tags  
- ✅ **Project Documentation**: Created comprehensive context files
- ✅ **Git Repository**: All code committed and pushed to GitHub
- ❌ **Vercel Deployment**: Needs troubleshooting (domain: mnemonics-red.vercel.app)
- ❌ **Slack Integration**: Missing API scopes (channels:read, users:read, chat:read)

### Current Status
- **Local Development**: ✅ Working on localhost:3000
- **Git Repository**: ✅ Pushed to christoughr/mnemonic
- **All Features**: ✅ Landing page, search, admin panel, stats
- **Vercel Deployment**: ❌ Needs setup
- **Slack Integration**: ❌ Scope issues
- **Notion Integration**: ✅ Working

### For AI Assistant Context
When working on this project, mention:
- "mnemonic.fyi AI knowledge search app"
- "Next.js with OpenAI, Supabase, Slack, Notion"
- "Main issues: Slack scopes and Vercel deployment"
- "All code in /Users/christuffr/ai-knowledge-search/"

---

**Built with ❤️ in 48 hours for the AI Knowledge Search MVP challenge.**