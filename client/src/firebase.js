// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-blog-9a33a.firebaseapp.com",
  projectId: "mern-blog-9a33a",
  storageBucket: "mern-blog-9a33a.appspot.com",
  messagingSenderId: "1019347967481",
  appId: "1:1019347967481:web:c64973c72fa95a30427128"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);