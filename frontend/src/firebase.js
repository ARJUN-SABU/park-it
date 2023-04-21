import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF0qb9j_U2T5wY8A4CetSmJwO6RoNyjYQ",
  authDomain: "park-it-dc753.firebaseapp.com",
  projectId: "park-it-dc753",
  storageBucket: "park-it-dc753.appspot.com",
  messagingSenderId: "596511718185",
  appId: "1:596511718185:web:8f887ff65d1d2aefae1538",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
