import { describe, it, expect, vi, afterEach } from 'vitest'
import { formatPrice } from './format'
import { readJSON, writeJSON } from './storage'
import { fetchProducts, fetchProduct } from '../services/storeApi'

describe('formatPrice', () => {
  it('muestra el signo $ y dos decimales', () => {
    expect(formatPrice(5)).toBe('$5.00')
    expect(formatPrice('12.345')).toBe('$12.35')
  })
})

describe('storage', () => {
  it('guarda y lee JSON', () => {
    writeJSON('k', { a: 1 })
    expect(readJSON('k', null)).toEqual({ a: 1 })
  })

  it('devuelve el valor por defecto si no existe o está corrupto', () => {
    expect(readJSON('nada', [])).toEqual([])
    localStorage.setItem('roto', '{')
    expect(readJSON('roto', 'x')).toBe('x')
  })
})

describe('storeApi', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('fetchProducts devuelve el JSON de la API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => [{ id: 1 }] }))
    await expect(fetchProducts()).resolves.toEqual([{ id: 1 }])
    expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products')
  })

  it('lanza un error si la respuesta no es ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    await expect(fetchProduct(3)).rejects.toThrow('Error al obtener el producto')
  })
})
