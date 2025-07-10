
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Passar `true` para `getAuth` desativa a verificação do App Check.
// Isso é uma solução para ambientes de build onde a configuração do App Check
// pode ser complexa e causar falhas.
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize App Check only in the browser
if (typeof window !== 'undefined') {
  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider('6Lcr_OgpAAAAADsFkX_QPp7Pj8OecbVp1N6jF_k-'),
      isTokenAutoRefreshEnabled: true
    });
  } catch (error) {
    console.error("Firebase App Check initialization error:", error);
  }
}


export { app, auth, db };
