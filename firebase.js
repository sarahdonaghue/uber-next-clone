// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxNXNGx325fFtwiCZiwzCtoRGMAWsHHL0",
  authDomain: "uber-next-live-cb6ff.firebaseapp.com",
  projectId: "uber-next-live-cb6ff",
  storageBucket: "uber-next-live-cb6ff.appspot.com",
  messagingSenderId: "794665403437",
  appId: "1:794665403437:web:b4904b689d1945618264a4",
  measurementId: "G-3Q5M27TPTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth};