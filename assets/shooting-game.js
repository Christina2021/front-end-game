console.log(gameStart)

var cat = document.querySelector("#cat");
var catPosition = parseInt(getComputedStyle(cat).left);

function moveCat(event) {
    if (event.key === "ArrowLeft") {
        moveCatLeft()
    } else if (event.key === "ArrowRight") {
        moveCatRight()
    }
}

function moveCatLeft() {
    if(catPosition > 0) {
        catPosition = catPosition - 25;
        cat.style.left = `${catPosition}px`
    }
}
function moveCatRight() {
    if(catPosition < 750) {
        catPosition = catPosition + 25;
        cat.style.left = `${catPosition}px`
    }
}

if (gameStart) {
    document.addEventListener("keydown", moveCat)
}
