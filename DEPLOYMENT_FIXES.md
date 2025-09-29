# Deployment and Integration Fixes for mnemonic.fyi

## 🚀 Vercel Deployment Issues

### Current Status
- Build errors fixed (ESLint apostrophe issues resolved)
- Code successfully pushed to GitHub: https://github.com/christoughr/mnemonic
- Domain: mnemonics-red.vercel.app (needs troubleshooting)

### Steps to Fix Vercel Deployment

#### 1. Check Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Look for the "mnemonic" or "ai-knowledge-search" project
3. Check the latest deployment status and build logs

#### 2. If Project Doesn't Exist
1. Click "New Project"
2. Import from GitHub: `christoughr/mnemonic`
3. Vercel will auto-detect Next.js settings
4. Configure environment variables (see below)

#### 3. Environment Variables Setup
In Vercel project settings → Environment Variables, add:

```
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
SLACK_BOT_TOKEN=xoxb-your_slack_bot_token_here
SLACK_APP_TOKEN=xapp-your_slack_app_token_here
NOTION_API_KEY=secret_your_notion_integration_key_here
NEXT_PUBLIC_APP_URL=https://mnemonics-red.vercel.app
```

#### 4. Build Configuration
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

## 🔧 Slack API Scopes Configuration

### Current Issues
- Missing scopes: `channels:read`, `users:read`, `chat:read`
- Error: "missing_scope" and "not_in_channel"

### Required Slack App Configuration

#### 1. Update OAuth Scopes
In your Slack app settings at [api.slack.com/apps](https://api.slack.com/apps):

**Bot Token Scopes:**
- `channels:read` - View basic information about public channels
- `channels:history` - View messages in public channels
- `users:read` - View people in a workspace
- `chat:read` - View messages and other content in channels
- `conversations:read` - View basic information about public channels
- `conversations:history` - View messages in public channels

**User Token Scopes (if needed):**
- `channels:read`
- `users:read`

#### 2. Event Subscriptions (Optional)
If you want real-time updates:
- Request URL: `https://mnemonics-red.vercel.app/api/slack/events`
- Subscribe to: `message.channels`, `message.groups`

#### 3. App Manifest (Recommended)
Create an app manifest with these scopes:

```json
{
  "display_information": {
    "name": "mnemonic.fyi",
    "description": "AI-powered knowledge search across Slack and Notion"
  },
  "features": {
    "bot_user": {
      "display_name": "mnemonic.fyi",
      "always_online": true
    }
  },
  "oauth_config": {
    "scopes": {
      "bot": [
        "channels:read",
        "channels:history", 
        "users:read",
        "chat:read",
        "conversations:read",
        "conversations:history"
      ]
    }
  }
}
```

### Code Updates Needed

#### 1. Update Slack Integration
The current code in `src/lib/slack.ts` needs these API calls:
- `conversations.history` ✅ (already implemented)
- `conversations.list` ✅ (already implemented) 
- `users.info` ✅ (already implemented)
- `chat.getPermalink` ✅ (already implemented)

#### 2. Error Handling
Add better error handling for missing scopes:

```typescript
export async function fetchSlackMessages(channelId: string, limit = 1000): Promise<SlackMessage[]> {
  try {
    const result = await slack.conversations.history({
      channel: channelId,
      limit,
    });
    // ... existing code
  } catch (error: any) {
    if (error.data?.error === 'missing_scope') {
      console.error('Missing required Slack scopes. Please update your Slack app configuration.');
      throw new Error('Missing required Slack scopes. Please contact your administrator.');
    }
    if (error.data?.error === 'not_in_channel') {
      console.error('Bot is not in the specified channel.');
      throw new Error('Bot is not in the specified channel. Please add the bot to the channel first.');
    }
    console.error('Error fetching Slack messages:', error);
    return [];
  }
}
```

## 🧪 Testing Steps

### 1. Test Local Build
```bash
npm run build
npm run start
```

### 2. Test Vercel Deployment
1. Check deployment URL: https://mnemonics-red.vercel.app
2. Test search functionality
3. Test admin panel
4. Check browser console for errors

### 3. Test Slack Integration
1. Add bot to a test channel
2. Try ingesting messages from that channel
3. Check for scope-related errors

## 📋 Checklist

### Vercel Deployment
- [ ] Project exists in Vercel dashboard
- [ ] All environment variables configured
- [ ] Build successful (no errors)
- [ ] Domain accessible
- [ ] All features working

### Slack Integration  
- [ ] App scopes updated in Slack dashboard
- [ ] Bot added to test channels
- [ ] API calls working without errors
- [ ] Error handling implemented
- [ ] Test data ingestion successful

## 🚨 Common Issues & Solutions

### Vercel Issues
1. **Build fails**: Check build logs for specific errors
2. **Environment variables not loading**: Ensure all variables are set in Vercel dashboard
3. **Domain not working**: Check DNS settings and project configuration

### Slack Issues
1. **Missing scopes**: Update OAuth scopes in Slack app settings
2. **Not in channel**: Add bot to the channel manually
3. **Token expired**: Regenerate bot token in Slack app settings

## 📞 Next Steps

1. **Immediate**: Check Vercel dashboard and fix deployment
2. **Short-term**: Update Slack app scopes and test integration
3. **Long-term**: Add real-time updates and advanced features

The app is fully functional locally and ready for deployment once these configuration issues are resolved.
