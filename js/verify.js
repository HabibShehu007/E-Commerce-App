document.addEventListener("DOMContentLoaded", () => {
  const otpInputs = document.querySelectorAll(".otp-input");
  const submitButton = document.querySelector(".submit-button");
  const timerDisplay = document.getElementById("timer");
  const resendCodeButton = document.getElementById("resend-code");
  const verificationMethodSpan = document.getElementById("verification-method");
  const verificationDetail = document.getElementById("verification-detail");

  let countdown = 60;
  let otpCode = "12345"; // Simulated OTP for demo purposes
  let timerInterval;

  // Simulated user data
  let userEmail = "habib@example.com";
  let userPhone = "09123456700";

  // Retrieve verification method or default to phone
  let verificationMethod = localStorage.getItem("verificationMethod") || "phone";

  // **Fix Timer Issue** → Ensure it starts correctly on page load
  const startTimer = () => {
    clearInterval(timerInterval); // Stop any previous timer
    countdown = 60;
    timerDisplay.textContent = `Code expires in ${countdown}s`;
    resendCodeButton.disabled = true;

    timerInterval = setInterval(() => {
      countdown--;
      timerDisplay.textContent = `Code expires in ${countdown}s`;

      if (countdown <= 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = "Code expired. Request a new one.";
        resendCodeButton.disabled = false;
      }
    }, 1000);
  };

  // **Ensure Timer Starts on Page Load**
  startTimer();

  // **Fix User Selection Issue** → Ensure UI updates properly
  const maskData = (data, type) => {
    if (type === "email") {
      let parts = data.split("@");
      return `${parts[0].slice(0, 3)}********@${parts[1]}`;
    } else {
      return `${data.slice(0, 3)}******${data.slice(-2)}`;
    }
  };

  const updateVerificationUI = () => {
    verificationMethod = localStorage.getItem("verificationMethod") || "phone";

    if (verificationMethod === "email") {
      verificationMethodSpan.textContent = `email (${maskData(userEmail, "email")})`;
      verificationDetail.textContent = `Verification code sent to ${maskData(userEmail, "email")}`;
    } else {
      verificationMethodSpan.textContent = `phone number (${maskData(userPhone, "phone")})`;
      verificationDetail.textContent = `Verification code sent to ${maskData(userPhone, "phone")}`;
    }
  };

  // **Ensure UI Updates Instantly**
  updateVerificationUI();

  // **Fix Selection Switching Issue**
  document.getElementById("email-option").addEventListener("click", () => {
    localStorage.setItem("verificationMethod", "email");
    updateVerificationUI();
  });

  document.getElementById("phone-option").addEventListener("click", () => {
    localStorage.setItem("verificationMethod", "phone");
    updateVerificationUI();
  });

  // Auto-focus & navigation
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (event) => {
      if (event.target.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && index > 0 && !input.value) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // Restrict input to numbers only
  otpInputs.forEach(input => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^0-9]/g, "");
    });
  });

  // OTP Submission & Validation
  submitButton.addEventListener("click", () => {
    let enteredOTP = Array.from(otpInputs).map(input => input.value).join("");

    if (enteredOTP === otpCode) {
      alert("✅ OTP Verified Successfully!");
    } else {
      alert("❌ Incorrect OTP, please try again!");
    }
  });

  // **Fix Resend OTP Issue** → Ensure new OTP request resets everything correctly
  resendCodeButton.addEventListener("click", () => {
    alert("📩 New OTP has been sent!");
    startTimer(); // Restart timer correctly
  });
});
