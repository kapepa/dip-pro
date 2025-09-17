import { create } from 'zustand'

type ActiveType = string

interface CategoriesStore {
  activeId: ActiveType,
  setActiveId: (activeId: ActiveType) => void,
}

const useCategoriesStore = create<CategoriesStore>((set) => ({
  activeId: "",
  setActiveId: (activeId) => set({ activeId })
}))

export { useCategoriesStore }