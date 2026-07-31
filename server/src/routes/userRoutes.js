const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  userController,
  usersController,
} = require("../controllers/userController");

const router = express.Router();

router.get("/me", authMiddleware, userController);
router.get("/", authMiddleware, usersController);

module.exports = router;
