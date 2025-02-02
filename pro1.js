document.addEventListener('DOMContentLoaded', function () {
    const textElement = document.getElementById('text');
    const userInputElement = document.getElementById('userInput');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const audioElement = document.getElementById('audioPrompt');

    // Function to load text prompt dynamically
    function loadTextPrompt(text) {
        textElement.innerText = text;
    }

    // Function to load audio prompt dynamically
    function loadAudioPrompt(audio_path) {
        audioElement.src = audio_path;
    }

    // Event listener for start button
    startButton.addEventListener('click', function() {
        fetchRandomPair(); 
        // Load text prompt and audio prompt here
        // Start typing test logic
    });

    // Event listener for restart button
    restartButton.addEventListener('click', function() {
        // Reset typing test and reload prompts
        userInputElement.value = ''; // Clear user input
        // Reload text prompt and audio prompt
        fetchRandomPair();
    });

    // Function to fetch random text/audio pair from server
    function fetchRandomPair() {
        fetch('/random') // Assuming this endpoint returns a random text/audio pair
            .then(response => response.json())
            .then(data => {
                // Update text prompt
                textElement.textContent = data.text;
                
                // Update audio prompt
                audioElement.src = data.audio_path;
            })
            .catch(error => console.error('Error fetching random pair:', error));
    }

    // Fetch random pair when the page loads
    fetchRandomPair();

    // Event listener for the restart button
    restartButton.addEventListener('click', function () {
        // Fetch another random pair when the restart button is clicked
        fetchRandomPair();
    });

    // Function to calculate typing speed (you can define this function if needed)
    function calculateSpeed() {
        var text = textElement.innerText.trim().split(' ');
        var input = userInputElement.value.trim().split(' ');
        var correctWords = 0;
        for (var i = 0; i < text.length; i++) {
            if (text[i] === input[i]) {
                correctWords++;
            }
        }
        var wordsPerMinute = Math.round(correctWords / 5);
        document.getElementById('speed').innerText = wordsPerMinute;
        // Implement typing speed calculation logic here
    }
});
// Countdown timer function
function startTimer(duration, display) {
    var timer = duration;
    var minutes, seconds;

    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = "Time left: " + minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            clearInterval(interval); // Stop the timer
            alert("Time's up!"); // Pop-up message when time is up
        }
    }, 1000);
}

// Start timer when the page loads
document.addEventListener("DOMContentLoaded", function () {
    var sixtySeconds = 60;
    var display = document.querySelector('#timeDisplay');
    startTimer(sixtySeconds, display);
});

