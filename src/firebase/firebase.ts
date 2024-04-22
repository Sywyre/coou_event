import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "coou-20239.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: "coou-20239.appspot.com",
  messagingSenderId: "162626607295",
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: "G-ZXHRX0SB2W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
