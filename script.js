const cartKey = "marjCart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(cartKey)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function updateCartCount() {
  const count = getCart().reduce((total, item) => total + item.qty, 0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

document.querySelectorAll(".add-btn").forEach(button => {
  button.addEventListener("click", () => {
    const cart = getCart();
    const id = button.dataset.product;
    const existing = cart.find(item => item.id === id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id,
        name: button.dataset.name,
        price: Number(button.dataset.price),
        qty: 1
      });
    }

    saveCart(cart);
    updateCartCount();

    const original = button.textContent;
    button.textContent = "ADDED ✓";
    button.style.background = "#171717";
    button.style.color = "#fff";
    button.style.borderColor = "#171717";

    setTimeout(() => {
      button.textContent = original;
      button.style.background = "";
      button.style.color = "";
      button.style.borderColor = "";
    }, 1100);
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
  });
}

const searchPanel = document.getElementById("searchPanel");
const searchBtn = document.getElementById("searchBtn");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

if (searchBtn && searchPanel) {
  searchBtn.addEventListener("click", () => {
    searchPanel.classList.add("open");
    searchPanel.setAttribute("aria-hidden", "false");
    setTimeout(() => searchInput?.focus(), 100);
  });
}

closeSearch?.addEventListener("click", () => {
  searchPanel.classList.remove("open");
  searchPanel.setAttribute("aria-hidden", "true");
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    searchPanel?.classList.remove("open");
  }
});

document.getElementById("year")?.appendChild(document.createTextNode(new Date().getFullYear()));
updateCartCount();
