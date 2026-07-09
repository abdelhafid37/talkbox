const User = require("../models/User");
const bcrypt = require("bcrypt");

async function registerController(req, res) {
  const { username, email, password } = req.body;

  const emailTaken = await User.findOne({ email });
  if (emailTaken) {
    return res.status(409).json({
      message: "Email already taken.",
    });
  }

  const usernameTaken = await User.findOne({ username });
  if (usernameTaken) {
    return res.status(409).json({
      message: "Username already taken.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return res.status(201).json({
    message: "User registered successfully.",
  });
}

module.exports = {
  registerController,
};
