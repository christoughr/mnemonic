# Deployment Guide for mnemonic.fyi

## 🚀 Deploy to Vercel

### Prerequisites
1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A GitHub account with your project repository
3. All environment variables configured

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

### Step 3: Configure Environment Variables
In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add each variable:

```
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
SLACK_BOT_TOKEN=xoxb-your_slack_bot_token_here
SLACK_APP_TOKEN=xapp-your_slack_app_token_here
NOTION_API_KEY=secret_your_notion_integration_key_here
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Step 4: Deploy
1. Click **Deploy**
2. Wait for deployment to complete
3. Your app will be available at `https://your-project.vercel.app`

## 🗄️ Set up Supabase Vector Search

### Step 1: Enable pgvector Extension
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run this command:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### Step 2: Create Vector Search Function
1. In the **SQL Editor**, run the contents of `database/vector_search.sql`
2. This will create the vector search function and indexes

### Step 3: Test Vector Search
1. Ingest some data through your app
2. Try searching to verify vector search is working
3. Check the browser console for any errors

## 🔧 Post-Deployment Configuration

### Update App URL
1. Update `NEXT_PUBLIC_APP_URL` in Vercel environment variables
2. Update any webhook URLs in Slack/Notion integrations

### SSL and Domain
1. Vercel provides SSL automatically
2. To use a custom domain:
   - Go to **Settings** → **Domains**
   - Add your domain and configure DNS

### Monitoring
1. Check Vercel **Functions** tab for API performance
2. Monitor Supabase usage in dashboard
3. Set up alerts for OpenAI API usage

## 🚨 Troubleshooting

### Common Issues

**Vector search not working:**
- Ensure pgvector extension is enabled
- Check that embeddings are being generated (1536 dimensions)
- Verify the `match_knowledge_items` function exists

**Environment variables not loading:**
- Ensure all variables are set in Vercel dashboard
- Redeploy after adding new variables
- Check variable names match exactly

**Slack/Notion integrations failing:**
- Verify tokens are correct and not expired
- Check OAuth scopes are properly configured
- Ensure webhook URLs point to your deployed domain

### Performance Optimization
1. Enable Vercel Edge Functions for faster response times
2. Use Supabase connection pooling
3. Implement caching for frequently accessed data

## 📊 Analytics and Monitoring

### Vercel Analytics
- Enable in **Settings** → **Analytics**
- Track page views and performance

### Custom Analytics
Consider adding:
- Google Analytics
- PostHog for user behavior
- Sentry for error tracking

## 🔐 Security Checklist

- [ ] All API keys are stored as environment variables
- [ ] Supabase RLS policies are configured
- [ ] CORS settings are properly configured
- [ ] Rate limiting is implemented for API endpoints
- [ ] Input validation is in place

## 🎉 Success!

Your AI Knowledge Search app is now live! Share your deployment URL and start building your team's intelligent knowledge base.
