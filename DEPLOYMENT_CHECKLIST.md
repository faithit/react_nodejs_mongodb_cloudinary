# 🚀 Quick Deployment Checklist

## ✅ Pre-Deployment Tasks (Do Locally First)

### 1. Environment Variables
- [ ] Backend: Create `.env` file from `.env.example` with your actual values
- [ ] Frontend: Create `.env.production.local` with your Render backend URL

### 2. Update Frontend CORS URL
- [ ] In `faithfarm-backend/src/app.js`, replace `your-vercel-url.vercel.app` with your actual Vercel domain

### 3. Test Locally
```bash
# Terminal 1 - Backend
cd faithfarm-backend
npm install
npm run dev

# Terminal 2 - Frontend
cd faithfarm-frontend
npm install
npm run dev
```
Visit `http://localhost:5173` and test all features (products, contacts, file uploads)

### 4. Commit & Push to GitHub
```bash
git add .
git commit -m "Prepare for free deployment"
git push origin main
```

---

## 🌐 MongoDB Atlas Setup (Free 512MB)

- [ ] Sign up at https://www.mongodb.com/cloud/atlas
- [ ] Create a Free M0 cluster
- [ ] Create database user (username/password)
- [ ] Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/...`
- [ ] **IMPORTANT**: Update password if it contains special characters (URL encode them)

**Example Connection String:**
```
mongodb+srv://faithfarm_user:your_password@cluster.mongodb.net/faithfarm?retryWrites=true&w=majority
```

---

## 🎯 Render.com Backend Deployment

### Step-by-Step:
1. [ ] Sign up at https://render.com (use GitHub login)
2. [ ] Click **New +** → **Web Service**
3. [ ] Select your GitHub repository
4. [ ] Fill in:
   - **Name**: `faithfarm-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`

5. [ ] Add **Environment Variables**:
   - `MONGODB_URI`: your-mongodb-connection-string
   - `CLOUDINARY_CLOUD_NAME`: your-cloudinary-name
   - `CLOUDINARY_API_KEY`: your-api-key
   - `CLOUDINARY_API_SECRET`: your-api-secret
   - `NODE_ENV`: `production`

6. [ ] Click **Create Web Service**
7. [ ] Wait 3-5 minutes for deployment
8. [ ] Copy your backend URL: `https://faithfarm-backend.onrender.com`
9. [ ] Test: Visit `https://faithfarm-backend.onrender.com/api/products` (should return JSON)

---

## 🎨 Vercel Frontend Deployment

### Step-by-Step:
1. [ ] Sign up at https://vercel.com (use GitHub login)
2. [ ] Click **Add New...** → **Project**
3. [ ] Select your GitHub repository
4. [ ] Configure:
   - **Framework**: React
   - **Root Directory**: `faithfarm-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. [ ] Add **Environment Variable**:
   - `VITE_API_URL`: `https://faithfarm-backend.onrender.com` (your Render URL)

6. [ ] Click **Deploy**
7. [ ] Wait 1-2 minutes
8. [ ] Your site is live at your Vercel URL! 🎉

---

## 🔄 Update CORS (After Getting Both URLs)

Once you have both Render and Vercel URLs:

**Edit `faithfarm-backend/src/app.js`:**
```javascript
const allowedOrigins = [
  "https://your-project.vercel.app",  // Replace with your Vercel URL
  "http://localhost:3000",
  "http://localhost:5173",
];
```

Push this change:
```bash
git add src/app.js
git commit -m "Update CORS for production URLs"
git push origin main
```

Render will auto-redeploy! ✅

---

## 🧪 Testing Production Deployment

1. [ ] Visit your Vercel frontend URL
2. [ ] Open browser DevTools (F12) → Console
3. [ ] Try creating a product (should see it saved)
4. [ ] Try submitting a contact form
5. [ ] Try uploading an image (via Cloudinary)
6. [ ] Check MongoDB Atlas dashboard → see data there
7. [ ] Check Cloudinary → see uploaded images

---

## ⚡ Troubleshooting

| Issue | Solution |
|-------|----------|
| **Backend won't start** | Check Render logs; verify MONGODB_URI is correct |
| **Frontend can't reach backend** | Check VITE_API_URL env var; check CORS in app.js |
| **Database connection fails** | Test connection string locally first; check MongoDB Atlas IP whitelist |
| **File uploads fail** | Verify Cloudinary credentials in env vars |
| **Cold start (30s delay)** | Normal on free Render tier - auto-wakes after request |

---

## 📊 Your Free Setup Summary

| Component | Platform | Tier | Storage |
|-----------|----------|------|---------|
| Frontend | Vercel | Free | Unlimited |
| Backend | Render.com | Free | 750 hrs/month |
| Database | MongoDB Atlas | Free | 512 MB |
| Files | Cloudinary | Free | 25 GB |

**Total Cost: $0** 🎉

---

## 📚 Useful Links

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.mongodb.com/manual/)
- [Cloudinary Docs](https://cloudinary.com/documentation)

---

## 🎯 Next Steps

1. Complete MongoDB Atlas setup
2. Deploy backend to Render
3. Deploy frontend to Vercel
4. Update CORS with both URLs
5. Test everything works!
6. (Optional) Add custom domain later

Good luck! 🚀
