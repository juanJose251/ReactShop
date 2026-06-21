import { useParams, useNavigate } from 'react-router-dom'
import { useProducto } from '../hooks/useProducto'
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react'

// vista detallada de un producto
function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product, loading, error } = useProducto(id)

  if (loading) {
    return (
      <section className="fade-in flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-blue-primary border-t-transparent rounded-full animate-spin" />
      </section>
    )
  }

  if (error) {
    return (
      <section className="fade-in container-card text-center text-red-300">
        {error}
      </section>
    )
  }

  if (!product) {
    return (
      <section className="fade-in container-card text-center text-gray-300">
        Producto no encontrado.
      </section>
    )
  }

  const rating = Math.round(product.rating?.rate || 0)
  const reviews = product.rating?.count || 0

  return (
    <section className="fade-in space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition"
      >
        <ArrowLeft size={18} />
        Volver
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-dark-card rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="bg-white rounded-xl p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 object-contain"
          />
        </div>

        <div className="space-y-5">
          <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-primary/20 text-blue-300 uppercase tracking-wide capitalize">
            {product.category}
          </span>

          <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  fill={index < rating ? 'currentColor' : 'none'}
                  className={index < rating ? '' : 'text-gray-500'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">({reviews} reseñas)</span>
          </div>

          <p className="text-3xl font-bold text-blue-primary">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-300 leading-relaxed">{product.description}</p>

          <button
            onClick={() => {
              // Lógica del carrito en Fase 4
              console.log('Añadir al carrito:', product.id)
            }}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-primary hover:bg-emerald-hover text-white rounded-lg font-medium transition"
          >
            <ShoppingCart size={20} />
            Añadir al carrito
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
