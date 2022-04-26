console.log(gameStart)

let gameBox = document.querySelector("#game-box")
let cat = document.querySelector("#cat");
let catPosition = parseInt(getComputedStyle(cat).left);

let bulletSpeed = 75;
let enemySpawnRate = 4000;
let enemySpeed = 900;

class Bullet {
    constructor() {
        this.startingXPosition = catPosition + 27.5,
        this.currentYPosition = 25;
        this.bulletBody = document.createElement("div");
    }
    create() {
        this.bulletBody.classList.add("bullet")
        this.bulletBody.style.left = `${this.startingXPosition}px`
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
class Enemy {
    constructor() {
        this.startingXPosition = 5 + Math.floor(Math.random() * 740);
        this.currentYPosition = 0;
        this.enemyBody = document.createElement("div")
    }
    create() {
        this.enemyBody.classList.add("enemy")
        this.enemyBody.style.left = `${this.startingXPosition}px`
        gameBox.append(this.enemyBody)
    }
    moveDown() {
        console.log(this.currentYPosition)
        this.currentYPosition += 30;
        this.enemyBody.style.top = `${this.currentYPosition}px`

        if(this.currentYPosition >= 415) {
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


//Shooting Bullets
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

//Enemies Appearing
function timeUntilEnemies() {
    let secondsUntilEnemies = 3;
    let countdown = setInterval(
        function() {      
            console.log(secondsUntilEnemies)      
            secondsUntilEnemies -= 1;
            if(secondsUntilEnemies===0) {
                clearInterval(countdown)
                enemiesAppearing()
            }
        }
    , 1000)
}
//Falling Items
function enemiesAppearing() {
    let enemiesRate = setInterval(
        function() {
            let enemy = new Enemy;
            enemy.create();

            let movingEnemy = setInterval(
                function() {
                    let move = enemy.moveDown();

                    if(!move) {
                        clearInterval(movingEnemy)
                    }
                }
            ,enemySpeed)
        }
    ,enemySpawnRate)
}


if (gameStart) {
    timeUntilEnemies();
    document.addEventListener("keydown", moveCat);
    document.addEventListener("keydown", fireBullet)
}
