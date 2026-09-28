'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Product } from '@/data/products'

export type CartItem = {
  product: Product
  variantId?: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: Product, quantity: number, variantId?: string) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('leboisdirect-cart')
      const parsed: unknown = saved ? JSON.parse(saved) : []
      if (Array.isArray(parsed)) setItems(parsed.filter(item =>
        item?.product && typeof item.product.id === 'string' &&
        Number.isFinite(item.quantity) && item.quantity > 0 &&
        Number.isFinite(item.product.price)
      ))
    } catch { /* A blocked or corrupt store should not prevent shopping. */ }
    setHydrated(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem('leboisdirect-cart', JSON.stringify(items)) } catch { /* Keep the active cart in memory. */ }
  }, [items, hydrated])

  const addItem = (product: Product, quantity: number, variantId?: string) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.variantId === variantId
      )

      if (existingIndex > -1) {
        const newItems = [...prevItems]
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity,
        }
        return newItems
      }

      return [...prevItems, { product, variantId, quantity }]
    })
  }

  const removeItem = (productId: string, variantId?: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product.id === productId && item.variantId === variantId)
      )
    )
  }

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeItem(productId, variantId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const totalPrice = items.reduce((sum, item) => {
    const variant = item.product.variants?.find((v) => v.id === item.variantId)
    const price = variant?.price || item.product.price
    return sum + price * item.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
