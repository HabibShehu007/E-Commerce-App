document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("orderTableBody");
  const searchInput = document.getElementById("searchInput");

  // Load orders from localStorage
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Render orders into the table
  function renderOrders(list) {
    tableBody.innerHTML = "";
    list.forEach((order, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td class="px-4 py-2">${index + 1}</td>
        <td class="px-4 py-2">${order.user}</td>
        <td class="px-4 py-2">${order.name || "Unknown Product"}</td>
        <td class="px-4 py-2">
          Unit: ₦${order.unitPrice?.toLocaleString() || 0}<br>
          Qty: ${order.quantity || 1}<br>
          <strong>Total: ₦${order.totalPrice?.toLocaleString() || 0}</strong>
        </td>
        <td class="px-4 py-2">${order.date}</td>
        <td class="px-4 py-2">
          <select data-index="${index}" 
            class="status-select px-2 py-1 rounded text-xs font-semibold border focus:ring-2 focus:ring-green-400">
            <option value="pending" ${order.status === "pending" ? "selected" : ""}>Pending</option>
            <option value="shipped" ${order.status === "shipped" ? "selected" : ""}>Shipped</option>
            <option value="success" ${order.status === "success" ? "selected" : ""}>Success</option>
            <option value="failed" ${order.status === "failed" ? "selected" : ""}>Failed</option>
          </select>
        </td>
      `;

      tableBody.appendChild(row);
    });

    // Attach event listeners for status dropdowns
    document.querySelectorAll(".status-select").forEach((select) => {
      select.addEventListener("change", (e) => {
        const idx = e.target.getAttribute("data-index");
        const newStatus = e.target.value;

        orders[idx].status = newStatus;
        localStorage.setItem("orders", JSON.stringify(orders));
        renderOrders(orders);
      });
    });
  }

  // Initial render
  renderOrders(orders);

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      const filtered = orders.filter(
        (order) =>
          order.user.toLowerCase().includes(query) ||
          (order.name && order.name.toLowerCase().includes(query)),
      );
      renderOrders(filtered);
    });
  }
});

// Logout function
function logout() {
  window.location.href = "/pages/login.html";
}
