window.onload = function () {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const container = document.getElementById("ordersList");

  if (orders.length === 0) {
    container.innerHTML = "<p>No orders yet. Go grab something stylish!</p>";
    return;
  }

  orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-card";
    card.innerHTML = `
      <img src="${order.productImage}" alt="${order.productName}" />
      <div class="order-details">
        <h3>${order.productName}</h3>
        <p><strong>Order ID:</strong> #${order.id}</p>
        <p><strong>Status:</strong> <span class="status pending">${order.status}</span></p>
        <p><strong>Price:</strong> ${order.price}</p>
        <p><strong>Date:</strong> ${order.date}</p>
      </div>
    `;
    container.appendChild(card);
  });
};
