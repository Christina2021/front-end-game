console.log(gameStart)

let gameBox = document.querySelector("#game-box");
let cat = document.querySelector("#cat");
let catPosition = parseInt(getComputedStyle(cat).left);

let bulletNumber = 1;
let enemyNumber = 1;
let allBullets = [];
let allEnemies = [];
let bulletList = {};
let enemyList = {};

let bulletSpeed = 50;
let enemySpawnRate = 4000;
let enemySpeed = 900;

let lives = 3;
let points = 0;

class Bullet {
    constructor() {
        this.startingXPosition = catPosition + 27.5,
        this.currentYPosition = 25;
        this.bulletBody = document.createElement("div");
        this.bulletName;
        this.bulletRemove = false;
    }
    create(number) {
        this.bulletName = `bullet${number}`

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
    updateCoordinates() {
        //returns x midpoint and y top
        return [(this.startingXPosition + 1.5),(this.currentYPosition)]
    }
    remove(bulletName) {
        if(bulletName === this.bulletName){
            this.bulletBody.remove()
            this.bulletRemove = true;
        }
    }
    stopBulletInterval() {
        if (this.bulletRemove) {
            return true
        }
    }
}
class Enemy {
    constructor() {
        this.startingXPosition = 5 + Math.floor(Math.random() * 740);
        this.currentYPosition = 0;
        this.enemyBody = document.createElement("div");
        this.enemyName;
        this.enemyRemove = false;
    }
    create(number) {
        this.enemyName = `enemy${number}`

        this.enemyBody.classList.add("enemy")
        this.enemyBody.style.left = `${this.startingXPosition}px`
        gameBox.append(this.enemyBody)
    }
    moveDown() {
        this.currentYPosition += 30;
        this.enemyBody.style.top = `${this.currentYPosition}px`

        if(this.currentYPosition >= 415) {
            return false
        } else {
            return true
        }     
    }
    updateCoordinates() {
        if(!this.enemyRemove){
            //returns x left, x right, y top, y bottom
            return [(this.startingXPosition), (this.startingXPosition + 40), (400 - this.currentYPosition), (400 - this.currentYPosition - 30)]
        } else {
            return ""
        }
    }
    remove(enemyName) {
        if(enemyName === this.enemyName){
            this.enemyBody.remove()   
            this.enemyRemove = true;
        }
    }
    stopEnemyInterval() {
        if (this.enemyRemove) {
            return true
        }
    }
}

// Moving the game piece left and right
function moveCat(event) {
    if(lives > 0) {
        if(event.key === "ArrowLeft") {
            moveCatLeft()
        } else if(event.key === "ArrowRight") {
            moveCatRight()
        }
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
    if(event.key === " " && lives > 0) {
        var bullet = new Bullet;
        bullet.create(bulletNumber)
        bulletNumber++

        allBullets.push(bullet)
        bulletList[bullet.bulletName] = bullet.updateCoordinates()

        let movingBullet = setInterval(
            function() {
                let move = bullet.moveUp()
                
                
                bulletList[bullet.bulletName] = bullet.updateCoordinates()

                checkCollision();

                let stop = bullet.stopBulletInterval();

                if(!move || stop) {
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
            enemy.create(enemyNumber);
            enemyNumber++

            allEnemies.push(enemy)
            enemyList[enemy.enemyName] = enemy.updateCoordinates()

            let movingEnemy = setInterval(
                function() {

                    if(lives > 0) {
                        let move = enemy.moveDown();
                        

                        enemyList[enemy.enemyName] = enemy.updateCoordinates();

                        let stop = enemy.stopEnemyInterval();

                        if(!move || stop) {
                            clearInterval(movingEnemy)
                            if(!move) {
                                lives--;
                                console.log("Lives: " + lives)
                            }
                        }    
                    }
                }
            ,enemySpeed)

            if(lives <= 0) {
                clearInterval(movingEnemy)
                clearInterval(enemiesRate)
            }
        }
    ,enemySpawnRate)
}

function checkCollision() {
    for (let [bulletKey, bulletValue] of Object.entries(bulletList)) {
        for (let [enemyKey, enemyValue] of Object.entries(enemyList)) {
            
            //if bullet coordinates are in the enemy coordinate box
            if((bulletValue[0] > enemyValue[0]) && (bulletValue[0] < enemyValue[1]) && (bulletValue[1] < enemyValue[2]) && (bulletValue[1] > enemyValue[3])) {
                points++
                console.log("Score: " + points)

                bulletList[bulletKey] = ""
                enemyList[enemyKey] = ""
                removeBulletAndEnemy(bulletKey, enemyKey)
            }

        }
    }
}

function removeBulletAndEnemy(bulletRemove, enemyRemove) {
    allBullets.forEach(bullet => {
        bullet.remove(bulletRemove);
    })

    allEnemies.forEach(enemy => {
        enemy.remove(enemyRemove)
    })

}


if (gameStart) {
    timeUntilEnemies();
    document.addEventListener("keydown", moveCat);
    document.addEventListener("keydown", fireBullet)
}
