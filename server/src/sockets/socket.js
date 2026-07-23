const { Server } = require("socket.io");

const onlineUsers = new Map();

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log(`[SOCKET.IO] [CONNECTION] Client connected: ${socket.id}.`);

    socket.emit("welcome", {
      message: "Welcome to talkbox!",
    });

    socket.on("join", (data) => {
      console.log(
        `[SOCKET.IO] [JOIN] ${data.username} joined with socket ${socket.id}.`,
      );

      onlineUsers.set(data.userId, socket.id);
      console.log(onlineUsers);
      // console.log(data);

      io.emit("userJoined", {
        username: data.username,
      });
    });

    socket.on("disconnect", () => {
      console.log(`[SOCKET.IO] [DISCONNECT] ${socket.id} disconnect.`);

      for (const [userId, socketId] of onlineUsers) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      console.log(onlineUsers);
    });
  });
}

module.exports = initializeSocket;
