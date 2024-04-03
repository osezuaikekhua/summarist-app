// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyC9DtkJqeeD6Yzc4MdJrNPwflVT4iQv_3Q",
  authDomain: "summarist-app-d1be9.firebaseapp.com",
  projectId: "summarist-app-d1be9",
  storageBucket: "summarist-app-d1be9.appspot.com",
  messagingSenderId: "745978118348",
  appId: "1:745978118348:web:0e141237306488c1c2c269",
  measurementId: "G-W06YLZ9EYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app)
