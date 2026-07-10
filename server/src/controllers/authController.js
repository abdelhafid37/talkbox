const User = require("../models/User");
const bcrypt = require("bcrypt");

async function registerController(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email, and password are required.",
      });
    }

    if (typeof username !== "string") {
      return res.status(400).json({
        message: "Invalid username.",
      });
    }

    if (typeof email !== "string") {
      return res.status(400).json({
        message: "Invalid email.",
      });
    }

    if (typeof password !== "string") {
      return res.status(400).json({
        message: "Invalid password.",
      });
    }

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUsername || !trimmedEmail) {
      return res.status(400).json({
        message: "Username or email cannot be empty.",
      });
    }

    if (trimmedUsername.length < 3 || trimmedUsername.length > 30) {
      return res.status(400).json({
        message: "Username must be between 3 and 30 characters.",
      });
    }

    const emailRegex = /^[a-zA-Z0-9\.]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        message: "Invalid email.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username: trimmedUsername }, { email: trimmedEmail }],
    });

    if (existingUser) {
      if (existingUser.username === trimmedUsername) {
        return res.status(409).json({
          message: "Username already taken.",
        });
      }

      if (existingUser.email === trimmedEmail) {
        return res.status(409).json({
          message: "Email already taken.",
        });
      }
    }

    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await User.create({
      username: trimmedUsername,
      email: trimmedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully.",
    });
  } catch (error) {
    console.error(
      `[AUTH][REGISTER] Failed to register user: ${error.message}.`,
    );
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  registerController,
};
