window.onload = function () {
  const currentUser = localStorage.getItem("username") || "guest";
  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
  const userOrders = allOrders.filter(order => order.user === currentUser);
  const container = document.getElementById("ordersList");

  if (userOrders.length === 0) {
    container.innerHTML = "<p>No orders yet. Go grab something stylish!</p>";
    return;
  }

  userOrders.forEach(order => {
    const statusClass = order.status || "pending";

    const card = document.createElement("div");
    card.className = "order-card";
    card.innerHTML = `
      <img src="${order.productImage}" alt="${order.productName}" />
      <div class="order-details">
        <h3>${order.productName}</h3>
        <p><strong>Order ID:</strong> #${order.id}</p>
        <p><strong>Status:</strong> <span class="status ${statusClass}">${statusClass}</span></p>
        <p><strong>Price:</strong> ${order.price}</p>
        <p><strong>Date:</strong> ${order.date}</p>
      </div>
    `;
    container.appendChild(card);
  });
};
