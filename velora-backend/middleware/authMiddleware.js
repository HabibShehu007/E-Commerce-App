const jwt = require("jsonwebtoken");

// middleware to check if user is authenticated
exports.authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // check if token is present and properly formatted
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("No token provided in Authorization header");
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided"
    });
  }

  // extract token from header
  const token = authHeader.split(" ")[1];

  try {
    // verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Authenticated user:", decoded);

    // attach user ID to request object for later use
    req.user = { id: decoded.userId }; // ✅ matches user_id in DB
    next(); // move to next middleware or controller
  } catch (err) {
    // token is invalid or expired
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token"
    });
  }
};
