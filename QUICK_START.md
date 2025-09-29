# 🚀 Quick Start Guide - mnemonic.fyi

## ⚡ **Instant Setup**

### **1. Open Project**
```bash
cd /Users/christuffr/ai-knowledge-search
cursor .  # or open in Cursor/VS Code
```

### **2. Start Development**
```bash
npm run dev
# Opens at http://localhost:3000
```

### **3. For AI Assistant Context**
Just say: *"I'm working on mnemonic.fyi, an AI knowledge search app. Check the PROJECT_CONTEXT.md file for full details."*

## 🎯 **What This App Does**
- **Searches** across Slack and Notion with AI
- **Provides** intelligent answers with sources
- **Finds** team experts for any topic
- **Ingests** data from Slack and Notion

## 🏗️ **Architecture**
- **Frontend**: Next.js 15 + Tailwind CSS
- **AI**: OpenAI GPT-4 + embeddings
- **Database**: Supabase with vector search
- **Integrations**: Slack API + Notion API

## 🔑 **Environment Setup**
Copy `env.template` to `.env.local` and add your API keys:
- OpenAI API key
- Supabase credentials
- Slack bot tokens
- Notion integration key

## 🐛 **Current Issues**
1. **Slack API**: Missing scopes (channels:read, users:read, chat:read)
2. **Vercel**: Deployment needs troubleshooting
3. **Vector Search**: Using fallback mode

## 📁 **Key Files**
- `src/app/page.tsx` - Landing page
- `src/components/SearchInterface.tsx` - Search
- `src/components/AdminPanel.tsx` - Admin
- `src/lib/search.ts` - Search logic
- `src/lib/slack.ts` - Slack integration
- `src/lib/notion.ts` - Notion integration

## 🚀 **Ready to Go!**
Your project is fully functional locally. Just run `npm run dev` and start coding!
