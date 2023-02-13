
import firebaseApp from './firebase.js';
import { collection, doc, setDoc, getDocs, addDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js';

const setScore = async (score) => {
    const userId = localStorage.getItem("id");
    const user = doc(firebaseApp, 'Users', userId);
    const userCreated = await updateDoc(user, {
        games: {
            handman: score
        }
    })

    return userCreated;
}

const setScoreTyping = async (score) => {
    const handmanScore = localStorage.getItem("handman");
    const breakoutScore = localStorage.getItem("breakout");
    const typingScoreFromLocalStorage = localStorage.getItem("typing");
    if (score <= typingScoreFromLocalStorage) return;
    const userId = localStorage.getItem("id");
    const user = doc(firebaseApp, 'Users', userId);
    const userCreated = await updateDoc(user, {
        games: {
            typing: +score,
            handman: +handmanScore,
            breakout: +breakoutScore
        }
    })
    localStorage.setItem("typing", score);
    return userCreated;
}

const setScoreBreakout = async (score) => {
    const handmanScore = localStorage.getItem("handman");
    const typingScore = localStorage.getItem("typing");
    const breakoutScoreFromLocalStorage = localStorage.getItem("breakout");
    if (score <= breakoutScoreFromLocalStorage) return;
    const userId = localStorage.getItem("id");
    const user = doc(firebaseApp, 'Users', userId);
    const userCreated = await updateDoc(user, {
        games: {
            typing: +typingScore,
            handman: +handmanScore,
            breakout: +score
        }
    })

    localStorage.setItem("breakout", score);
    return userCreated;
}

export { setScore, setScoreTyping, setScoreBreakout };

