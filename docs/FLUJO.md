# Flujo de ReactShop (guía de estudio)

## Idea general

```
Router → página → hook/contexto → (servicio | localStorage)
          │
          ├─ Productos: useProductos → services/storeApi.js → Fake Store API
          ├─ Carrito:   useCart → CartProvider (useReducer + cartReducer) → localStorage "shop_cart"
          └─ Pedidos:   useOrders → localStorage "shop_orders"
```

No hay backend: el catálogo viene de Fake Store API y el carrito/pedidos viven en el navegador.

## Qué hace cada archivo

| Archivo | Para qué sirve |
|---|---|
| `src/main.jsx`, `src/App.jsx` | Arranque; envuelve todo en `CartProvider` y monta el router y el `Toaster`. |
| `src/router/index.jsx` | Rutas: `/`, `/products`, `/products/:id`, `/cart`, `/checkout`, `/orders`. |
| `src/services/storeApi.js` | Funciones `fetch` a Fake Store API (`fetchProducts`, `fetchProduct`, `fetchCategories`). |
| `src/hooks/useProductos.js`, `useProducto.js` | Cargan datos y exponen `loading` / `error`. |
| `src/hooks/useOrders.js` | Historial de pedidos guardado en localStorage. |
| `src/store/cartReducer.js` | Reducer puro: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART + helpers de totales. |
| `src/store/CartProvider.jsx` | Conecta el reducer con React, calcula totales y sincroniza con localStorage. |
| `src/store/useCart.js` | Hook para consumir el contexto (falla si no hay Provider). |
| `src/utils/storage.js` | `readJSON` / `writeJSON` seguros (si el JSON está corrupto o localStorage está bloqueado, no revienta). |
| `src/utils/format.js` | `formatPrice`. |

## Recorrido: agregar al carrito y comprar

1. En `ProductDetail` el usuario elige cantidad y pulsa agregar → `addItem(product, quantity)`.
2. `CartProvider` hace `dispatch({ type: 'ADD_ITEM', payload })`. El reducer suma la cantidad si el producto ya estaba.
3. `useEffect` guarda `cartItems` en localStorage cada vez que cambian → si recargas, el carrito sigue (el estado inicial lo lee `loadCart`).
4. `Cart` muestra los items y el total (`totalPrice` con `useMemo`).
5. `Checkout` valida el formulario, simula un pago (`setTimeout` de 1.5 s), llama `addOrder`, vacía el carrito y navega a `/orders`.

## Conceptos clave para entrevista

- **useReducer vs useState:** las transiciones del carrito dependen del estado anterior y tienen varias formas (agregar, quitar, cambiar cantidad).
- **Reducer puro:** al vivir en su propio archivo, se prueba sin React.
- **Estado derivado:** `totalItems` y `totalPrice` se calculan, no se guardan.
- **Persistencia:** localStorage, con lectura tolerante a errores.
