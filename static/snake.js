var canvas = document.getElementById("SnakeCanvas")
var ctx = canvas.getContext("2d");

var x = 0;
var y = 0;

var SnakeLength = 0;

var Snakes = []



const loop = setInterval(() => {

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = "black";
    ctx.fillRect(x, y, 50, 50);

    x += 50;

    Snakes.push({x: x, y: y});

    if (Snakes.length > SnakeLength) {
        Snakes.shift();
    }
    for (let i = 0; i < Snakes.length; i++) {
        ctx.fillRect(Snakes[i].x, Snakes[i].y, 50, 50);
    }


}, 500)

function Input(){
    y+= 50;
}