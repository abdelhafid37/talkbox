const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const token = authorization.split(" ")[1];

    const JWT_SECRET = process.env.JWT_SECRET;
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = {
      userId: payload.userId,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized." });
  }
}

module.exports = authMiddleware;
