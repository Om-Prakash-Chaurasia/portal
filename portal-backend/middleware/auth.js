const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");

  // check if token exists
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token found, authorization denied" });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // assign the user from the token
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
