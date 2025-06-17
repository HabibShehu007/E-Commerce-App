// Kill any zombie spinners on page load
document.addEventListener("DOMContentLoaded", function () {
    const zombieSpinner = document.getElementById("loading-overlay");
    if (zombieSpinner) {
        zombieSpinner.style.display = "none";
        zombieSpinner.style.opacity = "0";
    }
});

// ===== DOM ELEMENTS =====
const splashScreen = document.getElementById("splash-screen");
const onboardingScreen = document.getElementById("onboarding-screen");
const onboardingContainer = document.querySelector(".onboarding-container");
const onboardingSteps = document.querySelectorAll(".onboarding-step");
const nextBtn = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");
const progressDots = document.querySelectorAll(".progress-dots .dot");

// ===== STATE MANAGEMENT =====
let currentStep = 0;
const totalSteps = onboardingSteps.length;

// ===== CENTERING FUNCTION =====
function centerOnboarding() {
    const windowHeight = window.innerHeight;
    const containerHeight = onboardingContainer.offsetHeight;

    if (containerHeight > windowHeight) {
        onboardingContainer.style.justifyContent = "flex-start";
        onboardingContainer.style.paddingTop = "20px";
        onboardingContainer.style.paddingBottom = "20px";
    } else {
        onboardingContainer.style.justifyContent = "center";
        onboardingContainer.style.paddingTop = "40px";
        onboardingContainer.style.paddingBottom = "40px";
    }
}

// ===== INITIAL SETUP =====
onboardingSteps[0].classList.add("active");
centerOnboarding();

// ===== SPLASH SCREEN TRANSITION =====
setTimeout(() => {
    splashScreen.style.opacity = "0";

    setTimeout(() => {
        splashScreen.style.display = "none";
        onboardingScreen.style.display = "flex";
        setTimeout(centerOnboarding, 50);
    }, 300); // Faster transition timing
}, 2000); // Reduced splash delay for snappier experience

// ===== STEP MANAGEMENT =====
function showOnboardingStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= totalSteps) return;

    const currentActive = document.querySelector('.onboarding-step.active');
    if (currentActive) {
        currentActive.classList.add('exit');
        currentActive.classList.remove('active');

        setTimeout(() => {
            currentActive.classList.remove('exit');
            currentActive.style.display = "none"; // Fix lingering visibility issue
        }, 350);
    }

    onboardingSteps[stepIndex].classList.add('active');
    onboardingSteps[stepIndex].style.display = "block"; // Ensure new step is visible

    // Update progress dots instantly
    progressDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === stepIndex);
    });

    // Update button visibility
    nextBtn.style.display = stepIndex === totalSteps - 1 ? 'none' : 'block';
    startBtn.style.display = stepIndex === totalSteps - 1 ? 'block' : 'none';
}

// ===== EVENT LISTENERS =====
nextBtn.addEventListener("click", () => {
    if (currentStep < totalSteps - 1) {
        currentStep++;
        showOnboardingStep(currentStep);
    }
});

startBtn.addEventListener("click", () => {
    console.log("🚀 Get Started button clicked! Attempting redirect...");

    const loadingOverlay = document.getElementById("loading-overlay");
    if (!loadingOverlay) {
        console.error("❌ loading-overlay element NOT FOUND!");
        return;
    }

    loadingOverlay.style.display = "flex";
    setTimeout(() => loadingOverlay.style.opacity = "1", 10);

    onboardingScreen.style.opacity = "0";

    setTimeout(() => {
        console.log("✅ Redirecting NOW...");
        window.location.href = "pages/registration.html";  
    }, 3500);
});



// ===== WINDOW RESIZE HANDLER =====
window.addEventListener("resize", centerOnboarding);

// ===== KEYBOARD NAVIGATION =====
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && currentStep < totalSteps - 1) {
        currentStep++;
        showOnboardingStep(currentStep);
    } else if (e.key === "ArrowLeft" && currentStep > 0) {
        currentStep--;
        showOnboardingStep(currentStep);
    }
});
