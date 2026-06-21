function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-1">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2.5 rounded-lg bg-dark-card border border-white/20 text-white focus:outline-none focus:border-blue-primary transition capitalize"
      >
        <option value="">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category} value={category} className="capitalize">
            {category}
          </option>
        ))}
      </select>

      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2.5 rounded-lg bg-dark-card border border-white/20 text-white focus:outline-none focus:border-blue-primary transition"
      >
        <option value="default">Ordenar por...</option>
        <option value="price-asc">Precio: menor a mayor</option>
        <option value="price-desc">Precio: mayor a menor</option>
        <option value="name-asc">Nombre: A-Z</option>
      </select>
    </div>
  )
}

export default FilterBar
