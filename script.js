// === Product Data ===
const products = [
  {
    id: 1,
    name: "Smartphone",
    price: 19999,
    category: "Electronics",
    image: "images/smartphone.jpg"
  },
  {
    id: 2,
    name: "Shoes",
    price: 2499,
    category: "Fashion",
    image: "images/shoes.jpg"
  },
  {
    id: 3,
    name: "Laptop",
    price: 45999,
    category: "Electronics",
    image: "images/laptop.jpg"
  },
  {
    id: 4,
    name: "Headphone",
    price: 3999,
    category: "Electronics",
    image: "images/headphone.jpg"
  }
];

// === Display Products ===
function displayProducts() {
  const list = document.getElementById("product-list");
  if (!list) return;

  const search = document.getElementById("search")?.value?.toLowerCase() || "";
  const filter = document.getElementById("category-filter")?.value || "all";

  list.innerHTML = "";

  const filtered = products.filter(p =>
    (filter === "all" || p.category === filter) &&
    p.name.toLowerCase().includes(search)
  );

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-img" />
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
      <button class="btn buy-now" onclick="buyNow(${p.id})">Buy Now</button>
    `;
    list.appendChild(card);
  });
}

// === Add to Cart ===
function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// === Buy Now ===
function buyNow(id) {
  const product = products.find(p => p.id === id);
  localStorage.setItem("buyNowProduct", JSON.stringify(product));
  window.location.href = "order-summary.html";
}

// === Load Cart Items (cart.html) ===
function loadCart() {
  const box = document.getElementById("cart-items");
  if (!box) return;

  const items = JSON.parse(localStorage.getItem("cart") || "[]");
  if (items.length === 0) {
    box.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  box.innerHTML = "";

  items.forEach(item => {
    total += item.price;
    box.innerHTML += `
      <div class="product">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
      </div>
    `;
  });

  box.innerHTML += `<h3>Total: ₹${total}</h3>`;
}

// === Checkout Button (cart.html) ===
document.getElementById("checkout-btn")?.addEventListener("click", () => {
  localStorage.removeItem("cart");
  window.location.href = "order-summary.html";
});

// === Logout ===
const logoutBtn = document.getElementById("logout-btn");
logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("user");
  alert("Logged out successfully.");
  window.location.href = "login.html";
});

// === Show Welcome Message ===
const welcome = document.getElementById("welcome-msg");
const user = JSON.parse(localStorage.getItem("user"));
if (user && welcome) {
  welcome.textContent = `👋 Welcome, ${user.name}`;
  if (logoutBtn) logoutBtn.style.display = "inline-block";
}

// === Filters Events
document.getElementById("search")?.addEventListener("input", displayProducts);
document.getElementById("category-filter")?.addEventListener("change", displayProducts);

// === Init Page
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  loadCart();
});
