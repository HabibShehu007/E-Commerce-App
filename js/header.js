document.addEventListener("DOMContentLoaded", () => {
  injectHeader();
  personalizeGreeting();
  setupLogoutHandler();
});

// 🧩 Inject Header into DOM
function injectHeader() {
  const header = document.createElement("header");
  header.classList.add("main-header");

  header.innerHTML = `
    <div class="logo">Velora</div>
    <nav class="nav-links">
      <a href="dashboard.html"><i class="fas fa-house"></i> Home</a>
      <a href="orders.html"><i class="fas fa-box"></i> My Orders</a>
      <a href="profile.html"><i class="fas fa-user"></i> Profile</a>
      <a href="settings.html"><i class="fas fa-gear"></i> Settings</a>
      <a href="#" id="logout"><i class="fas fa-right-from-bracket"></i> Logout</a>
    </nav>
    <div id="username-display" class="user-greeting">Hi, Guest</div>
  `;

  document.body.prepend(header);
}

// 👤 Personalized Greeting from LocalStorage
function personalizeGreeting() {
  const username = localStorage.getItem("loggedInUser");
  const display = document.getElementById("username-display");

  if (display) {
    display.textContent = `Hi, ${username || "Guest"}`;
  }
}

// 🚪 Logout Handler
function setupLogoutHandler() {
  const logoutBtn = document.getElementById("logout");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Clear user session
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("registeredEmail");
    sessionStorage.clear();

    alert("👋 You’ve been logged out.");
    window.location.href = "login.html";
  });
}
