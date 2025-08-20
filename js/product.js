const ProductModule = (() => {
  function displayProducts(categoryFolder, displayName, count = 20) {
    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";

    const container = document.createElement("div");
    container.className = "product-grid";
    productGrid.appendChild(container);

    let foundAny = false;

    //  Dynamically determine image prefix based on folder name
    const prefixMap = {
      caps: "cap",
      tshirt: "tshirt",
      trousers: "trouser",
      shoes: "shoe",
      watches: "watch"
    };
    const prefix = prefixMap[categoryFolder] || categoryFolder;

    //  Loop through product images
    for (let i = 1; i <= count; i++) {
      const imgPath = `../images/product/${categoryFolder}/${prefix}${i}.webp`;
      const img = new Image();
      img.src = imgPath;

      img.onload = () => {
        foundAny = true;

        const card = document.createElement("div");
        card.className = "product-card";
        card.setAttribute("data-aos", "fade-up");

        card.innerHTML = `
          <img src="${imgPath}" alt="${displayName} ${i}" />
          <h4>${displayName} ${i}</h4>
          <p>$${(Math.random() * 50 + 20).toFixed(2)}</p>
          <button>Add to Cart</button>
        `;

        container.appendChild(card);
        AOS.refresh(); // 
      };

      img.onerror = () => {
        console.warn(`Image not found: ${imgPath}`);
      };
    }

    //  Fallback message if no images load
    setTimeout(() => {
      if (!foundAny) {
        container.innerHTML = `
          <p style="text-align:center; padding:20px;">
            No products found for "<strong>${displayName}</strong>".
          </p>
        `;
      }
    }, 1200); // 
  }

  return { displayProducts };
})();
