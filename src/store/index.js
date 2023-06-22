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
  persist(
    set => ({
      expenses: [],
      persistExpense: expenses => set(() => ({ expenses })),
    }),
    { name: '@bs-expenses' },
  ),
);
