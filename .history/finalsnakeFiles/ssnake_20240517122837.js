//board
var board;
var Context;
var blocksize = 20;
var rows = 30;
var columns = 30;
var mesh = 1;

//sneak
var snakeX;
var snakeY;

//velocity
var velocityX = 0;
var velocityY = 0;

//apple
var appleX;
var appleY;

//body
var snakebody = [];

var gameover = false;

//loading the canvas
window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = columns * blocksize;
    Context = board.getContext("2d");

    placesnake();
    placeapple();
    document.addEventListener("keyup", changeDirection);
    document.addEventListener("boll", (e) => {
        snakebody.length = 4;
      }, { once: true });
    //update
    setInterval(update, 1000/10);
}

function update() {
    if (gameover) {
        return;
    }
    Context.fillStyle="rgb(83, 94, 158)";
    Context.fillRect(0, 0, board.width, board.height);

    Context.fillStyle="yellow";
    Context.fillRect(appleX, appleY, blocksize-1, blocksize-1);

    if (snakeX  == appleX && snakeY == appleY) {
        snakebody.push([appleX, appleY])
        placeapple();
    }

    for (let i = snakebody.length-1; i > 0; i--) {
        snakebody[i] = snakebody[i-1];
    }
    if (snakebody.length) {
        snakebody[0] = [snakeX, snakeY];
    }

    Context.fillStyle="black";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    Context.fillRect(snakeX, snakeY, blocksize-1, blocksize-1);
    for (let i = 0; i < snakebody.length; i++) {
        Context.fillStyle="gray";
        Context.fillRect(snakebody[i][0], snakebody[i][1], blocksize-1, blocksize-1);
    }

    if (snakeX < 0 || snakeX > columns*blocksize || snakeY < 0 || snakeY > rows *blocksize) {
        gameover = true;
        alert("hit a wall");
    }

    for (let i = 0; i < snakebody.length; i++) {
        if (snakeX == snakebody[i][0] && snakeY == snakebody[i][1]) {
            gameover = true;
            alert("ate tail");
        }
    }

    if (velocityX || velocityY == 1) {
        var boll = new CustomEvent("boll");
        document.dispatchEvent(boll);
    }

    if (velocityX || velocityY == -1) {
        var boll = new CustomEvent("boll");
        document.dispatchEvent(boll);
    }

    if (snakebody.length == 298) {
        alert("you win");
    }
}



function changeDirection(e) {
    if (e.code == "KeyW" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
        
    }

    else if (e.code == "KeyS" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }

    else if (e.code == "KeyA" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }

    else if (e.code == "KeyD" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }

    else if (e.code == "KeyK") {
       placeapple();
    }

    else if (e.code == "KeyL") {
        placesnake();
    }

    else if (e.code == "KeyQ") {
        gameover = true;
        alert("freeze")
    }

    else if (e.code == "KeyC") {
        snakebody.length = 7;
    }
}

function placeapple() {
    appleX = Math.floor(Math.random() * columns) * blocksize;
    appleY = Math.floor(Math.random() * rows) * blocksize;
}

function placesnake() {
    snakeX = Math.floor(Math.random() * columns) * blocksize;
    snakeY = Math.floor(Math.random() * rows) * blocksize;
}

function changeText(id) {
    id.innerHTML = "Snake game";
  }

//fixes. a number counting body cegments.

