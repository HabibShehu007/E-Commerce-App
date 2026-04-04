document.addEventListener("DOMContentLoaded", () => {
  loadCart();
});

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartList");

  container.innerHTML = "";

  if (cartItems.length === 0) {
    container.innerHTML = `
      <p class="text-center text-slate-600 text-lg font-medium mt-6">
        <i class="fas fa-box-open mr-2 text-yellow-500"></i>
        Your cart is empty. Go add some products!
      </p>`;
    return;
  }

  cartItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.className =
      "flex flex-col bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}"
        class="w-full h-36 object-cover border-b border-gray-200" />
      <div class="flex flex-col gap-2 p-4">
        <h3 class="text-lg font-bold text-blue-950 flex items-center gap-2">
          <i class="fas fa-tag text-yellow-500"></i> ${item.name}
        </h3>
        <p class="text-sm text-slate-700 flex items-center gap-2">
          <i class="fas fa-money-bill-wave text-green-600"></i> ${item.price}
        </p>
        <p class="text-sm text-slate-700 flex items-center gap-2">
          <i class="fas fa-calendar-alt text-purple-500"></i> ${item.date}
        </p>
        <div class="flex gap-2 mt-2">
          <button
            onclick="removeItem(${index})"
            class="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition inline-flex items-center justify-center gap-2"
          >
            <i class="fas fa-trash"></i> Remove
          </button>
          <button
            onclick="openPaymentForm(${index})"
            class="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition inline-flex items-center justify-center gap-2"
          >
            <i class="fas fa-credit-card"></i> Pay
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function removeItem(index) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  loadCart();
}

// ✅ Payment Modal
function openPaymentForm(index) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cartItems[index];

  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
  modal.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h3 class="text-xl font-bold text-blue-950 mb-4 flex items-center gap-2">
        <i class="fas fa-credit-card text-green-600"></i> Checkout Payment
      </h3>
      <p class="text-sm text-slate-700 mb-4">
        You are paying for <strong>${item.name}</strong> (${item.price})
      </p>
      <form id="paymentForm" class="flex flex-col gap-3">
        <input type="text" placeholder="Cardholder Name" required
          class="border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-300" />
        <input type="text" placeholder="Card Number (16 digits)" required maxlength="16"
          class="border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-300" />
        <div class="flex gap-2">
          <input type="text" placeholder="MM/YY" required
            class="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-300" />
          <input type="text" placeholder="CVV (3 digits)" required maxlength="3"
            class="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-300" />
        </div>
        <input type="password" placeholder="Card PIN (4 digits)" required maxlength="4"
          class="border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-300" />
        <div class="flex justify-end gap-3 mt-4">
          <button type="button"
            onclick="document.body.removeChild(this.closest('.fixed'))"
            class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition">
            Cancel
          </button>
          <button type="submit"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition inline-flex items-center gap-2">
            <i class="fas fa-check"></i> Pay Now
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  // ✅ Handle form submission
  modal.querySelector("#paymentForm").onsubmit = (e) => {
    e.preventDefault();
    showSuccessModal(item.name, index, modal);
  };
}

// ✅ Success Modal
function showSuccessModal(productName, index, paymentModal) {
  // Remove payment modal
  document.body.removeChild(paymentModal);

  const successModal = document.createElement("div");
  successModal.className =
    "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
  successModal.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
      <i class="fas fa-check-circle text-green-600 text-4xl mb-3"></i>
      <h3 class="text-lg font-semibold text-blue-950 mb-2">Payment Successful</h3>
      <p class="text-sm text-slate-600 mb-4">${productName} has been paid successfully.</p>
      <div class="flex justify-center gap-3">
        <button onclick="document.body.removeChild(this.closest('.fixed'))"
          class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition">
          Close
        </button>
        <a href="orders.html"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition inline-flex items-center gap-2">
          <i class="fas fa-box"></i> View Orders
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(successModal);

  // ✅ Move item from cart to orders with pending status and correct user
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cartItems[index];
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const currentUser = localStorage.getItem("loggedInUser") || "Guest";

  orders.push({ ...item, user: currentUser, status: "pending" });
  localStorage.setItem("orders", JSON.stringify(orders));

  console.log("Saved order:", orders[orders.length - 1]); // Debugging line

  removeItem(index);
}
