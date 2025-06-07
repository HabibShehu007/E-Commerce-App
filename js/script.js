document.addEventListener("DOMContentLoaded", function () {
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
    // Initialize first step as active
    onboardingSteps[0].classList.add("active");
    
    // Set up initial centering
    centerOnboarding();

    // ===== SPLASH SCREEN TRANSITION =====
    setTimeout(() => {
        splashScreen.style.opacity = "0";
        
        setTimeout(() => {
            splashScreen.style.display = "none";
            onboardingScreen.style.display = "flex";
            
            // Recalculate centering after showing onboarding
            setTimeout(centerOnboarding, 50);
        }, 500);
    }, 3000);

    // ===== STEP MANAGEMENT =====
function showOnboardingStep(stepIndex) {
    // Validate step index
    if (stepIndex < 0 || stepIndex >= totalSteps) return;

    // Add exit animation to current active step
    const currentActive = document.querySelector('.onboarding-step.active');
    if (currentActive) {
        currentActive.classList.add('exit');
        currentActive.classList.remove('active');
        
        // Remove exit class after animation completes
        setTimeout(() => {
            currentActive.classList.remove('exit');
        }, 400); // Matches CSS animation duration
    }

    // Show new step
    onboardingSteps[stepIndex].classList.add('active');
    
    // Update progress dots
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
        onboardingScreen.style.opacity = "0";
        setTimeout(() => {
            onboardingScreen.style.display = "none";
            console.log("Onboarding completed!");
        }, 500);
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
});