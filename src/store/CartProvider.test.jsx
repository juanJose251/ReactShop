import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider } from './CartProvider'
import { useCart } from './useCart'

const product = { id: 7, title: 'Mochila', price: 25, image: 'm.png' }

function Probe() {
  const { cartItems, totalItems, totalPrice, addItem, removeItem, clearCart } = useCart()
  return (
    <div>
      <p data-testid="items">{totalItems}</p>
      <p data-testid="price">{totalPrice}</p>
      <p data-testid="lines">{cartItems.length}</p>
      <button onClick={() => addItem(product, 2)}>add</button>
      <button onClick={() => removeItem(7)}>remove</button>
      <button onClick={clearCart}>clear</button>
    </div>
  )
}

const renderCart = () =>
  render(
    <CartProvider>
      <Probe />
    </CartProvider>,
  )

describe('CartProvider', () => {
  it('calcula totalItems y totalPrice al agregar', () => {
    renderCart()
    fireEvent.click(screen.getByText('add'))
    expect(screen.getByTestId('items')).toHaveTextContent('2')
    expect(screen.getByTestId('price')).toHaveTextContent('50')
  })

  it('guarda el carrito en localStorage', () => {
    renderCart()
    fireEvent.click(screen.getByText('add'))
    expect(JSON.parse(localStorage.getItem('shop_cart'))).toEqual([{ ...product, quantity: 2 }])
  })

  it('recupera el carrito guardado al montar (persiste al recargar)', () => {
    localStorage.setItem('shop_cart', JSON.stringify([{ ...product, quantity: 3 }]))
    renderCart()
    expect(screen.getByTestId('items')).toHaveTextContent('3')
  })

  it('ignora un carrito corrupto en localStorage', () => {
    localStorage.setItem('shop_cart', '{no es json')
    renderCart()
    expect(screen.getByTestId('lines')).toHaveTextContent('0')
  })

  it('remove y clear dejan el carrito vacío', () => {
    renderCart()
    fireEvent.click(screen.getByText('add'))
    fireEvent.click(screen.getByText('remove'))
    expect(screen.getByTestId('lines')).toHaveTextContent('0')
    fireEvent.click(screen.getByText('add'))
    fireEvent.click(screen.getByText('clear'))
    expect(screen.getByTestId('items')).toHaveTextContent('0')
  })
})
