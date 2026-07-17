function userController(req, res) {
  const userId = req.user.userId;
  return res.status(200).json({ userId });
}

module.exports = userController;
