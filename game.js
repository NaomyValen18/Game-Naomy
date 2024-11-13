const maling = document.getElementById('maling');
const polisi = document.getElementById('polisi');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('game-over');
const gameContainer = document.getElementById('game-container');

let malingX = 100, malingY = 300;
let polisiX = 600, polisiY = 300;
let score = 0;
let obstacles = [];
let gameOver = false;

// Kecepatan
const speedMaling = 5;
const speedPolisi = 3;

// Gerakan maling
document.addEventListener('keydown', (event) => {
    if (gameOver) return;

    if (event.key === 'ArrowLeft') malingX -= speedMaling;
    if (event.key === 'ArrowRight') malingX += speedMaling;
    if (event.key === 'ArrowUp') malingY -= speedMaling;
    if (event.key === 'ArrowDown') malingY += speedMaling;

    maling.style.left = `${malingX}px`;
    maling.style.top = `${malingY}px`;
});

// Gerakan polisi mengikuti maling
function movePolisi() {
    if (gameOver) return;

    if (polisiX < malingX) polisiX += speedPolisi;
    if (polisiX > malingX) polisiX -= speedPolisi;
    if (polisiY < malingY) polisiY += speedPolisi;
    if (polisiY > malingY) polisiY -= speedPolisi;

    polisi.style.left = `${polisiX}px`;
    polisi.style.top = `${polisiY}px`;
}

// Menambahkan rintangan
function addObstacle() {
    const x = Math.random() * 700 + 100;
    const y = Math.random() * 500 + 50;
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = `${x}px`;
    obstacle.style.top = `${y}px`;
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
}

// Mengecek tabrakan dengan rintangan
function checkCollision() {
    if (gameOver) return;

    obstacles.forEach(obstacle => {
        const obX = parseInt(obstacle.style.left);
        const obY = parseInt(obstacle.style.top);

        if (malingX < obX + 30 && malingX + 50 > obX &&
            malingY < obY + 30 && malingY + 50 > obY) {
            gameOver = true;
            gameOverDisplay.style.display = 'block';
        }
    });
}

// Update skor
function updateScore() {
    if (gameOver) return;
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Game loop
function gameLoop() {
    if (gameOver) return;

    movePolisi();
    checkCollision();
    updateScore();
    requestAnimationFrame(gameLoop);
}

// Mengatur rintangan tiap detik
setInterval(() => {
    if (gameOver) return;
    addObstacle();
}, 1000);

// Menjalankan game
gameLoop();