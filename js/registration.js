document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const btnText = document.getElementById("btn-text");
  const btnSpinner = document.getElementById("btn-spinner");
  const successModal = document.getElementById("success-modal");
  const errorModal = document.getElementById("error-modal");
  const errorMessage = document.getElementById("error-message");

  // 👁️ Toggle Password Visibility
  document.querySelectorAll(".password-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const input = toggle.parentElement.querySelector("input");
      if (input.type === "password") {
        input.type = "text";
        toggle.innerHTML = '<i class="fa fa-eye-slash"></i>';
      } else {
        input.type = "password";
        toggle.innerHTML = '<i class="fa fa-eye"></i>';
      }
    });
  });

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearErrors();

      // Collect values
      const fullName = getValue("full-name");
      const username = getValue("username");
      const phone = getValue("phone");
      const email = getValue("email");
      const password = getValue("password");
      const confirmPassword = getValue("confirm-password");
      const termsAccepted = document.getElementById("terms")?.checked;

      // Validation
      let hasError = false;
      if (!fullName)
        (showError("full-name", "Full name is required"), (hasError = true));
      if (!username || username.length < 3)
        (showError("username", "Username must be at least 3 characters"),
          (hasError = true));
      if (!phone)
        (showError("phone", "Phone number is required"), (hasError = true));
      if (!email) (showError("email", "Email is required"), (hasError = true));
      if (!password || password.length < 8)
        (showError("password", "Password must be at least 8 characters"),
          (hasError = true));
      if (password !== confirmPassword)
        (showError("confirm-password", "Passwords do not match"),
          (hasError = true));
      if (!termsAccepted) {
        alert("You must agree to the Terms & Privacy Policy");
        hasError = true;
      }

      if (hasError) return;

      // 🔄 Show spinner
      btnText.classList.add("hidden");
      btnSpinner.classList.remove("hidden");

      try {
        // Save user data locally
        const userData = { fullName, username, phone, email, password };

        // Store in localStorage for admin dashboard
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({
          id: Date.now(),
          ...userData,
          role: "user",
          registered: new Date().toISOString().split("T")[0],
        });
        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("registeredUser", JSON.stringify(userData));
        localStorage.setItem("loggedInUser", username);
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("userPhone", phone);

        // ⏳ Wait 1 second for spinner effect
        setTimeout(() => {
          btnSpinner.classList.add("hidden");
          btnText.classList.remove("hidden");
          successModal.classList.remove("hidden");
          form.reset(); // clear form after success
        }, 1000);
      } catch (error) {
        btnSpinner.classList.add("hidden");
        btnText.classList.remove("hidden");
        errorMessage.textContent = "Something went wrong while saving data.";
        errorModal.classList.remove("hidden");
      }
    });
  }

  // 🧩 Utility Functions
  function getValue(id) {
    return document.getElementById(id)?.value.trim() || "";
  }
  function showError(inputId, message) {
    const input = document.getElementById(inputId);
    if (input) {
      input.classList.add("border-red-500");
      input.setAttribute("title", message);
    }
  }
  function clearErrors() {
    document.querySelectorAll("input").forEach((el) => {
      el.classList.remove("border-red-500");
      el.removeAttribute("title");
    });
  }
});
