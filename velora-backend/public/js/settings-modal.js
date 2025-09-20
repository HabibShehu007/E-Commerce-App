// 🧠 Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // 🔍 Grab all modal triggers
  const openButtons = document.querySelectorAll("[data-modal-target]");
  const closeButtons = document.querySelectorAll(".close-btn");
  const modals = document.querySelectorAll(".modal");

  // 🚪 Open modal
  openButtons.forEach(button => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal-target");
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = "block";
    });
  });

  // ❌ Close modal
  closeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      if (modal) modal.style.display = "none";
    });
  });

  // 🕶️ Click outside to close
  window.addEventListener("click", event => {
    modals.forEach(modal => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});
