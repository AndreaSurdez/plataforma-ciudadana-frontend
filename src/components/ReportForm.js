import { useState } from 'react';
import { submitReport } from '../utils/api';

export default function ReportForm() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReport({
        titulo,
        descripcion,
        ubicacion: { lat: -33.45, lng: -70.66 }
      });
      alert('¡Reporte enviado!');
      setTitulo('');
      setDescripcion('');
    } catch (err) {
      alert('Error al enviar. Se guardará para reintentar.');
      const queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
      queue.push({ titulo, descripcion });
      localStorage.setItem('offlineQueue', JSON.stringify(queue));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '500px'
    }}>
      <div>
        <label htmlFor="titulo" style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Título</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ej: Bache en la esquina"
          required
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <div>
        <label htmlFor="descripcion" style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Descripción</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe el problema..."
          required
          rows="4"
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            resize: 'vertical'
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: '12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
      >
        Enviar reporte
      </button>
    </form>
  );
}