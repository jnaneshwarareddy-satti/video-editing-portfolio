import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4KNfcf62JPEmA8fsZKeQoSoyNFmm2Uac",
  authDomain: "editing-portfolio-761f0.firebaseapp.com",
  projectId: "editing-portfolio-761f0",
  storageBucket: "editing-portfolio-761f0.firebasestorage.app",
  messagingSenderId: "359796335504",
  appId: "1:359796335504:web:0826a54b1ad3311638c915",
  measurementId: "G-XS685JG2BT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
