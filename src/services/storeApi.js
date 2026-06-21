// Api url
const API_URL = 'https://fakestoreapi.com'

// products request 
export async function fetchProducts() {
  const response = await fetch(`${API_URL}/products`)

  if (!response.ok) {
    throw new Error('Error al obtener los productos')
  }

  return response.json()
}
// product resquest id
export async function fetchProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`)

  if (!response.ok) {
    throw new Error('Error al obtener el producto')
  }

  return response.json()
}
// category request 
export async function fetchCategories() {
  const response = await fetch(`${API_URL}/products/categories`)

  if (!response.ok) {
    throw new Error('Error al obtener las categorías')
  }
// convert responde to json
  return response.json()
}