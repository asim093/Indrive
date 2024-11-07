// firebase/config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3msAVS_ACbaol0_ZNDS79heam4GRpRcs",
  authDomain: "indrive-8e093.firebaseapp.com",
  projectId: "indrive-8e093",
  storageBucket: "indrive-8e093.firebasestorage.app",
  messagingSenderId: "1086584039236",
  appId: "1:1086584039236:web:c5c653934beda1be7e5911",
  measurementId: "G-W72M38PYR2"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // Export auth instance
