import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB01T3GKSBUwcaIA_R0pPPS7HA4G_0gZR0",
  authDomain: "nanoswarm-game.firebaseapp.com",
  projectId: "nanoswarm-game",
  storageBucket: "nanoswarm-game.firebasestorage.app",
  messagingSenderId: "695722239815",
  appId: "1:695722239815:web:9e83b7cc2799953c810e62"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveUserData(username, data) {
  try {
    await setDoc(doc(db, "users", username), data);
  } catch (err) {
    console.error("Firebase Save Error:", err);
  }
}

export async function loadUserData(username) {
  try {
    const docSnap = await getDoc(doc(db, "users", username));
    return docSnap.exists() ? docSnap.data() : null;
  } catch (err) {
    console.error("Firebase Load Error:", err);
    return null;
  }
}
