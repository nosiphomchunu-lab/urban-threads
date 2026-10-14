import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";

const authForm = document.getElementById("auth-form");
const signupButton = document.getElementById("signup-button");
const authMessage = document.getElementById("auth-message");

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    authMessage.textContent = "Login successful!";
    authMessage.style.color = "green";

    setTimeout(() => {
      window.location.href = "shop.html";
    }, 1000);
  } catch (error) {
    authMessage.textContent = error.message;
    authMessage.style.color = "crimson";
  }
});

signupButton.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    authMessage.textContent = "Account created successfully!";
    authMessage.style.color = "green";

    setTimeout(() => {
      window.location.href = "shop.html";
    }, 1000);
  } catch (error) {
    authMessage.textContent = error.message;
    authMessage.style.color = "crimson";
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in user:", user.email);
  }
});