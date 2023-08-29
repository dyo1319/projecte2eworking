
function startGame() {
    // Redirect to the game page with a placeholder for the score
    window.location.href = '../ingame/game.html?score=0'; // 0 is a placeholder score
}

function resetGame() {

    window.location.href = 'menu.html'; 
}

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the score from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentScore = urlParams.get('score');

    // Update the score display
    const scoreDisplay = document.getElementById('scoreDisplay');
    if (currentScore !== null) {
        scoreDisplay.textContent = `Your Last Score is: ${currentScore}`;
    }
});


// Get references to the select element and audio source
var musicSelect = document.getElementById("musicSelect");
var musicSource = document.getElementById("musicSource");
var backgroundMusic = document.getElementById("backgroundMusic");

// Add an event listener to the select element
musicSelect.addEventListener("change", function() {
    // Get the selected value (the file name of the song)
    var selectedMusic = musicSelect.value;
    
    // Update the audio source
    musicSource.src = selectedMusic;
    
    // Load and play the new audio source
    backgroundMusic.load();
    backgroundMusic.play();
});
