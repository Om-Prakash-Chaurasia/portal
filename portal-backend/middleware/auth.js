const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // if token does not exists
  if (!token) {
    return res.status(401).json({
      msg: "No token found, authorization failed",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // assign the user from the token
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid Token." });
  }
}

module.exports = authMiddleware;
