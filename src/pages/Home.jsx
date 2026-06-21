import { Link } from 'react-router-dom'
import { useProductos } from '../hooks/useProductos'
import ProductGrid from '../components/ProductGrid'
import LoadingSkeleton from '../components/LoadingSkeleton'

// pagina de inicio con productos destacados
function Home() {
  const { products, loading, error } = useProductos()

  const destacados = products.slice(0, 8)

  return (
    <section className="fade-in space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Bienvenido a ShopApp</h1>
        <p className="text-gray-300">Los mejores productos al mejor precio</p>
      </div>

      {loading && <LoadingSkeleton />}

      {error && (
        <div className="container-card text-center text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Productos Destacados</h2>
            <Link
              to="/products"
              className="text-blue-primary hover:underline text-sm"
            >
              Ver todos →
            </Link>
          </div>
          <ProductGrid products={destacados} />
        </section>
      )}
    </section>
  )
}

export default Home
