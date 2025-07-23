const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

document.addEventListener("keydown", function (event) {
    if (event.key.toLowerCase() === "a" && !started) {
        document.querySelector("h1").textContent = "Level " + level;
        nextSequence();
        started = true;
    }
});
function nextSequence() {
    level++;
    document.querySelector("h1").textContent = "Level " + level;
    userClickedPattern = [];
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    // document.getElementById(randomChosenColor).classList.add("pressed");
    // setTimeout(function () {
    //    document.getElementById(randomChosenColor).classList.remove("pressed");
    //}, 200);
    gamePattern.forEach(function (color, index){
        setTimeout(function () {
            playSound(color);
            animatePress(color);
        }, index * 600);
        });
}
document.querySelectorAll(".btn").forEach(function (button) {
    button.addEventListener("click", function () {
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
        console.log("Bonne réponse");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Faux !");
        playSound("wrong");
        document.body.classList.add("game-over");

        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 200);

        document.querySelector("h1").textContent = "Game Over, Press A to Restart";
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
