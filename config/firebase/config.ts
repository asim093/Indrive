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
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Export Firestore and Auth instances
export { app, db, auth };
export const firestore = getFirestore(app);