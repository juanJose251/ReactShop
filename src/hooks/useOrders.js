import { useState, useCallback } from 'react'
import { readJSON, writeJSON } from '../utils/storage'

const STORAGE_KEY = 'shop_orders'

const loadOrders = () => readJSON(STORAGE_KEY, [])
const saveOrders = (orders) => writeJSON(STORAGE_KEY, orders)

// hook para manejar historial de pedidos
export function useOrders() {
  const [orders, setOrders] = useState(loadOrders)

  // agregar nuevo pedido
  const addOrder = useCallback((order) => {
    const newOrder = {
      ...order,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      date: new Date().toISOString(),
      status: 'Completado',
    }
    setOrders((prev) => {
      const updated = [newOrder, ...prev]
      saveOrders(updated)
      return updated
    })
  }, [])

  // limpiar historial
  const clearOrders = useCallback(() => {
    setOrders([])
    saveOrders([])
  }, [])

  return { orders, addOrder, clearOrders }
}
