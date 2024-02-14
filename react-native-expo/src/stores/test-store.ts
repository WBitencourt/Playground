import { create } from 'zustand';

type TestStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export const useTestStore = create<TestStore>((set, get) => {
  console.log('useTestStore-get', get());

  return {
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  };
});
