import ProductCard from './ProductCard'

// grilla de productos
function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="container-card text-center text-gray-300">
        No hay productos disponibles.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
