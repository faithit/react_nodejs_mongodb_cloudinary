# 🔐 Environment Variables Setup Guide

## Backend Environment Variables (faithfarm-backend)

### Local Development - Create `.env`

```
# Database
MONGODB_URI=mongodb://127.0.0.1:27017/faithfarm

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Server
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Production on Render.com

Set these in Render dashboard under **Environment**:

| Variable | Value | Where to Get |
|----------|-------|------------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/faithfarm?retryWrites=true&w=majority` | MongoDB Atlas Connection String |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | Cloudinary Dashboard → Settings |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key | Cloudinary Dashboard → Settings → API Keys |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret | Cloudinary Dashboard → Settings → API Keys |
| `NODE_ENV` | `production` | Keep as is |
| `PORT` | Leave empty (Render sets this) | Automatic |

**⚠️ DO NOT commit `.env` to GitHub** - Render loads from dashboard

---

## Frontend Environment Variables (faithfarm-frontend)

### Local Development - Create `.env.local`

```
VITE_API_URL=http://localhost:5000
```

### Production on Vercel - Create `.env.production`

```
VITE_API_URL=https://faithfarm-backend.onrender.com
```

**OR** set in Vercel dashboard:
- Go to your project → **Settings** → **Environment Variables**
- Add: `VITE_API_URL` = `https://faithfarm-backend.onrender.com`

---

## Getting Your Credentials

### 1. Cloudinary Credentials

1. Go to https://cloudinary.com and log in
2. Click your profile icon → **Dashboard**
3. Under "Account Details", find:
   - **Cloud Name**: Copy this
   - **API Key**: Copy this
   - **API Secret**: Scroll down to find this

### 2. MongoDB Atlas Connection String

1. Log into https://www.mongodb.com/cloud/atlas
2. Go to **Databases** → Click **Connect**
3. Choose **Drivers** → **Node.js**
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<username>` with your username if needed

**Example:**
```
mongodb+srv://faithfarm_user:MyPassword123@cluster0.abc123.mongodb.net/faithfarm?retryWrites=true&w=majority
```

⚠️ **If your password has special characters**, URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `!` → `%21`
- etc.

### 3. Render.com Setup

1. Create account at https://render.com
2. Create a **Web Service**
3. Click **Environment** section
4. Add each variable one by one

---

## Verifying Your Setup

### Test Backend Locally
```bash
cd faithfarm-backend
npm install
npm run dev

# In another terminal:
curl http://localhost:5000/api/products
# Should return JSON array (even if empty)
```

### Test Frontend Locally
```bash
cd faithfarm-frontend
npm install
npm run dev

# Open browser to http://localhost:5173
# Check DevTools Console (F12) - should have no "404" or connection errors
```

---

## Common Issues & Fixes

### MongoDB Connection Error
```
❌ Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Fix**: Make sure you're using MongoDB Atlas connection string in production, not localhost

### Cloudinary Upload Fails
```
❌ Error: Invalid upload_preset or api_key
```
**Fix**: Verify credentials are correct in backend `.env`

### Frontend Can't Reach Backend
```
❌ Error: Failed to fetch from http://localhost:5000
```
**Fix**: Check `VITE_API_URL` environment variable is correct (no trailing slash)

### CORS Error in Browser
```
❌ Access to XMLHttpRequest has been blocked by CORS policy
```
**Fix**: Verify frontend URL is in `allowedOrigins` array in backend `app.js`

---

## Security Best Practices

✅ **DO:**
- Use environment variables for all secrets
- Keep `.env` files out of Git (add to `.gitignore`)
- Use strong passwords for MongoDB user
- Restrict API keys in Cloudinary if possible
- Regenerate secrets if they're ever exposed

❌ **DON'T:**
- Hardcode credentials in source code
- Commit `.env` files to GitHub
- Share API keys publicly
- Use `origin: true` in CORS (we fixed this)
- Use the same password everywhere

---

## Summary Checklist

- [ ] Created `.env` in `faithfarm-backend/`
- [ ] Created `.env.production` in `faithfarm-frontend/`
- [ ] Got MongoDB Atlas connection string
- [ ] Got Cloudinary credentials
- [ ] Added all env vars to Render dashboard
- [ ] Added API_URL to Vercel dashboard
- [ ] Updated CORS in `app.js` with production URLs
- [ ] Tested locally (npm run dev)
- [ ] Deployed to Render and Vercel
- [ ] Verified everything works in production

