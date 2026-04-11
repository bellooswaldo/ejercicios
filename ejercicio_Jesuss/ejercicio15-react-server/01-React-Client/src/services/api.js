/**
 * 🌉 APIS DE SERVICIO (EL PUENTE)
 * Centralizamos todas las peticiones aquí para que el código de React sea más ordenado.
 */

const BASE_URL = 'http://localhost:3001/api';

export const apiService = {
  // Misión 1: Ver si el servidor está vivo (GET)
  getStatus: async () => {
    const response = await fetch(`${BASE_URL}/status`);
    if (!response.ok) throw new Error('Servidor Fuera de Línea');
    return await response.json();
  },

  // Misión 2: Pedir la lista de tesoros/items (GET)
  getItems: async () => {
    const response = await fetch(`${BASE_URL}/items`);
    if (!response.ok) throw new Error('Error al recuperar tesoros');
    return await response.json();
  },

  // Misión 3: Enviar un mensaje (POST) - Puente de ida y vuelta
  sendMessage: async (message) => {
    const response = await fetch(`${BASE_URL}/echo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sender: 'Alumno React' })
    });
    if (!response.ok) throw new Error('El mensaje se perdió en el puente');
    return await response.json();
  }
};
