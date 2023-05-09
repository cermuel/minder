import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzTenDAG0vTX4f2eS_7rZqI8tVB4_sj88",
  authDomain: "minder-105e5.firebaseapp.com",
  projectId: "minder-105e5",
  storageBucket: "minder-105e5.appspot.com",
  messagingSenderId: "215921657458",
  appId: "1:215921657458:web:bbebcf640ded51ef8564eb",
  measurementId: "G-0N02TGVR9N",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
