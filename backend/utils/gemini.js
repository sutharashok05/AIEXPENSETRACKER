import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const ai = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

if (!process.env.GEMINI_API_KEY) {
  console.error(
    "⚠️ WARNING: GEMINI_API_KEY is not set. AI features will not work."
  );
}

const stripMarkdown = (text) => {
  let cleaned = text.trim();

  if (cleaned.startsWith("```json")) {
    cleaned = cleaned
      .replace(/^```json\n?/g, "")
      .replace(/```$/g, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/```/g, "");
  }

  return cleaned.trim();
};

export const generateMonthlyInsight = async ({
  totalIncome,
  totalExpenses,
  savingsRate,
  expenseBreakdown,
  previousMonths,
  currency = "USD",
}) => {
  const breakdownText =
    expenseBreakdown.length > 0
      ? expenseBreakdown
          .map(
            (c) =>
              `- ${c.category}: ${currency} ${Number(
                c.amount
              ).toFixed(2)}`
          )
          .join("\n")
      : "- No expenses recorded yet";

  const trendText =
    previousMonths.length > 0
      ? previousMonths
          .map(
            (m) =>
              `- ${m.month}: Income ${currency} ${Number(
                m.income
              ).toFixed(2)}, Expenses ${currency} ${Number(
                m.expense
              ).toFixed(2)}`
          )
          .join("\n")
      : "- No previous month data available";

  const prompt = `
Analyze this user's monthly financial data and generate actionable insights.

Currency: ${currency}
Total Income (this month): ${currency} ${totalIncome.toFixed(2)}
Total Expenses (this month): ${currency} ${totalExpenses.toFixed(2)}
Savings Rate: ${savingsRate.toFixed(1)}%

Expense breakdown:
${breakdownText}

Previous months trend:
${trendText}

Return ONLY valid JSON:

{
  "summary":"2-3 sentence summary",
  "highlights":["Highlight 1","Highlight 2"],
  "concerns":["Concern 1","Concern 2"],
  "recommendations":[
    {
      "title":"Short title",
      "detail":"Actionable suggestion"
    }
  ],
  "topSpendingCategory":"Category",
  "estimatedMonthlySavings":0,
  "healthScore":0
}
`;

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleaned = stripMarkdown(response.text());

    return JSON.parse(cleaned);
  } catch (error) {
    console.error(
      "Gemini API error (monthly insight):",
      error
    );

    throw new Error(
      "Failed to generate monthly insight. Please try again."
    );
  }
};

export const generateBudgetAlert = async ({
  categoryName,
  budgetAmount,
  spentAmount,
  daysIntoPeriod,
  totalPeriodDays,
  currency = "USD",
}) => {
  const percentUsed = (
    (spentAmount / budgetAmount) *
    100
  ).toFixed(1);

  const daysLeft =
    totalPeriodDays - daysIntoPeriod;

  const prompt = `
A user is tracking a budget.

Category: ${categoryName}
Budget: ${currency} ${budgetAmount.toFixed(2)}
Spent: ${currency} ${spentAmount.toFixed(2)}
Used: ${percentUsed}%
Days Remaining: ${daysLeft}

Return ONLY valid JSON:

{
  "severity":"info",
  "title":"Alert title",
  "message":"Alert message",
  "suggestions":[
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3"
  ]
}
`;

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleaned = stripMarkdown(response.text());

    return JSON.parse(cleaned);
  } catch (error) {
    console.error(
      "Gemini API error (budget alert):",
      error
    );

    throw new Error(
      "Failed to generate budget alert."
    );
  }
};

export const generateSavingsTips = async ({
  topCategories,
  monthlyIncome,
  currency = "USD",
}) => {
  const categoryText =
    topCategories.length > 0
      ? topCategories
          .map(
            (c) =>
              `${c.category}: ${currency} ${Number(
                c.amount
              ).toFixed(2)}`
          )
          .join("\n")
      : "No spending data available";

  const prompt = `
Generate personalized savings tips.

Monthly Income:
${currency} ${monthlyIncome.toFixed(2)}

Top Spending Categories:
${categoryText}

Return ONLY valid JSON:

{
  "overallTip":"Overall advice",
  "tips":[
    {
      "category":"Category",
      "title":"Tip title",
      "detail":"Actionable suggestion",
      "estimatedSavings":0
    }
  ]
}
`;

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleaned = stripMarkdown(response.text());

    return JSON.parse(cleaned);
  } catch (error) {
    console.error(
      "Gemini API error (savings tips):",
      error
    );

    throw new Error(
      "Failed to generate savings tips."
    );
  }
};

export const analyzeTransactionList = async ({
  transactions,
  currency = "USD",
}) => {
  const lines = transactions
    .slice(0, 50)
    .map((t) => {
      return `${t.transaction_date} | ${t.type} | ${currency} ${t.amount} | ${t.category_name}`;
    })
    .join("\n");

  const prompt = `
Analyze these transactions.

${lines}

Return ONLY valid JSON:

{
  "insight":"Analysis",
  "highlight":"Key takeaway"
}
`;

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleaned = stripMarkdown(response.text());

    return JSON.parse(cleaned);
  } catch (error) {
    console.error(
      "Gemini API error (transactions):",
      error
    );

    throw new Error(
      "Failed to analyze transactions."
    );
  }
};

export const analyzeBudgetList = async ({
  budgets,
  currency = "USD",
}) => {
  const lines = budgets
    .map((b) => {
      const spent = Number(b.spent);
      const total = Number(b.amount);

      const pct =
        total > 0
          ? ((spent / total) * 100).toFixed(1)
          : "0";

      return `Budget ${b.id} | ${b.category_name} | ${currency} ${total} | ${pct}% used`;
    })
    .join("\n");

  const prompt = `
Analyze these budgets:

${lines}

Return ONLY valid JSON:

{
  "analyses":[
    {
      "budgetId":1,
      "status":"good",
      "message":"Budget feedback"
    }
  ]
}
`;

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleaned = stripMarkdown(response.text());

    return JSON.parse(cleaned);
  } catch (error) {
    console.error(
      "Gemini API error (budgets):",
      error
    );

    throw new Error(
      "Failed to analyze budgets."
    );
  }
};

export default {
  generateMonthlyInsight,
  generateBudgetAlert,
  generateSavingsTips,
  analyzeTransactionList,
  analyzeBudgetList,
};