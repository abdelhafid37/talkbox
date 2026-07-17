const express = require("express");
const app = express();

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("TalkBox API Running");
});

module.exports = app;
