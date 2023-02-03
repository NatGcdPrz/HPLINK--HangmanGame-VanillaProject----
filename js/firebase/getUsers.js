// Firebase
import firebaseApp from './firebase.js';
import { collection, doc, setDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js';

const getUsers = async () => {
    const users = collection(firebaseApp, 'Users');

    const docs = await getDocs(users);
    return docs;
}

export { getUsers };