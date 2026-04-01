document.addEventListener("DOMContentLoaded", () => {
  // 🌍 Update Country Flag
  const countryCodeSelect = document.getElementById("country-code");
  const selectedFlag = document.getElementById("selected-flag");

  if (countryCodeSelect && selectedFlag) {
    countryCodeSelect.addEventListener("change", () => {
      const selectedOption = countryCodeSelect.options[countryCodeSelect.selectedIndex];
      selectedFlag.src = selectedOption.getAttribute("data-flag");
    });
  }

  // 👁️ Toggle Password Visibility
  document.querySelectorAll(".password-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
      const input = toggle.parentElement.querySelector("input");
      if (input) {
        input.type = input.type === "password" ? "text" : "password";
        toggle.innerHTML = input.type === "text"
          ? '<i class="fa fa-eye-slash"></i>'
          : '<i class="fa fa-eye"></i>';
      }
    });
  });

  // 🚀 Form Submission
  const form = document.getElementById("registration-form");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      clearErrors();

      const fullName = getValue("full-name");
      const username = getValue("username");
      const countryCode = getValue("country-code");
      const phoneRaw = getValue("phone").replace(/\s+/g, "");
      const email = getValue("email");
      const password = getValue("password");
      const confirmPassword = getValue("confirm-password");
      const termsAccepted = document.getElementById("terms")?.checked;

      let hasError = false;

      if (!fullName) showError("full-name", "Full name is required"), hasError = true;
      if (!username || username.length < 3) showError("username", "Username must be at least 3 characters"), hasError = true;
      if (!phoneRaw) showError("phone", "Phone number is required"), hasError = true;
      if (!email) showError("email", "Email is required"), hasError = true;
      if (!password || password.length < 8) showError("password", "Password must be at least 8 characters"), hasError = true;
      if (password !== confirmPassword) showError("confirm-password", "Passwords do not match"), hasError = true;
      if (!termsAccepted) alert("You must agree to the Terms & Privacy Policy"), hasError = true;

      if (hasError) return;

      const phone = countryCode + phoneRaw;
      const userData = { fullName, username, email, phone, password, termsAccepted };

      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData)
        });

        const contentType = response.headers.get("content-type");
        const result = contentType?.includes("application/json")
          ? await response.json()
          : { success: false, message: await response.text() };

        if (response.ok && result.success) {
        localStorage.setItem("registeredEmail", email);
        localStorage.setItem("loggedInUser", username); // 👈 Add this line
        sessionStorage.setItem("userEmail", email);
       sessionStorage.setItem("userPhone", phone);
       alert("✅ Registration successful! Redirecting to login...");
       window.location.href = "/pages/login.html";
      }else {
          alert(result.message || "Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("Something went wrong. Please try again later.");
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
      input.classList.add("error");
      input.setAttribute("title", message);
    }
  }

  function clearErrors() {
    document.querySelectorAll(".error").forEach(el => {
      el.classList.remove("error");
      el.removeAttribute("title");
    });
  }
});
