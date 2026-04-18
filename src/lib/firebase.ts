import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCm2BWy4yC5E9KVwvY7YF374tgEJww2gj0",
  authDomain: "steady-4edfa.firebaseapp.com",
  projectId: "steady-4edfa",
  storageBucket: "steady-4edfa.appspot.com",
  messagingSenderId: "353114065302",
  appId: "1:353114065302:web:7000e3e9492d77c03c35b7",
  measurementId: "G-WEXYLZWL4G",
};

let app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;

function getApp(): FirebaseApp {
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseAuth(): Auth {
  if (typeof window === "undefined") {
    throw new Error("Firebase Auth is browser-only");
  }
  if (!_auth) _auth = getAuth(getApp());
  return _auth;
}

export function getDb(): Firestore {
  if (!_db) _db = getFirestore(getApp());
  return _db;
}
