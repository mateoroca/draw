const WebSocket = require("ws");
const http = require("http");
const express = require("express");
const app = express();

// Configura el servidor HTTP
const server = http.createServer(app);

// Configura el servidor WebSocket
const wss = new WebSocket.Server({ server });

// Objeto para mantener un seguimiento de las sesiones de dibujo
const drawingSessions = {};

// Maneja las conexiones WebSocket
wss.on("connection", (ws, req) => {
  // Obtiene la ruta de la URL para identificar la sesión de dibujo
  const sessionKey = req.url;

  if (!drawingSessions[sessionKey]) {
    // Crea una nueva sesión de dibujo si no existe
    drawingSessions[sessionKey] = [];
  }

  // Agrega el WebSocket a la sesión de dibujo correspondiente
  drawingSessions[sessionKey].push(ws);

  // Maneja los mensajes recibidos desde el cliente
  ws.on("message", (message) => {
    // Reenvía el mensaje a todos los clientes en la misma sesión de dibujo
    drawingSessions[sessionKey].forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Maneja la desconexión del cliente
  ws.on("close", () => {
    // Elimina el WebSocket de la sesión de dibujo cuando se desconecta
    drawingSessions[sessionKey] = drawingSessions[sessionKey].filter(
      (client) => client !== ws
    );
    if (drawingSessions[sessionKey].length === 0) {
      // Si no quedan clientes en la sesión de dibujo, elimina la sesión
      delete drawingSessions[sessionKey];
    }
  });
});

// Configura el servidor web para servir una página HTML
app.use(express.static(__dirname + "/public"));

// Inicia el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
