import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCidrVt17wZeOphLLIaq13uXXgZzZUVcxA",
  authDomain: "urban-threads-60e20.firebaseapp.com",
  projectId: "urban-threads-60e20",
  storageBucket: "urban-threads-60e20.firebasestorage.app",
  messagingSenderId: "778717230115",
  appId: "1:778717230115:web:2bbe119b0d5a43cee6ed96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Make Authentication and Firestore available to our other files
export const auth = getAuth(app);
export const db = getFirestore(app);

