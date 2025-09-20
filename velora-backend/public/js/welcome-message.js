document.addEventListener("DOMContentLoaded", async () => {
  const welcomeEl = document.getElementById("welcomeMessage");
  const token = localStorage.getItem("authToken");

  if (!token || !welcomeEl) {
    welcomeEl.innerHTML = `Welcome back, <strong>Guest</strong> 👋`;
    return;
  }

  try {
    const response = await fetch("/api/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const result = await response.json();
    if (response.ok && result.success && result.user?.username) {
      const username = result.user.username;
      localStorage.setItem("loggedInUser", username); // optional caching
      welcomeEl.innerHTML = `Welcome back, <strong>${username}</strong> 👋`;
    } else {
      welcomeEl.innerHTML = `Welcome back, <strong>Guest</strong> 👋`;
    }
  } catch (err) {
    console.error("Failed to fetch profile:", err);
    welcomeEl.innerHTML = `Welcome back, <strong>Guest</strong> 👋`;
  }
});
