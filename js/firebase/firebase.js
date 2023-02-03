// Fichier de configuration qui me permet de me connecter a Firebase 
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js';

const firebaseConfig = {
    apiKey: "AIzaSyAuUQzH5fm58iW8i-QtuYn4fsOuwyV23Fw",
    authDomain: "geekinside-2bb8f.firebaseapp.com",
    databaseURL: "https://geekinside-2bb8f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "geekinside-2bb8f",
    storageBucket: "geekinside-2bb8f.appspot.com",
    messagingSenderId: "306151598455",
    appId: "1:306151598455:web:64066a5ae277de227fd972",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

