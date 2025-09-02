import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { 
  apiKey: "AIzaSyBOzIlXKGjIXPAziKgxbrAcGdmO1wZDvDo",
  authDomain: "miniblog-2602a.firebaseapp.com",
  projectId: "miniblog-2602a",
  storageBucket: "miniblog-2602a.firebasestorage.app",
  messagingSenderId: "902710347129",
  appId: "1:902710347129:web:fcd6e4e9e34080f7241ba8"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);                
const db   = getFirestore(app);             

export { app, auth, db };
