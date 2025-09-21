const db = require("../db/connection");

exports.placeOrder = async (req, res) => {
  const { productName } = req.body;
  const userId = req.user.id;

  try {
    // 🔍 Check if user already ordered this product
    const [existing] = await db.query(
      "SELECT * FROM orders WHERE user_id = ? AND product_name = ?",
      [userId, productName]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "You already ordered this item." });
    }

    // 🔍 Check if product exists and has quantity
    const [product] = await db.query("SELECT quantity FROM products WHERE name = ?", [productName]);

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found in database." });
    }

    if (product[0].quantity < 1) {
      return res.status(400).json({ message: "Product is sold out." });
    }

    // 🛒 Update product quantity
    await db.query("UPDATE products SET quantity = quantity - 1 WHERE name = ?", [productName]);

    // 🧾 Insert order
    await db.query(
      "INSERT INTO orders (user_id, product_name, quantity) VALUES (?, ?, ?)",
      [userId, productName, 1]
    );

    res.status(201).json({ message: "Order placed successfully." });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getUserOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const [orders] = await db.query("SELECT product_name FROM orders WHERE user_id = ?", [userId]);
    const orderedProducts = orders.map((o) => o.product_name);
    res.status(200).json({ ordered: orderedProducts });
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ message: "Server error." });
  }
};
