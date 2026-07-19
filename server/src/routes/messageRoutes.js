const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createMessageController,
  getMessagesController,
  getConversationController,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/", authMiddleware, createMessageController);
router.get("/", authMiddleware, getMessagesController);
router.get("/:userId", authMiddleware, getConversationController);

module.exports = router;
