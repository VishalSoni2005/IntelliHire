/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
