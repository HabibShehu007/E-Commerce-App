document.addEventListener("DOMContentLoaded", () => {
  // 🚀 ScrollCue Initialization
  if (window.scrollCue) {
    scrollCue.init({
      interval: 150,
      duration: 300,
      threshold: 0.25
    });
  }

  // 🔁 Debounce ScrollCue Updates
  const debounce = (fn, delay) => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  };
  const safeScrollCueUpdate = debounce(() => {
    if (window.scrollCue) scrollCue.update();
  }, 300);

  // 🌐 DOM References
  const categoryGrid = document.querySelector(".category-grid");
  const categorySection = document.getElementById("categorySection");
  const productGrid = document.getElementById("productGrid");
  const loader = document.getElementById("loader");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  // 💱 Currency Conversion
  const exchangeRate = 1500;
  window.convertToNaira = dollar => dollar * exchangeRate;

  // 🗂️ Categories
  const categories = [
    { name: "T-Shirts", image: "../images/categories/t-shirt.webp", folder: "tshirt", count: 15 },
    { name: "Caps", image: "../images/categories/cap.webp", folder: "caps", count: 10 },
    { name: "Trousers", image: "../images/categories/trouser.webp", folder: "trousers", count: 12 },
    { name: "Shoes", image: "../images/categories/shoe.webp", folder: "shoes", count: 20 },
    { name: "Wrist Watches", image: "../images/categories/watch.webp", folder: "watches", count: 20 },
    { name: "Sun Glasses", image: "../images/categories/Sunglass.webp", folder: "sunglasses", count: 20 },
    { name: "Hoodies", image: "../images/categories/hoodie.webp", folder: "hoodies", count: 20 },
    { name: "Fashion Bag", image: "../images/categories/fashionb.webp", folder: "fashionbags", count: 20 },
    { name: "Jewelleries", image: "../images/categories/jewellery.webp", folder: "jewelleries", count: 20 },
    { name: "School Bags", image: "../images/categories/schoolbag.webp", folder: "Schoolbags", count: 20 },
    { name: "Jackets", image: "../images/categories/jacket.webp", folder: "jackets", count: 20 }
  ];

  // 🧱 Render Category Cards
  categories.forEach(cat => {
    const card = document.createElement("div");
    card.classList.add("category-card");
    card.setAttribute("data-cue", "fadeIn");

    card.innerHTML = `
      <img src="${cat.image}" alt="${cat.name}" loading="lazy" />
      <h4>${cat.name}</h4>
    `;

    card.addEventListener("click", () => {
      showLoader();

      setTimeout(() => {
        categorySection.style.display = "none";
        productGrid.innerHTML = "";

        const backBtn = document.createElement("button");
        backBtn.textContent = "← Back to Categories";
        backBtn.classList.add("back-button");
        backBtn.onclick = () => {
          productGrid.innerHTML = "";
          categorySection.style.display = "grid";
          window.scrollTo({ top: 0, behavior: "smooth" });
          hideLoadMore();
        };
        productGrid.appendChild(backBtn);

        ProductModule.displayProducts(cat.folder, cat.name, Math.min(cat.count, 20));

        hideLoader();
        safeScrollCueUpdate();
      }, 400);
    });

    categoryGrid.appendChild(card);
  });

  // 🔄 Utility Functions
  function showLoader() {
    if (loader) loader.style.display = "flex";
  }

  function hideLoader() {
    if (loader) loader.style.display = "none";
  }

  function hideLoadMore() {
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
  }
});
