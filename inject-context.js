#!/usr/bin/env node

// Context Injection Script for mnemonic.fyi
// This script can be run to get instant context about the project

const fs = require('fs');
const path = require('path');

console.log(`
🧠 mnemonic.fyi - AI Knowledge Search Project
==============================================

📋 PROJECT OVERVIEW:
- Name: mnemonic.fyi
- Type: Next.js AI knowledge search application
- Purpose: Search across Slack and Notion with AI-powered insights
- Tech Stack: Next.js 15, OpenAI, Supabase, Tailwind CSS

🏗️ ARCHITECTURE:
- Frontend: Next.js with App Router, TypeScript, Tailwind CSS
- AI: OpenAI GPT-4o-mini and text-embedding-3-small
- Database: Supabase with pgvector extension
- Integrations: Slack API, Notion API
- Deployment: Vercel

📁 KEY FILES:
- src/app/page.tsx - Landing page with demo toggle
- src/components/SearchInterface.tsx - Search functionality
- src/components/AdminPanel.tsx - Data ingestion panel
- src/lib/search.ts - Core search logic with vector similarity
- src/lib/slack.ts - Slack API integration
- src/lib/notion.ts - Notion API integration

🔑 ENVIRONMENT VARIABLES:
- OPENAI_API_KEY (required)
- SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY (required)
- SLACK_BOT_TOKEN, SLACK_APP_TOKEN (required)
- NOTION_API_KEY (required)
- NEXT_PUBLIC_APP_URL (optional)
- NEXT_PUBLIC_GA_ID (optional)

🚀 COMMANDS:
- npm run dev - Start development server
- npm run build - Build for production
- npm run lint - Lint code

🐛 CURRENT ISSUES:
1. Slack API missing scopes (channels:read, users:read, chat:read)
2. Vercel deployment needs troubleshooting
3. Vector search using fallback mode

✅ WORKING FEATURES:
- Landing page with animations
- Search functionality (with fallback)
- Notion data ingestion
- Statistics dashboard
- Admin panel interface
- Git repository (pushed to GitHub)

📊 STATUS:
- Local Development: ✅ Working
- Git Repository: ✅ Pushed to GitHub
- All Features: ✅ Implemented
- Vercel Deployment: ❌ Needs fixing
- Slack Integration: ❌ Missing scopes
- Notion Integration: ✅ Working

🤖 FOR AI ASSISTANT CONTEXT:
When working on this project, mention:
- "mnemonic.fyi AI knowledge search app"
- "Next.js with OpenAI, Supabase, Slack, Notion integrations"
- "Main issues: Slack API scopes and Vercel deployment"
- "All code committed to GitHub: christoughr/mnemonic"
- "Local path: /Users/christuffr/ai-knowledge-search/"

🎯 NEXT STEPS:
1. Fix Vercel deployment in dashboard
2. Configure Slack app with proper scopes
3. Set up Google Analytics
4. Test with real data

📚 DOCUMENTATION FILES:
- PROJECT_CONTEXT.md - Complete project overview
- CONVERSATION_SUMMARY.md - Full development conversation
- QUICK_START.md - Quick setup guide
- README.md - Comprehensive documentation
- .cursorrules - AI assistant instructions

🚀 READY TO CONTINUE DEVELOPMENT!
`);

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
    console.log('✅ Environment file found');
} else {
    console.log('⚠️  Environment file missing - copy env.template to .env.local');
}

console.log('\n💡 Run this script anytime with: node inject-context.js\n');
