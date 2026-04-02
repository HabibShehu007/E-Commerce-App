// dashboard.js
document.addEventListener("DOMContentLoaded", () => {
  // ✅ Session / Local Storage
  const username = localStorage.getItem("loggedInUser") || "Guest";

  // ✅ Show greeting
  const greeting = document.getElementById("greeting");
  if (greeting) {
    greeting.textContent = `Welcome, ${username}`;
  }

  // ✅ Navbar Drawer Toggle
  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  const closeDrawer = document.getElementById("closeDrawer");

  function openDrawer() {
    drawer.classList.remove("translate-x-full");
    overlay.classList.remove("hidden");
  }
  function closeDrawerFn() {
    drawer.classList.add("translate-x-full");
    overlay.classList.add("hidden");
  }

  if (menuBtn) menuBtn.addEventListener("click", openDrawer);
  if (closeDrawer) closeDrawer.addEventListener("click", closeDrawerFn);
  if (overlay) overlay.addEventListener("click", closeDrawerFn);

  // ✅ Logout button inside drawer
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/pages/login.html";
    });
  }

  // ✅ ScrollCue animations
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

  // ✅ Category logic
  const categoryGrid = document.querySelector(".category-grid");
  const categorySection = document.getElementById("categorySection");
  const productGrid = document.getElementById("productGrid");
  const loader = document.getElementById("loader");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  const exchangeRate = 1500;
  window.convertToNaira = (dollar) => dollar * exchangeRate;

  let selectedProductId = null;

  window.openCartModal = function (productId) {
    selectedProductId = productId;
    const modal = document.getElementById("cartModal");
    if (!modal) return console.error("❌ Modal not found: #cartModal");
    modal.classList.add("show");
  };

  window.toggleCartModal = function (show) {
    const modal = document.getElementById("cartModal");
    if (!modal) return console.error("❌ Modal not found: #cartModal");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: selectedProductId }),
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
              day: "numeric",
            }),
            user: username,
          };

          const existingOrders =
            JSON.parse(localStorage.getItem("orders")) || [];
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

  // ✅ Categories
  const categories = [
    {
      name: "T-Shirts",
      image: "/public/images/categories/t-shirt.webp",
      folder: "tshirt",
      count: 20,
    },
    {
      name: "Caps",
      image: "/public/images/categories/cap.webp",
      folder: "caps",
      count: 20,
    },
    {
      name: "Trousers",
      image: "/public/images/categories/trouser.webp",
      folder: "trousers",
      count: 20,
    },
    {
      name: "Shoes",
      image: "/public/images/categories/shoe.webp",
      folder: "shoes",
      count: 20,
    },
    {
      name: "Wrist Watches",
      image: "/public/images/categories/watch.webp",
      folder: "watches",
      count: 20,
    },
    {
      name: "Sun Glasses",
      image: "/public/images/categories/Sunglass.webp",
      folder: "sunglasses",
      count: 20,
    },
    {
      name: "Hoodies",
      image: "/public/images/categories/hoodie.webp",
      folder: "hoodies",
      count: 20,
    },
    {
      name: "Fashion Bag",
      image: "/public/images/categories/fashionb.webp",
      folder: "fashionbags",
      count: 20,
    },
    {
      name: "Jewelleries",
      image: "/public/images/categories/jewellery.webp",
      folder: "jewelleries",
      count: 20,
    },
    {
      name: "School Bags",
      image: "/public/images/categories/schoolbag.webp",
      folder: "Schoolbags",
      count: 20,
    },
    {
      name: "Jackets",
      image: "/public/images/categories/jacket.webp",
      folder: "jackets",
      count: 20,
    },
  ];

  categories.forEach((cat) => {
    const card = document.createElement("div");
    card.setAttribute("data-cue", "fadeIn");
    card.className =
      "relative rounded-xl shadow-lg bg-gradient-to-t from-white to-[#f9fbff] overflow-hidden cursor-pointer text-center transition-transform duration-300 ease-in-out hover:-translate-y-1.5 hover:scale-105 hover:shadow-xl";

    card.innerHTML = `
    <img src="${cat.image}" alt="${cat.name}" loading="lazy"
      class="w-full h-40 md:h-56 object-cover transition-transform duration-500 ease-in-out hover:scale-105" />
    <h4
      class="bg-[#f8f9fb] text-[#1f2d3d] font-semibold text-sm md:text-lg p-3 md:p-4 border-t border-[#eaeef3]"
    >
      ${cat.name}
    </h4>
  `;

    card.addEventListener("click", () => {
      showLoader();
      setTimeout(() => {
        categorySection.style.display = "none";
        productGrid.innerHTML = "";

        const backBtn = document.createElement("button");
        backBtn.textContent = "← Back to Categories";
        backBtn.className =
          "back-button mt-4 px-4 py-2 bg-blue-950 text-yellow-400 rounded-md font-semibold hover:bg-blue-900 transition";
        backBtn.onclick = () => {
          productGrid.innerHTML = "";
          categorySection.style.display = "block";
          window.scrollTo({ top: 0, behavior: "smooth" });
          hideLoadMore();
        };
        productGrid.appendChild(backBtn);

        ProductModule.displayProducts(
          cat.folder,
          cat.name,
          Math.min(cat.count, 20),
        );

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
