import firebase from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyCTToNPaHO9UJ7pjMzf4agzAQE-WWux09A",
    authDomain: "fluide-ef11d.firebaseapp.com",
    projectId: "fluide-ef11d",
    storageBucket: "fluide-ef11d.appspot.com",
    messagingSenderId: "530525047570",
    appId: "1:530525047570:web:d3b6d5e9715ffc4e8481cb",
    measurementId: "G-Z43MXG3TMV"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db= firebase.firestore();
export default db;