# AI Expense Tracker

An AI-powered Expense Tracking Application built with React, Node.js, Express, PostgreSQL (Neon), JWT Authentication, and Google Gemini AI.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Expense Management

* Add Transactions
* Update Transactions
* Delete Transactions
* Transaction History

### Categories

* Create Categories
* Update Categories
* Delete Categories
* Default Categories

### Budget Management

* Monthly Budgets
* Budget Tracking
* Budget Alerts

### Dashboard Analytics

* Monthly Income
* Monthly Expenses
* Savings Rate
* Category Breakdown
* Monthly Trends

### AI Features (Google Gemini)

* Monthly Financial Insights
* Spending Analysis
* Budget Analysis
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
* PostgreSQL
* JWT
* bcrypt
* dotenv

## AI

* Google Gemini API

## Database

* Neon PostgreSQL

---

# Project Structure

AIEXPENSETRACKER/

├── backend/

│ ├── controllers/

│ ├── middleware/

│ ├── routes/

│ ├── scripts/

│ ├── sql/

│ ├── utils/

│ ├── db.js

│ └── server.js

│

├── frontend/

│ └── AIExpenceTracker/

│ ├── src/

│ ├── public/

│ └── vite.config.js

│

└── README.md

---

# Prerequisites

Install the following before running the project:

## Node.js

Download:

https://nodejs.org

Verify:

```bash
node -v
npm -v
```

## Git

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

Move into project:

```bash
cd AIEXPENSETRACKER
```

---

# Backend Setup

Move into backend:

```bash
cd backend
```

Install packages:

```bash
npm install
```

---

# Database Setup (Neon PostgreSQL)

Create a free account:

https://neon.tech

Create a project.

Copy Connection String.

Example:

```env
postgresql://username:password@host.neon.tech/dbname?sslmode=require
```

---

# Backend Environment Variables

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

# Google Gemini Setup

Go to:

https://aistudio.google.com/

Create API Key.

Copy API Key.

Add it to:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

# Create Database Tables

Run Migration:

```bash
npm run migrate
```

---

# Seed Demo Data (Optional)

```bash
npm run seed
```

Demo Login:

```json
{
  "email": "alex@timetoprogram.com",
  "password": "Test@1234"
}
```

---

# Start Backend

```bash
npm run dev
```

or

```bash
npm start
```

Backend URL:

```text
http://localhost:8000
```

---

# Frontend Setup

Move into frontend:

```bash
cd ../frontend/AIExpenceTracker
```

Install dependencies:

```bash
npm install
```

Create:

```text
.env
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

# Authentication Flow

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
  "token": "YOUR_JWT_TOKEN"
}
```

Store token:

```javascript
localStorage.setItem("token", token);
```

The frontend automatically sends:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

for protected APIs.

---

# Main APIs

## Auth

```http
POST /api/auth/register
POST /api/auth/login
```

## Categories

```http
GET /api/categories
POST /api/categories
PUT /api/categories/:id
DELETE /api/categories/:id
```

## Transactions

```http
GET /api/transactions
POST /api/transactions
PUT /api/transactions/:id
DELETE /api/transactions/:id
```

## Budgets

```http
GET /api/budgets
POST /api/budgets
PUT /api/budgets/:id
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
GET /api/insights

POST /api/insights/generate

POST /api/insights/analyze-transactions

POST /api/insights/analyze-budgets
```

---

# Special Features

* JWT Authentication
* PostgreSQL Database
* Neon Cloud Database
* Google Gemini AI Integration
* Monthly Financial Insights
* Savings Recommendations
* Budget Monitoring
* Spending Analysis
* Responsive UI
* Protected Routes
* REST API Architecture

---

# Future Improvements

* PDF Reports
* Export to Excel
* Dark Mode
* Multi-Currency Support
* Email Notifications
* Recurring Transactions
* Mobile Application

---

# Author

Ashok Suthar

GitHub:

https://github.com/sutharashok05
