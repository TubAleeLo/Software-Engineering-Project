//Webpack containerization loads css through js
import './styles/style.css'; 

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsQrVU-IPQtI6nIEDR6tbTz_PV-X0Bzac",
  authDomain: "projectw-6c4cd.firebaseapp.com",
  projectId: "projectw-6c4cd",
  storageBucket: "projectw-6c4cd.appspot.com",
  messagingSenderId: "190844827500",
  appId: "1:190844827500:web:4af77a2d52dfd84248e549",
  measurementId: "G-NM36DFY1Z1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = firebase.auth();



