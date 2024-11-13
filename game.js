const gameContainer = document.getElementById("game-container");
const maling = document.getElementById("maling");
const polisi = document.getElementById("polisi");
const scoreDisplay = document.getElementById("score");
const gameOverDisplay = document.getElementById("game-over");

let score = 0;
let gameOver = false;
let obstacles = [];

// Posisi awal maling dan polisi
let malingX = 180;
let malingY = 500;
let polisiX = 180;
let polisiY = 400;

// Kecepatan
const speedMaling = 10;
const speedPolisi = 2;

// Gerakan maling dengan tombol panah
document.addEventListener("keydown", (event) => {
    if (gameOver) return;

    if (event.key === "ArrowLeft" && malingX > 0) malingX -= speedMaling;
    if (event.key === "ArrowRight" && malingX < 360) malingX += speedMaling;

    maling.style.left = `${malingX}px`;
    maling.style.bottom = `${malingY}px`;
});

// Fungsi untuk membuat rintangan baru
function createObstacle() {
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = `${Math.floor(Math.random() * 360)}px`;
    obstacle.style.bottom = "600px";
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
}

// Gerakan polisi mengikuti maling
function movePolisi() {
    if (polisiX < malingX) polisiX += speedPolisi;
    if (polisiX > malingX) polisiX -= speedPolisi;

    polisi.style.left = `${polisiX}px`;
    polisi.style.bottom = `${polisiY}px`;
}

// Gerakan rintangan turun ke bawah
function moveObstacles() {
    obstacles.forEach((obstacle, index) => {
        let obstacleY = parseInt(obstacle.style.bottom);
        obstacleY -= 5;
        obstacle.style.bottom = `${obstacleY}px`;

        // Menghapus rintangan jika sudah di luar layar
        if (obstacleY < -40) {
            obstacle.remove();
            obstacles.splice(index, 1);
        }

        // Mengecek tabrakan dengan maling
        if (
            malingX < parseInt(obstacle.style.left) + 40 &&
            malingX + 20 > parseInt(obstacle.style.left) &&
            malingY < obstacleY + 40 &&
            malingY + 50 > obstacleY
        ) {
            endGame();
        }
    });
}

// Mengakhiri permainan
function endGame() {
    gameOver = true;
    gameOverDisplay.style.display = "block";
    clearInterval(obstacleInterval);
    clearInterval(gameInterval);
}

// Menjalankan game loop
function gameLoop() {
    if (gameOver) return;

    movePolisi();
    moveObstacles();
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Menjalankan interval rintangan
const obstacleInterval = setInterval(createObstacle, 2000);

// Menjalankan game loop
const gameInterval = setInterval(gameLoop, 50);
