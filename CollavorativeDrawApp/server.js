/* Copyright Mateo Jose Roca Clementis <mateojoserocaclemntis17@gmail.com>
 Released under the MIT license
https://opensource.org/licenses/MIT

 */

const WebSocket = require("ws");
const http = require("http");
const express = require("express");
const { dirname } = require("path");
const app = express();
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const drawingSessions = {};

let strokeHistory = [];

wss.on("connection", (ws, req) => {
  const clientIp = req.socket.remoteAddress;

  console.log(clientIp);
});

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ type: "history", data: strokeHistory }));

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "deleteSession") {
      strokeHistory = [];
      console.log("Delete History strokes");
      const sessionKey = data.data.session;

      if (drawingSessions[sessionKey]) {
        delete drawingSessions[sessionKey];
      }
    } else if (data.type === "draw") {
      strokeHistory.push(data.data);

      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "draw", data: data.data }));
        }
      });
    }
  });
});

wss.on("connection", (ws, req) => {
  const sessionKey = req.url;

  if (!drawingSessions[sessionKey]) {
    drawingSessions[sessionKey] = [];
  }

  drawingSessions[sessionKey].push(ws);

  ws.on("message", (message) => {
    drawingSessions[sessionKey].forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    drawingSessions[sessionKey] = drawingSessions[sessionKey].filter(
      (client) => client !== ws
    );
    if (drawingSessions[sessionKey].length === 0) {
      delete drawingSessions[sessionKey];
    }
  });
});

app.use(express.static(__dirname + "/public/"));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

//Made by Mateo Roca
