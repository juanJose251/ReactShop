// url de la api
const API_URL = 'https://fakestoreapi.com'

// pedir todos los productos
export async function fetchProducts() {
  const response = await fetch(`${API_URL}/products`)

  if (!response.ok) {
    throw new Error('Error al obtener los productos')
  }

  return response.json()
}
// pedir un producto por id
export async function fetchProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`)

  if (!response.ok) {
    throw new Error('Error al obtener el producto')
  }

  return response.json()
}
// pedir las categorias
export async function fetchCategories() {
  const response = await fetch(`${API_URL}/products/categories`)

  if (!response.ok) {
    throw new Error('Error al obtener las categorías')
  }
  return response.json()
}