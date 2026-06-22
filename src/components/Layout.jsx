import { NavLink, Link, Outlet } from 'react-router-dom'
import { ShoppingCart, Home, Package, CreditCard, History } from 'lucide-react'
import { useCart } from '../store/useCart'

const navItems = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/products', label: 'Productos', icon: Package },
  { to: '/cart', label: 'Carrito', icon: ShoppingCart },
  { to: '/checkout', label: 'Checkout', icon: CreditCard },
  { to: '/orders', label: 'Órdenes', icon: History },
]

function Layout() {
  const { totalItems } = useCart()

  return (
    <div className="min-h-screen flex flex-col bg-dark-navy text-white font-sans">
      <header className="bg-dark-card shadow-md sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link to="/" className="text-xl font-bold text-white hover:text-blue-primary transition">
            ShopApp
          </Link>

          <ul className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isCart = item.to === '/cart'
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'bg-blue-primary text-white'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    <Icon size={16} />
                    {item.label}
                    {isCart && totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold bg-emerald-primary text-white rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      <footer className="bg-dark-card py-4 text-center text-gray-400 text-sm">
        ShopApp — React + Vite + Tailwind CSS
      </footer>
    </div>
  )
}

export default Layout
