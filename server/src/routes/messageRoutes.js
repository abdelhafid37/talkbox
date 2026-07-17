const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createMessageController,
  getMessagesController,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/", authMiddleware, createMessageController);
router.get("/", authMiddleware, getMessagesController);

module.exports = router;
