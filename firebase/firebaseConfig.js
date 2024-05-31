// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage' 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3qqxSvGQuPSot8FDIo6FEYBVO8gVDK0s",
  authDomain: "eksamenmobiledev.firebaseapp.com",
  projectId: "eksamenmobiledev",
  storageBucket: "eksamenmobiledev.appspot.com",
  messagingSenderId: "866197322658",
  appId: "1:866197322658:web:5abee9477fcee9271e50fb",
  measurementId: "G-1ZVCCW1Z3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app)
const storage = getStorage(app)
export { app, database, analytics, storage } 