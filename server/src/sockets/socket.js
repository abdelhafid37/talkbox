const { Server } = require("socket.io");

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log(`[SOCKET.IO] [CONNECTION] Client connected: ${socket.id}`);

    socket.emit("welcome", {
      message: "Welcome to talkbox!",
    });

    socket.on("join", (data) => {
      console.log(
        `[SOCKET.IO] [JOIN] ${data.username} joined with socket ${socket.id}`,
      );

      io.emit("userJoined", {
        username: data.username,
      });
    });
  });
}

module.exports = initializeSocket;
