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
