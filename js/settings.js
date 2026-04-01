// 🚀 DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ settings.js loaded and synced with modals");
});

// 🧊 Open modal by action name (matches modal IDs like 'modal-email')
function openModal(action) {
  const modal = document.getElementById(`modal-${action}`);
  if (modal) {
    modal.style.display = "block";
  } else {
    console.warn(`⚠️ Modal with ID 'modal-${action}' not found.`);
  }
}

// ❌ Close modal by action name
function closeModal(action) {
  const modal = document.getElementById(`modal-${action}`);
  if (modal) {
    modal.style.display = "none";
  } else {
    console.warn(`⚠️ Modal with ID 'modal-${action}' not found.`);
  }
}

// 🧠 Handle form submission
function handleFormSubmit(formId, endpoint) {
  const form = document.getElementById(formId);
  if (!form) {
    console.warn(`⚠️ Form with ID '${formId}' not found.`);
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (!validateForm(payload)) {
      showFeedback("Please fill all fields correctly.", "error");
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        showFeedback("✅ Settings updated successfully!", "success");
        form.reset();

        // 🧼 Auto-close modal after success
        const action = formId.replace("form-", "");
        closeModal(action);
      } else {
        showFeedback(result.message || "Something went wrong.", "error");
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      showFeedback("Network error. Try again later.", "error");
    }
  });
}

// 🔍 Basic validation
function validateForm(data) {
  for (let key in data) {
    if (!data[key]) return false;
  }

  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) return false;
  if (data.password && data.password.length < 6) return false;

  return true;
}

// 📣 Feedback system
function showFeedback(message, type = "info") {
  const feedback = document.createElement("div");
  feedback.className = `feedback ${type}`;
  feedback.textContent = message;

  document.body.appendChild(feedback);
  setTimeout(() => feedback.remove(), 4000);
}
