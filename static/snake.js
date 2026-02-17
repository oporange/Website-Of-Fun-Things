var canvas = document.getElementById("SnakeCanvas")
var ctx = canvas.getContext("2d");

var x = 0;
var y = 0;

var SnakeLength = 0;

var Snakes = []

let lastDownTarget;

var CurrentKeyPressed;
var SnakeDirection;

var appleX = Math.floor(Math.random() * 20) * 50;
var appleY = Math.floor(Math.random() * 12) * 50;

// 1000 x 600 display, 20 x 12

document.addEventListener('keydown',
    function (event) {
        console.log('Keydown event! Key pressed: ' + event.key);
        
        if (event.key == "w" && SnakeDirection != "s") {
            CurrentKeyPressed = "w";
        }
        if (event.key == "a" && SnakeDirection != "d") {
            CurrentKeyPressed = "a";
        }
        if (event.key == "s" && SnakeDirection != "w") {
            CurrentKeyPressed = "s";
        }
        if (event.key == "d" && SnakeDirection != "a") {
            CurrentKeyPressed = "d";
        }
    }, false);

function RandomApple() {
    let appleInSnake = false;
    for (let i = 0; i < Snakes.length; i++) {
        if (Snakes[i].x == appleX && Snakes[i].y == appleY) {
            appleInSnake = true;
            break;
        }
    }
    if (appleInSnake) {
        appleX = Math.floor(Math.random() * 20) * 50;
        appleY = Math.floor(Math.random() * 12) * 50;
        RandomApple(); // Recursively call until apple is not in snake
    }
}

const loop = setInterval(() => {

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = "red";
    ctx.fillRect(appleX + 12.5, appleY + 12.5, 25, 25);
    ctx.fillStyle = "black";
    
    if (CurrentKeyPressed == "w") {
        y -= 50;
        SnakeDirection = "w";
    }
    if (CurrentKeyPressed == "a") {
        x -= 50;
        SnakeDirection = "a";
    }
    if (CurrentKeyPressed == "s") {
        y += 50;
        SnakeDirection = "s";
    }
    if (CurrentKeyPressed == "d") {
        x += 50;
        SnakeDirection = "d";
    }

    Snakes.push({x: x, y: y});

    if (Snakes.length > SnakeLength+1) {
        Snakes.shift();
    }

    for (let i = 0; i < Snakes.length; i++) {
        var col = 255 - (255 / SnakeLength) * i;
        ctx.fillStyle = "rgb(0," + col + ",0)";
        ctx.fillRect(Snakes[i].x, Snakes[i].y, 50, 50);
    }

    if (x == appleX && y == appleY) {
        SnakeLength++;
        RandomApple();
    }


}, 250)