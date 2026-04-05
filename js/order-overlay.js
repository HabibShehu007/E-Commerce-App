// order-overlay.js
// This file creates a reusable overlay notification for order status updates

// Function to show overlay
function showOrderOverlay(newStatus) {
  // Remove any existing overlay
  const existing = document.getElementById("order-status-overlay");
  if (existing) existing.remove();

  // Map statuses to colors + icons
  let icon = "";
  let colorClass = "";
  if (newStatus === "pending") {
    icon =
      '<i class="fas fa-hourglass-half text-yellow-500 text-4xl mb-3"></i>';
    colorClass = "text-yellow-600";
  } else if (newStatus === "shipped") {
    icon = '<i class="fas fa-truck text-blue-500 text-4xl mb-3"></i>';
    colorClass = "text-blue-600";
  } else if (newStatus === "success") {
    icon = '<i class="fas fa-check-circle text-green-600 text-4xl mb-3"></i>';
    colorClass = "text-green-600";
  } else if (newStatus === "failed") {
    icon = '<i class="fas fa-times-circle text-red-600 text-4xl mb-3"></i>';
    colorClass = "text-red-600";
  }

  // Create overlay container
  const overlay = document.createElement("div");
  overlay.id = "order-status-overlay";
  overlay.className =
    "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";

  // Inner modal
  overlay.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center animate-fadeIn">
      ${icon}
      <h3 class="text-lg font-semibold ${colorClass} mb-2">Order Status Updated</h3>
      <p class="text-sm text-slate-600 mb-4">
        Your order has been marked as <strong class="${colorClass}">${newStatus}</strong>.
      </p>
      <div class="flex justify-center">
        <button onclick="document.body.removeChild(document.getElementById('order-status-overlay'))"
          class="px-4 py-2 bg-[#8BC34A] text-white rounded-md hover:bg-green-700 transition">
          OK
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
}
