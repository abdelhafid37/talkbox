const { Server } = require("socket.io");
const Message = require("../models/Message");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const onlineUsers = new Map();

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    socket.user = user;
    next();
  });

  io.on("connection", (socket) => {
    console.log(`[SOCKET.IO] [CONNECTION] Client connected: ${socket.id}.`);

    socket.on("join", () => {
      console.log(
        `[SOCKET.IO] [JOIN] ${socket.user.username} joined with socket ${socket.id}.`,
      );

      onlineUsers.set(socket.user._id.toString(), socket.id);
      console.log(onlineUsers);
    });

    socket.on("sendMessage", async (data) => {
      try {
        const message = await Message.create({
          sender: socket.user._id,
          receiver: data.receiverId,
          content: data.text,
        });

        const populatedMessage = await message.populate([
          { path: "sender", select: "username" },
          { path: "receiver", select: "username" },
        ]);

        const receiverSocketId = onlineUsers.get(data.receiverId);

        socket.emit("newMessage", populatedMessage);
        io.to(receiverSocketId).emit("newMessage", populatedMessage);
      } catch (error) {
        console.error(`[SOCKET.IO] [MESSAGE] ${error.message}`);
      }
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
