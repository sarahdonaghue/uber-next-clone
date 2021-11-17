import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbs_WvUkkdejeV5O27jIIW9Vmdmyqcjf8",
  authDomain: "uber-next-clone-909d3.firebaseapp.com",
  projectId: "uber-next-clone-909d3",
  storageBucket: "uber-next-clone-909d3.appspot.com",
  messagingSenderId: "112403930853",
  appId: "1:112403930853:web:31c6550acfd630ec573e0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
const auth = getAuth()

export { app, provider, auth }