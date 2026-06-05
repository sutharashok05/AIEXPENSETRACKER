export const buildFallbackInsight = ({
  currency = "USD",
  totalIncome = 0,
  totalExpenses = 0,
  savingsRate = 0,
  expenseBreakdown = [],
  previousMonths = [],
}) => {
  const topExpense =
    expenseBreakdown?.length > 0
      ? [...expenseBreakdown].sort(
          (a, b) => Number(b.amount || 0) - Number(a.amount || 0)
        )[0]
      : null;

  const topSpendingCategory = topExpense?.category || "Expenses";
  const estimatedMonthlySavings = Math.max(
    0,
    Number(totalIncome || 0) - Number(totalExpenses || 0)
  );

  return {
    summary:
      "AI insights are temporarily unavailable due to an API configuration problem. Here is a basic, local summary of your finances.",
    highlights: [
      `Savings rate: ${Number(savingsRate || 0).toFixed(1)}%`,
      `Top spending: ${topSpendingCategory}`,
    ],
    concerns: [
      "Connect a valid GEMINI_API_KEY to enable advanced AI-generated insights.",
    ],
    recommendations: [
      {
        title: "Review your biggest category",
        detail: topExpense
          ? `Consider setting a tighter budget for ${topExpense.category} to improve your savings.`
          : "Add transactions and categories to see more targeted recommendations.",
      },
    ],
    topSpendingCategory,
    estimatedMonthlySavings,
    healthScore: Math.max(0, Math.min(100, Number(savingsRate || 0))),
    _fallback: true,
  };
};

export const buildFallbackBudgetAlert = ({
  categoryName,
  budgetAmount,
  spentAmount,
  daysIntoPeriod,
  totalPeriodDays,
  currency = "USD",
}) => {
  const percentUsed =
    budgetAmount > 0
      ? ((spentAmount / budgetAmount) * 100).toFixed(1)
      : "0";
  const daysLeft = Math.max(0, totalPeriodDays - daysIntoPeriod);

  return {
    severity: percentUsed > 90 ? "warning" : "info",
    title: "Budget alert (basic)",
    message: `You used ${percentUsed}% of your ${currency} ${Number(budgetAmount).toFixed(2)} budget for ${categoryName}. ${daysLeft} days left in this period.`,
    suggestions: [
      "If possible, pause or reduce spending in this category.",
      "Re-check upcoming transactions to avoid overspending.",
      "Adjust your budget amount after reviewing recent spend patterns.",
    ],
    _fallback: true,
  };
};

export const buildFallbackSavingsTips = ({
  topCategories = [],
  monthlyIncome = 0,
  currency = "USD",
}) => {
  const top3 = (topCategories || []).slice(0, 3);

  return {
    overallTip:
      "AI tips are temporarily unavailable. Use these practical defaults to improve savings.",
    tips:
      top3.length > 0
        ? top3.map((c) => ({
            category: c.category,
            title: `Optimize ${c.category}`,
            detail: `Set a weekly target for ${c.category} and aim to reduce it gradually.`,
            estimatedSavings: Math.max(
              0,
              Number(monthlyIncome || 0) * 0.02
            ),
            _fallback: true,
          }))
        : [
            {
              category: "General",
              title: "Start with a small target",
              detail:
                "Try allocating a small percentage of each paycheck to savings and review spending weekly.",
              estimatedSavings: Math.max(
                0,
                Number(monthlyIncome || 0) * 0.02
              ),
              _fallback: true,
            },
          ],
  };
};

export const buildFallbackTransactionAnalysis = ({
  transactions = [],
  currency = "USD",
}) => {
  const expenses = transactions.filter((t) => t.type === "expense");
  const totalExpense = expenses.reduce(
    (sum, t) => sum + Number(t.amount || 0),
    0
  );

  const totalsByCategory = expenses.reduce((acc, t) => {
    const key = t.category_name || "Uncategorized";
    acc[key] = (acc[key] || 0) + Number(t.amount || 0);
    return acc;
  }, {});

  const topCategory =
    Object.entries(totalsByCategory).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "Expenses";

  return {
    insight:
      "AI analysis is temporarily unavailable. Based on your recent transactions, here is a basic snapshot.",
    highlight: `Total recent expenses: ${currency} ${totalExpense.toFixed(2)}. Top category: ${topCategory}.`,
    _fallback: true,
  };
};

export const buildFallbackBudgetListAnalysis = ({
  budgets = [],
  currency = "USD",
}) => {
  const analyses = (budgets || []).slice(0, 20).map((b) => {
    const total = Number(b.amount || 0);
    const spent = Number(b.spent || 0);
    const pct = total > 0 ? (spent / total) * 100 : 0;

    return {
      budgetId: b.id,
      status: pct > 90 ? "warning" : "good",
      message:
        pct > 90
          ? `Spending is high (${pct.toFixed(1)}% used) for ${b.category_name}. Consider reducing future spend.`
          : `Budget looks healthy (${pct.toFixed(1)}% used) for ${b.category_name}.`,
      _fallback: true,
    };
  });

  return { analyses };
};

