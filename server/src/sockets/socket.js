const { Server } = require("socket.io");

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log(`[SOCKET.IO] [CONNECTION] Client connected: ${socket.id}`);
  });
}

module.exports = initializeSocket;
