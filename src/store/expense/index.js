import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import {
  calculateBills,
  getTotal,
  removeUserFromExpense,
} from '../../utils/calculate';

export const expenseStore = createStore(
  persist(
    set => ({
      expenses: [],
      persistExpense: expenses => set(() => ({ expenses })),
      getTotal,
      calculateBills,
      removeUserFromExpense,
    }),
    { name: '@bs-expenses' },
  ),
);
