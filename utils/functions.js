const totalValues = (trxs) => {

  // Initialize variables to store the totals
  let totalAmountExpenses = 0;
  let totalAmountIncome = 0;
  const totalAmountByCategory = {};
  const incomeByDateRange = {
    "1-7": 0,
    "8-14": 0,
    "15-21": 0,
    "22-eom": 0,
  };
  const expensesByDateRange = {
    "1-7": 0,
    "8-14": 0,
    "15-21": 0,
    "22-eom": 0,
  };

  // Loop through the data and calculate totals
  for (const trx of trxs) {
    if (trx.type === "expense") {
      totalAmountExpenses += trx.amount;

      // Calculate expenses by date range
      const trxDate = new Date(trx.date);
      const currentDate = new Date(); // You can replace this with a specific date if needed

      // Calculate the number of days from the beginning of the month
      const daysFromStartOfMonth = trxDate.getDate();

      if (daysFromStartOfMonth >= 1 && daysFromStartOfMonth <= 7) {
        expensesByDateRange["1-7"] += trx.amount;
      } else if (daysFromStartOfMonth >= 8 && daysFromStartOfMonth <= 14) {
        expensesByDateRange["8-14"] += trx.amount;
      } else if (daysFromStartOfMonth >= 15 && daysFromStartOfMonth <= 21) {
        expensesByDateRange["15-21"] += trx.amount;
      } else if (daysFromStartOfMonth >= 22
        // && currentDate.getDate() === 1
      ) {
        // End of month (EOM)
        expensesByDateRange["22-eom"] += trx.amount;
      }
    } else if (trx.type === "income") {
      totalAmountIncome += trx.amount;

      // Calculate income by date range
      const trxDate = new Date(trx.date);
      const currentDate = new Date(); // You can replace this with a specific date if needed

      // Calculate the number of days from the beginning of the month
      const daysFromStartOfMonth = trxDate.getDate();

      if (daysFromStartOfMonth >= 1 && daysFromStartOfMonth <= 7) {
        incomeByDateRange["1-7"] += trx.amount;
      } else if (daysFromStartOfMonth >= 8 && daysFromStartOfMonth <= 14) {
        incomeByDateRange["8-14"] += trx.amount;
      } else if (daysFromStartOfMonth >= 15 && daysFromStartOfMonth <= 21) {
        incomeByDateRange["15-21"] += trx.amount;
      } else if (daysFromStartOfMonth >= 22 && currentDate.getDate() === 1) {
        // End of month (EOM)
        incomeByDateRange["22-eom"] += trx.amount;
      }
    }

    // Calculate totals by category
    if (trx.category in totalAmountByCategory) {
      totalAmountByCategory[trx.category] += trx.amount;
    } else {
      totalAmountByCategory[trx.category] = trx.amount;
    }
  }

  const totalBalance = totalAmountIncome - totalAmountExpenses;
  const expenseRatio = totalAmountIncome === 0 ? 0 : ((totalAmountExpenses / totalAmountIncome) * 100).toFixed();
  // Create the summarized object
  const summarizedObject = {
    totalAmountExpenses,
    totalAmountIncome,
    totalBalance,
    expenseRatio,
    totalAmountByCategory,
    incomeByDateRange,
    expensesByDateRange,
  };

  return summarizedObject;
}


export default totalValues;
