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
    }),
    { name: '@bs-expenses' },
  ),
);
