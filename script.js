let randomNumber;
let attemptsLeft;
let gameOver;
let guesses;
let currentTheme = 'purple';

const click = document.getElementById("clicked");
const dead = document.getElementById("dead");
const gameover = document.getElementById("gameover");
const tried = document.getElementById("try");
const win = document.getElementById("win");
const saudio = document.querySelectorAll(".saudio");
const help = document.getElementById("help");
const startSongButton = document.getElementById("startsong");
const helpBtn = document.getElementById('helpBtn');

function applyRandomAnimation() {
    const element = document.body;
    const animations = ['back1', 'back2', 'back3', 'back4', 'back5'];
    element.style.animation = 'none';
    void element.offsetWidth;
    const randomIndex = Math.floor(Math.random() * animations.length);
    const randomAnimationName = animations[randomIndex];
    element.style.animation = `${randomAnimationName} 60s infinite alternate linear`;

    const gameInfoElement = document.querySelector('.game-info');
    if (gameInfoElement) {
        gameInfoElement.style.setProperty('--border-animation', `${randomAnimationName} 60s infinite alternate linear`);
    }
}

function initGame() {
    randomNumber = Math.floor(Math.random() * 10);
    attemptsLeft = 3;
    gameOver = false;
    guesses = [];

    document.getElementById('attemptsLeft').textContent = attemptsLeft;
    document.getElementById('message').textContent = '';
    document.getElementById('message').className = 'message';

    document.getElementById('newGameBtn').style.display = 'none';
    document.getElementById('guessHistory').style.display = 'none';
    document.getElementById('guesses').innerHTML = '';
    helpBtn.style.display = 'inline-block';
}

function makeGuess(guess) {
    if (gameOver) return;

    const messageEl = document.getElementById('message');

    if (isNaN(guess) || guess < 0 || guess > 9) {
        click.play();
        messageEl.textContent = 'Veuillez entrer un chiffre entre 0 et 9 !';
        messageEl.className = 'message error';
        return;
    }

    guesses.push(guess);
    updateGuessHistory();
    attemptsLeft--;
    document.getElementById('attemptsLeft').textContent = attemptsLeft;

    if (guess === randomNumber) {
        win.play();
        messageEl.textContent = `🎉 Félicitations ! Vous avez trouvé le chiffre ${randomNumber} !`;
        messageEl.className = 'message success';
        endGame();
    } else if (attemptsLeft === 0) {
        gameover.play();
        messageEl.textContent = `😢 Dommage ! Le chiffre était ${randomNumber}. Essayez encore !`;
        messageEl.className = 'message error';
        endGame();
    } else {
        dead.play();
        messageEl.textContent = `❌ Incorrect !`;
        messageEl.className = 'message info';
    }
}

function showHint() {
    if (gameOver || attemptsLeft === 0) return;

    const messageEl = document.getElementById('message');

    if (messageEl.className.includes('info')) {
        const lastGuess = guesses[guesses.length - 1];
        const hint = lastGuess < randomNumber ? 'plus grand' : 'plus petit';
        messageEl.textContent = `❌ Incorrect ! Le chiffre est ${hint} que ${lastGuess}. Il vous reste ${attemptsLeft} tentative(s).`;
    } else {
        messageEl.textContent = 'Vous n\'avez pas besoin d\'aide pour l\'instant !';
        messageEl.className = 'message info';
    }

    if (tried) help.play();
}

function updateGuessHistory() {
    const boxes = [document.querySelector('.box4 p'), document.querySelector('.box5 p'), document.querySelector('.box6 p')];
    for (let i = 0; i < guesses.length; i++) {
        if (boxes[i]) {
            boxes[i].textContent = `Tentative ${i + 1} : ${guesses[i]}`;
        }
    }
}

function endGame() {
    gameOver = true;
    document.getElementById('newGameBtn').style.display = 'inline-block';
}

function newGame() {
    initGame();
    tried.play();
}

document.addEventListener('DOMContentLoaded', function () {
    applyRandomAnimation();
    initGame();

    const numberButtons = document.querySelectorAll('.chiffres_containers');
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            const number = parseInt(button.textContent);
            makeGuess(number);
        });
    });
});

function playRandomSaudio() {
  if (saudio.length > 0) {

    const randomIndex = Math.floor(Math.random() * saudio.length);

    const randomAudio = saudio[randomIndex];

    randomAudio.play();
  }
}

if (startSongButton) {
  startSongButton.addEventListener("click", playRandomSaudio);
}