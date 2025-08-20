document.addEventListener("DOMContentLoaded", () => {
  //  Initialize AOS with faster, smoother animation
  AOS.init({
    duration: 400,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
  });

  const categoryGrid = document.querySelector(".category-grid");
  const categorySection = document.getElementById("categorySection");
  const productGrid = document.getElementById("productGrid");

  //  Category definitions
  const categories = [
    { name: "T-Shirts", image: "../images/categories/t-shirt.webp", folder: "tshirt", count: 15 },
    { name: "Caps", image: "../images/categories/cap.webp", folder: "caps", count: 10 },
    { name: "Trousers", image: "../images/categories/trouser.webp", folder: "trousers", count: 12 },
    { name: "Shoes", image: "../images/categories/shoe.webp", folder: "shoes", count: 20 },
    { name: "Wrist Watches", image: "../images/categories/watch.webp", folder: "watches", count: 20 }
  ];

  // Render category cards
  categories.forEach(cat => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.setAttribute("data-aos", "zoom-in");
    card.innerHTML = `
      <img src="${cat.image}" alt="${cat.name}" />
      <h4>${cat.name}</h4>
    `;

    //  On click: hide categories, show products
    card.addEventListener("click", () => {
      categorySection.style.display = "none";
      productGrid.innerHTML = ""; // Clear previous products

      //  back button
      const backBtn = document.createElement("button");
      backBtn.textContent = "← Back to Categories";
      backBtn.className = "back-button";
      backBtn.onclick = () => {
        productGrid.innerHTML = "";
        categorySection.style.display = "grid";
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      productGrid.appendChild(backBtn);

      //  Display selected products
      ProductModule.displayProducts(cat.folder, cat.name, cat.count);
    });

    categoryGrid.appendChild(card);
  });
});
