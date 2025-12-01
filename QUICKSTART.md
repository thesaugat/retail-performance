# 🚀 QUICKSTART GUIDE

Get your Sales Tournament Dashboard running in **3 minutes**!

---

## Step 1: Install Dependencies ⚡

Open your terminal in the project folder and run:

```bash
npm install
```

**What this does:**  
Downloads and installs React, Vite, Tailwind CSS, Recharts, and all other dependencies.

⏱️ **Time:** ~1-2 minutes

---

## Step 2: Start Development Server 🔥

```bash
npm run dev
```

**What happens:**
- Vite starts a super-fast development server
- Your browser automatically opens to `http://localhost:3000`
- You'll see the dashboard with all charts and data

⏱️ **Time:** ~5 seconds

---

## Step 3: Explore the Dashboard 🎯

You're done! The dashboard is now running. Here's what you can do:

### Interactive Features:
- **Filter Groups**: Use the dropdown to view specific groups
- **Sort Metrics**: Change from Total Sales to Win Rate, Points, etc.
- **Hover Charts**: Get detailed tooltips on all visualizations
- **View Rankings**: See top 10 performing stores

### Understanding the Data:
- **Group 1-3**: Premium stores (highest sales)
- **Group 4-6**: Mid-tier stores  
- **Group 7-10**: Developing stores
- **3 Days**: Competition from Nov 28-30, 2025
- **Points**: 3 for win, 0 for loss

---

## 🎨 What You'll See

### 📊 **Charts & Visualizations**
1. **Composed Chart** - Multi-axis with sales, averages, competitiveness
2. **Pie Chart** - Sales distribution across groups
3. **Area Chart** - Daily performance trends
4. **Statistics Table** - Detailed group breakdown

### 💎 **Key Metrics Cards**
- Total Sales
- Total Matches
- Active Stores
- Groups
- Competition Days

### 🏆 **Top 10 Leaderboard**
Medal rankings (🥇🥈🥉) for best performing stores

---

## 📝 Additional Commands

### Build for Production
```bash
npm run build
```
Creates optimized files in `dist/` folder

### Preview Production Build
```bash
npm run preview
```
Test the production build locally

### Lint Code
```bash
npm run lint
```
Check for code quality issues

---

## 🛠️ Customization (Optional)

### Change Your Data
Edit `src/components/Dashboard.jsx` and replace the CSV data with your own.

### Modify Colors
Edit `src/utils/constants.js` to change the color scheme.

### Add Features
Check `README.md` for detailed customization guide.

---

## 🐛 Common Issues

### ❌ Port 3000 already in use?
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- --port 3001
```

### ❌ Dependencies failed to install?
```bash
# Clear cache and retry
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### ❌ Charts not showing?
- Check browser console (F12) for errors
- Make sure all dependencies installed
- Try refreshing the page

---

## 📚 Next Steps

1. **Explore the Code**  
   Open `src/components/Dashboard.jsx` to see how it works

2. **Read Full Docs**  
   Check `README.md` for comprehensive documentation

3. **Deploy Your Dashboard**  
   See README.md for deployment options (Vercel, Netlify, etc.)

---

## 💡 Pro Tips

- **Hot Reload**: Edit code and see changes instantly (no refresh needed)
- **Browser DevTools**: Press F12 to inspect data and charts
- **Responsive**: Try it on your phone - fully responsive!
- **Performance**: Handles 1000+ data points smoothly

---

## 🎉 You're Ready!

Your dashboard is live at: **http://localhost:3000**

**Enjoy visualizing your sales data!** 🚀

---

## 📞 Need Help?

- Check `README.md` for detailed docs
- Review code comments in components
- Search documentation for React, Tailwind, or Recharts

---

**Happy Analyzing! 📊✨**
