// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcVjlGMgSfBbL0318YXXgJM3-yc05_Zwc",
  authDomain: "recipemediaapp.firebaseapp.com",
  projectId: "recipemediaapp",
  storageBucket: "recipemediaapp.appspot.com",
  messagingSenderId: "610235650771",
  appId: "1:610235650771:web:4d2f451914dd4e11fbfa26",
  measurementId: "G-PSSRG2N6FL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
