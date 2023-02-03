import { getUser } from "./firebase/getUser.js";
import { getUsers } from "./firebase/getUsers.js";

const displayUsers = async () => {
    const users = await getUsers();
    await getUser();
    const scoreBoard = document.getElementById('score-board');

    users.forEach(element => {
        scoreBoard.insertAdjacentHTML("beforeend",
            `
        <div>
            <span>${element.data().pseudo}</span>
            <ul>
                <li>Handman : ${element.data().games.handman}</li>
                <li>BreakOut : ${element.data().games.breakout}</li>
                <li>Typing : ${element.data().games.typing}</li>
            </ul>
        </div>
        `)
    });
}

displayUsers();