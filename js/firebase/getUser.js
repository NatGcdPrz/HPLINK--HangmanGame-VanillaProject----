import firebaseApp from './firebase.js';
import { collection, doc, setDoc, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js';

const getUser = async () => {
    const userId = localStorage.getItem("id");
    const userRef = await doc(firebaseApp, 'Users', userId);
    const user = await getDoc(userRef);

    localStorage.setItem("handman", user.data().games.handman);
    localStorage.setItem("breakout", user.data().games.breakout);
    localStorage.setItem("typing", user.data().games.typing);
}

export { getUser };