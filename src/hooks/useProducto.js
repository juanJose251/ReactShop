import { useState, useEffect } from 'react'
import { fetchProduct } from '../services/storeApi'

// hook para obtener un producto por id
export function useProducto(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        setError('')
        const data = await fetchProduct(id)
        setProduct(data)
      } catch (err) {
        setError(err.message || 'Error al cargar el producto')
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadProduct()
    }
  }, [id])

  return { product, loading, error }
}
