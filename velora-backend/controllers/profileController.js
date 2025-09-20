const db = require("../db/connection");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    console.log("🔍 Incoming user ID:", userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
    }

    const [rows] = await db.query(
      "SELECT username, fullName, email, phone FROM users WHERE id = ?",
      [userId]
    );

    console.log("📦 DB rows:", rows);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = rows[0];
    console.log("✅ User found:", user);

    res.json({
      success: true,
      user: {
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        avatar: "/images/default-avatar.webp"
      }
    });

  } catch (err) {
    console.error("🔥 Profile fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
