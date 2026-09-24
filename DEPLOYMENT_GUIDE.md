# 🚀 Free Deployment Guide - FaithFarm

This guide will help you deploy your React + Node.js + MongoDB + Cloudinary project **for free** using:
- **Frontend**: Vercel
- **Backend**: Render.com
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary (already configured)

---

## 📋 Prerequisites

1. GitHub account with your project pushed
2. Cloudinary account (already configured)
3. Email addresses for new services

---

## Part 1: MongoDB Atlas Setup (Database) ✅

### Step 1: Create MongoDB Atlas Account
1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **Sign Up** (or login if you have an account)
3. Create an account (use Google for quick signup)

### Step 2: Create a Free Cluster
1. After login, click **Create** → **Database**
2. Choose **Free** tier (M0)
3. Select your preferred region (closest to you is best)
4. Click **Create Cluster** (takes 1-3 minutes)

### Step 3: Create Database User
1. Go to **Security** → **Database Access**
2. Click **Add New Database User**
3. Enter:
   - Username: `faithfarm_user` (or your choice)
   - Password: Generate a strong one and **save it**
   - Role: **Atlas admin**
4. Click **Add User**

### Step 4: Get Connection String
1. Go to **Deployment** → **Databases**
2. Click **Connect** on your cluster
3. Choose **Drivers** → **Node.js**
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`)
5. Replace `<password>` with your actual password
6. **Save this connection string** - you'll need it later

---

## Part 2: Backend Deployment on Render.com 🎯

### Step 1: Prepare Your Backend

1. **Check .env file format** - Create `.env.example` in `faithfarm-backend/`:
```
MONGODB_URI=your_mongodb_atlas_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
NODE_ENV=production
```

2. **Add a Procfile** in `faithfarm-backend/`:
```
web: node src/server.js
```

3. **Ensure package.json has correct scripts**:
   - ✅ Already has: `"start": "node src/server.js"`

### Step 2: Push to GitHub
1. Make sure your code is committed:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 3: Deploy on Render.com
1. Go to [https://render.com](https://render.com)
2. Click **Sign Up** (use GitHub for quick login)
3. Click **New +** → **Web Service**
4. Select your GitHub repository
5. Fill in deployment details:
   - **Name**: `faithfarm-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
   - **Instance Type**: Free (auto-sleep warning is OK)

6. **Add Environment Variables** (click **Environment**):
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary name
   - `CLOUDINARY_API_KEY`: Your API key
   - `CLOUDINARY_API_SECRET`: Your API secret
   - `NODE_ENV`: `production`

7. Click **Create Web Service**
8. Wait for deployment (3-5 minutes)
9. **Copy your Render backend URL** (looks like: `https://faithfarm-backend.onrender.com`)

---

## Part 3: Frontend Deployment on Vercel 🎨

### Step 1: Update API Calls
Update your frontend API base URL in `faithfarm-frontend/src/`:

1. Create an `.env.production.local` file:
```
VITE_API_URL=https://your-render-url.onrender.com
```

2. Update your axios/fetch calls to use this variable:
   - Find where you're making API calls
   - Replace hardcoded localhost URLs with the environment variable

**Example (check your code for actual API calls):**
```javascript
// Before:
axios.get('http://localhost:5000/api/products')

// After:
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.get(`${API_URL}/api/products`)
```

### Step 2: Deploy on Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Click **Sign Up** (use GitHub for quick login)
3. Click **Add New...** → **Project**
4. Select your GitHub repository
5. Configure project:
   - **Framework Preset**: React
   - **Root Directory**: `faithfarm-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. **Add Environment Variable**:
   - Name: `VITE_API_URL`
   - Value: `https://your-render-url.onrender.com`

7. Click **Deploy**
8. Wait for deployment (1-2 minutes)
9. **Your frontend is live!** ✅

---

## Part 4: Update CORS on Backend 🔒

Since your frontend and backend are now on different domains, update CORS:

**Edit `faithfarm-backend/src/app.js`:**
```javascript
const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "https://your-vercel-url.vercel.app", // Production
  "http://localhost:3000", // Local development
  "http://localhost:5173"  // Vite default port
];

app.use(cors({ 
  origin: allowedOrigins,
  credentials: true 
}));

app.use(express.json());
// ... rest of your code
```

Then push to GitHub and Render will auto-redeploy.

---

## Part 5: Testing Your Deployment 🧪

1. **Visit your Vercel frontend URL** - should load without errors
2. **Check browser console** (F12) for errors
3. **Test API calls** - try loading products, submitting forms
4. **Check MongoDB Atlas** - verify data is being saved
5. **Test file uploads** - ensure Cloudinary integration works

---

## 🆘 Troubleshooting

### Backend won't start on Render
- ✅ Check logs in Render dashboard
- ✅ Ensure `MONGODB_URI` environment variable is correct
- ✅ Check MongoDB Atlas allows access from Render IPs (should auto-allow)

### Frontend can't reach backend
- ✅ Verify `VITE_API_URL` is correct (no trailing slash)
- ✅ Check CORS settings in backend
- ✅ Check Network tab in browser DevTools

### Database connection fails
- ✅ Test connection string locally first
- ✅ Verify MongoDB Atlas user permissions
- ✅ Check IP whitelist in MongoDB Atlas (should be set to allow all: 0.0.0.0/0)

### File uploads not working
- ✅ Verify Cloudinary credentials in backend env vars
- ✅ Check Cloudinary dashboard for usage limits

---

## 📊 Free Tier Limits

| Service | Limit | Notes |
|---------|-------|-------|
| **MongoDB Atlas** | 512 MB | Good for starting |
| **Render.com Backend** | 750 free hours/month | Auto-sleeps after 15 min inactivity (cold start: 30s) |
| **Vercel Frontend** | Unlimited | Great for static builds |
| **Cloudinary** | 25 GB storage | Sufficient for most projects |

---

## 🚀 Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Deploy backend on Render.com
3. ✅ Deploy frontend on Vercel
4. ✅ Test everything works
5. ✅ Custom domain setup (optional, Vercel makes this easy)

---

## 📞 Support Links

- MongoDB: https://docs.mongodb.com/manual/
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- Cloudinary: https://cloudinary.com/documentation

Good luck! 🎉
