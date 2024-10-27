// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZYYUy-h-2BXUqftkytnMIo7PPeNmilN8",
  authDomain: "login-authentication-83031.firebaseapp.com",
  projectId: "login-authentication-83031",
  storageBucket: "login-authentication-83031.appspot.com",
  messagingSenderId: "917749776563",
  appId: "1:917749776563:web:9eb99dba2e0c535c34f0c6",
  measurementId: "G-LZXW98PQD7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
