import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import "firebase/firestore"
import "firebase/storage"



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOGqQ-qNArdXDP2wUg9728hn5IN9PYsME",
    authDomain: "fir-4edd2.firebaseapp.com",
    projectId: "fir-4edd2",
    storageBucket: "fir-4edd2.appspot.com",
    messagingSenderId: "361225413746",
    appId: "1:361225413746:web:0652d87feea4e044de4eeb",
    measurementId: "G-FFWNSCKXWR"
  };

  export const Firebase = initializeApp(firebaseConfig);
  //  console.log("testing firebase "+Firebase);
   export const auth = getAuth(Firebase);
   export const firestore=getFirestore(Firebase)
   export const storage=getStorage(Firebase)