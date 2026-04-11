import React, { useState } from 'react';
import { apiService } from './services/api';

function App() {
  const [data, setData] = useState(null);
  const [activeMission, setActiveMission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 🌉 EJECUTOR DE MISIONES (EL EXPERIMENTO DEL PUENTE)
   * Centralizamos la lógica de ejecución para no repetir código.
   */
  const executeMission = async (missionName, missionFn) => {
    setLoading(true);
    setError(null);
    setData(null);
    setActiveMission(missionName);
    
    try {
      const result = await missionFn();
      setData(result);
    } catch (err) {
      setError(`⚠️ EL PUENTE FALLÓ: ${err.message}. (¿Tienes el servidor de Node encendido?)`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🌉 Centro de Control: El Experimento del Puente</h1>
        <p>Enviamos "Drones de Petición" (Requests) al Servidor de Node.</p>
      </header>
      
      <div style={styles.dashboard}>
        {/* MISIÓN 1: EL PULSO */}
        <div style={styles.card}>
          <h3>📍 Misión 1: El Pulso</h3>
          <p>Ver si el servidor está escuchando (GET /status).</p>
          <button 
            onClick={() => executeMission('PULSO (GET)', apiService.getStatus)}
            disabled={loading}
            style={{ ...styles.button, background: '#3b82f6' }}
          >
            {loading && activeMission.includes('PULSO') ? "Conectando..." : "🚀 Enviar Pulso"}
          </button>
        </div>

        {/* MISIÓN 2: LOS TESOROS */}
        <div style={styles.card}>
          <h3>📦 Misión 2: Los Tesoros</h3>
          <p>Pedir datos estructurados (GET /items).</p>
          <button 
            onClick={() => executeMission('TESOROS (GET)', apiService.getItems)}
            disabled={loading}
            style={{ ...styles.button, background: '#10b981' }}
          >
            {loading && activeMission.includes('TESOROS') ? "Cargando..." : "💎 Pedir Tesoros"}
          </button>
        </div>

        {/* MISIÓN 3: EL ECO */}
        <div style={styles.card}>
          <h3>📣 Misión 3: El Eco</h3>
          <p>Enviamos un mensaje para que regrese (POST /echo).</p>
          <button 
            onClick={() => executeMission('ECO (POST)', () => apiService.sendMessage('¡Hola desde el Frontend!'))}
            disabled={loading}
            style={{ ...styles.button, background: '#f59e0b' }}
          >
            {loading && activeMission.includes('ECO') ? "Gritando..." : "🏹 Enviar Mensaje"}
          </button>
        </div>
      </div>

      <div style={styles.monitor}>
        <div style={styles.monitorHeader}>
          <strong>🛰️ MONITOR DE RESPUESTA: {activeMission || "Esperando Misión..."}</strong>
        </div>
        
        <div style={styles.monitorBody}>
          {loading && <p style={{ color: '#aaa', fontStyle: 'italic' }}>Estableciendo conexión por el puerto 3001...</p>}
          {error && <p style={{ color: '#ef4444', fontWeight: 'bold' }}>{error}</p>}
          
          {data ? (
            <pre style={styles.json}>
              {JSON.stringify(data, null, 2)}
            </pre>
          ) : !loading && !error && (
            <p style={{ color: '#888' }}>Haz clic en una misión para intentar cruzar el puente.</p>
          )}
        </div>
      </div>

      <footer style={styles.footer}>
        <small>© 2026 STB Academy - Instrucciones Maestras para el Servidor Real.</small>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: '"Segoe UI", Tahoma, sans-serif',
    maxWidth: '1000px',
    margin: '0 auto',
    background: '#f8fafc',
    color: '#1e293b',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '2px solid #e2e8f0'
  },
  dashboard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  card: {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  button: {
    padding: '12px',
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  monitor: {
    background: '#1e293b',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
  },
  monitorHeader: {
    background: '#334155',
    padding: '10px 20px',
    color: '#f1f5f9',
    borderBottom: '1px solid #475569'
  },
  monitorBody: {
    padding: '20px',
    minHeight: '150px'
  },
  json: {
    background: '#0f172a',
    color: '#38bdf8',
    padding: '15px',
    borderRadius: '8px',
    overflowX: 'auto',
    border: '1px solid #334155'
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
    color: '#64748b'
  }
};

export default App;
