const Message = require("../models/Message");

async function createMessageController(req, res) {
  try {
    const sender = req.user.userId;
    const receiver = req.body.receiver;
    const content = req.body.content;

    if (!receiver || !content) {
      return res
        .status(400)
        .json({ message: "Receiver and content are required." });
    }

    if (typeof receiver !== "string") {
      return res.status(400).json({ message: "Invalid receiver." });
    }

    if (typeof content !== "string") {
      return res.status(400).json({ message: "Invalid content." });
    }

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return res.status(400).json({ message: "Content cannot be empty." });
    }

    const message = await Message.create({
      sender,
      receiver,
      content: trimmedContent,
    });

    return res.status(201).json(message);
  } catch (error) {
    console.error(`[MESSAGE] Failed to send message: ${error.message}`);

    return res.status(500).json({ message: "Internal server error." });
  }
}

async function getMessagesController(req, res) {
  try {
    const userId = req.user.userId;

    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error(`[MESSAGE] Failed to get messages: ${error.message}`);

    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  createMessageController,
  getMessagesController,
};
