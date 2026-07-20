const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const connectDB = require("./config/db");
const initializeSocket = require("./sockets/socket");

const PORT = process.env.PORT;

async function startup() {
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(`[SERVER] Running on port ${PORT}`);
  });

  initializeSocket(server);
}

startup();
