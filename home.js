
// ----------------------
// Product Search Feature
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const searchCategory = document.getElementById("search-category");

  function searchProducts() {
    const input = searchInput?.value.toLowerCase() || "";
    const category = searchCategory ? searchCategory.value : "all";
    const products = document.querySelectorAll(".product-card");

    products.forEach((product) => {
      const name = product.querySelector("h3")?.textContent.toLowerCase() || "";
      const productCategory = product.getAttribute("data-category") || "all";

      if (
        name.includes(input) &&
        (category === "all" || productCategory === category)
      ) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }

  // Attach search listeners if elements exist
  if (searchBtn) searchBtn.addEventListener("click", searchProducts);
  if (searchInput) searchInput.addEventListener("keyup", searchProducts);
  if (searchCategory) searchCategory.addEventListener("change", searchProducts);
});


// ----------------------
// Add-to-Cart Logic (with image support)
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "theIdealKit_cart_v1";
  const addButtons = document.querySelectorAll(".add-to-cart");
  const cartCountEl = document.getElementById("cart-count");

  // Load or initialize cart
  let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  // Save cart to localStorage & update cart badge
  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  // Update red badge number
  function updateCartBadge() {
    if (!cartCountEl) return;
    const qty = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    cartCountEl.textContent = qty;
  }

  // Add-to-Cart button handler
  addButtons.forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      const card = ev.currentTarget.closest(".product-card");
      if (!card) return console.warn("No .product-card ancestor found for Add button");

      const id = String(card.dataset.id ?? Date.now());
      const name = String(card.dataset.name ?? card.querySelector("h3")?.innerText ?? "Item");
      const price =
        parseFloat(
          card.dataset.price ??
          (card.querySelector(".price")?.innerText.replace(/[^\d.]/g, "") ?? 0)
        ) || 0;

      // ✅ NEW: Get image (from data-image or img tag)
      const image =
        card.dataset.image ||
        card.querySelector("img")?.src ||
        "https://via.placeholder.com/100x100?text=No+Image";

      // Check if item already in cart
      const found = cart.find((i) => String(i.id) === id);
      if (found) {
        found.quantity = Number(found.quantity) + 1;
      } else {
        cart.push({ id, name, price, image, quantity: 1 });
      }

      // Save & show quick button feedback
      saveCart();
      const original = btn.innerText;
      btn.innerText = "Added ✓";
      btn.disabled = true;
      setTimeout(() => {
        btn.innerText = original;
        btn.disabled = false;
      }, 700);
    });
  });

  // Initialize badge on load
  updateCartBadge();
});
