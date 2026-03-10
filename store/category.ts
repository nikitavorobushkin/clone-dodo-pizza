import { create } from 'zustand';

interface CategoryState {
  activeId: number | null;
  setActiveId: (id: number) => void;
}

export const useCategoryStore = create<CategoryState>(
  (set, get) => ({
    activeId: null,
    setActiveId: (id) => {
      if (get().activeId !== id) {
        set({ activeId: id });
      }
    },
  }),
);
