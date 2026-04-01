// 🛒 Cart State
let cart = [];

// ➕ Add Item to Cart (Single Product Only)
function addToCart(item) {
  cart = [{ ...item, quantity: 1 }]; // 🧹 Reset cart to single item
  renderCart();
  openCartModal();
}

// 🧾 Render Cart Items
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<p>Your cart is empty.</p>`;
    return;
  }

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    const totalPrice = item.price * item.quantity;

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <span>${item.name} x${item.quantity}</span>
      <span>₦${totalPrice.toLocaleString()}</span>
    `;

    cartItems.appendChild(itemDiv);
  });
}

// 🧊 Modal Controls
function openCartModal() {
  const modal = document.getElementById("cartModal");
  modal.classList.add("show");
}

function closeCartModal() {
  const modal = document.getElementById("cartModal");
  modal.classList.remove("show");
}

// ❌ Close Button Listener
document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.querySelector(".close-cart");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeCartModal);
  }
});

// 💳 Checkout & Payment Validation
function checkout() {
  if (cart.length === 0) {
    alert("🛑 Your cart is empty!");
    return;
  }

  const bank = document.getElementById("bankSelect").value.trim();
  const card = document.getElementById("cardNumber").value.trim();
  const expiry = document.getElementById("expiry").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  if (!bank || !card || !expiry || !cvv) {
    alert("⚠️ Please fill in all payment details.");
    return;
  }

  if (!/^\d{16}$/.test(card)) {
    alert("❌ Invalid card number. Must be 16 digits.");
    return;
  }

  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    alert("❌ Invalid expiry format. Use MM/YY.");
    return;
  }

  if (!/^\d{3}$/.test(cvv)) {
    alert("❌ Invalid CVV. Must be 3 digits.");
    return;
  }

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  cart.forEach(item => {
    orders.push({
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      productName: item.name,
      productImage: item.image,
      price: `₦${(item.price * item.quantity).toLocaleString()}`,
      quantity: item.quantity,
      status: "Pending",
      date: new Date().toLocaleString()
    });
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  alert(`✅ Payment successful via ${bank}. Thank you for shopping with us!`);

  cart = [];
  renderCart();
  closeCartModal();

  ["bankSelect", "cardNumber", "expiry", "cvv"].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = "";
  });

  window.location.href = "orders.html";
}
