const { Server } = require("socket.io");

function initializeSocket(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("[SOCKET.IO] [CONNECTION] Client connected.");
  });
}

module.exports = initializeSocket;
