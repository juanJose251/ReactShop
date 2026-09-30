# ReactShop

Online store front end made with React. It uses the [Fake Store API](https://fakestoreapi.com/) for the products, and the cart and the orders are saved in the browser with localStorage.

I made it to practice React Router, Context + useReducer and consuming a REST API.

**Demo:** _coming soon_

## Features

- Product list with search by name and filter by category
- Product detail page with rating and quantity selector
- Shopping cart: add, remove, change quantity, total price
- The cart is saved in localStorage, so it is still there if you reload the page
- Checkout form (simulated, no real payment)
- Order history page
- Loading skeletons while the products load and toast notifications

## Tech stack

- React 19 + Vite
- React Router
- Tailwind CSS
- Context API + useReducer for the cart
- Fake Store API
- lucide-react (icons) and sonner (toasts)

## Project structure

```
src/
  components/   layout, product card, grid, search and filter bar
  hooks/        useProductos, useProducto, useOrders
  pages/        Home, Products, ProductDetail, Cart, Checkout, Orders
  services/     storeApi.js (fetch calls to the API)
  store/        cart context, provider (reducer) and useCart hook
```

## Run it locally

```bash
npm install
npm run dev
```

## Things I want to add

- Tests for the cart reducer
- Pagination or infinite scroll in the product list
- A real backend for the orders
