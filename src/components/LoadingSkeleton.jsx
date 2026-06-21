// skeleton de carga
function LoadingSkeleton() {
  const items = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((i) => (
        <div key={i} className="bg-dark-card rounded-xl overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-700" />
          <div className="p-4 space-y-3">
            <div className="h-4 w-20 bg-gray-700 rounded" />
            <div className="h-4 w-full bg-gray-700 rounded" />
            <div className="h-4 w-3/4 bg-gray-700 rounded" />
            <div className="h-6 w-24 bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
