import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../store/useCart'
import { useOrders } from '../hooks/useOrders'
import { formatPrice } from '../utils/format'
import { toast } from 'sonner'
import { CheckCircle, ArrowLeft, CreditCard, User, MapPin } from 'lucide-react'

// formulario de compra y resumen del pedido
function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart()
  const { addOrder } = useOrders()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
  })

  if (cartItems.length === 0) {
    return (
      <section className="fade-in container-card text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">No hay productos para comprar</h1>
          <p className="text-gray-300">Tu carrito está vacío.</p>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-primary hover:bg-blue-hover text-white rounded-lg font-medium transition"
        >
          Ver productos
        </button>
      </section>
    )
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      addOrder({
        items: cartItems,
        totalPrice,
        shipping: { ...form },
      })
      toast.success('¡Compra realizada con éxito!', {
        description: `Pedido por ${formatPrice(totalPrice)}`,
      })
      clearCart()
      navigate('/orders')
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <section className="fade-in space-y-6">
      <button
        onClick={() => navigate('/cart')}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition"
      >
        <ArrowLeft size={18} />
        Volver al carrito
      </button>

      <h1 className="text-3xl font-bold">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-dark-card rounded-xl p-6 shadow space-y-5">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <User size={20} className="text-blue-primary" />
            Datos de envío
          </h2>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-gray-300">
              Nombre completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-dark-navy border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-primary transition"
              placeholder="Juan Pérez"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-gray-300">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-dark-navy border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-primary transition"
              placeholder="juan@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="text-sm text-gray-300">
              Dirección
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-dark-navy border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-primary transition"
              placeholder="Calle Principal #123"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="city" className="text-sm text-gray-300">
              Ciudad
            </label>
            <input
              id="city"
              name="city"
              type="text"
              required
              value={form.city}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-dark-navy border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-primary transition"
              placeholder="San Salvador"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-emerald-primary hover:bg-emerald-hover disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg font-medium transition"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <CreditCard size={20} />
                Confirmar compra
              </>
            )}
          </button>
        </form>

        <div className="bg-dark-card rounded-xl p-6 shadow h-fit space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MapPin size={20} className="text-blue-primary" />
            Resumen del pedido
          </h2>

          <div className="space-y-4 max-h-80 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white rounded-lg p-1 flex items-center justify-center">
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

          <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-300">
            <CheckCircle size={18} className="text-emerald-primary shrink-0 mt-0.5" />
            <p>Tu pedido será procesado al confirmar la compra. Envío gratis en todos los pedidos.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout
