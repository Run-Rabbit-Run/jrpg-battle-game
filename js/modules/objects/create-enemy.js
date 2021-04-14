/* eslint-disable import/extensions */
import Enemy from '../classes/enemy-class.js';
import getRandomInt from '../functions/random-int.js';

const chosenEnemy = getRandomInt(1, 4);
let result;

switch (chosenEnemy) {
  case 1:
    result = new Enemy('Скелет', 'images/enemies/skeleton', 4, 4, 4, 4, 8, getRandomInt(40, 50), getRandomInt(18, 25), getRandomInt(1, 3));
    break;
  case 2:
    result = new Enemy('Гоблин', 'images/enemies/goblin', 4, 8, 4, 4, 8, getRandomInt(25, 35), getRandomInt(20, 30), getRandomInt(1, 2));
    break;
  case 3:
    result = new Enemy('Гриб', 'images/enemies/mushroom', 4, 8, 4, 4, 8, getRandomInt(50, 60), getRandomInt(10, 17), getRandomInt(3, 6));
    break;
  case 4:
    result = new Enemy('Глаз', 'images/enemies/bat', 8, 8, 4, 4, 8, getRandomInt(30, 40), getRandomInt(17, 23), getRandomInt(1, 3));
    break;
  // no default
}

const enemy = result;

export default enemy;
