document.addEventListener("DOMContentLoaded", () => {
  // 1. Get and mask the stored phone number
     const phone = sessionStorage.getItem("userPhone");
const display = document.querySelector(".masked-number");

if (phone && display && phone.length >= 13) {
  const masked = phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{4})/, "$1 *** *** $4");
  display.textContent = `Enter Code sent to : ${masked}`;
} else if (display) {
  display.textContent = `Code sent to your phone number`;
}


  // 2. Autofocus & tab between OTP inputs
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
  const OTP = "123456";
  const verifyBtn = document.querySelector(".submit-button");

  verifyBtn.addEventListener("click", () => {
    const entered = Array.from(otpInputs).map(input => input.value.trim()).join("");

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

  // 4. Start resend code timer
  const resendBtn = document.getElementById("resend-code");
  if (resendBtn) {
    resendBtn.innerHTML = 'Resend Code in <span id="timer">60</span>s';
    const timerDisplay = document.getElementById("timer");
    startCountdown(60, timerDisplay, resendBtn);

    resendBtn.addEventListener("click", () => {
      showToast("🔁 OTP re-sent!");
      resendBtn.innerHTML = 'Resend Code in <span id="timer">60</span>s';
      const newTimer = document.getElementById("timer");
      startCountdown(60, newTimer, resendBtn);
    });
  }

  // 5. Modal close logic
  const closeBtn = document.getElementById("otp-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const modal = document.getElementById("otp-feedback-modal");
      modal.style.display = "none";

      const title = document.getElementById("otp-feedback-title");
      if (title.textContent === "OTP Verified!") {
        setTimeout(() => {
          window.location.href = "dashboard.html"; // redirect after close
        }, 300);
      }
    });
  }
});

// Countdown
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

// Feedback modal
function showModal(type) {
  const modal = document.getElementById("otp-feedback-modal");
  const icon = document.getElementById("otp-feedback-icon");
  const title = document.getElementById("otp-feedback-title");
  const message = document.getElementById("otp-feedback-message");

  if (type === "success") {
    icon.textContent = "✅";
    title.textContent = "OTP Verified!";
    message.textContent = "Your phone number has been successfully verified.";
  } else {
    icon.textContent = "❌";
    title.textContent = "Incorrect OTP";
    message.textContent = "The code you entered is invalid. Please try again.";
  }

  modal.style.display = "flex";
}

// Toast animation
function showToast(msg) {
  const toast = document.getElementById("otp-toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
