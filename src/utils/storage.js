// Lectura/escritura segura de JSON en localStorage.
// Si el almacenamiento está bloqueado o el contenido está corrupto, devuelve el valor por defecto.
export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // sin almacenamiento disponible: la app sigue funcionando sin persistir
  }
}
