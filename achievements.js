document.getElementById("show-achievements").addEventListener("click", function () {
    const achievements = document.querySelectorAll(".achievement");
    achievements.forEach((achievement) => {
        achievement.classList.toggle("hidden");
    });
});

const achievements = document.querySelectorAll(".achievement");
const buttonColors = ['#BFBFBF', '#FF6340', '#FFD500', '#67C91F'];
let totalScore = 0;

achievements.forEach((achievement) => {
    let clickCounter = 0;
    
    achievement.addEventListener("click", function () {
        const levelValue = achievement.querySelector(".level-value");
        const currentLevel = parseInt(levelValue.textContent);

        if (currentLevel < 3) {
            levelValue.textContent = currentLevel + 1;

            clickCounter++;
            if (clickCounter >= buttonColors.length) {
                clickCounter = 0;
            }
            achievement.style.backgroundColor = buttonColors[clickCounter];

            totalScore += currentLevel + 1;
            document.getElementById("score-value").textContent = totalScore;
        } else {
            alert("Вы полностью открыли это направление!");
        }
    });
});