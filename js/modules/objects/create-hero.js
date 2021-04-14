/* eslint-disable import/extensions, no-alert */
import Hero from '../classes/hero-class.js';
import getRandomInt from '../functions/random-int.js';

const chosenHero = prompt('Введите номер героя которого хотите выбрать: \n1) Самурай \n2) Воин \n3) Рыцарь \n4) Охотница \n5) Вита', 1);
// const chosenHero = 5;
let hero = null;

if (Number(chosenHero) === 1) {
  hero = new Hero('Самурай', 'images/heroes/martial-hero', 8, 8, 6, 4, 6, getRandomInt(35, 45), getRandomInt(18, 23), getRandomInt(1, 3));
} else if (Number(chosenHero) === 2) {
  hero = new Hero('Воин', 'images/heroes/medieval-warrior', 8, 8, 6, 4, 4, getRandomInt(40, 54), getRandomInt(14, 21), getRandomInt(1, 6));
} else if (Number(chosenHero) === 3) {
  hero = new Hero('Рыцарь', 'images/heroes/hero-knight', 11, 8, 11, 4, 7, getRandomInt(55, 65), getRandomInt(10, 15), getRandomInt(3, 6));
} else if (Number(chosenHero) === 4) {
  hero = new Hero('Охотница', 'images/heroes/huntress', 8, 8, 8, 3, 5, getRandomInt(30, 40), getRandomInt(20, 25), getRandomInt(1, 3));
} else {
  hero = new Hero('Вита', 'images/heroes/vita', 6, 8, 9, 3, 9, 100, 1, 8);
}

const result = hero;

export default result;
