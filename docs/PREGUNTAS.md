# Preguntas de entrevista — ReactShop

Respuestas cortas de borrador: reescríbelas con tus palabras después de estudiar `docs/FLUJO.md`.

1. **¿Qué es y para qué lo hiciste?**
   Tienda en línea (front end) para practicar React Router, Context + useReducer y consumir una API REST. Los productos vienen de Fake Store API; carrito y pedidos se guardan en el navegador.

2. **¿Por qué `useReducer` para el carrito?**
   Las acciones (agregar, quitar, cambiar cantidad, vaciar) dependen del estado anterior. Un reducer las centraliza y es predecible.

3. **¿Por qué separaste el reducer en su propio archivo?**
   Es una función pura: sin React ni localStorage. Así se prueba con llamadas simples (8 tests) y el Provider queda solo con la parte de React.

4. **¿Cómo persiste el carrito al recargar?**
   Un `useEffect` guarda en localStorage cuando cambia; el estado inicial del reducer se lee con una función (`useReducer(reducer, [], loadCart)`). La lectura está protegida contra JSON corrupto.

5. **¿Qué es estado derivado?**
   `totalItems` y `totalPrice` se calculan a partir de `cartItems` con `useMemo`; guardarlos aparte podría dejarlos desincronizados.

6. **¿Cómo manejas la carga y los errores de la API?**
   Los hooks exponen `loading` y `error`; la UI muestra skeletons y mensajes. El servicio lanza un `Error` si `response.ok` es falso.

7. **¿Cómo probaste la app?**
   Vitest + Testing Library: 20 tests (reducer, Provider con persistencia y carrito corrupto, utilidades, servicio con `fetch` simulado). ESLint y los tests corren en GitHub Actions.

8. **¿Qué mejorarías?**
   Paginación, un backend real para pedidos, validación del formulario de checkout y pruebas de las páginas completas con Playwright.
