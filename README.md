# AI Expense Tracker

An AI-powered personal finance management application that helps users track expenses, manage budgets, analyze spending patterns, and generate intelligent financial insights using Google Gemini AI.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Category Management

* Create Categories
* Update Categories
* Delete Categories
* Default Categories Automatically Created

### Transaction Management

* Add Income Transactions
* Add Expense Transactions
* Edit Transactions
* Delete Transactions
* Search & Filter Transactions

### Budget Management

* Monthly Budgets
* Weekly Budgets
* Budget Tracking
* Budget Alerts

### Dashboard Analytics

* Total Income
* Total Expenses
* Savings Rate
* Monthly Trend Analysis
* Category Breakdown
* Spending Statistics

### AI Features (Google Gemini)

* Monthly Financial Insights
* Budget Analysis
* Transaction Analysis
* Personalized Savings Tips
* Smart Budget Alerts

---

# Tech Stack

## Frontend

* React.js
* Vite
* Axios
* React Router
* Context API
* Tailwind CSS

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs
* dotenv

## Database

* PostgreSQL
* Neon Database

## AI

* Google Gemini API

---

# Project Structure

```text
AIEXPENSETRACKER
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── scripts
│   ├── sql
│   ├── utils
│   ├── db.js
│   ├── server.js
│   └── .env
│
├── frontend
│   └── AIExpenceTracker
│       ├── public
│       ├── src
│       ├── vite.config.js
│       └── .env
│
├── README.md
├── SETUP_GUIDE.md
└── package.json
```

---

# Prerequisites

Install:

### Node.js

Download:

https://nodejs.org

Verify:

```bash
node -v
npm -v
```

### Git

Download:

https://git-scm.com/downloads

Verify:

```bash
git --version
```

---

# Clone Repository

```bash
git clone https://github.com/sutharashok05/AIEXPENSETRACKER.git
```

```bash
cd AIEXPENSETRACKER
```

---

# Backend Setup

Move into backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# Create Backend Environment Variables

Create:

```text
backend/.env
```

Add:

```env
PORT=8000

DATABASE_URL=YOUR_NEON_DATABASE_URL

JWT_SECRET=YOUR_SECRET_KEY

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

# Database Setup

## Create Neon Database

1. Visit https://neon.tech
2. Create an account
3. Create a project
4. Copy your PostgreSQL connection string

Example:

```env
DATABASE_URL=postgresql://username:password@host.neon.tech/database?sslmode=require
```

---

# Run Database Migration

```bash
npm run migrate
```

This creates all required tables:

* users
* categories
* transactions
* budgets
* ai_insights

---

# Optional Demo Data

Generate sample user, categories, budgets, and transactions:

```bash
npm run seed
```

Demo User:

```json
{
  "email": "alex@timetoprogram.com",
  "password": "Test@1234"
}
```

---

# Google Gemini Setup

Visit:

https://aistudio.google.com/app/apikey

Create an API Key.

Add it to:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Restart backend after updating:

```bash
npm start
```

---

# Start Backend

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Backend URL:

```text
http://localhost:8000
```

---

# Frontend Setup

Open new terminal:

```bash
cd frontend/AIExpenceTracker
```

Install dependencies:

```bash
npm install
```

---

# Frontend Environment Variables

Create:

```text
frontend/AIExpenceTracker/.env
```

Add:

```env
VITE_API_URL=http://localhost:8000/api
```

---

# Start Frontend

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# Authentication

Register:

```http
POST /api/auth/register
```

Login:

```http
POST /api/auth/login
```

Response:

```json
{
  "user": {
    "id": 1,
    "name": "Ashok"
  },
  "token": "JWT_TOKEN"
}
```

The frontend automatically stores the token in Local Storage and sends:

```http
Authorization: Bearer JWT_TOKEN
```

with every protected request.

---

# Main API Endpoints

## Auth

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Categories

```http
GET    /api/categories
POST   /api/categories
PUT    /api/categories/:id
DELETE /api/categories/:id
```

## Transactions

```http
GET    /api/transactions
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id
```

## Budgets

```http
GET    /api/budgets
POST   /api/budgets
PUT    /api/budgets/:id
DELETE /api/budgets/:id
```

## Dashboard

```http
GET /api/dashboard/summary
GET /api/dashboard/category-breakdown
GET /api/dashboard/monthly-trend
```

## AI Insights

```http
GET  /api/insights
POST /api/insights/generate
POST /api/insights/analyze-transactions
POST /api/insights/analyze-budgets
```

---

# Security

* JWT Authentication
* Password Hashing (bcryptjs)
* Protected APIs
* Environment Variable Protection

---

# Special Features

* AI Powered Financial Insights
* Budget Monitoring
* Savings Recommendations
* Transaction Analysis
* Monthly Financial Reports
* Category Based Expense Tracking
* Cloud Database (Neon)
* Responsive User Interface

---

# Future Improvements

* Dark Mode
* Export PDF Reports
* Export Excel Reports
* Multi Currency Support
* Email Notifications
* Mobile Application
* Recurring Transactions

---

# Author

Ashok Suthar

GitHub:
https://github.com/sutharashok05

Project Repository:
https://github.com/sutharashok05/AIEXPENSETRACKER
