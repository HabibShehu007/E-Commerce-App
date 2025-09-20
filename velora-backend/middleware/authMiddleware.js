const jwt = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("No token provided in Authorization header");
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Authenticated user:", decoded);

    req.user = { id: decoded.userId }; // ✅ matches user_id in DB
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token"
    });
  }
};
