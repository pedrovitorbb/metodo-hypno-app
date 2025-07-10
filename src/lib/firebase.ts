// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCO52NXqG1A7iZOOK96yr1IntIyS3BPffk",
  authDomain: "login-67c98.firebaseapp.com",
  projectId: "login-67c98",
  storageBucket: "login-67c98.firebasestorage.app",
  messagingSenderId: "792375254516",
  appId: "1:792375254516:web:36711d82eb2eba9bbeeda1",
  measurementId: "G-SDMK4HN136"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}


export { app, auth, analytics };
