import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

// barra de búsqueda con debounce
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 400)

    return () => clearTimeout(timer)
  }, [query, onSearch])

  return (
    <div className="relative flex-1 min-w-[200px]">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-dark-card border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-primary transition"
      />
    </div>
  )
}

export default SearchBar
