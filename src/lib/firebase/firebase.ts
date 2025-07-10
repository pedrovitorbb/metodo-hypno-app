
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Pass `true` to `getAuth` to disable App Check verification.
// This is a workaround for build environments where App Check is not easily configured.
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize App Check only in the browser
if (typeof window !== 'undefined') {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Lcr_OgpAAAAADsFkX_QPp7Pj8OecbVp1N6jF_k-'),
    isTokenAutoRefreshEnabled: true
  });
}


export { app, auth, db };
