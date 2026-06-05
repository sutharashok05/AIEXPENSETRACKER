# AI Expense Tracker - Setup Guide

## Issue Fixed

When clicking "Generate" on the AI Spending Insight, users were getting a **500 Internal Server Error** on the POST request to `/api/insights/analyze-transactions`.

### Root Cause
The backend was attempting to call the Google Generative AI (Gemini) API without properly validating that the `GEMINI_API_KEY` environment variable was configured. This caused an uncaught error that resulted in a 500 response.

### Solution Applied
✅ Added proper environment variable validation in all AI analysis functions:
- `generateMonthlyInsight`
- `generateBudgetAlert`
- `generateSavingsTips`
- `analyzeTransactionList`
- `analyzeBudgetList`

Now the API returns a clear 500 error message explaining that `GEMINI_API_KEY` needs to be configured.

---

## Setup Instructions

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Select your project or create a new one
4. Copy the API key

### 2. Configure Environment Variables

1. In the `backend` directory, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. Also add other required variables (database, JWT secret, etc.)

### 3. Restart the Backend Server

After updating `.env`, restart your backend server:
```bash
# Kill the current server process
# Then restart:
npm start
# or
node server.js
```

### 4. Test the AI Features

1. Create some transactions in the app
2. Go to the Transactions page
3. Click "Generate" on the AI Spending Insight button
4. If configured correctly, you should see the analysis

---

## Environment Variables Required

```
GEMINI_API_KEY       - Google Generative AI API key (required for AI features)
DATABASE_URL         - PostgreSQL connection string
JWT_SECRET           - Secret key for JWT tokens
PORT                 - Server port (default: 8000)
NODE_ENV             - Environment (development/production)
```

---

## Troubleshooting

### Still getting 500 error?
1. Check that `GEMINI_API_KEY` is set in `.env`
2. Check that the API key is valid
3. Check server logs for more details:
   ```
   Gemini API error (transactions): [error details]
   ```

### Other error messages?
- "AI analysis is not configured" → Missing `GEMINI_API_KEY`
- "Failed to analyze transactions" → Gemini API error (check API key validity)
- Network errors → Check that backend server is running on port 8000

---

## Files Modified

- `backend/utils/gemini.js` - Added API key validation
- `backend/.env.example` - Created environment variable template
