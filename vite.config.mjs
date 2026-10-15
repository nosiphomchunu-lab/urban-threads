import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        home: resolve("index.html"),
        shop: resolve("shop.html"),
        login: resolve("login.html"),
        cart: resolve("cart.html")
      }
    }
  }
});