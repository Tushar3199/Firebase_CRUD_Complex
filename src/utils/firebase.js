// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDRy4J763yBKNLOXsU9qJ6gOqkVrzZ294",
  authDomain: "practiseauth-cc5ac.firebaseapp.com",
  projectId: "practiseauth-cc5ac",
  storageBucket: "practiseauth-cc5ac.appspot.com",
  messagingSenderId: "935107624138",
  appId: "1:935107624138:web:f43ca4e57b390e9818c833",
  measurementId: "G-L8R1806DYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, firestore, auth, storage }