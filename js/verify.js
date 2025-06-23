document.addEventListener("DOMContentLoaded", () => {
  const otpInputs = document.querySelectorAll(".otp-input");
  const submitButton = document.querySelector(".submit-button");
  const timerDisplay = document.getElementById("timer");
  const resendCodeButton = document.getElementById("resend-code");
  const verificationDetail = document.getElementById("verification-detail");

  console.log("🚀 Verification Page Loaded! Elements:", {
    verificationDetail,
    submitButton,
    resendCodeButton
  });

  if (!verificationDetail || !submitButton || !resendCodeButton) {
    console.error("❌ Some elements are missing! Check HTML for correct IDs.");
    return; // Stop execution if elements are missing
  }

  let countdown = 60;
  let otpCode = "123456"; // Simulated OTP
  let timerInterval;

  // **Retrieve User-Entered Email or Phone**
  let verificationType = sessionStorage.getItem("verificationType");
  let userEmail = sessionStorage.getItem("userEmail");
  let userPhone = sessionStorage.getItem("userPhone");

  // Handle missing values properly
  if (!userEmail && !userPhone) {
    console.warn("⚠ No user email or phone found in sessionStorage!");
    userEmail = "not provided";
    userPhone = "not provided";
  }

  console.log("🔎 Loaded user data:", { userEmail, userPhone, verificationType });

  // **Mask Email or Phone for Security**
  const maskData = (data, type) => {
    if (!data || data === "not provided") return "******";
    return type === "email"
      ? `${data.split("@")[0].slice(0, 3)}********@${data.split("@")[1]}`
      : `${data.slice(0, 3)}******${data.slice(-2)}`;
  };

  // **Display Verification Details Based on User Selection**
  if (verificationType === "email") {
    verificationDetail.textContent = `Verification code sent to ${maskData(userEmail, "email")}`;
  } else {
    verificationDetail.textContent = `Verification code sent to ${maskData(userPhone, "phone")}`;
  }

  // **Start Timer**
  const startTimer = () => {
    clearInterval(timerInterval);
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

  startTimer(); // Start countdown on page load

  // Auto-focus & navigation for OTP fields
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

  // Restrict OTP input to numbers only
  otpInputs.forEach(input => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^0-9]/g, "");
    });
  });

  // **OTP Submission & Validation**
  submitButton.addEventListener("click", () => {
    let enteredOTP = Array.from(otpInputs).map(input => input.value).join("");

    if (enteredOTP === otpCode) {
      alert("✅ OTP Verified Successfully!");
    } else {
      alert("❌ Incorrect OTP, please try again!");
    }
  });

  // **Fix Resend OTP**
  resendCodeButton.addEventListener("click", () => {
    alert("📩 New OTP has been sent!");
    startTimer();
  });
});
