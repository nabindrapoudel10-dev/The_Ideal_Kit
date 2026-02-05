
// ----------------------
// CART FUNCTIONALITY — The Ideal Kit
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "theIdealKit_cart_v1";
  const cartContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const clearBtn = document.getElementById("clear-btn");
  const checkoutBtn = document.getElementById("checkout-btn");
  const cartCountEl = document.getElementById("cart-count");

  // New summary elements
  const summarySubtotalEl = document.getElementById("summary-subtotal");
  const summaryShippingEl = document.getElementById("summary-shipping");
  const summaryDiscountEl = document.getElementById("summary-discount");

  // Fixed values (you can customize later)
  const SHIPPING_FEE = 150;
  let discountValue = 0; // if coupon/discount applied

  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  // --- Render Cart ---
  function renderCart() {
    if (!cartContainer) return;
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p class='empty-msg'>Your cart is empty 🛒</p>";
      updateSummary(0);
      updateCartBadge();
      return;
    }

    let subtotal = 0;

    cart.forEach((item) => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;

      const imageSrc =
        item.image && item.image.trim() !== ""
          ? item.image
          : "https://via.placeholder.com/80x80?text=No+Image";

      const card = document.createElement("div");
      card.classList.add("cart-item");

      card.innerHTML = `
        <img src="${imageSrc}" alt="${item.name}" class="item-thumb" />
        <div class="item-info">
          <h3>${item.name}</h3>
          <p>Rs. ${item.price}</p>
        </div>
        <div class="item-controls">
          <button class="qty-btn minus">−</button>
          <span class="qty">${item.quantity}</span>
          <button class="qty-btn plus">+</button>
          <button class="remove-btn">×</button>
        </div>
      `;

      // Button actions
      card.querySelector(".minus").addEventListener("click", () => updateQuantity(item.id, -1));
      card.querySelector(".plus").addEventListener("click", () => updateQuantity(item.id, 1));
      card.querySelector(".remove-btn").addEventListener("click", () => removeItem(item.id));

      cartContainer.appendChild(card);
    });

    updateSummary(subtotal);
    updateCartBadge();
  }

  // --- Update Summary Section ---
  function updateSummary(subtotal) {
    const shipping = cart.length > 0 ? SHIPPING_FEE : 0;
    const discount = discountValue; // you can change logic if you want coupon
    const total = subtotal + shipping - discount;

    if (summarySubtotalEl) summarySubtotalEl.textContent = subtotal.toLocaleString();
    if (summaryShippingEl) summaryShippingEl.textContent = shipping.toLocaleString();
    if (summaryDiscountEl) summaryDiscountEl.textContent = discount.toLocaleString();

    if (totalEl) totalEl.textContent = total.toLocaleString();
  }

  // --- Update Quantity ---
  function updateQuantity(id, change) {
    const item = cart.find((i) => String(i.id) === String(id));
    if (!item) return;
    item.quantity = Math.max(1, item.quantity + change);
    saveCart();
  }

  // --- Remove Item ---
  function removeItem(id) {
    cart = cart.filter((i) => String(i.id) !== String(id));
    saveCart();
  }

  // --- Save cart to localStorage ---
  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    renderCart();
  }

  // --- Update cart count badge ---
  function updateCartBadge() {
    if (!cartCountEl) return;
    const qty = cart.reduce((sum, i) => sum + i.quantity, 0);
    cartCountEl.textContent = qty;
  }

  // --- Clear cart ---
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your cart?")) {
        cart = [];
        saveCart();
      }
    });
  }

  // --- Checkout simulation ---
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      alert("✅ Thank you for shopping with The Ideal Kit!");
      cart = [];
      saveCart();
    });
  }

  // --- Initial render ---
  renderCart();
});
