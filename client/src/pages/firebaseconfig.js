import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Replace with your actual Firebase project config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDHW6n3JLSsfbciivk-xL5iLVKTQOWFnbo",
  authDomain: "yfly-b2add.firebaseapp.com",
  projectId: "yfly-b2add",
  storageBucket: "yfly-b2add.firebasestorage.app",
  messagingSenderId: "98045187647",
  appId: "1:98045187647:web:4f2d67d4c697fd36270a8a",
  measurementId: "G-94W2N5SJWW"
};

//  Initialize Firebase App (Check if already initialized)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

//  Initialize Authentication
const auth = getAuth(app);
auth.useDeviceLanguage(); // Set authentication language to the user's device

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
