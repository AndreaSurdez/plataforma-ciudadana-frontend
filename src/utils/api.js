// src/utils/api.js

// Determina la URL base según el entorno
const API_BASE = process.env.NODE_ENV === 'production'
  ? 'https://plataforma-ciudadana-backend.onrender.com'
  : 'http://localhost:5000';

/**
 * Envía un nuevo reporte a la API
 * @param {Object} reportData - Datos del reporte
 * @returns {Promise<Object>} - Reporte guardado
 */
export const submitReport = async (reportData) => {
  try {
    const response = await fetch(`${API_BASE}/api/reportes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al enviar el reporte:', error);
    throw error;
  }
};

/**
 * Inicializa la conexión WebSocket para recibir actualizaciones en tiempo real
 * @param {Function} onUpdate - Callback que se ejecuta al recibir una actualización
 * @returns {WebSocket} - Instancia del socket
 */
export const initWebSocket = (onUpdate) => {
  // Convierte http -> ws para la URL de WebSocket
  const wsUrl = API_BASE.replace(/^http/, 'ws');
  const socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    console.log('Conexión WebSocket establecida');
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onUpdate(data);
    } catch (error) {
      console.error('Error al procesar mensaje WebSocket:', error);
    }
  };

  socket.onerror = (error) => {
    console.error('Error en WebSocket:', error);
  };

  socket.onclose = () => {
    console.log('🔌 Conexión WebSocket cerrada');
  };

  return socket;
};