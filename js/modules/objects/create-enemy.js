/* eslint-disable import/extensions */
import Enemy from '../classes/enemy-class.js';
import getRandomInt from '../functions/random-int.js';

const chosenEnemy = getRandomInt(1, 4);
let result;

switch (chosenEnemy) {
  case 1:
    result = new Enemy('Скелет', 'images/enemies/skeleton', 4, 4, 4, 4, 8, getRandomInt(43, 53), getRandomInt(13, 23), getRandomInt(1, 6));
    break;
  case 2:
    result = new Enemy('Гоблин', 'images/enemies/goblin', 4, 8, 4, 4, 8, getRandomInt(43, 53), getRandomInt(13, 23), getRandomInt(1, 6));
    break;
  case 3:
    result = new Enemy('Гриб', 'images/enemies/mushroom', 4, 8, 4, 4, 8, getRandomInt(43, 53), getRandomInt(13, 23), getRandomInt(1, 6));
    break;
  case 4:
    result = new Enemy('Глаз', 'images/enemies/bat', 8, 8, 4, 4, 8, getRandomInt(43, 53), getRandomInt(13, 23), getRandomInt(1, 6));
    break;
  // no default
}

const enemy = result;

export default enemy;
