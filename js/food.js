// Food

import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

// IMPORTANT: CSS grids start at 1, 0 is technically out of bounds.
let food = getRandomFoodPosition();

export const update = (expansion_rate) => {
  if (onSnake(food)) {
    expandSnake(expansion_rate);
    food = getRandomFoodPosition();
  }
};

export const draw = (gameBoard) => {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
};

export const reset = () => {
  food = getRandomFoodPosition();
};

// Define as function here to avoid TDZ.
function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
