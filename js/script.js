// Переменные
const field = document.getElementById('field');

// Функция для рандомных чисел
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

// Создаём динамический фон для битв
const backgroundBattle = {
  getBackground() {
    let location;
    if (getRandomInt(1, 3) === 1) {
      location = 'field';
    } else if (getRandomInt(1, 3) === 2) {
      location = 'forest';
    } else {
      location = 'cave';
    }

    let timeOfDay;
    if (location === 'cave') {
      timeOfDay = 'night';
    } else if (getRandomInt(1, 2) === 1) {
      timeOfDay = 'day';
    } else {
      timeOfDay = 'night';
    }

    field.style.backgroundImage = `url('images/backgrounds/battle/background-${location}-${timeOfDay}-${getRandomInt(1, 3)}.jpg')`;
  }
};

window.onload = () => {
  backgroundBattle.getBackground();
};
