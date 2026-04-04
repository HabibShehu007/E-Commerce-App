window.onload = function () {
  const currentUser = localStorage.getItem("loggedInUser") || "Guest"; // ✅ use loggedInUser
  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
  const userOrders = allOrders.filter((order) => order.user === currentUser);
  const container = document.getElementById("ordersList");

  if (userOrders.length === 0) {
    container.innerHTML = `
      <p class="text-center text-slate-600 text-lg font-medium mt-6">
        <i class="fas fa-box-open mr-2 text-yellow-500"></i>
        No orders yet. Go grab something stylish!
      </p>`;
    return;
  }

  userOrders.forEach((order, index) => {
    const status = order.status || "pending";

    // ✅ Tailwind gradient classes for status
    let statusClasses = "";
    if (status === "pending") {
      statusClasses =
        "bg-gradient-to-r from-orange-500 to-yellow-400 text-white";
    } else if (status === "shipped") {
      statusClasses = "bg-gradient-to-r from-blue-600 to-cyan-400 text-white";
    } else if (status === "delivered") {
      statusClasses = "bg-gradient-to-r from-green-600 to-lime-400 text-white";
    }

    const card = document.createElement("div");
    card.className =
      "flex flex-col max-w-xs mx-auto bg-gradient-to-br from-white to-[#e0f7fa] rounded-xl shadow-lg border border-[#d0e0e6] overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-xl";

    card.innerHTML = `
      <img src="${order.image}" alt="${order.name}"
        class="w-full h-36 object-cover border-b border-[#cce4ea]" />
      <div class="flex flex-col gap-2 p-4">
        <h3 class="text-lg font-bold text-[#0d3b66]">
          <i class="fas fa-tag mr-2 text-yellow-500"></i>${order.name}
        </h3>
        <p class="text-sm text-[#3c4858]">
          <i class="fas fa-hashtag mr-2 text-blue-500"></i>Order ID: #${order.id || index + 1}
        </p>
        <p class="text-sm text-[#3c4858] flex items-center gap-2">
          <i class="fas fa-info-circle text-slate-500"></i>
          Status: <span class="self-start mt-1 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wide shadow ${statusClasses}">
            ${status}
          </span>
        </p>
        <p class="text-sm text-[#3c4858]">
          <i class="fas fa-money-bill-wave mr-2 text-green-600"></i>${order.price}
        </p>
        <p class="text-sm text-[#3c4858]">
          <i class="fas fa-calendar-alt mr-2 text-purple-500"></i>${order.date}
        </p>
      </div>
    `;

    container.appendChild(card);
  });
};

// ✅ Update order status
function updateOrderStatus(orderIndex, newStatus) {
  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
  if (allOrders[orderIndex]) {
    allOrders[orderIndex].status = newStatus;
    localStorage.setItem("orders", JSON.stringify(allOrders));

    // Show success modal instead of alert
    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
        <i class="fas fa-check-circle text-green-600 text-4xl mb-3"></i>
        <h3 class="text-lg font-semibold text-blue-950 mb-2">Status Updated</h3>
        <p class="text-sm text-slate-600 mb-4">Order has been marked as <strong>${newStatus}</strong>.</p>
        <div class="flex justify-center">
          <button onclick="document.body.removeChild(this.closest('.fixed')); window.location.reload();"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            OK
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
}
