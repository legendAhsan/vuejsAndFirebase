import firebase from "firebase/app"
// import admin from "firebase-admin"
const firebaseConfig = {
    apiKey: "AIzaSyBrNsmWtSaRcT1AXAuU3ROZDjngiNf6k6s",
    authDomain: "fir-app-9b3b5.firebaseapp.com",
    projectId: "fir-app-9b3b5",
    storageBucket: "fir-app-9b3b5.appspot.com",
    messagingSenderId: "633547416471",
    appId: "1:633547416471:web:61b4e0463c370fa2d35ad2"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db= firebase.firestore();
export default db;