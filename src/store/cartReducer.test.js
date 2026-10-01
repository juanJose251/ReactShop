import { describe, it, expect } from 'vitest'
import { cartReducer, sumItems, sumPrice } from './cartReducer'

const shirt = { id: 1, title: 'Camisa', price: 10, image: 'a.png', quantity: 1 }
const hat = { id: 2, title: 'Gorra', price: 4.5, image: 'b.png', quantity: 2 }

describe('cartReducer', () => {
  it('ADD_ITEM agrega un producto nuevo', () => {
    expect(cartReducer([], { type: 'ADD_ITEM', payload: shirt })).toEqual([shirt])
  })

  it('ADD_ITEM suma la cantidad si el producto ya está', () => {
    const state = cartReducer([shirt], { type: 'ADD_ITEM', payload: { ...shirt, quantity: 3 } })
    expect(state).toHaveLength(1)
    expect(state[0].quantity).toBe(4)
  })

  it('REMOVE_ITEM quita solo ese producto', () => {
    expect(cartReducer([shirt, hat], { type: 'REMOVE_ITEM', payload: 1 })).toEqual([hat])
  })

  it('UPDATE_QUANTITY cambia la cantidad', () => {
    const state = cartReducer([shirt, hat], { type: 'UPDATE_QUANTITY', payload: { id: 2, quantity: 5 } })
    expect(state.find((i) => i.id === 2).quantity).toBe(5)
    expect(state.find((i) => i.id === 1).quantity).toBe(1)
  })

  it('UPDATE_QUANTITY a 0 (o menos) elimina el producto', () => {
    expect(cartReducer([shirt], { type: 'UPDATE_QUANTITY', payload: { id: 1, quantity: 0 } })).toEqual([])
  })

  it('CLEAR_CART vacía el carrito', () => {
    expect(cartReducer([shirt, hat], { type: 'CLEAR_CART' })).toEqual([])
  })

  it('una acción desconocida deja el estado igual', () => {
    const state = [shirt]
    expect(cartReducer(state, { type: 'OTRA' })).toBe(state)
  })

  it('no muta el estado anterior', () => {
    const state = Object.freeze([Object.freeze({ ...shirt })])
    expect(() => cartReducer(state, { type: 'ADD_ITEM', payload: shirt })).not.toThrow()
  })
})

describe('totales', () => {
  it('sumItems suma cantidades y sumPrice suma precio x cantidad', () => {
    expect(sumItems([shirt, hat])).toBe(3)
    expect(sumPrice([shirt, hat])).toBeCloseTo(19)
  })

  it('un carrito vacío da 0', () => {
    expect(sumItems([])).toBe(0)
    expect(sumPrice([])).toBe(0)
  })
})
