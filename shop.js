import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "firebase/firestore";

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");

let products = [];

async function loadProducts() {
  try {
    const productsSnapshot = await getDocs(collection(db, "products"));

    products = productsSnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data()
    }));

    displayProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
    productGrid.innerHTML = "<p>Products could not be loaded.</p>";
  }
}

function displayProducts(productsToDisplay) {
  if (productsToDisplay.length === 0) {
    productGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  productGrid.innerHTML = productsToDisplay
    .map((product) => {
      const image =
        product.imageURL ||
        "https://placehold.co/600x750/eeeeee/222222?text=Urban+Threads";

      return `
        <article class="product-card">
          <img src="${image}" alt="${product.name}" />

          <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <strong>R${Number(product.price).toFixed(2)}</strong>

            <button class="add-to-cart" data-id="${product.id}">
              Add to Cart
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  displayProducts(filteredProducts);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

loadProducts();

document.addEventListener("click", (event) => {
  if (!event.target.classList.contains("add-to-cart")) {
    return;
  }

  const productId = event.target.dataset.id;
  const selectedProduct = products.find(
    (product) => product.id === productId
  );

  const cart =
    JSON.parse(localStorage.getItem("urbanThreadsCart")) || [];

  const existingProduct = cart.find(
    (item) => item.id === selectedProduct.id
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      ...selectedProduct,
      quantity: 1
    });
  }

  localStorage.setItem("urbanThreadsCart", JSON.stringify(cart));

  alert(`${selectedProduct.name} added to cart!`);
});