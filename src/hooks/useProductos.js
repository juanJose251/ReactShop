import { useState, useEffect } from 'react'
import { fetchProducts } from '../services/storeApi'

// hook para productos
export function useProductos() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // fetch products
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        setError('')
        const data = await fetchProducts()
        setProducts(data)
      } catch (err) {
        setError(err.message || 'Error al cargar productos')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return { products, loading, error }
}
