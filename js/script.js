// === DOM ELEMENTS ===
const arrowDown = document.querySelector("#welcome .fa-arrow-down");

// === Smooth Scroll for Arrow ===
if (arrowDown) {
  arrowDown.addEventListener("click", () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// === Reveal on Scroll ===
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal"); // target ALL reveal elements
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("opacity-100", "translate-y-0");
      el.classList.remove("opacity-0", "translate-y-6");
    }
  });
}

// Run on scroll + initial load
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
