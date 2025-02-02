document.addEventListener("DOMContentLoaded", function() {
    const exercises = document.querySelectorAll(".exercise-container");

    exercises.forEach((exercise, index) => {
        let currentIndex = 0;
        exercise.innerHTML = highlightText(exercise.textContent, currentIndex);

        document.addEventListener("keydown", (event) => {
            if (event.key === " ") {
                event.preventDefault(); // Prevent default space key behavior
            }
            if (exerciseContains(exercise, event.key, currentIndex)) {
                currentIndex++;
                exercise.innerHTML = highlightText(exercise.textContent, currentIndex);
            }
        });

        document.getElementById(`restart${index + 1}`).addEventListener("click", function(event) {
            event.preventDefault();
            currentIndex = 0;
            exercise.innerHTML = highlightText(exercise.textContent, currentIndex);
        });
    });

    function highlightText(text, currentIndex) {
        return text.split("").map((char, index) => {
            if (index < currentIndex) {
                return `<span class="correct">${char}</span>`;
            } else if (index === currentIndex) {
                if (char === " ") {
                    return `<span class="highlight space-underline">${char}</span>`;
                } else {
                    return `<span class="highlight">${char}</span>`;
                }
            } else {
                return char;
            }
        }).join("");
    }

    function exerciseContains(exercise, key, currentIndex) {
        const text = exercise.textContent;
        const currentChar = text[currentIndex];

        // Check if currentChar matches key, including special characters
        return currentChar === key;
    }
});

