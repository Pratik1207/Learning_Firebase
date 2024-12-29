
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDBv5vx6N8_6J4YwPdN_kUMfcqAO9gdgHk",
  authDomain: "learnfirebase-9898c.firebaseapp.com",
  projectId: "learnfirebase-9898c",
  storageBucket: "learnfirebase-9898c.firebasestorage.app",
  messagingSenderId: "330135932117",
  appId: "1:330135932117:web:b03fbea63360dbd5b3265c",
  databaseURL : "https://learnfirebase-9898c-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);