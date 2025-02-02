<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Typing Exercise</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #eef;
            padding: 20px;
        }

        .exercise-container {
            background-color: #fffde7;
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 5px;
            font-size: 1.2em;
            line-height: 1.5;
            position: relative;
            margin-bottom: 10px;
        }

        .exercise-container .highlight {
            color: #00ccff;
        }

        .exercise-container .correct {
            color: #000;
        }

        .restart-btn {
            display: inline-block;
            margin-top: 10px;
            padding: 5px 10px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Typing Exercise 1.1</h1>
    <div class="exercise-container" id="exercise">
        jjj jjj jjj kkk kkk kkk jjj kkk jjj kkk jjj kkk jjj kkk kkk kkk jk jk jk kj kj kj kj jk jk jjj jk jk kk jk kj jk jjj j k j k j jk j k k kj j k j k k k j jk k k j j j k k k kj j j jk j jk jk jjj kjk kkj
    </div>
    <a href="#" class="restart-btn" id="restart">Restart</a>

    <script>
        const exerciseText = 'jjj jjj jjj kkk kkk kkk jjj kkk jjj kkk jjj kkk jjj kkk kkk kkk jk jk jk kj kj kj kj jk jk jjj jk jk kk jk kj jk jjj j k j k j jk j k k kj j k j k k k j jk k k j j j k k k kj j j jk j jk jk jjj kjk kkj';
        const exerciseElement = document.getElementById('exercise');
        const restartButton = document.getElementById('restart');
        let currentIndex = 0;

        function updateExercise() {
            const typedText = exerciseText.substring(0, currentIndex);
            const remainingText = exerciseText.substring(currentIndex);

            exerciseElement.innerHTML = `<span class="correct">${typedText}</span><span class="highlight">${remainingText.charAt(0)}</span>${remainingText.substring(1)}`;
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === exerciseText[currentIndex]) {
                currentIndex++;
                updateExercise();
            }
        });

        restartButton.addEventListener('click', (event) => {
            event.preventDefault();
            currentIndex = 0;
            updateExercise();
        });

        // Initial setup
        updateExercise();
    </script>
</body>
</html>
