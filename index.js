const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let highestLevel = 0;

function startGame() {
    document.querySelector("h1").textContent = "Level " + level;
    nextSequence();
    started = true;
    document.getElementById("start-game").classList.add("hidden");
}
document.addEventListener("keydown", function (event) {
    if (event.key.toLowerCase() === "a" && !started) {
        startGame();
    }
})
document.getElementById("start-btn").addEventListener("click", function () {
    if (!started) {
        startGame();
    }
});



function nextSequence() {
    if (level > highestLevel) {
        highestLevel = level;
        document.querySelector(".high-score").textContent = "High Score: " + highestLevel;
    }
    document.querySelectorAll(".btn").forEach(button => {
        button.classList.add("avoid-click");
    });
    level++;
    document.querySelector("h1").textContent = "Level " + level;
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    gamePattern.forEach(function (color, index){
        setTimeout(function () {
            playSound(color);
            animatePress(color);
        }, index * 600);
    });
    // Réactive les clics après l'animation de la séquence
    setTimeout(function () {
        document.querySelectorAll(".btn").forEach(button => {
            button.classList.remove("avoid-click");
        });
    }, gamePattern.length * 600);
}
document.querySelectorAll(".btn").forEach(function (button) {
    button.addEventListener("click", function () {
        if (!started) return;
        let userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    })
})
function animatePress(currentColor) {
    document.getElementById(currentColor).classList.add("pressed");
    setTimeout(function () {
        document.getElementById(currentColor).classList.remove("pressed");
    }, 100);
}
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");;
        document.querySelector("h1").textContent = "Game Over, click Restart to try again";
        started = true;
    }
}

document.getElementById("restart-btn").addEventListener("click",
    function () {
    document.body.classList.remove("game-over");
    level = 0;
    gamePattern = [];
    started = false;
    document.querySelector("h1").textContent = "Level " + level;
    nextSequence();
    started = true;
});
