// Reducer puro del carrito: sin React ni localStorage, así se prueba fácil.
// El estado es un arreglo de items { id, title, price, image, quantity }.
export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item.id === action.payload.id)
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        )
      }
      return [...state, action.payload]
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload)
    case 'UPDATE_QUANTITY':
      return action.payload.quantity <= 0
        ? state.filter((item) => item.id !== action.payload.id)
        : state.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item,
          )
    case 'CLEAR_CART':
      return []
    default:
      return state
  }
}

export const sumItems = (cart) => cart.reduce((sum, item) => sum + item.quantity, 0)

export const sumPrice = (cart) => cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
