var canvas = document.getElementById("TetrisCanvas")
var ctx = canvas.getContext("2d");

var Lpiece = 
[
    [0, 1],
    [0, 1],
    [1, 1]
]
var Jpiece = [
    [1, 0],
    [1, 0],
    [1, 1]
]
var Tpiece = [
    [1, 1, 1],
    [0, 1, 0]
]
var Opiece = [
    [1, 1],
    [1, 1]
]
var Ipiece = [
    [1],
    [1],
    [1],
    [1]
]
var Spiece = [
    [0, 1, 1],
    [1, 1, 0]
]
var Zpiece = [
    [1, 1, 0],
    [0, 1, 1]
]

var Pieces = [
    Lpiece,
    Jpiece,
    Tpiece,
    Opiece,
    Ipiece,
    Spiece,
    Zpiece
]

var grid = []

var LR_Movement = 0;
var MoveDown = 0;

for (let i = 0; i < 30; i++) {
    grid.push([])
    for (let j = 0; j < 10; j++) {
        grid[i].push(0)
    }
}

function addPiece(piece) {
    for (let y = 0; y < piece.length; y++) {
        for (let x = 0; x < piece[y].length; x++) {
            if (piece[y][x] == 1) {
                grid[y+5][x+4] = 1
            }
        }
    }
}

addPiece(Pieces[Math.floor(Math.random() * Pieces.length)])

function FreezePiece(){
    for (let y = 0; y < grid.length; y++)
    {
        for (let x = 0; x < grid[y].length; x++)
        {
            i = y;
            j = x;
            if (grid[i][j] == 1) {
                grid[i][j] = 2
                }
        }
    }
}
function shiftPiece(direction) {
    if (direction == -1) {
        for (let y = 0; y < grid.length; y++)        {
            for (let x = 0; x < grid[y].length; x++) {
                i = y;
                j = x;
                if (grid[i][j] == 1 && j > 0 && grid[i][j-1] == 0) {
                    grid[i][j] = 0
                    grid[i][j-1] = 1
                }
            }
        }
    }
    if (direction == 1) {
        for (let y = 0; y < grid.length; y++)        {
            for (let x = grid[y].length-1; x >= 0; x--) {
                i = y;
                j = x;
                if (grid[i][j] == 1 && j < grid[y].length-1 && grid[i][j+1] == 0) {
                    grid[i][j] = 0
                    grid[i][j+1] = 1
                }   
            }
        }
    }
}

// user input
document.addEventListener('keydown',
    function (event) {
        console.log('Keydown event! Key pressed: ' + event.key);
        
        if (event.key == "w") {
        }
        if (event.key == "a") {
            LR_Movement = -1;
        }
        if (event.key == "s") {
        }
        if (event.key == "d") {
            LR_Movement = 1;
        }

    shiftPiece(LR_Movement)

    LR_Movement = 0;

    }, false);

const loop = setInterval(() => {

    if (MoveDown % 5 == 0) {

        for (let y = 0; y < grid.length; y++) 
        {
            for (let x = 0; x < grid[y].length; x++) 
            {

                i = 29 - y;
                j = 9 - x;

                if (grid[i][j] == 1  &&  y != 5 &&  grid[i+1][j] == 0) {
                        grid[i][j] = 0
                        grid[i+1][j] = 1
                    
                    }

                if ((grid[i][j] == 1  &&  y == 5) || (grid[i][j] == 1  &&  grid[i+1][j] != 0)) {
                    grid[i][j] = 2
                    FreezePiece()
                    addPiece(Pieces[Math.floor(Math.random() * Pieces.length)])
                    }
            }
        }
    }
    MoveDown++;

    // draw loop
    for (let y = 10; y < grid.length; y++) {
        for (let j = 0; j < grid[y].length; j++) {

            i = y-10;
            if (grid[y][j] == 1) {
                ctx.fillStyle = "red"
                ctx.fillRect(j*40, i*40, 40, 40)
                ctx.strokeStyle = "black"
                ctx.strokeRect(j*40, i*40, 40, 40)
            }
            else if (grid[y][j] == 2) {
                ctx.fillStyle = "blue"
                ctx.fillRect(j*40, i*40, 40, 40)
                ctx.strokeStyle = "black"
                ctx.strokeRect(j*40, i*40, 40, 40)
            }
            else {
                ctx.fillStyle = "white"
                ctx.fillRect(j*40, i*40, 40, 40)
                ctx.strokeStyle = "black"
                ctx.strokeRect(j*40, i*40, 40, 40)
            }
        }
    }
}, 60)
