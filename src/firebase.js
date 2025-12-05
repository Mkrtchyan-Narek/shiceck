import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCWIT6FOiJ7m6hYZpudKr9UD3HOjrXzMs",
  authDomain: "shihub-a202a.firebaseapp.com",
  projectId: "shihub-a202a",
  storageBucket: "shihub-a202a.firebasestorage.app",
  messagingSenderId: "492337959932",
  appId: "1:492337959932:web:12feb839cf757e21b9d879",
  measurementId: "G-G89D0GQKRW"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);