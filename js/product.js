const ProductModule = (() => {
  let currentIndex = 0;
  let currentProducts = [];

  function displayProducts(categoryFolder, displayName, count = 20) {
    currentIndex = 0;
    currentProducts = [];

    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";

    const container = document.createElement("div");
    container.className = "product-grid";
    productGrid.appendChild(container);

    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) loadMoreBtn.style.display = "none";

    const prefixMap = {
      caps: "cap",
      tshirt: "tshirt",
      trousers: "trouser",
      shoes: "shoe",
      watches: "watch"
    };
    const prefix = prefixMap[categoryFolder] || categoryFolder;

    for (let i = 1; i <= count; i++) {
      const imgPath = `../images/product/${categoryFolder}/${prefix}${i}.webp`;
      currentProducts.push({
        name: `${displayName} ${i}`,
        image: imgPath,
        price: Math.random() * 50 + 20
      });
    }

    renderNextBatch(container);

    if (loadMoreBtn) {
      loadMoreBtn.style.display = "block";
      loadMoreBtn.onclick = () => renderNextBatch(container);
    }
  }

  function renderNextBatch(container) {
    const batchSize = 6;
    const slice = currentProducts.slice(currentIndex, currentIndex + batchSize);

    slice.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.setAttribute("data-cue", "fadeIn"); // ✅ ScrollCue animation

      const nairaPrice = convertToNaira(product.price).toLocaleString();

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <h4>${product.name}</h4>
        <p>₦${nairaPrice}</p>
        <button>Add to Cart</button>
      `;

      card.querySelector("button").onclick = () => addToCart(product);
      container.appendChild(card);
    });

    currentIndex += batchSize;

    if (currentIndex >= currentProducts.length) {
      const loadMoreBtn = document.getElementById("loadMoreBtn");
      if (loadMoreBtn) loadMoreBtn.style.display = "none";
    }

    // 🔄 Re-scan DOM for new ScrollCue elements
    if (window.scrollCue) scrollCue.update();
  }

  return { displayProducts };
})();
