import { useReducer, useEffect, useMemo } from 'react'
import { CartContext } from './cartContext'
import { cartReducer, sumItems, sumPrice } from './cartReducer'
import { readJSON, writeJSON } from '../utils/storage'

const STORAGE_KEY = 'shop_cart'

const loadCart = () => readJSON(STORAGE_KEY, [])

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, [], loadCart)

  useEffect(() => {
    writeJSON(STORAGE_KEY, cartItems)
  }, [cartItems])

  const totalItems = useMemo(
    () => sumItems(cartItems),
    [cartItems],
  )

  const totalPrice = useMemo(
    () => sumPrice(cartItems),
    [cartItems],
  )

  function addItem(product, quantity = 1) {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
      },
    })
  }

  function removeItem(productId) {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }

  function updateQuantity(productId, quantity) {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' })
  }

  const value = {
    cartItems,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
