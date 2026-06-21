import { Link } from 'react-router-dom'

// card de producto
function ProductCard({ product }) {
  const { id, title, image, price, category } = product

  return (
    <Link
      to={`/products/${id}`}
      className="bg-dark-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="h-48 p-4 flex items-center justify-center bg-white">
        <img src={image} alt={title} className="h-full object-contain" />
      </div>

      <div className="p-4 space-y-2">
        <span className="inline-block px-2 py-1 text-xs rounded bg-blue-primary/20 text-blue-300 uppercase">
          {category}
        </span>

        <h3 className="font-semibold text-sm line-clamp-2">
          {title}
        </h3>

        <p className="text-xl font-bold text-blue-primary">
          ${price.toFixed(2)}
        </p>
      </div>
    </Link>
  )
}

export default ProductCard
