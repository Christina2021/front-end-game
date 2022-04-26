console.log(gameStart)

let gameBox = document.querySelector("#game-box")
let cat = document.querySelector("#cat");
let catPosition = parseInt(getComputedStyle(cat).left);

let bulletSpeed = 75;

class Bullet {
    constructor() {
        this.startingPosition = catPosition + 27.5,
        this.currentYPosition = 25;
        this.bulletBody = document.createElement("div");
    }
    create() {
        this.bulletBody.classList.add("bullet")
        this.bulletBody.style.left = `${this.startingPosition}px`
        gameBox.append(this.bulletBody)
    }
    moveUp() {
        this.currentYPosition += 15;
        this.bulletBody.style.bottom = `${this.currentYPosition}px`

        if(this.currentYPosition >= 400) {
            return false
        } else {
            return true
        }     
    }
}

// Moving the game piece left and right
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


//Shooting Items
function fireBullet(event) {
    if(event.key === " ") {
        var bullet = new Bullet;
        bullet.create()

        let movingBullet = setInterval(
            function() {
                let move = bullet.moveUp()
                
                if(!move) {
                    clearInterval(movingBullet)
                }
            }
        ,bulletSpeed)
    }
}


if (gameStart) {
    document.addEventListener("keydown", moveCat);
    document.addEventListener("keydown", fireBullet)
}
