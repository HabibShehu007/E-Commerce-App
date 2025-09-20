document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMsg = document.getElementById("errorMsg");
  const successMsg = document.getElementById("successMsg");
  const loader = document.querySelector(".loader");

  const LOGIN_API = "/api/auth/login";

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorMsg.textContent = "";
    successMsg.textContent = "";
    loader.classList.remove("hidden");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      loader.classList.add("hidden");
      errorMsg.textContent = "Please enter both email and password.";
      return;
    }

    try {
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }

      loader.classList.add("hidden");

      if (response.ok) {
        // ✅ Store token in localStorage
        if (result.token) {
          localStorage.setItem("authToken", result.token);
        }

        // ✅ Store username for dashboard greeting
        if (result.username) {
         localStorage.setItem("loggedInUser", result.username);
       }

        successMsg.textContent = result.message || `Welcome back, ${email}`;
        console.log("Redirecting to dashboard...");
        window.location.href = "/pages/dashboard.html";
      } else {
        errorMsg.textContent = result.message || "Invalid credentials.";
      }
    } catch (err) {
      loader.classList.add("hidden");
      errorMsg.textContent = "Login error. Please try again.";
      console.error("Login error:", err);
    }
  });
});
