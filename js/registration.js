// ===== Update Country Flag Image & Code Automatically =====
document.getElementById("country-code").addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    const selectedFlag = document.getElementById("selected-flag");

    // Update flag image dynamically
    selectedFlag.src = selectedOption.getAttribute("data-flag");

    // Auto-fill country code in phone input
    document.getElementById("phone").value = selectedOption.value + " ";
});

// ===== Fix Password Toggle Visibility =====
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

// ===== Smooth Page Landing Animation =====
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "1";
});

// ===== Basic Form Validation & Show Modal After Submission =====
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

    // Show verification modal instead of submitting
    const modal = document.getElementById("verification-modal");
    modal.classList.add("active"); // Show modal with animation
    document.body.classList.add("modal-active"); // Apply focus mode
    modal.style.pointerEvents = "auto"; // Ensure modal remains clickable
});

// ===== Prevent Modal from Closing Automatically =====
document.getElementById("verification-modal").addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent unintended dismissals
});

// ===== Handle Verification Method Selection & Redirect to Single Page =====
document.getElementById("verify-phone").addEventListener("click", function () {
    sessionStorage.setItem("verificationType", "phone"); // Store user's choice
    setTimeout(() => document.body.classList.remove("modal-active"), 500); // Smoothly remove focus effect
    window.location.href = "verify.html"; // Redirect to single verification page
});

document.getElementById("verify-email").addEventListener("click", function () {
    sessionStorage.setItem("verificationType", "email"); // Store user's choice
    setTimeout(() => document.body.classList.remove("modal-active"), 500); // Smoothly remove focus effect
    window.location.href = "verify.html"; // Redirect to single verification page
});

// ===== Update Verification Page Based on User Selection =====
document.addEventListener("DOMContentLoaded", function () {
    const verificationType = sessionStorage.getItem("verificationType");

    if (verificationType === "phone") {
        document.getElementById("verification-method").textContent = "Phone Number";
        document.getElementById("verification-detail").textContent = "+234 *** *** 1234"; // Example phone
    } else if (verificationType === "email") {
        document.getElementById("verification-method").textContent = "Email Address";
        document.getElementById("verification-detail").textContent = "T*********@gmail.com"; // Example email
    }
});
