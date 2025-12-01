# 🏆 Sales Tournament Dashboard

A modern, interactive dashboard for visualizing and analyzing sales competition data across multiple store groups.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-cyan)
![Recharts](https://img.shields.io/badge/Recharts-2.10.3-green)

---

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Usage](#usage)
- [Customization](#customization)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## ✨ Features

### 📊 **Visual Analytics**
- **Multi-axis Charts**: Composed charts showing sales, averages, and competitiveness
- **Distribution Views**: Pie charts for sales distribution
- **Trend Analysis**: Area charts for daily performance
- **Interactive Tables**: Sortable, filterable data tables

### 🎯 **Key Metrics**
- Total sales across all groups
- Average sales per match
- Win/loss records with points system (3 pts per win)
- Competitiveness index
- Daily performance trends
- Store rankings

### 🎨 **UI/UX**
- Dark gradient theme with glass-morphism effects
- Smooth animations and transitions
- Fully responsive design (mobile, tablet, desktop)
- Interactive hover states and tooltips
- Medal-based rankings (gold, silver, bronze)

### 🔧 **Interactive Features**
- Filter by group or view all
- Sort by multiple metrics (sales, average, points, win rate)
- Real-time data recalculation
- Hover tooltips with detailed information

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm installed
- Basic knowledge of React (optional)

### Installation

1. **Extract the project** (if downloaded as zip)
   ```bash
   unzip sales-tournament-dashboard.zip
   cd sales-dashboard-complete
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This installs React, Vite, Tailwind CSS, Recharts, and all necessary dependencies.

3. **Start development server**
   ```bash
   npm run dev
   ```
   The dashboard will open automatically at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```
   Creates an optimized build in the `dist/` folder.

---

## 📁 Project Structure

```
sales-dashboard-complete/
├── public/                          # Static assets
├── src/
│   ├── components/                  # React components
│   │   └── Dashboard.jsx           # Main dashboard component
│   ├── utils/                       # Utility functions
│   │   ├── dataHelpers.js          # Data processing functions
│   │   └── constants.js            # App constants
│   ├── assets/                      # Images, fonts, etc.
│   ├── styles/                      # Additional styles (if needed)
│   ├── App.jsx                      # Root component
│   ├── main.jsx                     # App entry point
│   └── index.css                    # Global styles + Tailwind
├── index.html                       # HTML template
├── package.json                     # Dependencies & scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS config
├── postcss.config.js                # PostCSS config
├── .eslintrc.cjs                    # ESLint config
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

---

## 🛠️ Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI library |
| **Vite** | 5.0.8 | Build tool & dev server |
| **Tailwind CSS** | 3.4.0 | Utility-first CSS |
| **Recharts** | 2.10.3 | Chart library |
| **Lucide React** | 0.300.0 | Icon library |
| **PostCSS** | 8.4.32 | CSS processing |
| **ESLint** | 8.55.0 | Code linting |

---

## 📖 Usage

### Understanding the Dashboard

#### **Group Structure**
- **Groups 1-3**: Premium stores (highest sales)
- **Groups 4-6**: Mid-tier stores
- **Groups 7-10**: Developing stores

#### **Tournament Format**
- 3-day competition (Nov 28-30, 2025)
- Head-to-head matches between stores
- Winner determined by highest sales in each match
- Points: 3 for win, 0 for loss

#### **Key Metrics Explained**

**Total Sales**  
Sum of all sales for a group/store

**Avg/Match**  
Average sales per match (Total Sales ÷ Matches)

**Competitiveness Index**  
Measures how close matches are (0-100%)
- 90-100%: Very competitive
- 70-89%: Moderately competitive
- <70%: Less competitive

**Win Rate**  
Percentage of matches won (Wins ÷ Total Matches × 100)

### Interacting with the Dashboard

1. **Filter by Group**  
   Use the dropdown to view specific groups or all groups

2. **Change Metrics**  
   Select different metrics to sort stores (Total Sales, Average, Points, Win Rate)

3. **Hover for Details**  
   Hover over charts and cards for detailed tooltips

4. **View Rankings**  
   Top 10 stores are displayed with medal rankings

---

## 🎨 Customization

### Update Sales Data

Replace the CSV data in `src/components/Dashboard.jsx`:

```javascript
const fullData = `Date,Group,No.,Matches,Team 1,Team 2,...
// Your new data here
`;
```

Or create a separate data file:

```javascript
// src/data/salesData.js
export const salesData = `...`;

// In Dashboard.jsx
import { salesData } from '../data/salesData';
```

### Change Color Scheme

Edit `src/utils/constants.js`:

```javascript
export const CHART_COLORS = [
  '#YourColor1',
  '#YourColor2',
  // ...
];
```

### Modify Chart Types

In `Dashboard.jsx`, you can swap out chart components:

```javascript
// Change from BarChart to LineChart
import { LineChart, Line } from 'recharts';

<LineChart data={data}>
  <Line type="monotone" dataKey="value" stroke="#8884d8" />
</LineChart>
```

### Add New Metrics

1. Add calculation in the analytics processing
2. Add option to constants
3. Update display logic

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

```bash
npm run build
# Drag dist/ folder to Netlify drop zone
```

### Option 3: GitHub Pages

```bash
npm install gh-pages --save-dev

# Add to package.json:
"homepage": "https://yourusername.github.io/sales-dashboard",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

npm run deploy
```

### Option 4: Traditional Hosting

```bash
npm run build
# Upload contents of dist/ to your web server
```

---

## 📚 Learn More

### Documentation
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Recharts API](https://recharts.org/en-US/api)

### Tutorials
- [React Tutorial](https://react.dev/learn)
- [Tailwind Tutorial](https://tailwindcss.com/docs/installation)

---

## 🐛 Troubleshooting

### Port 3000 already in use

```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- --port 3001
```

### Dependencies not installing

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Charts not rendering

- Check browser console for errors
- Verify data format matches expected structure
- Ensure all dependencies are installed

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 💡 Tips

- **Hot Reload**: Changes auto-update during development
- **DevTools**: Press F12 to inspect data and debug
- **Performance**: Handles 1000+ data points smoothly
- **Mobile**: Fully responsive, works great on phones

---

## 🎯 What's Next?

### Potential Enhancements
- [ ] CSV file upload feature
- [ ] Real-time data updates via WebSocket
- [ ] Export to PDF/Excel
- [ ] User authentication
- [ ] Advanced filtering options
- [ ] Dark/light theme toggle
- [ ] Backend API integration
- [ ] Database persistence
- [ ] Email reports
- [ ] Predictive analytics

---

## ⭐ Support

If you found this helpful, please consider:
- Giving it a star ⭐
- Sharing with others
- Reporting issues
- Contributing improvements

---

**Built by Saugat Timilsina with ❤️ using React, Vite, Tailwind CSS, and Recharts**

*For questions or support, check the documentation or create an issue.*

---

**Version:** 1.0.0  
**Last Updated:** December 2025
