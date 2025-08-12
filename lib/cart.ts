import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  productId: string
  variantId: string
  name: string
  price: number
  qty: number
  image: string
  slug: string
  size?: string
  color?: string
  sku?: string
}

interface CartStore {
  items: CartItem[]
  add: (item: CartItem) => void
  remove: (productId: string, variantId: string) => void
  updateQty: (productId: string, variantId: string, qty: number) => void
  clear: () => void
  getItemCount: () => number
  getTotal: () => number
  isInCart: (productId: string, variantId: string) => boolean
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      add: (item: CartItem) => {
        const { items } = get()
        const existingItemIndex = items.findIndex(
          (existing) => existing.productId === item.productId && existing.variantId === item.variantId
        )

        if (existingItemIndex > -1) {
          // Update quantity if item already exists
          const updatedItems = [...items]
          updatedItems[existingItemIndex].qty += item.qty
          set({ items: updatedItems })
        } else {
          // Add new item
          set({ items: [...items, item] })
        }
      },

      remove: (productId: string, variantId: string) => {
        const { items } = get()
        const filteredItems = items.filter(
          (item) => !(item.productId === productId && item.variantId === variantId)
        )
        set({ items: filteredItems })
      },

      updateQty: (productId: string, variantId: string, qty: number) => {
        if (qty <= 0) {
          get().remove(productId, variantId)
          return
        }

        const { items } = get()
        const updatedItems = items.map((item) =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, qty }
            : item
        )
        set({ items: updatedItems })
      },

      clear: () => {
        set({ items: [] })
      },

      getItemCount: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.qty, 0)
      },

      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.price * item.qty), 0)
      },

      isInCart: (productId: string, variantId: string) => {
        const { items } = get()
        return items.some(
          (item) => item.productId === productId && item.variantId === variantId
        )
      },
    }),
    {
      name: 'habyah-cart',
      version: 1,
    }
  )
)

