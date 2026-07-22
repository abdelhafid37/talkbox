const User = require("../models/User");

async function userController(req, res) {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("username email");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(`[USER] Failed to get user: ${error.message}.`);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = userController;
