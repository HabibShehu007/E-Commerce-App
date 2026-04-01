document.addEventListener("DOMContentLoaded", () => {
  // 1️⃣ Masked Email Display
  const email = sessionStorage.getItem("userEmail");
  const display = document.querySelector(".masked-email");
  if (email && display) {
    display.textContent = `Code sent to: ${maskEmail(email)}`;
  }

  // 2️⃣ OTP Input Navigation
  const otpInputs = document.querySelectorAll(".otp-input");
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // 3️⃣ OTP Verification Logic
  const verifyBtn = document.querySelector(".submit-button");
  const OTP = "654321"; // demo code
  const loader = document.getElementById("otp-loader");

  verifyBtn.addEventListener("click", () => {
    const entered = Array.from(otpInputs).map(i => i.value.trim()).join("");
    loader.style.display = "block";

    setTimeout(() => {
      loader.style.display = "none";
      if (entered === OTP) {
        showModal("success");
      } else {
        showErrorModal();
        otpInputs.forEach(input => {
          input.classList.add("shake");
          input.value = "";
        });
        otpInputs[0].focus();
        setTimeout(() => {
          otpInputs.forEach(input => input.classList.remove("shake"));
        }, 400);
      }
    }, 1000);
  });

  // 4️⃣ Resend Code Timer
  const resendBtn = document.getElementById("resend-code");
  if (resendBtn) {
    resendBtn.innerHTML = 'Resend Code in <span id="timer">60</span>s';
    const timerDisplay = document.getElementById("timer");
    startCountdown(60, timerDisplay, resendBtn);

    resendBtn.addEventListener("click", () => {
      showToast("📧 Code re-sent to your email!");
      resendBtn.innerHTML = 'Resend Code in <span id="timer">60</span>s';
      startCountdown(60, document.getElementById("timer"), resendBtn);
    });
  }

  // 5️⃣ Continue / Retry Button Logic
  const closeBtn = document.getElementById("otp-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const modal = document.getElementById("otp-feedback-modal");
      const loader = document.getElementById("otp-loader");
      const title = document.getElementById("otp-feedback-title");

      if (title.textContent.includes("Email Verification Complete!")) {
        closeBtn.style.display = "none";
        loader.style.display = "block";
        modal.classList.add("fade-out");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);
      } else {
        location.reload(); // Retry on error
      }
    });
  }
});

// 🔤 Email Masking
function maskEmail(email) {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  const masked = user.slice(0, 3) + "*".repeat(user.length - 3);
  return `${masked}@${domain}`;
}

// ⏱ Countdown Timer
function startCountdown(duration, display, button) {
  let timer = duration;
  button.disabled = true;
  display.textContent = timer;
  const interval = setInterval(() => {
    timer--;
    display.textContent = timer;
    if (timer <= 0) {
      clearInterval(interval);
      button.disabled = false;
      button.textContent = "Resend Code";
    }
  }, 1000);
}

// 🎉 Success Modal
function showModal(type) {
  const modal = document.getElementById("otp-feedback-modal");
  const icon = document.getElementById("otp-feedback-icon");
  const title = document.getElementById("otp-feedback-title");
  const message = document.getElementById("otp-feedback-message");
  const loader = document.getElementById("otp-loader");
  const closeBtn = document.getElementById("otp-close-btn");

  if (type === "success") {
    icon.textContent = "🎉";
    title.textContent = "Email Verification Complete!";
    message.textContent = "Your account is good to go ✅";
    loader.style.display = "none";
    closeBtn.textContent = "Continue";
    closeBtn.style.display = "inline-block";
  }

  modal.style.display = "flex";
}

// ❌ Error Modal
function showErrorModal() {
  const modal = document.getElementById("otp-feedback-modal");
  const icon = document.getElementById("otp-feedback-icon");
  const title = document.getElementById("otp-feedback-title");
  const message = document.getElementById("otp-feedback-message");
  const loader = document.getElementById("otp-loader");
  const closeBtn = document.getElementById("otp-close-btn");

  icon.textContent = "❌";
  title.textContent = "Incorrect Code";
  message.textContent = "The code you entered is invalid. Please try again.";
  loader.style.display = "none";
  closeBtn.textContent = "Retry";
  closeBtn.style.display = "inline-block";

  modal.style.display = "flex";
}

// 📣 Toast Notification
function showToast(msg) {
  const toast = document.getElementById("otp-toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
