import { useState, useMemo } from 'react'
import { useProductos } from '../hooks/useProductos'
import ProductGrid from '../components/ProductGrid'
import LoadingSkeleton from '../components/LoadingSkeleton'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'

// página de catálogo completo con búsqueda y filtros
function Products() {
  const { products, loading, error } = useProductos()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sortOrder, setSortOrder] = useState('default')

  // categorías únicas extraídas de los productos
  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))]
  }, [products])

  // filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (search.trim()) {
      const term = search.toLowerCase()
      result = result.filter((product) =>
        product.title.toLowerCase().includes(term),
      )
    }

    if (category) {
      result = result.filter((product) => product.category === category)
    }

    switch (sortOrder) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return result
  }, [products, search, category, sortOrder])

  const hasActiveFilters = search || category || sortOrder !== 'default'

  return (
    <section className="fade-in space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Catálogo de Productos</h1>
        <p className="text-gray-300">Encuentra lo que buscas</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <SearchBar onSearch={setSearch} />
        <FilterBar
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      </div>

      <div className="flex items-center justify-between text-sm text-gray-300">
        <span>
          {loading
            ? 'Cargando productos...'
            : `${filteredProducts.length} productos encontrados`}
        </span>
        {hasActiveFilters && (
          <button
            onClick={() => {
              setSearch('')
              setCategory('')
              setSortOrder('default')
            }}
            className="text-blue-primary hover:underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {loading && <LoadingSkeleton />}
      {error && (
        <div className="container-card text-center text-red-300">{error}</div>
      )}

      {!loading && !error && (
        <ProductGrid
          products={filteredProducts}
          emptyMessage={
            hasActiveFilters
              ? 'No se encontraron productos con esos filtros.'
              : 'No hay productos disponibles.'
          }
        />
      )}
    </section>
  )
}

export default Products
