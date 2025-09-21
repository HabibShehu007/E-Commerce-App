const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { authenticateUser } = require("../middleware/authMiddleware"); // ✅ import middleware

// ✅ protect route so only logged-in users can place orders
router.post("/place", authenticateUser, orderController.placeOrder);

// ✅ protect route so each user sees only their own orders
router.get("/user", authenticateUser, orderController.getUserOrders);

module.exports = router;
