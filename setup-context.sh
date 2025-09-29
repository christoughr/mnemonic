#!/bin/bash

# mnemonic.fyi - AI Knowledge Search Project Setup
# This script provides context and sets up the development environment

echo "🧠 mnemonic.fyi - AI Knowledge Search Project"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in project directory"
    echo "Please run: cd /Users/christuffr/ai-knowledge-search"
    exit 1
fi

echo "✅ Project directory confirmed"
echo ""

# Display project context
echo "📋 Project Context:"
echo "- Name: mnemonic.fyi"
echo "- Type: Next.js AI knowledge search app"
echo "- Purpose: Search across Slack and Notion with AI"
echo "- Tech Stack: Next.js, OpenAI, Supabase, Tailwind"
echo ""

# Display current status
echo "📊 Current Status:"
echo "✅ Local development: Working"
echo "✅ Git repository: Pushed to GitHub"
echo "✅ All features: Implemented"
echo "❌ Vercel deployment: Needs fixing"
echo "❌ Slack integration: Missing scopes"
echo "✅ Notion integration: Working"
echo ""

# Display key files
echo "📁 Key Files:"
echo "- src/app/page.tsx (Landing page)"
echo "- src/components/SearchInterface.tsx (Search)"
echo "- src/components/AdminPanel.tsx (Admin)"
echo "- src/lib/search.ts (Search logic)"
echo "- src/lib/slack.ts (Slack integration)"
echo "- src/lib/notion.ts (Notion integration)"
echo ""

# Display environment requirements
echo "🔑 Environment Variables Required:"
echo "- OPENAI_API_KEY"
echo "- SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY"
echo "- SLACK_BOT_TOKEN, SLACK_APP_TOKEN"
echo "- NOTION_API_KEY"
echo "- NEXT_PUBLIC_APP_URL"
echo "- NEXT_PUBLIC_GA_ID (optional)"
echo ""

# Display commands
echo "🚀 Development Commands:"
echo "- npm run dev (Start development server)"
echo "- npm run build (Build for production)"
echo "- npm run lint (Lint code)"
echo ""

# Display known issues
echo "🐛 Known Issues:"
echo "1. Slack API missing scopes (channels:read, users:read, chat:read)"
echo "2. Vercel deployment needs troubleshooting"
echo "3. Vector search has fallback to simple search"
echo ""

# Display next steps
echo "📝 Next Steps:"
echo "1. Fix Vercel deployment in dashboard"
echo "2. Configure Slack app with proper scopes"
echo "3. Set up Google Analytics"
echo "4. Test with real data"
echo ""

echo "💡 For AI Assistant Context:"
echo "Mention: 'mnemonic.fyi AI knowledge search app'"
echo "Mention: 'Next.js with OpenAI, Supabase, Slack, Notion'"
echo "Mention: 'Main issues: Slack scopes and Vercel deployment'"
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ Environment file found"
else
    echo "⚠️  Environment file missing - copy env.template to .env.local"
fi

echo ""
echo "🎯 Ready to continue development!"
