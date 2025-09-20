const ProductModule = (() => {
  let currentIndex = 0;
  let currentProducts = [];

  // 🧠 Display Products by Category
  function displayProducts(categoryFolder, displayName, count = 20) {
    currentIndex = 0;
    currentProducts = [];

    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";

    const container = document.createElement("div");
    container.classList.add("product-grid");
    productGrid.appendChild(container);

    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) {
      loadMoreBtn.style.display = "none";
      loadMoreBtn.onclick = () => renderNextBatch(container);
    }

    // 🔠 Prefix Mapping
    const prefixMap = {
      caps: "cap",
      tshirt: "tshirt",
      trousers: "trouser",
      shoes: "shoe",
      watches: "watch",
      hoodies: "hoodie",
      jewelleries: "jewellery",
      jackets: "jacket",
      fashionbags: "fashionbag",
      sunglasses: "sunglass",
      schoolbags: "schoolbag"
    };
    const prefix = prefixMap[categoryFolder] || categoryFolder;

    // 🖼️ Generate Product List
    for (let i = 1; i <= count; i++) {
      const imgPath = `../images/product/${categoryFolder}/${prefix}${i}.webp`;
      const price = Math.floor(Math.random() * (15000 - 3000 + 1)) + 3000; // 💸 Naira pricing
      currentProducts.push({
        id: `${prefix}-${i}`,
        name: `${displayName} ${i}`,
        image: imgPath,
        price: price
      });
    }

    renderNextBatch(container);

    if (loadMoreBtn && currentProducts.length > 6) {
      loadMoreBtn.style.display = "block";
    }
  }

  // 🔄 Render Next Batch of Products
  function renderNextBatch(container) {
    const batchSize = 8;
    const slice = currentProducts.slice(currentIndex, currentIndex + batchSize);

    slice.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      const nairaPrice = product.price.toLocaleString();

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <h4>${product.name}</h4>
        <p>₦${nairaPrice}</p>
        <button data-id="${product.id}">Add to Cart</button>
      `;

      const button = card.querySelector("button");
      button.onclick = () => addToCart(product);

      container.appendChild(card);
      observer.observe(card); // 👀 Observe for scroll animation
    });

    currentIndex += batchSize;

    if (currentIndex >= currentProducts.length) {
      const loadMoreBtn = document.getElementById("loadMoreBtn");
      if (loadMoreBtn) loadMoreBtn.style.display = "none";
    }
  }

  // ✨ Scroll Animation Observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Optional: stop observing once visible
      }
    });
  }, {
    threshold: 0.2
  });

  return { displayProducts };
})();
