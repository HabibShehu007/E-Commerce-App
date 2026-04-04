const ProductModule = (() => {
  let currentIndex = 0;
  let currentProducts = [];

  // ✅ Get ordered products from localStorage/sessionStorage
  function getOrderedProducts() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const currentUser = localStorage.getItem("username") || "Guest";
    return orders
      .filter((order) => order.user === currentUser)
      .map((order) => order.id);
  }

  async function displayProducts(categoryFolder, displayName, count = 20) {
    currentIndex = 0;
    currentProducts = [];

    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";

    // ✅ Tailwind grid layout: 2 per row mobile, 4 per row desktop
    const container = document.createElement("div");
    container.className =
      "product-grid grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center";
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
      schoolbags: "schoolbag",
    };
    const prefix = prefixMap[categoryFolder] || categoryFolder;

    for (let i = 1; i <= count; i++) {
      const imgPath = `/public/images/product/${categoryFolder}/${prefix}${i}.webp`;
      const price = Math.floor(Math.random() * (15000 - 3000 + 1)) + 3000;
      currentProducts.push({
        id: `${prefix}-${i}`,
        name: `${displayName} ${i}`,
        image: imgPath,
        price: price,
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
    const ordered = getOrderedProducts();

    slice.forEach((product) => {
      const card = document.createElement("div");
      card.className =
        "product-card relative w-full max-w-xs bg-white rounded-lg shadow-md p-4 text-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg opacity-0 translate-y-8";
      card.setAttribute("data-id", product.id);

      const nairaPrice = product.price.toLocaleString();
      const isOrdered = ordered.includes(product.id);

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy"
          class="w-full h-40 object-cover rounded-md mb-3 transition-transform duration-300 ease-in-out hover:scale-105" />
        <h4 class="text-lg font-semibold text-[#2c3e50] mb-1">${product.name}</h4>
        <p class="text-sm text-gray-600 mb-2">₦${nairaPrice}</p>
        ${
          isOrdered
            ? `<span class="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md">Ordered</span>`
            : ""
        }
        <button ${isOrdered ? "disabled" : ""}
          class="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition">
          ${isOrdered ? "Ordered" : "Add to Cart"}
        </button>
      `;

      if (isOrdered) {
        card.classList.add("opacity-60", "pointer-events-none");
      } else {
        const button = card.querySelector("button");
        button.onclick = () => addToCart(product);
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

  // ✅ Add product to cart
  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: product.id,
      name: product.name,
      image: product.image,
      price: `₦${product.price.toLocaleString()}`,
      user: localStorage.getItem("username") || "Guest",
      date: new Date().toLocaleDateString("en-NG", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    showCartSuccessModal(product.name);
  }

  // ✅ Success modal
  function showCartSuccessModal(productName) {
    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
        <i class="fas fa-check-circle text-green-600 text-4xl mb-3"></i>
        <h3 class="text-lg font-semibold text-blue-950 mb-2">Added to Cart</h3>
        <p class="text-sm text-slate-600 mb-4">${productName} has been added to your cart.</p>
        <div class="flex justify-center gap-3">
          <button onclick="document.body.removeChild(this.closest('.fixed'))"
            class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition">
            Close
          </button>
          <a href="cart.html"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition inline-flex items-center gap-2">
            <i class="fas fa-shopping-cart"></i> Go to Cart
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.remove("opacity-0", "translate-y-8");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  return { displayProducts };
})();
