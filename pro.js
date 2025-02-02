document.addEventListener('DOMContentLoaded', function() {
    const textPromptElement = document.getElementById('textPrompt');
    const userInputElement = document.getElementById('userInput');
    const startButton = document.getElementById('startButton');
    const restart = document.getElementById('restartButton');
    const audioPromptElement = document.getElementById('audioPrompt');

    // Function to load text prompt dynamically
    function loadTextPrompt(text) {
        textPromptElement.innerText = text;
    }

    // Function to load audio prompt dynamically
    function loadAudioPrompt(audioSrc) {
        audioPromptElement.src = audioSrc;
    }

    // Event listener for start button
    startButton.addEventListener('click', function() {
        // Load text prompt and audio prompt here
        // Start typing test logic
    });

    // Event listener for restart button
    restartButton.addEventListener('click', function() {
        // Reset typing test and reload prompts
        userInputElement.value = ''; // Clear user input
        // Reload text prompt and audio prompt
    });
});

function calculateSpeed() {
    var text = document.getElementById('text').innerText.trim().split(' ');
    var input = document.getElementById('userInput').value.trim().split(' ');
    var correctWords = 0;
    for (var i = 0; i < text.length; i++) {
        if (text[i] === input[i]) {
            correctWords++;
        }
    }
    var wordsPerMinute = Math.round(correctWords / 5);
    document.getElementById('speed').innerText = wordsPerMinute;
}
