import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type CartItem = {
  id: number
  type: "course" | "plan"
  title: string
  price: number
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateItem: (id: number, updates: Partial<CartItem>) => void
  clearCart: () => void
  getTotalQuantity: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            // If item already exists, increase quantity
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          const existingPlan = state.items.find((i) => i.type === "plan")
          if (item.type === "plan" && existingPlan) {
            // Replace existing plan
            return { items: [...state.items.filter((i) => i.type !== "plan"), { ...item, quantity: 1 }] }
          }
          // Add new item with quantity 1
          return { items: [...state.items, { ...item, quantity: 1 }] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, ...updates } : item)),
        })),
      clearCart: () => set({ items: [] }),
      getTotalQuantity: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: "cart-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
