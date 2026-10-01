# ReactShop

Online store front end made with React. It uses the [Fake Store API](https://fakestoreapi.com/) for the products, and the cart and the orders are saved in the browser with localStorage.

I made it to practice React Router, Context + useReducer and consuming a REST API.

**Demo:** https://instashopreact.netlify.app

## Features

- Product list with search by name and filter by category
- Product detail page with rating and quantity selector
- Shopping cart: add, remove, change quantity, total price
- The cart is saved in localStorage, so it is still there if you reload the page
- Checkout form (simulated, no real payment)
- Order history page
- Loading skeletons while the products load and toast notifications

## Quality

- **Tests:** 20 (Vitest + Testing Library): cart reducer, `CartProvider` (totals, persistence, corrupt storage), storage helper, price format and the API service with a mocked `fetch`. Run with `npm test`.
- **CI:** GitHub Actions runs ESLint, the tests and the build on every push.
- **Lighthouse** (mobile, measured on the deployed demo on 2026-10-01 with Lighthouse 13.5): Performance **88**, Accessibility **95**, Best Practices **100**, SEO **83**. The SEO gap came from a missing meta description and `robots.txt`; both were added afterwards, so re-run the audit after the next deploy and update these numbers. Known issue: some text/background colour pairs have low contrast.

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
  store/        cart context, pure reducer (cartReducer.js), provider and useCart hook
  utils/        price format and safe localStorage helpers
docs/           FLUJO.md (how it works) and PREGUNTAS.md (interview Q&A)
```

## Run it locally

```bash
npm install
npm run dev
```

## Things I want to add

- Pagination or infinite scroll in the product list
- A real backend for the orders

## Decisions and problems

<!-- Draft written by Claude Code. Rewrite in your own words after studying docs/FLUJO.md. -->

- **Reducer in its own file:** a pure function with no React or localStorage, so it can be tested with plain calls.
- **Safe storage helpers:** reading `localStorage` can throw (blocked storage) or return corrupt JSON; `readJSON`/`writeJSON` fall back instead of crashing the app.
- **Derived totals:** `totalItems` and `totalPrice` are computed from the cart, never stored.
