document.addEventListener("DOMContentLoaded", () => {
  const phone = sessionStorage.getItem("userPhone");
  const display = document.querySelector(".masked-number");

  if (phone && display && phone.length >= 13) {
    const masked = phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{4})/, "$1 *** *** $4");
    display.textContent = `Enter Code sent to : ${masked}`;
  } else if (display) {
    display.textContent = `Code sent to your phone number`;
  }

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

  const verifyBtn = document.querySelector(".submit-button");
  verifyBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const enteredOTP = Array.from(otpInputs).map(input => input.value.trim()).join("");

    if (!enteredOTP || enteredOTP.length !== 6) {
      showErrorModal("Please enter all 6 digits.");
      return;
    }

    // Simulated backend verification
    setTimeout(() => {
      if (enteredOTP === "123456") {
        showModal("success");
      } else {
        showErrorModal("Invalid OTP. Try again.");
        otpInputs.forEach(input => {
          input.classList.add("shake");
          input.value = "";
        });
        otpInputs[0].focus();
        setTimeout(() => {
          otpInputs.forEach(input => input.classList.remove("shake"));
        }, 400);
      }
    }, 800); // Simulate network delay
  });

  const resendBtn = document.getElementById("resend-code");
  if (resendBtn) {
    resendBtn.innerHTML = 'Resend Code in <span id="timer">60</span>s';
    const timerDisplay = document.getElementById("timer");
    startCountdown(60, timerDisplay, resendBtn);

    resendBtn.addEventListener("click", async () => {
      // Simulated resend logic
      setTimeout(() => {
        showToast("🔁 OTP re-sent!");
        resendBtn.innerHTML = 'Resend Code in <span id="timer">60</span>s';
        const newTimer = document.getElementById("timer");
        startCountdown(60, newTimer, resendBtn);
      }, 500); // Simulate resend delay
    });
  }

  const closeBtn = document.getElementById("otp-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const modal = document.getElementById("otp-feedback-modal");
      const loader = document.getElementById("otp-loader");

      closeBtn.style.display = "none";
      if (loader) loader.style.display = "block";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    });
  }
});

// Countdown function
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

// Success Modal
function showModal(type) {
  const modal = document.getElementById("otp-feedback-modal");
  const icon = document.getElementById("otp-feedback-icon");
  const title = document.getElementById("otp-feedback-title");
  const message = document.getElementById("otp-feedback-message");
  const loader = document.getElementById("otp-loader");
  const closeBtn = document.getElementById("otp-close-btn");

  if (type === "success") {
    icon.textContent = "🎉";
    title.textContent = "Verification Complete!";
    message.textContent = "Your account is good to go ✅";
    if (loader) loader.style.display = "none";
    if (closeBtn) {
      closeBtn.textContent = "Continue";
      closeBtn.style.display = "inline-block";
    }
  }

  modal.style.display = "flex";
}

// Error Modal
function showErrorModal(msg = "Invalid OTP. Try again.") {
  const modal = document.getElementById("otp-feedback-modal");
  const icon = document.getElementById("otp-feedback-icon");
  const title = document.getElementById("otp-feedback-title");
  const message = document.getElementById("otp-feedback-message");
  const loader = document.getElementById("otp-loader");
  const closeBtn = document.getElementById("otp-close-btn");

  icon.textContent = "❌";
  title.textContent = "Verification Failed";
  message.textContent = msg;
  if (loader) loader.style.display = "none";
  if (closeBtn) {
    closeBtn.textContent = "Retry";
    closeBtn.style.display = "inline-block";
    closeBtn.onclick = () => location.reload();
  }

  modal.style.display = "flex";
}

// Toast
function showToast(msg) {
  const toast = document.getElementById("otp-toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
