import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import { calculateBills, getTotal } from '../utils/calculate';

export const expenseStore = createStore(
  persist(
    set => ({
      expenses: [],
      persistExpense: expenses => set(() => ({ expenses })),
      getTotal,
      calculateBills,
    }),
    { name: '@bs-expenses' },
  ),
);
