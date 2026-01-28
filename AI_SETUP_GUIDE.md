# AI Chatbot Setup Guide

## Problem
You're getting an `insufficient_quota` error because your OpenAI account doesn't have credits. This guide shows you how to use **Cursor's AI Gateway** (if available) or alternative free solutions.

## ⚡ Quick Solution (Minimal Code Change Required)

**Fastest way to get it working:** Use Anthropic Claude (free $5 credit)

1. **Get API key:** Sign up at https://console.anthropic.com (free $5 credit)
2. **Install package:** `npm install @ai-sdk/anthropic`
3. **Update code:** See Option 2C below (3 lines to change)
4. **Add to `.env.local`:** `ANTHROPIC_API_KEY=your_key_here`
5. **Restart:** `npm run dev`

**Total time: ~5 minutes** ⏱️

---

## 🎯 No-Code Solutions (Environment Variables Only)

If you have access to an AI Gateway API key (from Vercel AI Gateway or similar), you can use it **without any code changes** - just set the environment variable!

---

## ✅ Option 1: Use Cursor's AI Gateway (RECOMMENDED for Cursor Pro users)

If you have a **paid Cursor account**, you might be able to use Cursor's AI Gateway. However, **note that Cursor Pro typically provides AI access within Cursor itself, not necessarily an external API key for your applications.**

### Important Note:
Cursor's AI Gateway might not be available as a separate service with an API key. The AI Gateway mentioned in the error might refer to Vercel's AI Gateway service, not Cursor's.

### If Cursor Provides an AI Gateway API Key:

1. **Get your Cursor AI Gateway API Key:**
   - Check Cursor Settings → Account or API Keys
   - Look in Cursor's documentation: https://cursor.sh/docs
   - Contact Cursor support if you can't find it

2. **Create/Update `.env.local` file:**
   ```bash
   # In the root directory of your project
   AI_GATEWAY_API_KEY=your_cursor_ai_gateway_key_here
   ```

3. **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

**If Cursor doesn't provide an external API key**, use one of the free alternatives below instead.

---

## ✅ Option 2: Use Free AI Providers (No Code Changes Needed)

If you don't have Cursor's AI Gateway, here are free alternatives that work with the same codebase:

### A. Use Hugging Face (Free Tier Available)

1. **Get a Hugging Face API key:**
   - Sign up at https://huggingface.co
   - Go to Settings → Access Tokens
   - Create a new token

2. **Install Hugging Face provider:**
   ```bash
   npm install @ai-sdk/huggingface
   ```

3. **Update `.env.local`:**
   ```bash
   HUGGINGFACE_API_KEY=your_huggingface_token_here
   ```

4. **Note:** You'll need to modify the code slightly to use Hugging Face models. See Option 3 for code changes.

### B. Use Google Gemini (Free Tier Available) ✅ SET UP AND READY!

**The code is already configured for Google Gemini!** Just follow these steps:

1. **Get a Google AI Studio API key:**
   - Go to https://makersuite.google.com/app/apikey (or https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the API key

2. **Create/Update `.env.local` file in the project root:**
   ```bash
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here
   ```

3. **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

**That's it!** The chatbot will now use Google Gemini. No code changes needed - it's already configured! 🎉

### C. Use Anthropic Claude (Free Trial)

1. **Get an Anthropic API key:**
   - Sign up at https://console.anthropic.com
   - Create an API key

2. **Install Anthropic provider:**
   ```bash
   npm install @ai-sdk/anthropic
   ```

3. **Update `.env.local`:**
   ```bash
   ANTHROPIC_API_KEY=your_anthropic_key_here
   ```

---

## ✅ Option 3: Minimal Code Changes for Free Providers

If you want to use a free provider, you need to make small code changes. Here's how:

### For Hugging Face:

**Update `app/api/chat/route.ts`:**

Replace the model configuration section with:
```typescript
import { createHuggingFace } from '@ai-sdk/huggingface'

const huggingface = createHuggingFace({
  apiKey: process.env.HUGGINGFACE_API_KEY,
})

// In the streamText call, use:
model: huggingface('meta-llama/Meta-Llama-3-8B-Instruct')
```

### For Google Gemini: ✅ ALREADY CONFIGURED!

**No code changes needed!** The code is already set up to use Google Gemini. Just:
1. Get your API key from https://aistudio.google.com/app/apikey
2. Add `GOOGLE_GENERATIVE_AI_API_KEY=your_key` to `.env.local`
3. Restart your dev server

The code will automatically detect and use Google Gemini when the API key is set.

### For Anthropic Claude:

**Update `app/api/chat/route.ts`:**

Replace the model configuration section with:
```typescript
import { createAnthropic } from '@ai-sdk/anthropic'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// In the streamText call, use:
model: anthropic('claude-3-haiku-20240307')
```

---

## 🔍 Important: About Cursor's AI Gateway

**Reality Check:** Cursor Pro typically provides AI features **within the Cursor editor itself**, not as an external API service you can use in your applications. The "AI Gateway" mentioned in error messages usually refers to **Vercel's AI Gateway** service, which is a separate paid service.

### What This Means:
- Having Cursor Pro ≠ Having access to an AI Gateway API key
- You'll likely need to use one of the free alternatives (Option 2) instead
- The code is set up to support AI Gateway if you get access to one in the future

### If You Want to Try:
1. Check Cursor's latest documentation for any API access
2. Contact Cursor support to ask about external API access
3. Consider that free alternatives (like Anthropic's free trial) might be easier

---

## 📝 Environment Variable Priority

The code checks for API keys in this order:
1. `AI_GATEWAY_API_KEY` - Uses Cursor's AI Gateway (no OpenAI account needed!)
2. `OPENAI_API_KEY` - Uses direct OpenAI (requires paid OpenAI account)

**Only one is needed!** If both are set, `AI_GATEWAY_API_KEY` takes priority.

---

## 🚀 Quick Start (Cursor Users)

1. Create `.env.local` in the project root:
   ```bash
   AI_GATEWAY_API_KEY=your_cursor_key_here
   ```

2. Restart your dev server:
   ```bash
   npm run dev
   ```

3. Test the chatbot - it should work now! 🎉

---

## ❓ Troubleshooting

### "AI_GATEWAY_API_KEY is not set"
- Make sure you created `.env.local` (not `.env`)
- Make sure the file is in the project root (same folder as `package.json`)
- Restart your dev server after creating the file

### "Still getting quota errors"
- Verify your Cursor account is paid/active
- Double-check the API key is correct
- Try removing `OPENAI_API_KEY` if it's set (it might be interfering)

### "Can't find Cursor AI Gateway key"
- Check Cursor's latest documentation
- Some Cursor plans might not include AI Gateway access
- Consider using one of the free alternatives listed above

---

## 📚 Additional Resources

- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Cursor Documentation](https://cursor.sh/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Hugging Face Inference API](https://huggingface.co/docs/api-inference/index)
- [Google AI Studio](https://makersuite.google.com/)

---

## 💡 Recommendation

**Best Option (No Code Changes):** Unfortunately, if you don't have a paid OpenAI account, you'll need to make minimal code changes to use free alternatives.

**Easiest Free Option:** Use **Anthropic Claude** (Option 2C) - they offer a generous free trial ($5 credit), the code change is minimal (just a few lines), and Claude provides excellent responses.

**Alternative:** Use **Google Gemini** (Option 2B) - also has a free tier and requires similar minimal code changes.

**Note:** The code is already set up to automatically use AI Gateway if you set `AI_GATEWAY_API_KEY`, so if you ever get access to Vercel's AI Gateway or similar service, it will work without any code changes!

---

**Last Updated:** Based on current AI SDK v6.0.55 and Next.js 16
