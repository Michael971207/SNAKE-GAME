const gameBoard = document.getElementById("game-board");
let snake = [{x: 150, y: 150}];
let food = {x: 300, y: 300};
let dx = 10;
let dy = 0;

// Draw the game board and the initial snake and food
function draw() {
    gameBoard.innerHTML = "";

    for (let i = 0; i < snake.length; i++) {
        let snakePart = document.createElement("div");
        snakePart.style.gridRowStart = snake[i].x;
        snakePart.style.gridColumnStart = snake[i].y;
        snakePart.classList.add("snake");
        gameBoard.appendChild(snakePart);
    }

    let foodPart = document.createElement("div");
    foodPart.style.gridRowStart = food.x;
    foodPart.style.gridColumnStart = food.y;
    foodPart.classList.add("food");
    gameBoard.appendChild(foodPart);
}

// Move the snake in the current direction
function move() {
    let head = {x: snake[0].x + dx, y: snake[0].y + dy};

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * 10,
            y: Math.floor(Math.random() * 20) * 10
        };
    } else {
        snake.pop();
    }

    snake.unshift(head);

    // Check for collision with walls or snake's body
    if (
        head.x < 0 ||
        head.x > 300 ||
        head.y < 0 ||
        head.y > 300 ||
        checkCollision(head.x, head.y, snake)
    ) {
        // Game over
        alert("Game Over!");
        clearInterval(game);
    } else {
        draw();
    }
}

// Check for collision with a specific position on the board
function checkCollision(x, y, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].x === x && array[i].y === y) {
            return true;
        }
    }
    return false;
}

// Handle arrow key presses to change the snake's direction
document.addEventListener("keydown", event => {
    switch (event.keyCode) {
        case 37: // left
            dx = -10;
            dy = 0;
            break;
        case 38: // up
            dx = 0;
            dy = -10;
            break;
        case 39: // right
            dx = 10;
            dy = 0;
            break;
        case 40: // down
            dx = 0;
            dy = 10;
            break;
    }
});

draw();
let game = setInterval(move, 100);
