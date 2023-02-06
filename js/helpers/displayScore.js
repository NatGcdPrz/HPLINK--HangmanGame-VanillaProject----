const scoreBtn = document.getElementById('score-btn');
const closeBtn = document.getElementById('close-btn');

// score and close event handlers
scoreBtn.addEventListener('click', () => score.classList.add('show'));
closeBtn.addEventListener('click', () => score.classList.remove('show'));