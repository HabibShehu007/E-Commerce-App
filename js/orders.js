window.onload = function () {
  const currentUser = localStorage.getItem("username") || "guest";
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

  userOrders.forEach((order) => {
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
      <img src="${order.productImage}" alt="${order.productName}"
        class="w-full h-36 object-cover border-b border-[#cce4ea]" />
      <div class="flex flex-col gap-2 p-4">
        <h3 class="text-lg font-bold text-[#0d3b66]">
          <i class="fas fa-tag mr-2 text-yellow-500"></i>${order.productName}
        </h3>
        <p class="text-sm text-[#3c4858]">
          <i class="fas fa-hashtag mr-2 text-blue-500"></i>Order ID: #${order.id}
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
