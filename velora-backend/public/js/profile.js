document.addEventListener("DOMContentLoaded", () => {
  loadUserProfile();
});

async function loadUserProfile() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("No token found");
    window.location.href = "/pages/login.html";
    return;
  }

  try {
   const response = await fetch("/api/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json();
    if (!response.ok || !result.success || !result.user) {
      throw new Error("Invalid profile response");
    }

    const user = result.user;
    console.log("Fetched user:", user);

    localStorage.setItem("loggedInUser", user.username); // ✅ Store for dashboard greeting

    setText("profile-username", user.username);
    setText("profile-fullname", user.fullName);
    setText("profile-email", user.email);
    setText("profile-phone", user.phone);
    setAvatar("user-avatar", user.avatar);

  } catch (error) {
    console.error("Error loading profile:", error);
    showFallbackProfile();
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setAvatar(id, src) {
  const img = document.getElementById(id);
  if (img) {
    img.src = src;
    img.onerror = () => {
      img.src = "/images/default-avatar.webp";
    };
  }
}

function showFallbackProfile() {
  setText("profile-username", "Guest");
  setText("profile-fullname", "Unknown User");
  setText("profile-email", "guest@velora.com");
  setText("profile-phone", "N/A");
  setAvatar("user-avatar", "/images/default-avatar.webp");
}
