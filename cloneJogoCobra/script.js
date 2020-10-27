let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
// Verificação se a direção foi trocada na rodada
let direcaoTrocadaNaRodada = false;
let snake = [];

const directions = {
  up: "cima",
  down: "down",
  left: "left",
  right: "right",
};

snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

let direction = directions.right;
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

function criarBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function criarComida() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
  //Trocará direção apenas se a direção ainda não foi trocada na rodada
  if (!direcaoTrocadaNaRodada) {
    if (event.keyCode == 37 && direction != directions.right)
      changeDirection(directions.left);

    if (event.keyCode == 38 && direction != directions.down)
      changeDirection(directions.up);

    if (event.keyCode == 39 && direction != directions.left)
      changeDirection(directions.right);

    if (event.keyCode == 40 && direction != directions.up)
      changeDirection(directions.down);
  }
}

function changeDirection(newDirection) {
  direction = newDirection;
  direcaoTrocadaNaRodada = true;
}

function iniciarJogo() {
  //plano cartesiano
  if (snake[0].x > 15 * box && direction == directions.right) snake[0].x = 0;
  if (snake[0].x < 0 && direction == directions.left) snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == directions.down) snake[0].y = 0;
  if (snake[0].y < 0 && direction == directions.up) snake[0].y = 16 * box;

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert("Game Over! :(");
    }
  }

  criarBG();
  criarCobrinha();
  criarComida();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == directions.right) snakeX += box;
  if (direction == directions.left) snakeX -= box;
  if (direction == directions.up) snakeY -= box;
  if (direction == directions.down) snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
  direcaoTrocadaNaRodada = false;
}

let jogo = setInterval(iniciarJogo, 100);
