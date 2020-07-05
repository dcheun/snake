// App

import {
  update as updateSnake,
  draw as drawSnake,
  reset as resetSnake,
  getSnakeHead,
  snakeIntersected,
} from "./snake.js";
import {
  update as updateFood,
  draw as drawFood,
  reset as resetFood,
} from "./food.js";
import { outsideGrid } from "./grid.js";
import { reset as resetInput } from "./input.js";

let lastRenderTime = 0;
let gameOver = false;
let snake_speed = 1; // How many times snake moves per second.
let expansion_rate = 1;
const gameBoard = document.querySelector("#game-board");
const resetGameButton = document.querySelector("#resetGameButton");
let levelSelection = document.querySelector("#levelSelection");
let reqID = null;

const setup = () => {
  // Set difficulty.
  switch (levelSelection.value) {
    case "easy":
      snake_speed = 2;
      expansion_rate = 2;
      break;
    case "normal":
      snake_speed = 5;
      expansion_rate = 4;
      break;
    case "hard":
      snake_speed = 8;
      expansion_rate = 6;
      break;
  }
  lastRenderTime = 0;
  gameOver = false;
  resetSnake();
  resetInput();
  resetFood();
};

const main = (currentTime) => {
  if (gameOver) {
    return alert("You lose.");
  }
  reqID = window.requestAnimationFrame(main);
  const secsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  // Control snake movement.
  if (secsSinceLastRender < 1 / snake_speed) {
    return;
  }
  lastRenderTime = currentTime;

  update();
  draw();
};

const update = () => {
  updateSnake();
  updateFood(expansion_rate);
  checkDeath();
};

const draw = () => {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
};

const checkDeath = () => {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersected();
};

const reset = () => {
  setup();
  if (reqID) {
    window.cancelAnimationFrame(reqID);
  }
  reqID = window.requestAnimationFrame(main);
};

resetGameButton.addEventListener("click", reset, false);
setup();
reqID = window.requestAnimationFrame(main);
