
import { initializeApp } from "firebase/app";
import { getFirebase } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAZ9LdH8s5u-MgzrclEkVRUj6mijjZ5aAY",
  authDomain: "cadastro-2a3ed.firebaseapp.com",
  projectId: "cadastro-2a3ed",
  storageBucket: "cadastro-2a3ed.firebasestorage.app",
  messagingSenderId: "26928816421",
  appId: "1:26928816421:web:f2b9ca7c663a5213c8facc"
};

const app = initializeApp(firebaseConfig)
const db = getFirebase(app)
export { db }