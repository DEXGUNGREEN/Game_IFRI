// Fonction pour changement de couleur de fond
const element = document.body;
const animations = ['back1', 'back2', 'back3', 'back4', 'back5'];

//fonction pour la bar de vie
const healthFill = document.getElementById('healthFill');


function applyRandomAnimation() {
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
const health = document.querySelectorAll(".health");
const help = document.getElementById("help");
const helpBtn = document.getElementById('helpBtn'); 


// Deroulement du jeu
function initGame() {
    randomNumber = Math.floor(Math.random() * 10);
    attemptsLeft = 3;
    gameOver = false;
    guesses = [];
    document.getElementById('attemptsLeft').textContent = attemptsLeft;
    document.getElementById('message').textContent = '';
    document.getElementById('message').className = 'message';
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessBtn').disabled = false;
    document.getElementById('guessBtn').style.display = 'inline-block';
    document.getElementById('newGameBtn').style.display = 'none';
    document.getElementById('guessHistory').style.display = 'none';
    document.getElementById('guesses').innerHTML = '';
    helpBtn.style.display = 'inline-block'; 

    // 🔄 Réinitialisation de la barre de vie
    healthFill.style.width = "100%";
    healthFill.style.backgroundColor = "#0f0";
    
    
}

function makeGuess() {
    if (gameOver) return;
    const input = document.getElementById('guessInput');
    const guess = parseInt(input.value);
    const messageEl = document.getElementById('message');
    if (isNaN(guess) || guess < 0 || guess > 9) {
        click.play()
        messageEl.textContent = 'Veuillez entrer un chiffre entre 0 et 9 !';
        messageEl.className = 'message error';
        return;
    }
    guesses.push(guess);
    updateGuessHistory();
    attemptsLeft--;
    document.getElementById('attemptsLeft').textContent = attemptsLeft;

        
    healthFill.style.width = `${(attemptsLeft / 3) * 100}%`;
    if (attemptsLeft === 2) healthFill.style.backgroundColor = "#cc0"; // jaune
    else if (attemptsLeft === 1) healthFill.style.backgroundColor = "#f00"; // rouge

    if (guess === randomNumber) {
        win.play()
        messageEl.textContent = `🎉 Félicitations ! Vous avez trouvé le chiffre ${randomNumber} !`;
        messageEl.className = 'message success';
        endGame();
    } else if (attemptsLeft === 0) {
        gameover.play()
        messageEl.textContent = `😢 Dommage ! Le chiffre était ${randomNumber}. Essayez encore !`;
        messageEl.className = 'message error';
        endGame();
    } else {
        const hint = guess < randomNumber ? 'plus grand' : 'plus petit';
        dead.play()
        messageEl.textContent = `❌ Incorrect ! Il vous reste ${attemptsLeft} tentative(s).`;
        messageEl.className = 'message info';
    }
    input.value = '';
}

function showHint() {
    if (gameOver) return; 
    if (attemptsLeft === 0) return; 

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
    const historyEl = document.getElementById('guessHistory');
    const guessesEl = document.getElementById('guesses');
    historyEl.style.display = 'block';
    guessesEl.innerHTML = guesses.map(g => `<span class="guess-item">${g}</span>`).join('');
}

function endGame() {
    gameOver = true;
    document.getElementById('guessInput').disabled = true;
    document.getElementById('guessBtn').disabled = true;
    document.getElementById('guessBtn').style.display = 'none';
    document.getElementById('newGameBtn').style.display = 'inline-block';
}

function newGame() {
    initGame();
    tried.play()
}

document.getElementById('guessInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !gameOver) {
        makeGuess();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    applyRandomAnimation();
    initGame();
});

const startsong = document.getElementById("startsong");

startsong.addEventListener('click', () => { 
    
    if (saudio.length > 0) {
    
    const randomindex = Math.floor(Math.random() * saudio.length);
    
    const selectaudio = saudio[randomindex];

    selectaudio.play();

    startButton.style.display = 'none';
}

})

health.addEventListener('click', () => { 
    health.style.display.color = "white"
})