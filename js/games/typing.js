import { setScoreTyping } from '../firebase/setScore.js';
import { displayPseudo } from '../helpers/displayPseudo.js';


// Project
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const container = document.getElementById('container');



// List of words for game
const words = [
    'sambadijaneiro',
    'nicomaitre',
    'nathlabest',
    'clemtespostsonttop',
    'prout',
    'adambiencoiffé',
    'hospitalink',
    'tupues',
    'highfalutin',
    'application',
    'jeanromesjeuxsontmieux',
    'floonmangeunsanglier?',
    'developpement',
    'web',
    'programmer',
    'frontend'
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 20;

// Set difficulty to value in ls or medium
let difficulty =
    localStorage.getItem('difficulty') !== null
        ? localStorage.getItem('difficulty')
        : 'medium';

// Set difficulty select value
difficultySelect.value =
    localStorage.getItem('difficulty') !== null
        ? localStorage.getItem('difficulty')
        : 'medium';

// Focus on text on start
text.focus();


// Start counting down
function startTimer() {
    const timeInterval = setInterval(updateTime, 1000);
    if (time === 0) {
        clearInterval(timeInterval);
    }
}

// Start time
let buttonStart = document.getElementById("start_timer");

buttonStart.addEventListener("click", function () {
    startTimer();
})

// Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        // end game
        gameOver();
    }
}

// Game over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

    endgameEl.style.display = 'flex';

    setScoreTyping(score);
}

addWordToDOM();


// Event listeners
// Typing
text.addEventListener('input', e => {

    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        // Clear
        e.target.value = '';

        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 5;
        }

        updateTime();
    } else if (insertedText.length === randomWord.length) {

        displayErrorWord(container);

        // Clear
        e.target.value = '';
    }
});

// Function error word
const displayErrorWord = (element) => {
    element.classList.add("container-error");
    setTimeout(() => {
        element.classList.remove("container-error");
    }, 800)
}

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});

