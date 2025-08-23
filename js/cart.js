let cart = [];

function convertToNaira(dollarAmount) {
  return dollarAmount * 1500;
}

function addToCart(item) {
  const existing = cart.find(p => p.name === item.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  renderCart();
  toggleCartModal(true);
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <span>${item.name} x${item.quantity}</span>
      <span>₦${convertToNaira(item.price * item.quantity).toLocaleString()}</span>
    `;
    cartItems.appendChild(div);
  });
}

function toggleCartModal(show) {
  const modal = document.getElementById("cartModal");
  modal.style.display = show ? "flex" : "none"; // ✅ Use "flex" to activate centering
}


function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Payment successful. Thank you for shopping with us!");
  cart = [];
  renderCart();
  toggleCartModal(false);
}

// 🛒 CART CHECKOUT FUNCTION
function checkout() {
  const bank = document.getElementById("bankSelect").value;
  const card = document.getElementById("cardNumber").value.trim();
  const expiry = document.getElementById("expiry").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  // Basic validation
  if (!bank || !card || !expiry || !cvv) {
    alert("⚠️ Please fill in all payment details.");
    return;
  }

  if (card.length !== 16 || !/^\d+$/.test(card)) {
    alert("❌ Invalid card number. Must be 16 digits.");
    return;
  }

  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    alert("❌ Invalid expiry format. Use MM/YY.");
    return;
  }

  if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
    alert("❌ Invalid CVV. Must be 3 digits.");
    return;
  }

  // ✅ Save orders to localStorage
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  cart.forEach(item => {
    orders.push({
      id: Date.now() + Math.floor(Math.random() * 1000), // unique-ish ID
      productName: item.name,
      productImage: item.image,
      price: `₦${convertToNaira(item.price * item.quantity).toLocaleString()}`,
      quantity: item.quantity,
      status: "Pending",
      date: new Date().toLocaleString()
    });
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  // ✅ Simulate payment success
  alert(`✅ Payment successful via ${bank}. Thank you for shopping with us!`);

  // ✅ Clear cart and reset form
  cart = [];
  renderCart();
  toggleCartModal(false);

  document.getElementById("bankSelect").value = "";
  document.getElementById("cardNumber").value = "";
  document.getElementById("expiry").value = "";
  document.getElementById("cvv").value = "";

  // ✅ Redirect to orders page
  window.location.href = "orders.html";
}

