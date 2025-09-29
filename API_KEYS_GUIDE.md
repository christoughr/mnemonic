# API Keys Setup Guide for mnemonic.fyi

## 🔑 **Required API Keys**

### 1. **OpenAI API Key**
- Go to: https://platform.openai.com/api-keys
- Click "Create new secret key"
- Copy the key (starts with `sk-`)
- Set as: `OPENAI_API_KEY`

### 2. **Supabase Keys**
- Go to: https://supabase.com/dashboard
- Select your project (or create one)
- Go to Settings → API
- Copy:
  - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
  - Project API keys → anon public → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Project API keys → service_role → `SUPABASE_SERVICE_ROLE_KEY`

### 3. **Slack API Keys**
- Go to: https://api.slack.com/apps
- Select your "Demo App" (A09HK3NAVA6)
- Go to "OAuth & Permissions"
- Copy:
  - Bot User OAuth Token → `SLACK_BOT_TOKEN` (starts with `xoxb-`)
- Go to "Basic Information" → App-Level Tokens
- Create new token → `SLACK_APP_TOKEN` (starts with `xapp-`)

### 4. **Notion API Key**
- Go to: https://www.notion.so/my-integrations
- Click "New integration"
- Copy the Internal Integration Token → `NOTION_API_KEY` (starts with `secret_`)

## 📝 **Environment Variables File**

Create a `.env.local` file in your project root:

```bash
# OpenAI
OPENAI_API_KEY=sk-your_openai_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ-your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=eyJ-your_service_role_key_here

# Slack
SLACK_BOT_TOKEN=xoxb-your_bot_token_here
SLACK_APP_TOKEN=xapp-your_app_token_here

# Notion
NOTION_API_KEY=secret_your_notion_key_here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔧 **Slack Scopes (Updated 2024)**

The correct scopes for your Slack app are:

**Current scopes you have (keep these):**
- `channels:history` ✅
- `channels:read` ✅  
- `users:read` ✅
- `im:history` ✅
- `im:read` ✅
- `links:read` ✅
- `mpim:history` ✅

**Additional scopes you need:**
- `conversations:read` - View basic information about public channels
- `conversations:history` - View messages in public channels
- `chat:read` - View messages and other content in channels

**Note:** If these don't appear in the dropdown, the current scopes you have should be sufficient for basic functionality.

## 🧪 **Test Your Keys**

After setting up `.env.local`:

```bash
npm run dev
```

Then test each integration in the admin panel.
