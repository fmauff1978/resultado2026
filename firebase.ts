import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCT7opLET0lDWqHM7Yw2FLgzPkn7CJGNcU",
  authDomain: "contas-27a8b.firebaseapp.com",
  projectId: "contas-27a8b",
  storageBucket: "contas-27a8b.firebasestorage.app",
  messagingSenderId: "549391682813",
  appId: "1:549391682813:web:541256ea0c386ad9470294"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const firebaseApp = app;
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
