//  DOM ELEMENTS 
const splashScreen = document.getElementById("splash-screen");
const onboardingScreen = document.getElementById("onboarding-screen");
const onboardingContainer = document.querySelector(".onboarding-container");
const onboardingSteps = document.querySelectorAll(".onboarding-step");
const nextBtn = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");
const progressDots = document.querySelectorAll(".progress-dots .dot");
const loadingOverlay = document.getElementById("loading-overlay");

//  STATE MANAGEMENT 
let currentStep = 0;
const totalSteps = onboardingSteps.length;

//  CENTERING FUNCTION 
function centerOnboarding() {
  const windowHeight = window.innerHeight;
  const containerHeight = onboardingContainer.offsetHeight;

  onboardingContainer.style.justifyContent =
    containerHeight > windowHeight ? "flex-start" : "center";
  onboardingContainer.style.paddingTop = containerHeight > windowHeight ? "20px" : "40px";
  onboardingContainer.style.paddingBottom = containerHeight > windowHeight ? "20px" : "40px";
}

//  SPLASH + ZOMBIE CLEANUP 
document.addEventListener("DOMContentLoaded", function () {
  if (loadingOverlay) {
    loadingOverlay.style.display = "none";
    loadingOverlay.style.opacity = "0";
  }

  splashScreen.style.opacity = "1";
  splashScreen.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    requestAnimationFrame(() => {
      splashScreen.style.opacity = "0";
    });

    setTimeout(() => {
      splashScreen.style.display = "none";
      onboardingScreen.style.display = "flex";
      onboardingScreen.style.opacity = "0";
      onboardingScreen.style.transition = "opacity 0.5s ease";

      requestAnimationFrame(() => {
        onboardingScreen.style.opacity = "1";
      });

      setTimeout(centerOnboarding, 100);
    }, 600);
  }, 1800);
});

//  INITIAL SETUP 
onboardingSteps[0].classList.add("active");
centerOnboarding();

//  STEP MANAGEMENT 
function showOnboardingStep(stepIndex) {
  if (stepIndex < 0 || stepIndex >= totalSteps) return;

  const currentActive = document.querySelector(".onboarding-step.active");
  if (currentActive) {
    currentActive.classList.add("exit");
    currentActive.classList.remove("active");

    setTimeout(() => {
      currentActive.classList.remove("exit");
      currentActive.style.display = "none";
    }, 350);
  }

  onboardingSteps[stepIndex].classList.add("active");
  onboardingSteps[stepIndex].style.display = "block";

  progressDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === stepIndex);
  });

  nextBtn.style.display = stepIndex === totalSteps - 1 ? "none" : "block";
  startBtn.style.display = stepIndex === totalSteps - 1 ? "block" : "none";
}

//  EVENT LISTENERS 
nextBtn.addEventListener("click", () => {
  if (currentStep < totalSteps - 1) {
    currentStep++;
    showOnboardingStep(currentStep);
  }
});

startBtn.addEventListener("click", () => {
  console.log("🚀 Get Started button clicked! Attempting redirect...");

  if (!loadingOverlay) {
    console.error("❌ loading-overlay element NOT FOUND!");
    return;
  }

  // Turn on overlay + fade in
  loadingOverlay.style.display = "flex";
  setTimeout(() => {
    loadingOverlay.style.opacity = "1";
    setTimeout(() => {
      document.body.style.filter = "blur(4px) grayscale(0.2)";
    }, 100);
  }, 10);

  onboardingScreen.style.opacity = "0";
  onboardingScreen.style.pointerEvents = "none";

  setTimeout(() => {
    console.log("✅ Redirecting NOW...");
    document.body.style.filter = "none";
    window.location.href = "pages/registration.html";
  }, 3500);
});


// WINDOW RESIZE 
window.addEventListener("resize", centerOnboarding);

// KEYBOARD NAVIGATION 
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" && currentStep < totalSteps - 1) {
    currentStep++;
    showOnboardingStep(currentStep);
  } else if (e.key === "ArrowLeft" && currentStep > 0) {
    currentStep--;
    showOnboardingStep(currentStep);
  }
});
