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
        <td class="px-4 py-2">${order.product}</td>
        <td class="px-4 py-2">${order.price}</td>
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

        // Update local data
        orders[idx].status = newStatus;

        // Save back to localStorage
        localStorage.setItem("orders", JSON.stringify(orders));

        // Re-render to reflect changes
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
          order.product.toLowerCase().includes(query),
      );
      renderOrders(filtered);
    });
  }
});

// Logout function
function logout() {
  localStorage.clear();
  // window.location.href = "/pages/login.html";
}
