document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  if (!token || !username) {
    alert("Session expired. Please log in again.");
    localStorage.clear();
    window.location.href = "/pages/login.html";
    return;
  }

  // ✅ Show greeting
  const greeting = document.getElementById("greeting");
  if (greeting) {
    greeting.textContent = `Welcome, ${username}`;
  }

  // ✅ Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      localStorage.clear();
      window.location.href = "/pages/login.html";
    };
  }

  if (window.scrollCue) {
    scrollCue.init({ interval: 150, duration: 300, threshold: 0.25 });
  }

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

  const categoryGrid = document.querySelector(".category-grid");
  const categorySection = document.getElementById("categorySection");
  const productGrid = document.getElementById("productGrid");
  const loader = document.getElementById("loader");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  const exchangeRate = 1500;
  window.convertToNaira = dollar => dollar * exchangeRate;

  let selectedProductId = null;

  window.openCartModal = function (productId) {
    selectedProductId = productId;
    const modal = document.getElementById("cartModal");
    if (!modal) {
      console.error("❌ Modal not found: #cartModal");
      return;
    }
    console.log("✅ Opening cart modal for:", productId);
    modal.classList.add("show");
  };

  window.toggleCartModal = function (show) {
    const modal = document.getElementById("cartModal");
    if (!modal) {
      console.error("❌ Modal not found: #cartModal");
      return;
    }
    modal.classList.toggle("show", show);
  };

  window.checkout = async function () {
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const bank = document.getElementById("bankSelect").value;

    if (!cardNumber || !expiry || !cvv || !bank) {
      alert("Please fill in all payment details.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/orders/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productName: selectedProductId })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Payment successful! Order placed.");
        toggleCartModal(false);

        const card = document.querySelector(`[data-id="${selectedProductId}"]`);
        if (card) {
          card.classList.add("disabled");
          card.innerHTML += `<span class="sold-out">Sold Out</span>`;
          const button = card.querySelector("button");
          if (button) button.disabled = true;

          const order = {
            id: Date.now(),
            productName: selectedProductId,
            productImage: card.querySelector("img").src,
            price: card.querySelector("p").textContent,
            status: "pending",
            date: new Date().toLocaleDateString("en-NG", {
              year: "numeric",
              month: "short",
              day: "numeric"
            }),
            user: username
          };

          const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
          existingOrders.push(order);
          localStorage.setItem("orders", JSON.stringify(existingOrders));
        }
      } else {
        alert(data.message || "Order failed.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong.");
    }
  };

  const categories = [
    { name: "T-Shirts", image: "../images/categories/t-shirt.webp", folder: "tshirt", count: 20 },
    { name: "Caps", image: "../images/categories/cap.webp", folder: "caps", count: 20 },
    { name: "Trousers", image: "../images/categories/trouser.webp", folder: "trousers", count: 20 },
    { name: "Shoes", image: "../images/categories/shoe.webp", folder: "shoes", count: 20 },
    { name: "Wrist Watches", image: "../images/categories/watch.webp", folder: "watches", count: 20 },
    { name: "Sun Glasses", image: "../images/categories/Sunglass.webp", folder: "sunglasses", count: 20 },
    { name: "Hoodies", image: "../images/categories/hoodie.webp", folder: "hoodies", count: 20 },
    { name: "Fashion Bag", image: "../images/categories/fashionb.webp", folder: "fashionbags", count: 20 },
    { name: "Jewelleries", image: "../images/categories/jewellery.webp", folder: "jewelleries", count: 20 },
    { name: "School Bags", image: "../images/categories/schoolbag.webp", folder: "Schoolbags", count: 20 },
    { name: "Jackets", image: "../images/categories/jacket.webp", folder: "jackets", count: 20 }
  ];

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
