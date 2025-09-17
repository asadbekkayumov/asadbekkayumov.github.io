const player = document.getElementById('player');
const object = document.getElementById('object');
const scoreElement = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
const difficultySelect = document.getElementById('difficulty');

let playerPos = 180;
let objectPosX = Math.floor(Math.random() * 380);
let objectPosY = 0;
let score = 0;
let speed = parseInt(difficultySelect.value);
let gameRunning = true;

// Move player with arrow keys
document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft' && playerPos > 0) playerPos -= 50;
    if(e.key === 'ArrowRight' && playerPos < 360) playerPos += 50;
    player.style.left = playerPos + 'px';
});

// Change difficulty
difficultySelect.addEventListener('change', () => {
    speed = parseInt(difficultySelect.value);
});

// Restart game
restartBtn.addEventListener('click', () => {
    score = 0;
    scoreElement.textContent = score;
    objectPosY = 0;
    objectPosX = Math.floor(Math.random() * 380);
    restartBtn.style.display = 'none';
    gameRunning = true;
    gameLoop();
});

// Game loop
function gameLoop() {
    if(!gameRunning) return;

    objectPosY += speed;
    object.style.top = objectPosY + 'px';
    object.style.left = objectPosX + 'px';

    // Check collision
    if(objectPosY + 20 >= 360 && objectPosX + 20 > playerPos && objectPosX < playerPos + 40) {
        score++;
        scoreElement.textContent = score;
        resetObject();
    } else if(objectPosY > 400) {
        alert("Game Over! Your score: " + score);
        restartBtn.style.display = 'inline';
        gameRunning = false;
        return;
    }

    requestAnimationFrame(gameLoop);
}

function resetObject() {
    objectPosY = 0;
    objectPosX = Math.floor(Math.random() * 380);
}

gameLoop();
