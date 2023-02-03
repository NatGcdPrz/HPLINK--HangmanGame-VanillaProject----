import { setScore } from '../firebase/setScore.js';
import { displayPseudo } from '../helpers/displayPseudo.js';

const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');
const song = "/music/notification-echec.mp3";
const songWin = "/music/notification-win.mp3";

const gameOnBtn = document.getElementById('game-on');

const figureParts = document.querySelectorAll('.figure-part');
const API_URL = 'https://random-word-api.herokuapp.com/word?number=200&lang=en';

displayPseudo();

async function getWords() {
    const data = await fetch(API_URL);

    const dataToJson = data.json();
    console.log(dataToJson);
    return dataToJson;
}

const play = async () => {
    let words = await getWords();
    let niceTryAdam = words[Math.floor(Math.random() * words.length)];
    let playable = true;

    const correctLetters = [];
    const wrongLetters = [];

    // Show hidden word
    function displayWord() {
        wordEl.innerHTML = `
    ${niceTryAdam
                .split('')
                .map(
                    letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
                )
                .join('')}
  `;

        const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

        if (innerWord === niceTryAdam) {
            finalMessage.innerText = 'Gagné 😃';

            popup.style.display = 'flex';

            playable = false;
            new Audio(songWin).play();
        }
    }

    // Update the wrong letters
    function updateWrongLettersEl() {
        // Display wrong letters
        wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

        // Display parts
        figureParts.forEach((part, index) => {
            const errors = wrongLetters.length;

            if (index < errors) {
                part.style.display = 'block';
            } else {
                part.style.display = 'none';
            }
        });

        // Check if lost
        if (wrongLetters.length === figureParts.length) {
            finalMessage.innerText = 'Perdu 😕';

            finalMessageRevealWord.innerText = `...le mot était: ${niceTryAdam}`;
            popup.style.display = 'flex';

            playable = false;
            new Audio(song).play();
        }
    }


    // Show notification
    function showNotification() {
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }


    // Keydown letter press
    window.addEventListener('keydown', e => {
        if (playable) {
            if (e.keyCode >= 65 && e.keyCode <= 90) {
                const letter = e.key.toLowerCase();

                if (niceTryAdam.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        correctLetters.push(letter);

                        displayWord();
                    } else {
                        showNotification();
                    }
                } else {
                    if (!wrongLetters.includes(letter)) {
                        wrongLetters.push(letter);

                        updateWrongLettersEl();
                    } else {
                        showNotification();
                    }
                }
            }
        }
    });

    // Restart game and play again
    playAgainBtn.addEventListener('click', () => {
        playable = true;


        //  Empty arrays
        correctLetters.splice(0);
        wrongLetters.splice(0);

        niceTryAdam = words[Math.floor(Math.random() * words.length)];

        displayWord();

        updateWrongLettersEl();


        popup.style.display = 'none';

    });
    displayWord();
}

play();
