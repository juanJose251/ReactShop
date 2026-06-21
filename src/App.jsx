import { Toaster } from 'sonner'
import AppRouter from './router'
import { CartProvider } from './store/CartProvider'

function App() {
  return (
    <CartProvider>
      <AppRouter />
      <Toaster position="top-right" richColors />
    </CartProvider>
  )
}

export default App
