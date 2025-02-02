
        let timerInterval;
        let totalSeconds = 0;
        let timeLimit = 60;

        function startTimer() {
            if (!timerInterval) {
                timerInterval = setInterval(updateTimer, 1000);
            }
        }

        function updateTimer() {
            totalSeconds++;
            const secondsLeft = timeLimit - totalSeconds;
            const minutes = Math.floor(secondsLeft / 60);
            const seconds = secondsLeft % 60;
            document.getElementById("timer").innerText = formatTime(minutes) + ":" + formatTime(seconds);

            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                calculateSpeed();
                alert("Time's up! Test completed.");
            }
        }

        function formatTime(time) {
            return time < 10 ? "0" + time : time;
        }

        function startTest() {
            // Start the typing test logic
            document.getElementById('userInput').disabled = false;
            document.getElementById('userInput').focus();
            document.getElementById('userInput').value = '';
            document.getElementById('speed').innerText = '0';
            document.getElementById('accuracy').innerText = '0';
            totalSeconds = 0;
            startTimer();
            const audioElement = document.getElementById("audioPrompt");
            audioElement.play();
        }

        function restartTest() {
            // Restart the typing test logic
            document.getElementById('userInput').value = '';
            document.getElementById('speed').innerText = '0';
            document.getElementById('accuracy').innerText = '0';
            totalSeconds = 0;
            clearInterval(timerInterval);
            timerInterval = null;
            document.getElementById('timer').innerText = '01:00';
            document.getElementById('userInput').disabled = true;
            
            const audioElement = document.getElementById("audioPrompt");
            audioElement.pause(); // Stop the audio playback
            audioElement.currentTime = 0; // Reset audio to beginning
        }

        function calculateSpeed() {
            // Calculate typing speed and accuracy logic
            const text = document.getElementById('text').innerText.trim();
            const userInput = document.getElementById('userInput').value.trim();

            const wordsTyped = userInput.split(/\s+/).length;
            const wpm = Math.round(wordsTyped / (totalSeconds / 60));

            const originalWords = text.split(/\s+/);
            const typedWords = userInput.split(/\s+/);
            let correctWords = 0;

            for (let i = 0; i < typedWords.length; i++) {
                if (typedWords[i] === originalWords[i]) {
                    correctWords++;
                }
            }

            const accuracy = Math.round((correctWords / originalWords.length) * 100);

            document.getElementById('speed').innerText = wpm;
            document.getElementById('accuracy').innerText = accuracy;

            clearInterval(timerInterval);
            timerInterval = null;
            document.getElementById('userInput').disabled = true;

            const audioElement = document.getElementById("audioPrompt");
            audioElement.pause(); // Stop the audio playback
            audioElement.currentTime = 0; // Reset audio to beginning

            alert("Test completed. Your typing speed is " + wpm + " WPM with " + accuracy + "% accuracy.");
        }
   
