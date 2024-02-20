import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAJsF4f4eR_thb-X074HoHlYK5-1-w87CI",
  authDomain: "vetat-44bcf.firebaseapp.com",
  projectId: "vetat-44bcf",
  storageBucket: "vetat-44bcf.appspot.com",
  messagingSenderId: "778344710195",
  appId: "1:778344710195:web:b23760b6407ff601c3e346",
  measurementId: "G-8YR77RTR21"
};


const app = initializeApp(firebaseConfig);
const storage=getStorage(app);
const db=getFirestore(app)
const auth=getAuth(app);

export {db, storage, auth};