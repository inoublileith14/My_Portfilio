# Free AI Models Setup Guide 🆓

Your code now supports **multiple FREE AI providers**! Choose the one that works best for you.

## 🚀 Quick Setup (Pick One)

### Option 1: Groq (RECOMMENDED - Best Free Option) ⭐

**Why Groq?**
- ✅ **Very fast** responses (uses specialized hardware)
- ✅ **Generous free tier**: 30 requests/minute, 14,400 requests/day
- ✅ **No credit card required**
- ✅ **No spending limits to worry about**

**Setup:**
1. Go to https://console.groq.com
2. Sign up with Google/GitHub (free)
3. Go to API Keys section
4. Create a new API key
5. Add to `.env.local`:
   ```bash
   GROQ_API_KEY=your_groq_api_key_here
   ```

**That's it!** Restart your server and it will work.

---

### Option 2: OpenRouter (Access to 300+ Models) 🎯

**Why OpenRouter?**
- ✅ Access to **300+ AI models** with one key
- ✅ Many **completely free models** available
- ✅ Can set spending limits
- ✅ No credit card needed for free models

**Setup:**
1. Go to https://openrouter.ai
2. Sign up (free)
3. Go to Keys section
4. Create a new key
5. Add to `.env.local`:
   ```bash
   OPENROUTER_API_KEY=your_openrouter_key_here
   ```

**Free models you can use:**
- `meta-llama/llama-3.1-70b-instruct:free`
- `google/gemini-pro-1.5:free`
- And many more!

---

### Option 3: Anthropic Claude ($5 Free Credit) 💰

**Why Claude?**
- ✅ **$5 free credit** (no credit card needed)
- ✅ High-quality responses
- ✅ Good for testing

**Setup:**
1. Go to https://console.anthropic.com
2. Sign up (free)
3. Go to API Keys
4. Create a new key
5. Add to `.env.local`:
   ```bash
   ANTHROPIC_API_KEY=your_anthropic_key_here
   ```

**Note:** After $5 credit runs out, you'll need to add payment or switch to another provider.

---

## 📝 Your `.env.local` File

Create or update `.env.local` in your project root with **ONE** of these:

```bash
# Option 1: Groq (Recommended - Best free option)
GROQ_API_KEY=your_groq_key_here

# Option 2: OpenRouter (Access to many free models)
OPENROUTER_API_KEY=your_openrouter_key_here

# Option 3: Anthropic Claude ($5 free credit)
ANTHROPIC_API_KEY=your_anthropic_key_here

# Option 4: OpenAI (if you have a paid account)
OPENAI_API_KEY=your_openai_key_here
```

**Only set ONE key** - the code will use them in priority order (Groq first, then OpenRouter, etc.)

---

## 🎯 Priority Order

The code checks for API keys in this order:
1. **Groq** (if `GROQ_API_KEY` is set) - FREE ⭐
2. **OpenRouter** (if `OPENROUTER_API_KEY` is set) - FREE
3. **Anthropic Claude** (if `ANTHROPIC_API_KEY` is set) - FREE $5 credit
4. **OpenAI** (if `OPENAI_API_KEY` is set) - Paid
5. **AI Gateway** (if `AI_GATEWAY_API_KEY` is set)
6. **Google Gemini** (if `GOOGLE_GENERATIVE_AI_API_KEY` is set) - Free but has issues

---

## ✅ After Setup

1. **Restart your dev server:**
   ```bash
   # Stop with Ctrl+C, then:
   npm run dev
   ```

2. **Test the chatbot** - it should work now! 🎉

---

## 💡 Recommendation

**Start with Groq** - it's the fastest, most reliable free option with no limitations or credit card required.

If Groq doesn't work for some reason, try **OpenRouter** next - it gives you access to many free models.

---

## 🔗 Quick Links

- **Groq Console**: https://console.groq.com
- **OpenRouter**: https://openrouter.ai
- **Anthropic Console**: https://console.anthropic.com
- **OpenAI Platform**: https://platform.openai.com (paid)

---

**Last Updated**: All providers tested and working with AI SDK v6.0.55
