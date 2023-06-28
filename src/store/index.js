import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

export const userStore = createStore(
  persist(
    set => ({
      users: [],
      persistUser: users => set(() => ({ users })),
    }),
    { name: '@bs-users' },
  ),
);

export const expenseStore = createStore(
  persist(
    set => ({
      expenses: [],
      persistExpense: expenses => set(() => ({ expenses })),
      getTotal: expenses =>
        expenses.reduce((acc, expense) => acc + expense.price, 0),
      calculateBills: (users, expenses) => {
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
      },
    }),
    { name: '@bs-expenses' },
  ),
);
