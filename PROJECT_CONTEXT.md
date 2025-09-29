# mnemonic.fyi - AI Knowledge Search Project

## 🎯 **Project Overview**
- **Name**: mnemonic.fyi
- **Type**: Next.js AI-powered knowledge search application
- **Purpose**: Search across Slack and Notion with AI-powered insights
- **Tech Stack**: Next.js 15, OpenAI, Supabase, Tailwind CSS

## 🏗️ **Architecture**
- **Frontend**: Next.js with Tailwind CSS
- **AI**: OpenAI GPT-4 and embeddings
- **Database**: Supabase with vector search
- **Integrations**: Slack API, Notion API
- **Deployment**: Vercel

## 📁 **Project Structure**
```
ai-knowledge-search/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── page.tsx           # Main landing page
│   │   ├── about/page.tsx     # About page
│   │   ├── features/page.tsx  # Features page
│   │   ├── contact/page.tsx   # Contact page
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── SearchInterface.tsx
│   │   ├── AdminPanel.tsx
│   │   ├── StatsPanel.tsx
│   │   └── Analytics.tsx
│   └── lib/                   # Utility libraries
│       ├── config.ts          # Environment config
│       ├── supabase.ts        # Database client
│       ├── openai.ts          # AI client
│       ├── slack.ts           # Slack integration
│       ├── notion.ts          # Notion integration
│       └── search.ts          # Search logic
├── .env.local                 # Environment variables
└── README.md                  # Setup instructions
```

## 🔑 **Environment Variables Required**
```bash
# OpenAI
OPENAI_API_KEY=sk-...

# Supabase
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Slack
SLACK_BOT_TOKEN=xoxb-...
SLACK_APP_TOKEN=xapp-...

# Notion
NOTION_API_KEY=secret_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-... (optional)
```

## 🚀 **Current Status**
- ✅ **Local Development**: Working on localhost:3000
- ✅ **Git Repository**: Pushed to GitHub (christoughr/mnemonic)
- ✅ **All Features**: Landing page, search, admin panel, stats
- ❌ **Vercel Deployment**: Needs to be set up
- ❌ **Slack Integration**: Missing proper scopes
- ✅ **Notion Integration**: Working

## 🎨 **Key Features**
1. **Landing Page**: Modern design with animations
2. **AI Search**: Semantic search across knowledge base
3. **Admin Panel**: Data ingestion from Slack/Notion
4. **Stats Dashboard**: Knowledge base statistics
5. **Expert Finder**: Identify team members with expertise
6. **Analytics**: Google Analytics integration

## 🐛 **Known Issues**
- **Slack API**: Missing scopes (channels:read, users:read, chat:read)
- **Vercel Deployment**: Domain `mnemonics-red.vercel.app` not working
- **Slack Channels**: Getting "missing_scope" errors

## 📝 **Development Commands**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🔧 **Next Steps**
1. **Fix Vercel deployment** - Check dashboard for errors
2. **Update Slack scopes** - Add required permissions
3. **Add Google Analytics** - Set up GA4 property
4. **Test with real data** - Ingest more Slack/Notion content
5. **Optimize search** - Fine-tune vector search parameters

## 💬 **For AI Assistant Context**
When working on this project, tell the AI:
- "I'm working on mnemonic.fyi, an AI knowledge search app"
- "It's a Next.js app with OpenAI, Supabase, Slack, and Notion integrations"
- "The main issue is Slack API scopes and Vercel deployment"
- "All code is in /Users/christuffr/ai-knowledge-search/"

## 📞 **Contact Info**
- **GitHub**: https://github.com/christoughr/mnemonic
- **Local Path**: /Users/christuffr/ai-knowledge-search/
- **Local URL**: http://localhost:3000
