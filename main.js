import { auth } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";

const nav = document.querySelector(".navbar nav");

if (nav) {
  onAuthStateChanged(auth, (user) => {
    const oldUserInfo = document.getElementById("user-info");

    if (oldUserInfo) {
      oldUserInfo.remove();
    }

    if (user) {
      const userInfo = document.createElement("span");
      userInfo.id = "user-info";
      userInfo.textContent = user.email;
      userInfo.style.marginLeft = "20px";
      userInfo.style.color = "#ccc";

      const logoutButton = document.createElement("button");
      logoutButton.textContent = "Logout";
      logoutButton.style.marginLeft = "12px";
      logoutButton.style.padding = "8px 12px";
      logoutButton.style.cursor = "pointer";

      logoutButton.addEventListener("click", async () => {
        await signOut(auth);
        window.location.href = "login.html";
      });

      nav.appendChild(userInfo);
      nav.appendChild(logoutButton);
    }
  });
}