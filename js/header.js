// header.js
document.addEventListener("DOMContentLoaded", () => {
  const header = document.createElement("header");
  header.className = "main-header";
  header.innerHTML = `
    <div class="logo">Velora</div>
  <nav class="nav-links">
    <a href="dashboard.html"><i class="fas fa-house"></i> Home</a>
    <a href="orders.html"><i class="fas fa-box"></i> My Orders</a>
    <a href="profile.html"><i class="fas fa-user"></i> Profile</a>
    <a href="settings.html"><i class="fas fa-gear"></i> Settings</a>
    <a href="#" id="logout"><i class="fas fa-right-from-bracket"></i> Logout</a>
  </nav>
  `;
  document.body.prepend(header);

  // Simulate fetching username from backend
  fetch("/api/user")
    .then(res => res.json())
    .then(data => {
      document.getElementById("username-display").textContent = `Hi, ${data.username}`;
    })
    .catch(() => {
      document.getElementById("username-display").textContent = "Hi, Guest";
    });

  // Logout handler
  document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    fetch("/api/logout", { method: "POST" })
      .then(() => window.location.href = "login.html");
  });
});
