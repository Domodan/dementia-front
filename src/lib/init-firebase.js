// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBK_eQCyh4a8s-xKiuJBs0eL3c_GnIygu4",
  authDomain: "dementia-1e9ea.firebaseapp.com",
  databaseURL: "https://dementia-1e9ea-default-rtdb.firebaseio.com",
  projectId: "dementia-1e9ea",
  storageBucket: "dementia-1e9ea.appspot.com",
  messagingSenderId: "120539041022",
  appId: "1:120539041022:web:0c738918a526a901afa9af",
  measurementId: "G-KH5ML2L3TM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);