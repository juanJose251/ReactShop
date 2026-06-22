import { useState, useCallback } from 'react'

const STORAGE_KEY = 'shop_orders'

// cargar pedidos del localStorage
function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// guardar pedidos en localStorage
function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

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
