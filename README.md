# 🚀 TradeFlow — Full-Stack Stock Broking & Trading Platform (Zerodha Clone)

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express.js-green?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com)
[![Deployed on Render](https://img.shields.io/badge/Deployed-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

> **TradeFlow** is a production-ready, full-stack fintech ecosystem inspired by **Zerodha** (India's premier discount brokerage). Engineered with the MERN stack, it delivers institutional-grade order execution, real-time portfolio tracking, dynamic weighted-average price calculations, interactive financial data visualization with Chart.js, and an ultra-responsive Kite-style trading terminal.

---

## 🌐 Live Deployments

| Service | Description | Live Demo |
| :--- | :--- | :--- |
| **Landing Portal** | Marketing, pricing, company ethos, and onboarding | [🔗 Open Landing Portal](https://zerodha-landing-bp59.onrender.com) |
| **Trading Terminal (Kite)** | Real-time market dashboard, watchlist, orders & portfolio | [📊 Open Trading Terminal](https://zerodha-dashboard-appt.onrender.com) |
| **REST API Server** | Scalable Node/Express backend with MongoDB Atlas | [⚡ API Health Check](https://zerodha-backend-7azy.onrender.com) |

---

## 📸 Platform Overview

```
+---------------------------------------------------------------------------------------+
|                                    TRADEFLOW ECOSYSTEM                                |
+---------------------------------------------------------------------------------------+
|  [ Landing Portal (Port 3000) ]           [ Trading Dashboard Terminal (Port 3001) ]   |
|  - Hero & Marketing Pages                 - Live Watchlist & Market Analytics        |
|  - Products Showcase & Pricing Matrix     - Dynamic Buy / Sell Order Modal           |
|  - About & Leadership (Founder Profile)   - Holdings, Positions, Funds & Orders      |
|  - Integrated Auth (Login / Signup)       - Chart.js Portfolio Visualizations        |
+---------------------------------------------------------------------------------------+
                                           |
                                [ RESTful API & JWT Auth ]
                                           |
                         [ Backend Server (Express + Node.js) ]
                                           |
                                [ MongoDB Atlas Cluster ]
```

---

## 🔥 Key Features

### 📈 1. Interactive Watchlist & Market Feed
- Real-time stock ticker listing with current market price and percentage change indicators.
- Quick action triggers on hover for instantaneous **BUY / SELL** modal activation.
- Integrated search filter to pinpoint active equities quickly.

### ⚡ 2. Real-Time Order Execution Engine
- Dynamic **Buy Action Window** supporting market and limit orders with live margin calculation.
- Automated **weighted-average price calculation** on repeated purchases:
  $$\text{New Avg Price} = \frac{(\text{Prev Qty} \times \text{Prev Avg}) + (\text{New Qty} \times \text{New Price})}{\text{Prev Qty} + \text{New Qty}}$$
- Comprehensive position handling: buying automatically updates or initializes holdings, while selling decreases positions or liquidates zero-balance holdings.

### 💼 3. Portfolio & Holdings Tracking
- Instant P&L calculations (Net Profit/Loss and Daily Returns) with responsive color-coded badges.
- Total portfolio valuation vs. invested capital metrics updated in real time.
- Isolated order book scoped strictly to the authenticated user.

### 📊 4. Financial Charts & Visual Analytics
- Visual asset distribution powered by **Chart.js** and **react-chartjs-2**.
- Interactive doughnut and vertical bar charts highlighting stock allocation and sector exposure.

### 🔐 5. Enterprise-Grade Authentication & Security
- Secure token-based authentication using **JSON Web Tokens (JWT)**.
- Passwords salted and hashed with **bcryptjs** (10 salt rounds).
- Cross-origin session protection with **HTTP-Only cookies** (`sameSite: "none"` in production with SSL).
- Dedicated authorization middleware guarding user-specific order queries.

---

## 🛠️ Tech Stack & Architecture

### **Frontend & Dashboard**
- **React.js (v18 & v19)**: Component-driven UI with stateful hooks and context providers.
- **React Router (v6 / v7)**: Client-side routing with protected dashboard routes.
- **Material-UI (MUI)**: Polished financial icons and responsive UI utilities.
- **Chart.js & React-Chartjs-2**: High-performance HTML5 canvas rendering for portfolio analytics.
- **Axios**: Promised-based HTTP client with cookie-credentials support.

### **Backend & Database**
- **Node.js & Express.js 5**: Fast, minimalist REST API microservices architecture.
- **MongoDB Atlas & Mongoose ODM**: Schema modeling with index optimization and cascading updates.
- **Cookie-Parser & CORS**: Fine-grained CORS configuration allowing multi-origin cloud deployments.
- **Dotenv**: Environment-driven credential management.

### **DevOps & Cloud Hosting**
- **Render Cloud Services**: Continuous deployment pipelines connected to GitHub repository.
- **Git & GitHub**: Version control and collaborative codebase management.

---

## 📁 Repository Structure

```plaintext
ZERODHA/
├── backend/                  # RESTful API Server
│   ├── middleware/           # JWT verification & auth guards
│   ├── model/                # Mongoose schemas (User, Order, Holding, Position)
│   ├── util/                 # Secret token generators
│   ├── index.js              # Express app entrypoint & API endpoints
│   └── package.json
├── dashboard/                # Kite-style Trading Terminal App
│   ├── public/               # Static assets & dashboard icons
│   ├── src/
│   │   ├── components/       # WatchList, BuyActionWindow, Holdings, Orders, Funds, Charts
│   │   ├── config.js         # Dynamic environment endpoint configuration
│   │   └── index.js
│   └── package.json
├── frontend/                 # Customer Facing Landing Portal
│   ├── public/
│   │   └── media/            # Logos, product illustrations, badges, and founder photos
│   ├── src/
│   │   ├── landing_page/     # Home, About, Products, Pricing, Support, Login/Signup
│   │   ├── config.js         # API & Dashboard redirection URLs
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or later)
- [Git](https://git-scm.com/)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas/database) connection string or local MongoDB instance

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/Khatri-369/ZERODHA.git
cd ZERODHA
```

---

### Step 2: Configure & Start Backend
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=3002
MONGO_URL=your_mongodb_connection_string
TOKEN_KEY=your_jwt_secret_key
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
# Server runs on http://localhost:3002
```

---

### Step 3: Configure & Start Dashboard
In a new terminal window:
```bash
cd dashboard
npm install
npm start
# Dashboard runs on http://localhost:3001
```

---

### Step 4: Configure & Start Landing Frontend
In a third terminal window:
```bash
cd frontend
npm install
npm start
# Landing page runs on http://localhost:3000
```

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/` | API Health & Deployment status | No |
| `POST` | `/signup` | Register new user & set JWT cookie | No |
| `POST` | `/login` | Authenticate user & issue session cookie | No |
| `GET` | `/logout` | Invalidate user session & clear cookies | No |
| `GET` | `/user/profile` | Retrieve authenticated user profile | **Yes** |
| `GET` | `/allholdings` | Fetch all user stock holdings & P&L | Optional |
| `GET` | `/allpositions`| Fetch open intraday derivative positions | Optional |
| `GET` | `/allorders` | Retrieve authenticated user's order history | **Yes** |
| `POST` | `/newOrder` | Place BUY/SELL order and recalculate holdings | Optional |

---

## 👨‍💻 Author & Founder

**KHATRI OM KUMAR**  
*Founder & Full-Stack Engineer*

- **LinkedIn**: [@omkhatri369](https://www.linkedin.com/in/omkhatri369/)
- **GitHub**: [@Khatri-369](https://github.com/Khatri-369)
- **Portfolio / Live Site**: [TradeFlow on Render](https://zerodha-landing-bp59.onrender.com)
- **Email**: [khatriom12062007@gmail.com](mailto:khatriom12062007@gmail.com)

---

## 📄 License
This project is licensed under the [ISC License](LICENSE).