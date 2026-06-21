import { Link } from 'react-router-dom'
import { useCart } from '../store/useCart'
import { formatPrice } from '../utils/format'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'

// listado de productos en el carrito
function Cart() {
  const { cartItems, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart()

  if (cartItems.length === 0) {
    return (
      <section className="fade-in container-card text-center space-y-6">
        <ShoppingBag size={64} className="mx-auto text-gray-500" />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
          <p className="text-gray-300">Explora nuestros productos y añade algo que te guste.</p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-primary hover:bg-blue-hover text-white rounded-lg font-medium transition"
        >
          Ver productos
        </Link>
      </section>
    )
  }

  return (
    <section className="fade-in space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Carrito</h1>
          <p className="text-gray-300 mt-1">{totalItems} productos en tu carrito</p>
        </div>
        <button
          onClick={clearCart}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition"
        >
          <Trash2 size={16} />
          Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 bg-dark-card rounded-xl p-4 shadow"
            >
              <div className="w-full sm:w-24 h-24 bg-white rounded-lg p-2 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex-1 space-y-2">
                <Link
                  to={`/products/${item.id}`}
                  className="font-semibold hover:text-blue-primary transition line-clamp-2"
                >
                  {item.title}
                </Link>
                <p className="text-blue-primary font-bold">{formatPrice(item.price)}</p>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 bg-dark-navy rounded-lg px-2 py-1 border border-white/20">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-white/10 rounded transition"
                      aria-label="Disminuir cantidad"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-white/10 rounded transition"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 size={14} />
                    Eliminar
                  </button>
                </div>
              </div>

              <div className="sm:text-right min-w-[80px]">
                <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-dark-card rounded-xl p-6 shadow h-fit space-y-6">
          <h2 className="text-xl font-bold">Resumen</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-emerald-primary hover:bg-emerald-hover text-white rounded-lg font-medium transition"
          >
            Proceder al checkout
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/products"
            className="block text-center text-sm text-blue-primary hover:underline"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Cart
