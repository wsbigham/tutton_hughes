import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMlU6f67d_UUaqkkxE37x6WX4oCXjCBfA",
  authDomain: "tutton-hughes-auto-sales-1234.firebaseapp.com",
  projectId: "tutton-hughes-auto-sales-1234",
  storageBucket: "tutton-hughes-auto-sales-1234.firebasestorage.app",
  messagingSenderId: "155311913812",
  appId: "1:155311913812:web:34c13b31396267b46fe6c1"
};

// Initialize Firebase for SSR and Client-side
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
