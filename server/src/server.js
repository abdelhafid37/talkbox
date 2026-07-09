const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const connectDB = require("./config/db");
const authRouter = require("./routes/authRoutes");

const PORT = process.env.PORT;

app.use("/api/auth", authRouter);

async function startup() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[SERVER] Running on port ${PORT}`);
  });
}

startup();
