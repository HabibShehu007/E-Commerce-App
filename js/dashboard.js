document.addEventListener("DOMContentLoaded", () => {
  // 🚀 Initialize ScrollCue animations with lighter config
  if (window.scrollCue) {
    scrollCue.init({
      interval: 200,     // ⬆️ More spacing between animations
      duration: 400,     // ⬇️ Faster animation
      threshold: 0.3     // ⬆️ Trigger only when more of the element is visible
    });
  }

  // 🔁 Debounce ScrollCue updates
  function debounce(fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }
  const safeScrollCueUpdate = debounce(() => {
    if (window.scrollCue) scrollCue.update();
  }, 300);

  const categoryGrid = document.querySelector(".category-grid");
  const categorySection = document.getElementById("categorySection");
  const productGrid = document.getElementById("productGrid");
  const loader = document.getElementById("loader");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  // 💱 Currency conversion
  const exchangeRate = 1500;
  window.convertToNaira = function(dollarAmount) {
    return dollarAmount * exchangeRate;
  };

  // 🗂️ Category definitions
  const categories = [
    { name: "T-Shirts", image: "../images/categories/t-shirt.webp", folder: "tshirt", count: 15 },
    { name: "Caps", image: "../images/categories/cap.webp", folder: "caps", count: 10 },
    { name: "Trousers", image: "../images/categories/trouser.webp", folder: "trousers", count: 12 },
    { name: "Shoes", image: "../images/categories/shoe.webp", folder: "shoes", count: 20 },
    { name: "Wrist Watches", image: "../images/categories/watch.webp", folder: "watches", count: 20 }
  ];

  // 🧱 Render category cards
  categories.forEach(cat => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.setAttribute("data-cue", "fadeIn");
    card.innerHTML = `
      <img src="${cat.image}" alt="${cat.name}" loading="lazy" />
      <h4>${cat.name}</h4>
    `;

    card.addEventListener("click", () => {
      if (loader) loader.style.display = "flex";

      setTimeout(() => {
        categorySection.style.display = "none";
        productGrid.innerHTML = "";

        const backBtn = document.createElement("button");
        backBtn.textContent = "← Back to Categories";
        backBtn.className = "back-button";
        backBtn.onclick = () => {
          productGrid.innerHTML = "";
          categorySection.style.display = "grid";
          window.scrollTo({ top: 0, behavior: "smooth" });
          if (loadMoreBtn) loadMoreBtn.style.display = "none";
        };
        productGrid.appendChild(backBtn);

        // 🧠 Load fewer products initially to reduce load
        ProductModule.displayProducts(cat.folder, cat.name, Math.min(cat.count, 12));

        if (loader) loader.style.display = "none";

        // 🔄 Re-scan DOM for new ScrollCue elements (debounced)
        safeScrollCueUpdate();
      }, 600);
    });

    categoryGrid.appendChild(card);
  });
});
