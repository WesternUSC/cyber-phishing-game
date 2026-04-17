import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBGWzGjKNkOUxheZO5makjwi0XTA-4XkE",
  authDomain: "cyber-phishing-game.firebaseapp.com",
  projectId: "cyber-phishing-game",
  storageBucket: "cyber-phishing-game.firebasestorage.app",
  messagingSenderId: "378704419636",
  appId: "1:378704419636:web:87b5d2b0a4c5f189776361"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);