import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCr63lyvXfoJrV5aC6jpUkKVJjYxflVL3M",
  authDomain: "intellihire-f35d1.firebaseapp.com",
  projectId: "intellihire-f35d1",
  storageBucket: "intellihire-f35d1.firebasestorage.app",
  messagingSenderId: "753595015169",
  appId: "1:753595015169:web:bc412ed13ec849fabb2000",
  measurementId: "G-1LM3Y3XX8C",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
