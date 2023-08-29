let fuel = 100; // Initial fuel level
let score = 0;
let health = 100; // Initial health
let previousCarPosition = 0;
const gameArea = document.querySelector('.CarGame'); // Replace '.CarGame' with the actual class or ID of your game area element
// Get a reference to the audio element

const player = {
    speed: 6, // Adjust the speed as needed
    x: 0, // Initial x position
    y: 0, // Initial y position
    start: false // Whether the game has started or not
};
const scoreDisplay = document.querySelector('.Score');
// Get references to the car element and the container
const car = document.querySelector('.car');
const container = document.querySelector('.max-area');
const fuelDisplay = document.querySelector('.fuel-percentage');
const healthDisplay = document.querySelector('.health-bar');
healthDisplay.textContent = `Health: ${health}`;

// Set initial car position
let carHorizontalPosition = 50; // 50% - centered
let carVerticalPosition = 0; // Start lower on the screen

// Calculate the maximum and minimum positions for the car
const maxHorizontalCarPosition = 96 - (car.offsetWidth / container.offsetWidth) * 100;
const minCarPosition = 0;
const maxVerticalCarPosition = 96 - (car.offsetHeight / container.offsetHeight) * 100;
const minVerticalCarPosition = 0;

// Track the state of arrow keys
let leftKey = false;
let rightKey = false;
let upKey = false;
let downKey = false;

// Set the car's position
function setCarPosition() {
    car.style.left = carHorizontalPosition + '%';
    car.style.bottom = carVerticalPosition + '%';
}

// Handle keydown and keyup events for arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        leftKey = true;
    } else if (event.key === 'ArrowRight') {
        rightKey = true;
    } else if (event.key === 'ArrowUp') {
        upKey = true;
    } else if (event.key === 'ArrowDown') {
        downKey = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        leftKey = false;
    } else if (event.key === 'ArrowRight') {
        rightKey = false;
    } else if (event.key === 'ArrowUp') {
        upKey = false;
    } else if (event.key === 'ArrowDown') {
        downKey = false;
    }
});

let lastPosition = 0;
let isGameRunning = true; // Add a flag to indicate if the game is running

function updateScore(currentCarPosition) {
    if (!isGameRunning) {
        return; // Stop updating the score if the game is not running
    }

    const distanceTraveled = currentCarPosition - lastPosition;

    // Increase the score continuously (adjust the increment value as needed)
    const scoreIncrease = 0.001; // Adjust this value as needed
    score += scoreIncrease;

    // Update the best score if the current score is higher
    updateBestScore(Math.floor(score));

    lastPosition = currentCarPosition;

    scoreDisplay.textContent = `Score: ${Math.floor(score)}`;

    requestAnimationFrame(() => updateScore(currentCarPosition)); // Call the function on the next animation frame
}

// Call the function to start updating the score
updateScore(getCurrentCarPosition()); // Start with the current car position

// Function to stop the game
function stopGame() {
    isGameRunning = false;
}

function updateBestScore(newScore) {
    // Retrieve the previous best score from localStorage
    const previousBestScore = localStorage.getItem('bestScore');

    // If there's no previous best score or the new score is higher, update and save it
    if (!previousBestScore || newScore > parseFloat(previousBestScore)) {
        localStorage.setItem('bestScore', newScore);
    }
}

// Update car position based on arrow key state
function updateCarPosition() {
    if (leftKey) {
        carHorizontalPosition -= 0.5;
        if (carHorizontalPosition < minCarPosition) {
            carHorizontalPosition = minCarPosition;
        }
    }
    if (rightKey) {
        carHorizontalPosition += 0.5;
        if (carHorizontalPosition > maxHorizontalCarPosition) {
            carHorizontalPosition = maxHorizontalCarPosition;
        }
    }
    if (upKey) {
        carVerticalPosition += 0.6;
        if (carVerticalPosition > maxVerticalCarPosition) {
            carVerticalPosition = maxVerticalCarPosition;
        }
        if (upKey || downKey) {
            isMovingForward = upKey; // Set isMovingForward to true when moving up
        } else {
            isMovingForward = false;
        }
    }
    if (downKey) {
        carVerticalPosition -= 0.5;
        if (carVerticalPosition < minVerticalCarPosition) {
            carVerticalPosition = minVerticalCarPosition;
        }
    }
    setCarPosition();
}
function getCurrentCarPosition() {
    const carStyle = getComputedStyle(car);
    return parseFloat(carStyle.bottom);
}

// Update car position on each frame
function animate() {
    updateFuel();
    updateCarPosition();
    const currentCarPosition = getCurrentCarPosition();
    updateScore(currentCarPosition);
    requestAnimationFrame(animate);
}

// Initial car position setup
setCarPosition();
animate();

// Get references to the line elements
const leftLine = document.querySelector('.leftline');
const rightLine = document.querySelector('.rightline');
const lines = document.querySelector('.lines');
const lines2 = document.querySelector('.lines2');

// Initialize the position variables
let leftLinePosition = 0;
let rightLinePosition = 0;
let linesPosition = 0;
let lines2Position = 0;

// Function to move the road lines
// Define an array to store the positions of lines2 elements
const lines2Positions = [200, 0, -200, -400]; // Adjust these values as needed
const leftLinePositions = [200, 0, -200, -400];
const rightLinePositions = [200, 0, -200, -400];
const linesPositions = [200, 0, -200, -400];
function moveRoadLines() {
    // Update the positions of lines2 elements
    for (let i = 0; i < lines2Positions.length; i++) {
        lines2Positions[i] += 5; // Adjust the speed as needed

        // Check if a lines2 element has reached the bottom of the screen
        const screenHeight = window.innerHeight;
        if (lines2Positions[i] > screenHeight) {
            lines2Positions[i] = -100; // Reset to the top
        }

        // Apply the updated positions to the corresponding lines2 element
        const lines2Element = document.getElementById(`lines2-${i + 1}`);
        lines2Element.style.top = lines2Positions[i] + 'px';
    }///
    for (let i = 0; i < leftLinePositions.length; i++) {
        leftLinePositions[i] += 5; // Adjust the speed as needed

        // Check if a lines2 element has reached the bottom of the screen
        const screenHeight = window.innerHeight;
        if (leftLinePositions[i] > screenHeight) {
            leftLinePositions[i] = -100; // Reset to the top
        }

        // Apply the updated positions to the corresponding lines2 element
        const leftLinePositionsElement = document.getElementById(`leftline-${i + 1}`);
        leftLinePositionsElement.style.top = leftLinePositions[i] + 'px';
    }///
    for (let i = 0; i < rightLinePositions.length; i++) {
        rightLinePositions[i] += 5; // Adjust the speed as needed

        // Check if a lines2 element has reached the bottom of the screen
        const screenHeight = window.innerHeight;
        if (rightLinePositions[i] > screenHeight) {
            rightLinePositions[i] = -100; // Reset to the top
        }

        // Apply the updated positions to the corresponding lines2 element
        const rightLinePositionsElement = document.getElementById(`rightline-${i + 1}`);
        rightLinePositionsElement.style.top = rightLinePositions[i] + 'px';
    }///
    for (let i = 0; i < linesPositions.length; i++) {
        linesPositions[i] += 5; // Adjust the speed as needed

        // Check if a lines2 element has reached the bottom of the screen
        const screenHeight = window.innerHeight;
        if (linesPositions[i] > screenHeight) {
            linesPositions[i] = -100; // Reset to the top
        }

        // Apply the updated positions to the corresponding lines2 element
        const linesPositionsElement = document.getElementById(`lines-${i + 1}`);
        linesPositionsElement.style.top = linesPositions[i] + 'px';
    }///
}

// Call the moveRoadLines function at a regular interval (e.g., every 16ms)
setInterval(moveRoadLines, 16);


function createEnemyCars() {
    const numberOfEnemies = 10;
    const enemyCarsContainer = document.querySelector('.enemy-cars-container');
    const enemyCarImages = ['../gamepics/car1.png', '../gamepics/car3.png', '../gamepics/car4.png', '../gamepics/car5.png']; // Replace with your image filenames

    for (let i = 1; i <= numberOfEnemies; i++) {
        const enemyCar = document.createElement('img');
        enemyCar.src = `${enemyCarImages[Math.floor(Math.random() * enemyCarImages.length)]}`;
        enemyCar.classList.add('EnemyCar');
        enemyCar.id = `enemyCar${i}`;
        enemyCarsContainer.appendChild(enemyCar);

        const enemyCarWidth = 50; // Adjust as needed
        const enemyCarHeight = 30; // Adjust as needed

        const enemyCarLeft = getRandomNumber(0, container.clientWidth - enemyCarWidth);
        const enemyCarTop = -getRandomNumber(100, 500); // Adjust vertical spacing as needed

        enemyCar.style.left = `${enemyCarLeft}px`;
        enemyCar.style.top = `${enemyCarTop}px`;

        // Assign a random speed to each enemy car
        const enemyCarSpeed = getRandomNumber(2, 5); // Adjust the speed range as needed
        enemyCar.dataset.speed = enemyCarSpeed;
    }
}

// Call the function to create enemy cars
createEnemyCars();
const enemyCars = document.querySelectorAll('.EnemyCar'); // Select all enemy cars

// Set initial positions for enemy cars
enemyCars.forEach((enemyCar) => {
enemyCar.style.left = `${getRandomNumber(0, container.clientWidth - enemyCar.clientWidth)}px`;
    enemyCar.style.top = `${-getRandomNumber(100, 300)}px`; // Change this line
});


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveEnemyCars() {
    enemyCars.forEach((enemyCar) => {
        let enemyCarTop = parseInt(enemyCar.style.top);
        
        // Check if the enemy car has reached the bottom of the screen
        if (enemyCarTop >= container.clientHeight) {
            // If it has, reset its position to the top
            enemyCarTop = -getRandomNumber(100, 300);
            let enemyCarLeft = getRandomNumber(0, container.clientWidth - enemyCar.clientWidth);
            enemyCar.style.left = `${enemyCarLeft}px`;
        } else {
            // Otherwise, move the enemy car downward
            enemyCarTop += parseInt(enemyCar.dataset.speed); // Use the stored speed
        }

        // Update the position of the enemy car
        enemyCar.style.top = `${enemyCarTop}px`;
        if (checkCollision(car, enemyCar)) {
            handleCollision();
        }
    });

    requestAnimationFrame(moveEnemyCars);
}
function checkCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

function handleCollision() {
    // Reduce player's health
    health -= 1; // Adjust the health reduction as needed

    // Update the health display
    healthDisplay.textContent = `Health: ${health}`;

    // Check if the player's health reaches zero
    if (health <= 0) {
        // Game over logic (e.g., stop the game, show a game over message)
        gameOver();

    }

    // Check health level and apply CSS class for color change
    if (health < 30) {
        healthDisplay.classList.remove('medium-health');
        healthDisplay.classList.add('low-health');
    } else if (health < 70) {
        healthDisplay.classList.remove('low-health');
        healthDisplay.classList.add('medium-health');
    } else {
        healthDisplay.classList.remove('low-health', 'medium-health');
    }
}

// Call the moveEnemyCars function to start moving enemy cars
moveEnemyCars();

const treeImages = [
    '../gamepics/tree1.png',
    '../gamepics/tree2.png',
    '../gamepics/tree3.png',
    // Add more image paths as needed
];

function createTrees(side) {
    const numberOfTrees = 5; // Adjust the number as needed
    const treesContainer = document.querySelector(`.${side}-trees`);

    const treeWidth = 80; // Adjust the width of the tree images
    const treeHeight = 80; // Adjust the height of the tree images

    const spaceBetweenTrees = 50; // Space between each tree

    for (let i = 1; i <= numberOfTrees; i++) {
        const tree = document.createElement('img');

        // Randomly select a tree image path from the array
        const randomImagePath = treeImages[Math.floor(Math.random() * treeImages.length)];
        tree.src = randomImagePath;

        tree.classList.add('tree');
        tree.style.width = `${treeWidth}px`;
        tree.style.height = `${treeHeight}px`;
        tree.style.position = 'absolute';

        // Calculate vertical position with space between trees
        let treeTop = 100 + ((i - 1) % numberOfTrees) * (treeHeight + spaceBetweenTrees);

        if (side === 'left') {
            tree.style.left = '0';
        } else if (side === 'right') {
            tree.style.right = '0';
        }

        tree.style.top = `${treeTop}px`;

        treesContainer.appendChild(tree);

        // Assign a random speed to each tree
        const treeSpeed = 5; // Adjust the speed range as needed
        tree.dataset.speed = treeSpeed;
    }
}

// Call the function to create moving trees for left and right sides
createTrees('left');
createTrees('right');

function moveTrees() {
    const trees = document.querySelectorAll('.tree');

    trees.forEach((tree) => {
        let treeTop = parseInt(tree.style.top);

        // Check if the tree has gone off the screen
        if (treeTop >= container.clientHeight) {
            // Reset its position to the top
            treeTop = 10; // Set it to 100 pixels from the top

            if (tree.style.left === '0') {
                tree.style.right = '0';
            } else if (tree.style.right === '0') {
                tree.style.left = '0';
            }
        } else {
            // Otherwise, move the tree downward
            treeTop += parseInt(tree.dataset.speed); // Use the assigned speed
        }

        // Update the position of the tree
        tree.style.top = `${treeTop}px`;
    });

    requestAnimationFrame(moveTrees);
}

// Call the moveTrees function to start moving the trees
moveTrees();


function updateFuel() {
    // Deduct a small amount of fuel (adjust as needed)
    fuel -= 0.05; // You can change this value to control fuel consumption rate

    // Check if fuel goes below zero
    if (fuel < 0) {
        fuel = 0; // Set it to zero to prevent negative values
    }

    // Update the fuel display on the screen
    fuelDisplay.textContent = `Fuel: ${fuel.toFixed(1)}%`;

    // Check if the fuel is depleted
    if (fuel === 0) {
        // Implement game over logic or handle out-of-fuel conditions
        gameOver();
    }

    // Check fuel level and apply CSS class for color change
    if (fuel < 20) {
        fuelDisplay.classList.remove('medium-fuel');
        fuelDisplay.classList.add('low-fuel');
    } else if (fuel < 50) {
        fuelDisplay.classList.remove('low-fuel');
        fuelDisplay.classList.add('medium-fuel');
    } else {
        fuelDisplay.classList.remove('low-fuel', 'medium-fuel');
    }
}

const musicTracks = [
    '../menuaudio/g1.mp3',
    '../menuaudio/g2.mp3',
    '../menuaudio/g3.mp3',
    // Add more track paths as needed
];

function toggleMusic() {
    const audioElement = document.getElementById('gameMusic');

    if (!audioElement.paused) {
        // Music is already playing
        return;
    }

    // Randomly select a music track
    const randomIndex = Math.floor(Math.random() * musicTracks.length);
    const randomTrack = musicTracks[randomIndex];

    // Update the audio source and play the music
    audioElement.src = randomTrack;
    audioElement.load();
    audioElement.play();
}

// Add an event listener to the window to trigger music when the player car starts moving
window.addEventListener('keydown', toggleMusic);

function gameOver() {
    // Stop the game (e.g., stop animation, remove event listeners)
    // Display a game over message
    window.location.href = '../menugame/menu.html?score=' + score;
    const currentScore = Math.floor(score);
    const newWebPageURL = `../menugame/menu.html?score=${currentScore}`;
    window.location.href = newWebPageURL;
    // Reset the game if needed (reset player position, score, health, etc.)
}


const upgradeInstruction = document.querySelector('.upgrade-instruction');

document.addEventListener('keydown', (event) => {
    if (event.key === 'q' || event.key === 'Q') {
        increaseHealth();
        showUpgradeInstruction('Health increased!', 'rgba(0, 128, 0, 0.7)');
    } else if (event.key === 'e' || event.key === 'E') {
        increaseFuel();
        showUpgradeInstruction('Fuel increased!', 'rgba(0, 0, 128, 0.7)');
    }
});

// Function to show the upgrade instruction
function showUpgradeInstruction(message, bgColor) {
    upgradeInstruction.textContent = message;
    upgradeInstruction.style.backgroundColor = bgColor;
    upgradeInstruction.style.opacity = '1';

    setTimeout(() => {
        upgradeInstruction.style.opacity = '0';
    }, 5000); // Hide after 2 seconds (adjust as needed)
}

// Loop the upgrade instruction every 15 seconds
function loopUpgradeInstruction() {
    showUpgradeInstruction('Press "Q" to increase health or "E" to increase fuel.', 'rgba(128, 128, 0, 0.7)');
    setTimeout(loopUpgradeInstruction, 20000); // Repeat every 15 seconds
}

// Start the loop
loopUpgradeInstruction();

function increaseHealth() {
    if (health < 100) {
        health += 100; // Adjust this value as needed
        if (health > 100) {
            health = 100; // Ensure health doesn't exceed 100
        }
        updateUI();
    }
}

function increaseFuel() {
    if (fuel < 100) {
        fuel += 100; // Adjust this value as needed
        if (fuel > 100) {
            fuel = 100; // Ensure fuel doesn't exceed 100
        }
        updateUI();
    }
}

function updateUI() {
    fuelDisplay.textContent = `Fuel: ${fuel.toFixed(1)}%`;
    healthDisplay.textContent = `Health: ${health}%`;
}
