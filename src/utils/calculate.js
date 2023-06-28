export const getTotal = expenses =>
  expenses.reduce((acc, expense) => acc + expense.price, 0);

export const calculateBills = (users, expenses) => {
  users.forEach(user => {
    user.bill = 0;
  });

  expenses.forEach(expense => {
    const numPayers = expense.payers.length;
    const splitAmount = expense.price / numPayers;

    expense.payers.forEach(payerId => {
      const payer = users.find(user => user.id === payerId);
      if (payer) payer.bill += splitAmount;
    });
  });
};
