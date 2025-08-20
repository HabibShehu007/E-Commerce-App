//  Update Country Flag Image & Code Automatically 
document.getElementById("country-code").addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    const selectedFlag = document.getElementById("selected-flag");

    // Update flag image dynamically
    selectedFlag.src = selectedOption.getAttribute("data-flag");

    // Auto-fill country code in phone input
    document.getElementById("phone").value = selectedOption.value + " ";
});

//  Fix Password Toggle Visibility 
document.querySelectorAll(".password-toggle").forEach(toggle => {
    toggle.addEventListener("click", function () {
        const input = this.parentElement.querySelector("input[type='password']");
        if (input.type === "password") {
            input.type = "text";
            this.innerHTML = '<i class="fa fa-eye-slash"></i>';
        } else {
            input.type = "password";
            this.innerHTML = '<i class="fa fa-eye"></i>';
        }
    });
});

//  Smooth Page Landing Animation
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "1";
});

// Basic Form Validation & Show Modal After Submission 
document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default submission
    
    const fullName = document.getElementById("full-name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const termsAccepted = document.getElementById("terms").checked;

    if (!fullName || !phone || !email || !password || !confirmPassword) {
        alert("All fields must be filled out.");
        return;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if (!termsAccepted) {
        alert("You must agree to the Terms & Privacy Policy.");
        return;
    }

    // Store user data for verification
    sessionStorage.setItem("userEmail", email);
    sessionStorage.setItem("userPhone", phone);

    //  Store email in localStorage for Apple/Google buttons
    localStorage.setItem("registeredEmail", email);

    // Show verification modal
    const modal = document.getElementById("verification-modal");
    modal.classList.add("active"); 
    document.body.classList.add("modal-active");
    modal.style.pointerEvents = "auto"; 
});

//  Prevent Modal from Closing Automatically 
document.getElementById("verification-modal").addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent unintended dismissals
});

//  Handle Verification Method Selection & Redirect to Correct Page 
document.getElementById("verify-phone").addEventListener("click", function () {
    sessionStorage.setItem("verificationType", "phone"); // Store user's choice
    setTimeout(() => document.body.classList.remove("modal-active"), 500); 
    window.location.href = "verifyphone.html"; // !
});

document.getElementById("verify-email").addEventListener("click", function () {
    sessionStorage.setItem("verificationType", "email"); // 
    setTimeout(() => document.body.classList.remove("modal-active"), 500); // 
    window.location.href = "verifyemail.html"; 
});

const confirmModal = document.getElementById("confirmationModal");
const confirmTitle = document.getElementById("confirmTitle");
const confirmMessage = document.getElementById("confirmMessage");
const confirmOK = document.getElementById("confirmOK");
const confirmCancel = document.getElementById("confirmCancel");

let redirectToDashboard = false;

function showConfirmation(title, message, shouldRedirect = false) {
  confirmTitle.textContent = title;
  confirmMessage.textContent = message;
  redirectToDashboard = shouldRedirect;
  confirmModal.style.display = "flex";
}

confirmOK.addEventListener("click", function () {
  confirmModal.style.display = "none";
  if (redirectToDashboard) {
    window.location.href = "dashboard.html";
  }
});

confirmCancel.addEventListener("click", function () {
  confirmModal.style.display = "none";
  redirectToDashboard = false;
});

document.querySelector(".google-btn").addEventListener("click", function () {
  const email = localStorage.getItem("registeredEmail");
  if (email) {
    showConfirmation("Google Account Found", `Sign up with ${email}?`, true);
  } else {
    showConfirmation("No Email Found", "Please sign up first.");
  }
});

document.querySelector(".apple-btn").addEventListener("click", function () {
  const email = localStorage.getItem("registeredEmail");
  if (email) {
    const appleEmail = email.replace(/@.*$/, "@icloud.com");
    showConfirmation("Apple ID Found", `Sign up with ${appleEmail}?`, true);
  } else {
    showConfirmation("No Email Found", "Please sign up first.");
  }
});
