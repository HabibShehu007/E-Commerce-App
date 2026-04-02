document.addEventListener("DOMContentLoaded", () => {
  loadUserProfile();
});

function loadUserProfile() {
  // ✅ Parse the registeredUser object from localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("registeredUser"));
  } catch (e) {
    console.error("No registeredUser found in localStorage");
  }

  // ✅ Fallbacks if nothing is found
  const username = (user && user.username) || "Guest";
  const fullName = (user && user.fullName) || "Unknown User";
  const email =
    (user && user.email) ||
    sessionStorage.getItem("userEmail") ||
    "guest@velora.com";
  const phone =
    (user && user.phone) || sessionStorage.getItem("userPhone") || "N/A";
  const avatar = (user && user.avatar) || "/images/default-avatar.webp";

  // ✅ Update DOM
  setText("profile-username", username);
  setText("profile-fullname", fullName);
  setText("profile-email", email);
  setText("profile-phone", phone);
  setAvatar("user-avatar", avatar);

  // ✅ Store username for dashboard greeting
  localStorage.setItem("loggedInUser", username);
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
      img.src = "/public/images/default-avatar.webp";
    };
  }
}
