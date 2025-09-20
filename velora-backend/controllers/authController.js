const db = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { fullName, username, email, phone, password } = req.body;

    if (!fullName || !username || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const [existingEmail] = await db.query("SELECT user_id FROM users WHERE email = ?", [email]);
    if (existingEmail.length > 0) {
      return res.status(409).json({ success: false, message: "Email already in use." });
    }

    const [existingUsername] = await db.query("SELECT user_id FROM users WHERE username = ?", [username]);
    if (existingUsername.length > 0) {
      return res.status(409).json({ success: false, message: "Username already taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (full_name, username, email, phone, password)
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.query(sql, [fullName, username, email, phone, hashedPassword]);

    res.status(201).json({ success: true, message: "User registered successfully." });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error during signup." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const [results] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    // ✅ Generate JWT token using correct user_id
   const token = jwt.sign(
  { userId: user.id }, // ✅ Use the correct field from your DB
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);


    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error during login." });
  }
};
