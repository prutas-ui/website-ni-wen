const products = [
  { image: "p-tee.jpg", tag: "Bestseller", name: "SLPPY Front & Back Oversized Tee", description: "Heavyweight cotton with front logo and full back print.", price: 1290 },
  { image: "p-cap.jpg", tag: "New Drop", name: "Build To Grind 5 Panel Cap", description: "Nylon-cotton shell, flat brim, adjustable strap.", price: 890 },
  { image: "p-shades.jpg", tag: "Classic", name: "Classic Slappy Shades", description: "Rectangular acetate frame with UV400 dark lenses.", price: 750 },
  { image: "p-pants.jpg", tag: "Popular", name: "Cargo Barrel Pants", description: "Washed twill, curved barrel leg, six utility pockets.", price: 1890 },
  { image: "p-hoodie.jpg", tag: "Limited", name: "SLPPY Big Back Logo Hoodie", description: "Brushed fleece, dropped shoulders, oversized back logo.", price: 2190 },
  { image: "p-bag.jpg", tag: "Everyday", name: "Slappy Sling Bag", description: "Water-resistant canvas, multi-zip, crossbody fit.", price: 1150 },
];

const features = [
  { icon: "hand", title: "Locally Hand Crafted", text: "Printed and finished in small batches by local makers." },
  { icon: "shirt", title: "Made with Fashion", text: "Silhouettes designed for the street, built to last." },
  { icon: "users", title: "Cozy, Community-First Vibe", text: "A shop that doubles as a hangout for the crew." },
  { icon: "leaf", title: "Sustainable Choices", text: "Limited runs to cut waste and keep every piece special." },
];

const categories = [
  { icon: "shirt", name: "T-Shirts", description: "Oversized & boxy fits", items: "Logo tee · Back print · Plain heavyweight" },
  { icon: "cap", name: "5 Panel Caps", description: "Flat brim street staples", items: "Build To Grind · Nylon · Corduroy" },
  { icon: "glasses", name: "Accessories", description: "The finishing touch", items: "Shades · Keychains · Socks" },
  { icon: "sparkles", name: "Baggy Pants", description: "Room to move", items: "Cargo barrel · Carpenter · Track" },
  { icon: "backpack", name: "Bags", description: "Carry the essentials", items: "Sling · Tote · Backpack" },
  { icon: "shoe", name: "Shoes", description: "From the ground up", items: "Low tops · Slides · Skate" },
];

const reviews = [
  { name: "Paolo R.", text: "The oversized tee fits exactly how I wanted. Thick fabric, print still crisp after washing." },
  { name: "Bea S.", text: "Love the cargo barrel pants — comfy and they look great with the cap." },
  { name: "Miguel D.", text: "Shop has such a chill vibe. Staff helped me find the right hoodie size." },
  { name: "Andrea L.", text: "Shades are solid for the price. Got compliments the first day wearing them." },
  { name: "Jomar T.", text: "Sling bag holds everything I need for the commute. Clean design." },
  { name: "Kat V.", text: "Fast delivery and nice packaging. Will definitely order the next drop." },
];

const icon = (name, className = "icon") => `<svg class="${className}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const peso = (number) => `₱${number.toLocaleString("en-PH")}`;

function renderProducts() {
  document.querySelector("#product-grid").innerHTML = products.map((product, index) => `
    <article class="product-card" data-product="${product.name.toLowerCase()} ${product.description.toLowerCase()} ${product.tag.toLowerCase()}">
      <div class="product-media">
        <img src="images/${product.image}" alt="${product.name}" loading="lazy" width="896" height="1024">
        <span class="product-tag">${icon("fire")}${product.tag}</span>
      </div>
      <div class="product-info">
        <div><h3>${product.name}</h3><p class="product-description">${product.description}</p></div>
        <div class="product-buy">
          <span class="product-price">${peso(product.price)}</span>
          <button class="btn btn-dark add-button" type="button" data-product-index="${index}" aria-label="Add ${product.name} to bag">${icon("bag")}Add</button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderFeatures() {
  document.querySelector("#feature-grid").innerHTML = features.map((feature) => `
    <article class="feature-card">
      <div class="feature-icon">${icon(feature.icon)}</div>
      <h3>${feature.title}</h3><p>${feature.text}</p>
    </article>
  `).join("");
}

function renderCategories() {
  document.querySelector("#category-grid").innerHTML = categories.map((category) => `
    <a href="#products" class="category-card" data-category="${category.name}">
      <div class="category-icon">${icon(category.icon)}</div>
      <div><h3>${category.name}</h3><p>${category.description}</p><p class="category-items">${category.items}</p></div>
    </a>
  `).join("");
}

function renderReviews(limit = reviews.length) {
  document.querySelector("#review-grid").innerHTML = reviews.slice(0, limit).map((review) => `
    <figure class="review-card">
      ${icon("quote", "icon review-quote")}
      <div class="review-author">
        <div class="avatar">${review.name.split(" ").map((word) => word[0]).join("")}</div>
        <div><figcaption>${review.name}</figcaption><div class="stars" aria-label="5 out of 5 stars">${icon("star").repeat(5)}</div></div>
      </div>
      <blockquote>"${review.text}"</blockquote><span class="sample-label">Sample review</span>
    </figure>
  `).join("");
}

renderProducts();
renderFeatures();
renderCategories();
renderReviews(3);

const menuButton = document.querySelector("#menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
  mobileMenu.hidden = true;
}

menuButton.addEventListener("click", () => {
  const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(willOpen));
  menuButton.setAttribute("aria-label", willOpen ? "Close menu" : "Open menu");
  mobileMenu.hidden = !willOpen;
});

mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
window.matchMedia("(min-width: 64rem)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

let searchQuery = "";
function filterProducts(query) {
  searchQuery = query.trim().toLowerCase();
  let visibleCount = 0;
  document.querySelectorAll(".product-card").forEach((card) => {
    const visible = card.dataset.product.includes(searchQuery);
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  document.querySelectorAll("[data-product-search]").forEach((input) => {
    if (input.value !== query) input.value = query;
  });
  document.querySelector("#empty-products").hidden = visibleCount !== 0;
  const status = document.querySelector("#search-status");
  status.hidden = !searchQuery;
  status.textContent = searchQuery ? `${visibleCount} ${visibleCount === 1 ? "product" : "products"} found for “${query.trim()}”.` : "";
}

document.querySelectorAll("[data-product-search]").forEach((input) => {
  input.addEventListener("input", (event) => filterProducts(event.target.value));
});

document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", () => {
    const categoryTerms = {
      "T-Shirts": "tee", "5 Panel Caps": "cap", Accessories: "shades",
      "Baggy Pants": "pants", Bags: "bag", Shoes: "",
    };
    filterProducts(categoryTerms[card.dataset.category] || "");
  });
});

let toastTimer;
function showToast(message) {
  const toast = document.querySelector("#toast");
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 3500);
}

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    showToast(`${products[Number(button.dataset.productIndex)].name} — demo item selected. Checkout is not connected.`);
  });
});

document.querySelector("#view-reviews").addEventListener("click", (event) => {
  const expanded = event.currentTarget.dataset.expanded === "true";
  renderReviews(expanded ? 3 : reviews.length);
  event.currentTarget.dataset.expanded = String(!expanded);
  event.currentTarget.textContent = expanded ? "View More" : "Show Less";
});

const contactForm = document.querySelector("#contact-form");
const validationRules = {
  name: (value) => value.trim() ? "" : "Please enter your full name.",
  email: (value) => /^\S+@\S+\.\S+$/.test(value) ? "" : "Please enter a valid email.",
  topic: (value) => value ? "" : "Please choose a topic.",
  message: (value) => value.trim().length >= 10 ? "" : "Message should be at least 10 characters.",
};

function validateField(field) {
  const error = validationRules[field.name](field.value);
  field.setAttribute("aria-invalid", String(Boolean(error)));
  document.querySelector(`#${field.name}-error`).textContent = error;
  return !error;
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = [...contactForm.querySelectorAll("input, select, textarea")];
  const valid = fields.map(validateField).every(Boolean);
  document.querySelector("#form-status").hidden = !valid;
  if (valid) {
    contactForm.reset();
    fields.forEach((field) => field.removeAttribute("aria-invalid"));
  } else {
    fields.find((field) => field.getAttribute("aria-invalid") === "true")?.focus();
  }
});

contactForm.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    document.querySelector("#form-status").hidden = true;
    if (field.getAttribute("aria-invalid") === "true") validateField(field);
  });
  field.addEventListener("change", () => {
    if (field.name === "topic") validateField(field);
  });
});
