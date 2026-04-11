const http = require('http');
const dotenv = require('dotenv');
dotenv.config({ path: './index.env' });



/**
 * 🌉 EL SERVIDOR MAESTRO (EL PUENTE)
 * Aquí recibimos las peticiones del Cliente de React.
 */

const PORT = 3001;

const server = http.createServer((req, res) => {
  
  // CONFIGURACIÓN DE CABECERAS (CORS & JSON)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Si el navegador envía un "pre-flight" (OPTIONS), respondemos OK inmediatamente
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const { url, method } = req;

  // RUTAS DE LA API
  if (url === '/api/status' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ 
      status: "ONLINE", 
      message: "¡El puente está estable!", 
      serverTime: new Date().toLocaleTimeString() 
    }));

  } else if (url === '/api/items' && method === 'GET') {
    // Simulamos una base de datos de "Tesoros"
    const items = [
      { id: 1, name: "Espada de Código", power: 99 },
      { id: 2, name: "Escudo de Try/Catch", power: 85 },
      { id: 3, name: "Poción de Café", power: 100 }
    ];
    res.writeHead(200);
    res.end(JSON.stringify(items));

  } else if (url === '/api/echo' && method === 'POST') {
    // 🟠 RETO: Leer datos de un POST en Node Vanilla (usando buffers)
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const dataReceived = JSON.parse(body || '{}');
      res.writeHead(200);
      res.end(JSON.stringify({
        message: "Eco recibido correctamente",
        youSent: dataReceived,
        receivedAt: new Date().toISOString()
      }));
    });

  } else {
    // RUTA NO ENCONTRADA
    res.writeHead(404);
    res.end(JSON.stringify({ error: "404 - El puente no lleva a ningún lado aquí." }));
  }
});

server.listen(PORT, () => {
  console.log(`\n🌉 SERVIDOR MAESTRO ACTIVO: http://localhost:${PORT}`);
  console.log('Esperando drones de petición de React...');
});
