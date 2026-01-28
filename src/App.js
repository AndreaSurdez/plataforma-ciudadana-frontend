import { useEffect, useState } from 'react';
import ReportForm from './components/ReportForm';

function App() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Cargar reportes iniciales
    fetch('http://localhost:5000/api/reportes')
      .then(res => res.json())
      .then(data => setReports(data));
  }, []);

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '20px auto',
      padding: '0 16px'
    }}>
      <h1>Plataforma Ciudadana</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Enviar nuevo reporte</h2>
        <ReportForm />
      </div>

      <div>
        <h2>Reportes registrados</h2>
        {reports.length === 0 ? (
          <p>No hay reportes aún.</p>
        ) : (
          reports.map((r) => (
            <div 
              key={r._id} 
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>{r.titulo}</h3>
              <p style={{ margin: '8px 0' }}><strong>Descripción:</strong> {r.descripcion}</p>
              <p style={{ margin: '8px 0' }}><strong>Estado:</strong> <span style={{ fontWeight: 'bold' }}>{r.estado}</span></p>
              <p style={{ margin: '8px 0', fontSize: '0.9em', color: '#666' }}>
                Creado: {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;