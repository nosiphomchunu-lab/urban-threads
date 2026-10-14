import { auth } from "./firebase.js";

import {
  onAuthStateChanged
} from "firebase/auth";

const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");

function getCart() {
  return JSON.parse(localStorage.getItem("urbanThreadsCart")) || [];
}

function displayCart() {
  const cart = getCart();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "R0.00";
    return;
  }

  let total = 0;

  cartItemsContainer.innerHTML = cart
    .map((item) => {
      const itemTotal = Number(item.price) * item.quantity;
      total += itemTotal;

      return `
        <article class="cart-item">
          <div>
            <h2>${item.name}</h2>
            <p>Price: R${Number(item.price).toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Item total: R${itemTotal.toFixed(2)}</p>
          </div>

          <button class="remove-from-cart" data-id="${item.id}">
            Remove
          </button>
        </article>
      `;
    })
    .join("");

  cartTotal.textContent = `R${total.toFixed(2)}`;
}

cartItemsContainer.addEventListener("click", (event) => {
  if (!event.target.classList.contains("remove-from-cart")) {
    return;
  }

  const productId = event.target.dataset.id;

  const updatedCart = getCart().filter(
    (item) => item.id !== productId
  );

  localStorage.setItem(
    "urbanThreadsCart",
    JSON.stringify(updatedCart)
  );

  displayCart();
});

checkoutButton.addEventListener("click", () => {
  alert("Checkout feature coming soon.");
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Please log in to view your cart.");
    window.location.href = "login.html";
    return;
  }

  displayCart();
});