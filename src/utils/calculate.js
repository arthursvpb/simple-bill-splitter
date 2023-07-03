export const getTotal = expenses =>
  expenses.reduce((acc, expense) => acc + expense.price, 0);

export const calculateBills = (users, expenses) => {
  users.forEach(user => {
    user.bill = 0;
  });

  expenses.forEach(expense => {
    const numPayers = expense.payers.length;

    const splitAmount = Math.floor(expense.price.toFixed(2) / numPayers);

    expense.payers.forEach(payerId => {
      const payer = users.find(user => user.id === payerId);
      if (payer) payer.bill += numPayers === 1 ? expense.price : splitAmount;
    });
  });
};

export const removeUserFromExpense = (user, expenses) =>
  expenses.forEach(expense => {
    const payerIndex = expense.payers.findIndex(payer => payer === user);
    if (payerIndex !== -1) expense.payers.splice(payerIndex, 1);
  });
