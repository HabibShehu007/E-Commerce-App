document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("adminLoginForm");
  const loginBtn = document.getElementById("loginBtn");
  const loginBtnText = document.getElementById("loginBtnText");
  const loginSpinner = document.getElementById("loginSpinner");
  const errorMsg = document.getElementById("errorMsg");
  const loginModal = document.getElementById("loginModal");
  const closeModalBtn = document.getElementById("closeModalBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset error
    errorMsg.textContent = "";

    // Show spinner
    loginBtn.disabled = true;
    loginBtnText.classList.add("hidden");
    loginSpinner.classList.remove("hidden");

    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

    // Simulate async login
    setTimeout(() => {
      if (username === "velora@admin.com" && password === "velora@12345") {
        // Save token
        localStorage.setItem("adminToken", "secure-admin-token");

        // Show success modal
        loginModal.classList.remove("hidden");
      } else {
        errorMsg.textContent = "❌ Invalid admin credentials.";
      }

      // Reset button state
      loginBtn.disabled = false;
      loginBtnText.classList.remove("hidden");
      loginSpinner.classList.add("hidden");
    }, 1500); // simulate 1.5s delay
  });

  // Close modal
  closeModalBtn.addEventListener("click", () => {
    loginModal.classList.add("hidden");
    window.location.href = "/admin/pages/admin-dashbaord.html"; // redirect after closing modal
  });
});
