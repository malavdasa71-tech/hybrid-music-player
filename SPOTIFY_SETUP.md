# 🎵 Spotify API Setup Guide

Follow these steps to enable full music discovery features in your Hybrid Music Player.

## Step 1: Create Spotify Developer Account

1. Go to **https://developer.spotify.com/dashboard**
2. Log in with your Spotify account (free account works!)
3. Accept the Terms of Service

## Step 2: Create an App

1. Click the **"Create app"** button
2. Fill in the form:
   ```
   App name: Hybrid Music Player
   App description: Personal music discovery and streaming app
   Website: http://localhost:3000 (or your Vercel URL)
   Redirect URI: http://localhost:3000
   ```
3. Check **"I understand and agree with Spotify's Developer Terms of Service and Design Guidelines"**
4. Click **"Save"**

## Step 3: Get Your Credentials

1. Click on your newly created app
2. Click **"Settings"** button (top right)
3. You'll see:
   - **Client ID**: Copy this (looks like: `a1b2c3d4e5f6g7h8i9j0`)
   - **Client Secret**: Click "View client secret" and copy it

## Step 4: Add to Local Development

### For Local Testing:

1. In your project folder, create a `.env.local` file:
   ```bash
   touch .env.local
   ```

2. Add your credentials:
   ```env
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id_here
   NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_client_secret_here
   ```

3. Restart your dev server:
   ```bash
   npm run dev
   ```

## Step 5: Add to Vercel (Production)

### Option A: Via Vercel Dashboard

1. Go to your project on **https://vercel.com**
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in sidebar
4. Add two variables:
   
   **Variable 1:**
   - Name: `NEXT_PUBLIC_SPOTIFY_CLIENT_ID`
   - Value: `your_client_id_here`
   - Click "Add"
   
   **Variable 2:**
   - Name: `NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET`
   - Value: `your_client_secret_here`
   - Click "Add"

5. Go to **"Deployments"** tab
6. Click **"Redeploy"** on your latest deployment

### Option B: Via Vercel CLI

```bash
vercel env add NEXT_PUBLIC_SPOTIFY_CLIENT_ID
# Paste your Client ID when prompted

vercel env add NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
# Paste your Client Secret when prompted

vercel --prod
```

## Step 6: Update Redirect URI (After Deployment)

1. Go back to **Spotify Developer Dashboard**
2. Click on your app → **Settings**
3. Under **Redirect URIs**, add your Vercel URL:
   ```
   https://your-app-name.vercel.app
   ```
4. Click **"Add"** then **"Save"**

## ✅ Verify It's Working

1. Open your app (local or deployed)
2. Go to **"Discover"** tab
3. You should see:
   - ✅ "Recommended for You" section with real tracks
   - ✅ Search bar that actually works
   - ✅ 30-second preview buttons
   - ✅ No warning message about API configuration

## 🎯 What You Can Do Now

With Spotify API configured, you can:

- 🔍 **Search** millions of songs, artists, and albums
- 🎵 **Preview** 30-second clips of any track (legal!)
- ✨ **Get recommendations** based on your taste
- 📊 **View** album artwork and track details
- 🔗 **Open** full tracks in Spotify app/web

## 🔒 Security Notes

- ✅ Your credentials are safe - they're only used server-side
- ✅ Never commit `.env.local` to Git (it's in `.gitignore`)
- ✅ Client credentials flow doesn't require user login
- ✅ Only public data is accessed (no personal playlists)

## 🆓 Rate Limits

Spotify's free tier includes:
- **Search**: Unlimited requests
- **Recommendations**: Unlimited requests
- **Track previews**: 30 seconds each (legal and free)

No credit card required! 🎉

## 🐛 Troubleshooting

### "Spotify API not configured" message still showing

1. Check environment variables are set correctly
2. Restart dev server (`npm run dev`)
3. For Vercel: Redeploy after adding env vars

### Search returns no results

1. Verify Client ID and Secret are correct
2. Check browser console for errors
3. Make sure there are no extra spaces in env vars

### "Invalid client" error

1. Double-check you copied the full Client ID and Secret
2. Make sure you're using the credentials from the correct app
3. Verify the app is not in "Development Mode" restrictions

## 📚 API Documentation

For advanced features, check out:
- [Spotify Web API Docs](https://developer.spotify.com/documentation/web-api)
- [Search API](https://developer.spotify.com/documentation/web-api/reference/search)
- [Recommendations API](https://developer.spotify.com/documentation/web-api/reference/get-recommendations)

---

**Need help?** Open an issue on GitHub or check the [Spotify Community](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer)

Happy discovering! 🎶
