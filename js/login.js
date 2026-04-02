// login.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const btnText = document.getElementById("btn-text");
  const btnSpinner = document.getElementById("btn-spinner");

  const successModal = document.getElementById("login-success-modal");
  const errorModal = document.getElementById("login-error-modal");
  const errorMessage = document.getElementById("login-error-message");

  // 👁️ Password toggle
  document.querySelectorAll(".password-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const input = toggle.parentElement.querySelector("input");
      if (input) {
        if (input.type === "password") {
          input.type = "text";
          toggle.innerHTML = '<i class="fa fa-eye-slash"></i>';
        } else {
          input.type = "password";
          toggle.innerHTML = '<i class="fa fa-eye"></i>';
        }
      }
    });
  });

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        errorMessage.textContent = "Please enter both email and password.";
        errorModal.classList.remove("hidden");
        return;
      }

      // 🔄 Show spinner
      btnText.classList.add("hidden");
      btnSpinner.classList.remove("hidden");

      setTimeout(() => {
        // Retrieve registered user from localStorage
        const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

        btnSpinner.classList.add("hidden");
        btnText.classList.remove("hidden");

        if (
          storedUser &&
          storedUser.email === email &&
          storedUser.password === password
        ) {
          // ✅ Save session info
          sessionStorage.setItem("userEmail", storedUser.email);
          sessionStorage.setItem("userPhone", storedUser.phone);
          localStorage.setItem("loggedInUser", storedUser.username);

          // Show success modal
          successModal.classList.remove("hidden");

          // Auto-redirect after short delay
          setTimeout(() => {
            window.location.href = "/pages/dashboard.html";
          }, 2000);
        } else {
          errorMessage.textContent = "Invalid email or password.";
          errorModal.classList.remove("hidden");
        }
      }, 1000); // simulate loading
    });
  }
});
