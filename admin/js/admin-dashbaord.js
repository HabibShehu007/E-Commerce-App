// admin-dashboard.js

function logout() {
  window.location.href = "/pages/login.html";
}

// Load counts from localStorage
function loadCounts() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  document.getElementById("usersCount").textContent = users.length;
  document.getElementById("ordersCount").textContent = orders.length;
}

// Build bar chart with dummy fashion product data
function buildBarChart() {
  const ctx = document.getElementById("salesChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["T-Shirts", "Trousers", "Caps", "Bags"],
      datasets: [
        {
          label: "Successful Orders",
          data: [50, 30, 20, 40],
          backgroundColor: "rgba(34,197,94,0.7)", // green
        },
        {
          label: "Pending Orders",
          data: [5, 10, 3, 8],
          backgroundColor: "rgba(234,179,8,0.7)", // yellow
        },
        {
          label: "Failed Orders",
          data: [2, 4, 1, 3],
          backgroundColor: "rgba(239,68,68,0.7)", // red
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
      },
    },
  });
}

// Build doughnut chart for overall status distribution
function buildDoughnutChart() {
  const ctx = document.getElementById("statusChart").getContext("2d");

  // Aggregate totals (dummy values)
  const success = 50 + 30 + 20 + 40;
  const pending = 5 + 10 + 3 + 8;
  const failed = 2 + 4 + 1 + 3;

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Success", "Pending", "Failed"],
      datasets: [
        {
          data: [success, pending, failed],
          backgroundColor: [
            "rgba(34,197,94,0.7)", // green
            "rgba(234,179,8,0.7)", // yellow
            "rgba(239,68,68,0.7)", // red
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
      },
    },
  });
}

// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  loadCounts();
  buildBarChart();
  buildDoughnutChart();
});
