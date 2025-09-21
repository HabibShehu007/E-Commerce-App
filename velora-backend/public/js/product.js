const ProductModule = (() => {
  let currentIndex = 0;
  let currentProducts = [];

  async function getOrderedProducts() {
    const token = localStorage.getItem("token");
    if (!token) return [];

    try {
      const res = await fetch("http://localhost:5000/api/orders/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      return Array.isArray(data.ordered) ? data.ordered : [];
    } catch (err) {
      console.error("Failed to fetch ordered products:", err);
      return [];
    }
  }

  async function displayProducts(categoryFolder, displayName, count = 20) {
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

    for (let i = 1; i <= count; i++) {
      const imgPath = `../images/product/${categoryFolder}/${prefix}${i}.webp`;
      const price = Math.floor(Math.random() * (15000 - 3000 + 1)) + 3000;
      currentProducts.push({
        id: `${prefix}-${i}`,
        name: `${displayName} ${i}`,
        image: imgPath,
        price: price
      });
    }

    await renderNextBatch(container);

    if (loadMoreBtn && currentProducts.length > 6) {
      loadMoreBtn.style.display = "block";
    }
  }

  async function renderNextBatch(container) {
    const batchSize = 8;
    const slice = currentProducts.slice(currentIndex, currentIndex + batchSize);
    const ordered = await getOrderedProducts();
    console.log("Ordered products from backend:", ordered);

    slice.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      const nairaPrice = product.price.toLocaleString();
      const isOrdered = ordered.includes(product.id);

      console.log(`Rendering ${product.id} → Ordered: ${isOrdered}`);

      card.setAttribute("data-id", product.id);

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <h4>${product.name}</h4>
        <p>₦${nairaPrice}</p>
        ${isOrdered ? `<span class="sold-out">Sold Out</span>` : ""}
        <button ${isOrdered ? "disabled" : ""}>${isOrdered ? "Ordered" : "Add to Cart"}</button>
      `;

      if (isOrdered) {
        card.classList.add("disabled");
      } else {
        const button = card.querySelector("button");
        button.onclick = () => openCartModal(product.id); // ✅ Trigger modal
      }

      container.appendChild(card);
      observer.observe(card);
    });

    currentIndex += batchSize;

    if (currentIndex >= currentProducts.length) {
      const loadMoreBtn = document.getElementById("loadMoreBtn");
      if (loadMoreBtn) loadMoreBtn.style.display = "none";
    }
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  return { displayProducts, getOrderedProducts };
})();
