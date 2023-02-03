
import firebaseApp from './firebase.js';
import { collection, doc, setDoc, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js';
import { getUser } from './getUser.js';

const createUser = async (pseudo) => {
    const user = collection(firebaseApp, 'Users');
    const userCreated = await addDoc(user, {
        pseudo: pseudo,
        games: {
            handman: 0,
            breakout: 0,
            typing: 0
        }
    })
    localStorage.setItem("pseudo", pseudo);
    localStorage.setItem("id", userCreated.id);

    await getUser();
}

export { createUser };