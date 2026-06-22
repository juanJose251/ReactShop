import { useOrders } from '../hooks/useOrders'
import { formatPrice } from '../utils/format'
import { ClipboardList, Trash2 } from 'lucide-react'

// formatear fecha de pedido
function formatOrderDate(dateString) {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

// historial de pedidos realizados
function Orders() {
  const { orders, clearOrders } = useOrders()

  if (orders.length === 0) {
    return (
      <section className="fade-in container-card text-center space-y-6">
        <ClipboardList size={64} className="mx-auto text-gray-500" />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Sin pedidos</h1>
          <p className="text-gray-300">Aún no has realizado ninguna compra.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="fade-in space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mis Pedidos</h1>
          <p className="text-gray-300 mt-1">{orders.length} pedidos realizados</p>
        </div>
        <button
          onClick={clearOrders}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition"
        >
          <Trash2 size={16} />
          Limpiar historial
        </button>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <article
            key={order.id}
            className="bg-dark-card rounded-xl p-6 shadow space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="text-sm text-gray-400">
                  Pedido #{order.id.slice(-6).toUpperCase()}
                </p>
                <p className="text-sm text-gray-400">{formatOrderDate(order.date)}</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-primary/20 text-emerald-primary w-fit">
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <p>
                <span className="text-gray-500">Cliente:</span> {order.shipping.name}
              </p>
              <p>
                <span className="text-gray-500">Correo:</span> {order.shipping.email}
              </p>
              <p>
                <span className="text-gray-500">Dirección:</span> {order.shipping.address}
              </p>
              <p>
                <span className="text-gray-500">Ciudad:</span> {order.shipping.city}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-400">Productos</h3>
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-dark-navy rounded-lg p-3"
                >
                  <div className="w-14 h-14 bg-white rounded-lg p-1 flex items-center justify-center shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-gray-400">
                      {item.quantity} x {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="font-semibold text-sm">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <span className="text-gray-300">Total del pedido</span>
              <span className="text-xl font-bold text-blue-primary">
                {formatPrice(order.totalPrice)}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Orders
