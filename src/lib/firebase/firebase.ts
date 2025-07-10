
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config";
import { initializeAppCheck, ReCaptchaV3Provider, type AppCheck } from "firebase/app-check";

let app: FirebaseApp;
let appCheck: AppCheck | undefined;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

if (typeof window !== 'undefined') {
  try {
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider('6Lcr_OgpAAAAADsFkX_QPp7Pj8OecbVp1N6jF_k-'),
      isTokenAutoRefreshEnabled: true
    });
  } catch (error) {
    console.error("Firebase App Check initialization error:", error);
  }
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, appCheck };
