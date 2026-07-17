const Message = require("../models/Message");

async function messageController(req, res) {
  try {
    const sender = req.user.userId;
    const receiver = req.body.receiver;
    const content = req.body.content;

    if (!sender || !receiver || !content) {
      return res
        .status(400)
        .json({ message: "Sender, receiver, and content are required." });
    }

    if (typeof sender !== "string") {
      return res.status(400).json({ message: "Invalid sender." });
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

module.exports = messageController;
