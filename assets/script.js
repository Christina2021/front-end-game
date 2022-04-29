var startButton = document.querySelector("#start-button")
var overlay = document.querySelector("#overlay")
var gameOverText = document.querySelector("#game-over")

var gameStart = false;

function start(event) {
    event.preventDefault()

    startButton.style.display = "none";
    overlay.style.display = "none";
    gameOverText.style.display = "none";

    gameStart = true;
    
    startShooterGame();

}

startButton.addEventListener("click", start)