document.addEventListener("DOMContentLoaded", () => {
  // 1. Get and mask the stored email
  const email = sessionStorage.getItem("userEmail");
  const display = document.querySelector(".masked-email");

  if (email && display) {
    const masked = maskEmail(email);
    display.textContent = `Code sent to: ${masked}`;
  }

  // 2. Autofocus and tab between OTP inputs
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

  // 3. OTP verification logic
  const OTP = "654321"; // Demo OTP
  const verifyBtn = document.querySelector(".submit-button");

  verifyBtn.addEventListener("click", () => {
    const entered = Array.from(otpInputs)
      .map(input => input.value.trim())
      .join("");

    if (entered === OTP) {
      showModal("success");
    } else {
      showModal("error");
      otpInputs.forEach(input => {
        input.classList.add("shake");
        input.value = "";
      });
      otpInputs[0].focus();
      setTimeout(() => {
        otpInputs.forEach(input => input.classList.remove("shake"));
      }, 400);
    }
  });

  // 4. Resend button logic
  const resendBtn = document.getElementById("resend-code");

  if (resendBtn) {
    resendBtn.innerHTML = 'Resend Code in <span id="timer">60</span>s';
    const timerDisplay = document.getElementById("timer");
    startCountdown(60, timerDisplay, resendBtn);

    resendBtn.addEventListener("click", () => {
      showToast("📧 Code re-sent to your email!");
      resendBtn.innerHTML = 'Resend Code in <span id="timer">60</span>s';
      const newTimer = document.getElementById("timer");
      startCountdown(60, newTimer, resendBtn);
    });
  }

  // 5. Modal Close Button
  const closeBtn = document.getElementById("otp-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const modal = document.getElementById("otp-feedback-modal");
      modal.style.display = "none";

      const title = document.getElementById("otp-feedback-title");
      if (title.textContent.includes("Verified")) {
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 300);
      }
    });
  }
});

// Utility: Email masking logic
function maskEmail(email) {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  const visible = user.slice(0, 3);
  const masked = visible + "*".repeat(user.length - 3);
  return `${masked}@${domain}`;
}

// Utility: Countdown logic
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

// Utility: Modal Feedback
function showModal(type) {
  const modal = document.getElementById("otp-feedback-modal");
  const icon = document.getElementById("otp-feedback-icon");
  const title = document.getElementById("otp-feedback-title");
  const message = document.getElementById("otp-feedback-message");

  if (type === "success") {
    icon.textContent = "✅";
    title.textContent = "Email Verified!";
    message.textContent = "Your email has been successfully verified.";
  } else {
    icon.textContent = "❌";
    title.textContent = "Incorrect Code";
    message.textContent = "The code entered is invalid. Please try again.";
  }

  modal.style.display = "flex";
}

// Utility: Toast Notification
function showToast(msg) {
  const toast = document.getElementById("otp-toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

