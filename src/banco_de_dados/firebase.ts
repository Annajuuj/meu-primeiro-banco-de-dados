// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firestore from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFMSUB5HlvIi3RS_TxIl1D8QBqmZs0v8c",
  authDomain: "teste-16524.firebaseapp.com",
  projectId: "teste-16524",
  storageBucket: "teste-16524.appspot.com",
  messagingSenderId: "304564693823",
  appId: "1:304564693823:web:ffcc034934616f12f0c18a",
  measurementId: "G-EQ98741JBQ"
};

// Initialize Firebase
console.log("Conectado ao Firebase!")
const Firebase = initializeApp(firebaseConfig);
export const db = firestore.getFirestore(Firebase)
const analytics = getAnalytics(app);


export {firestore}