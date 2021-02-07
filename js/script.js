/* eslint-disable linebreak-style */

// ---------------------- ПЕРЕМЕННЫЕ ----------------------
const fieldHTML = document.getElementById('field');
const heroHTML = document.getElementById('hero');
const heroHpHTML = document.getElementById('hero-hp');
const heroArmorHTML = document.getElementById('hero-armor');
const heroHitBarHTML = document.getElementById('hero-damage');
const heroStatsHTML = document.getElementById('hero-stats');
const enemyHTML = document.getElementById('enemy');
const enemyHpHTML = document.getElementById('enemy-hp');
const enemyArmorHTML = document.getElementById('enemy-armor');
const enemyHitBarHTML = document.getElementById('enemy-damage');
const attackSkillsIconsHTML = document.getElementById('skills-icons');
const enemyAttackSkillsIconsHTML = document.getElementById('enemy-skills-icons');
const attackSkillsDescriptionsHTML = document.getElementById('skills-description');
const enemyAttackSkillsDescriptionsHTML = document.getElementById('enemy-skills-description');

// ----------------------- ФУНКЦИИ -----------------------
// Функция для рандомных чисел
const getRandomInt = (min, max) => {
  const minNum = Math.ceil(min);
  const maxNum = Math.floor(max);
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + min; // Максимум и минимум включаются
};

// Функция для отображения урона в HTML формате
const damageInHTML = (number, typeOfDamage) => `<span class="attack-skills__damage attack-skills__damage-${typeOfDamage}">${number}</span>`;

// ------------------ КОЛЛЕКЦИИ ОБЪЕКТОВ ------------------
// коллекции для фона битв
const battleLocation = ['field', 'forest', 'cave'];
const battleTimes = ['day', 'night'];

// ----------------------- Классы -----------------------
// Создаём рандомный фон для битв
class BackgroundBattle {
  constructor(location, timeOfDay, imgNumber) {
    this.location = location;
    this.timeOfDay = timeOfDay;
    this.imgNumber = imgNumber;
    this.url = `images/backgrounds/battle/background-${this.location}-${this.timeOfDay}-${this.imgNumber}.jpg`;
  }

  installBackground() {
    fieldHTML.style.backgroundImage = `url(${this.url})`;
  }
}

// Cоздаём героя
class Hero {
  constructor(name, imgPath, imgWidth, imgHeight, scaleMultiplier, deathSprites, takeHitSprites, attack1Sprites, health = 100, baseAttack = 10, armor = 1) {
    this.name = name;
    this.attack = baseAttack;
    this.health = health;
    this.imgPath = imgPath;
    this.imgWidth = imgWidth * scaleMultiplier;
    this.imgHeight = imgHeight * scaleMultiplier;
    this.numberOfSprites = imgWidth / imgHeight;
    this.animationTime = 800;
    this.animationTick = imgHeight * scaleMultiplier;
    this.animationInterval = 800 / (imgWidth / imgHeight);
    this.deathSprites = deathSprites;
    this.takeHitSprites = takeHitSprites;
    this.attack1Sprites = attack1Sprites;
    this.armor = armor;
  }

  drawHero() {
    heroHTML.style.width = `${this.imgHeight}px`;
    heroHTML.style.height = `${this.imgHeight}px`;
    heroHpHTML.innerHTML = `${this.health}`;
    heroArmorHTML.innerHTML = `${this.armor}`;
  }

  endTurn() {
    heroStatsHTML.style.pointerEvents = 'none';
  }

  startTurn() {
    heroStatsHTML.style.pointerEvents = 'all';
  }

  animateIdle() {
    heroHTML.style.backgroundImage = `url(${this.imgPath}/Idle.png)`;

    let position = 0;

    this.idle = setInterval(() => {
      heroHTML.style.backgroundPosition = `-${position}px`;

      if (position < this.imgWidth - this.animationTick) {
        position += this.animationTick;
      } else {
        position = 0;
      }
    }, this.animationInterval);
  }

  stopAnimationIdle() {
    clearInterval(this.idle);
  }

  animateRun() {
    heroHTML.style.backgroundImage = `url(${this.imgPath}/Run.png)`;

    let position = 0;
    const translateTick = (100 / 2) / this.numberOfSprites;
    let translateX = 0;

    const run = setInterval(() => {
      heroHTML.style.backgroundPosition = `-${position}px`;
      heroHTML.style.transform = `translateX(${translateX}vw)`;
      if (position < this.imgWidth - this.animationTick) {
        position += this.animationTick;
        translateX += translateTick;
      } else {
        position = 0;
        clearInterval(run);
      }
    }, this.animationInterval);
  }

  animateRunBack() {
    heroHTML.style.backgroundImage = `url(${this.imgPath}/RunBack.png)`;

    let position = 0;
    const translateTick = (100 / 2) / this.numberOfSprites;
    let translateX = (100 / 2) - translateTick;

    const runBack = setInterval(() => {
      heroHTML.style.backgroundPosition = `-${position}px`;
      heroHTML.style.transform = `translateX(${translateX}vw)`;
      if (position < this.imgWidth - this.animationTick) {
        position += this.animationTick;
        translateX -= translateTick;
      } else {
        position = 0;
        clearInterval(runBack);
        this.animateIdle();
      }
    }, this.animationInterval);
  }

  animateAttack1() {
    heroHTML.style.backgroundImage = `url(${this.imgPath}/Attack1.png)`;

    let position = 0;

    const attack = setInterval(() => {
      heroHTML.style.backgroundPosition = `-${position}px`;

      if (position < (this.imgHeight * this.attack1Sprites) - this.animationTick) {
        position += this.animationTick;
      } else {
        position = 0;
        clearInterval(attack);
      }
    }, (this.animationTime / this.attack1Sprites));
  }

  animateAttack2() {
    heroHTML.style.backgroundImage = `url(${this.imgPath}/Attack2.png)`;

    let position = 0;

    const attack = setInterval(() => {
      heroHTML.style.backgroundPosition = `-${position}px`;

      if (position < (this.imgHeight * this.attack1Sprites) - this.animationTick) {
        position += this.animationTick;
      } else {
        position = 0;
        clearInterval(attack);
      }
    }, (this.animationTime / this.attack1Sprites));
  }

  animateAttack3() {
    heroHTML.style.backgroundImage = `url(${this.imgPath}/Attack3.png)`;

    let position = 0;

    const attack = setInterval(() => {
      heroHTML.style.backgroundPosition = `-${position}px`;

      if (position < (this.imgHeight * this.attack1Sprites) - this.animationTick) {
        position += this.animationTick;
      } else {
        position = 0;
        clearInterval(attack);
      }
    }, (this.animationTime / this.attack1Sprites));
  }

  animateDeath() {
    this.stopAnimationIdle();

    let position = 0;

    heroHTML.style.backgroundImage = `url(${this.imgPath}/Death.png)`;

    const death = setInterval(() => {
      heroHTML.style.backgroundPosition = `${-position}px`;

      if (position < (this.imgHeight * this.deathSprites) - this.animationTick) {
        position += this.animationTick;
      } else {
        clearInterval(death);
      }
    }, (this.animationTime / this.deathSprites));
  }

  animateHitBar() {
    heroHitBarHTML.style.animation = 'hit 2.5s';
    setTimeout(() => {
      heroHitBarHTML.style.animation = 'none';
    }, 2500);
  }

  animateHit() {
    this.stopAnimationIdle();
    this.animateHitBar();

    let position = 0;

    heroHTML.style.backgroundImage = `url(${this.imgPath}/Take-Hit.png)`;

    const takeHit = setInterval(() => {
      heroHTML.style.backgroundPosition = `${-position}px`;

      if (position < (this.imgHeight * this.takeHitSprites) - this.animationTick) {
        position += this.animationTick;
      } else {
        clearInterval(takeHit);
        this.animateIdle();
      }
    }, (this.animationTime / this.takeHitSprites));
  }
}

// Создаём класс врага
class Enemy {
  constructor(name, imgPath, imgWidth, imgHeight, scaleMultiplier, attack1Sprites, runSprites, health, baseAttack, armor = 1) {
    this.name = name;
    this.attack = baseAttack;
    this.health = health;
    this.imgPath = imgPath;
    this.imgWidth = imgWidth * scaleMultiplier;
    this.imgHeight = imgHeight * scaleMultiplier;
    this.numberOfSprites = imgWidth / imgHeight;
    this.numberOfAttack1Sprites = attack1Sprites;
    this.animationTime = 800;
    this.animationTick = imgHeight * scaleMultiplier;
    this.animationInterval = 800 / (imgWidth / imgHeight);
    this.scaleMultiplier = scaleMultiplier;
    this.runSprites = runSprites;
    this.skills = [];
    this.armor = armor;
  }

  drawEnemy() {
    enemyHTML.style.width = `${this.imgHeight}px`;
    enemyHTML.style.height = `${this.imgHeight}px`;
    enemyHpHTML.innerHTML = `${this.health}`;
    enemyArmorHTML.innerHTML = `${this.armor}`;
  }

  animateIdle() {
    enemyHTML.style.backgroundImage = `url(${this.imgPath}/Idle.png)`;

    let position = 0;

    this.idle = setInterval(() => {
      enemyHTML.style.backgroundPosition = `-${position}px`;

      if (position < this.imgWidth - this.animationTick) {
        position += this.animationTick;
      } else {
        position = 0;
      }
    }, this.animationInterval);
  }

  stopAnimationIdle() {
    clearInterval(this.idle);
  }

  startTurn() {
    const randomSkillNumber = getRandomInt(0, (this.skills.length - 1));

    this.skills[randomSkillNumber].useSkill();
  }

  animateRun() {
    const imgWidth = this.imgHeight * this.runSprites;
    const animationTick = imgWidth / this.runSprites;
    const translateTick = (100 / 2) / this.runSprites;
    let position = -(imgWidth - animationTick);
    let translateX = 0;

    enemyHTML.style.backgroundImage = `url(${this.imgPath}/Run.png)`;

    const run = setInterval(() => {
      enemyHTML.style.transform = `translateX(${-(position / this.runSprites)}px)`;
      enemyHTML.style.backgroundPosition = `${position}px`;
      enemyHTML.style.transform = `translateX(-${translateX}vw)`;
      if (position < 0) {
        position += animationTick;
        translateX += translateTick;
      } else {
        position = 0;
        clearInterval(run);
      }
    }, (this.animationTime / this.runSprites));
  }

  animateRunBack() {
    const imgWidth = this.imgHeight * this.runSprites;
    const animationTick = imgWidth / this.runSprites;
    const translateTick = (100 / 2) / this.runSprites;
    let position = 0;
    let translateX = -((100 / 2) - translateTick);

    enemyHTML.style.backgroundImage = `url(${this.imgPath}/RunBack.png)`;
    enemyHTML.style.backgroundPosition = `-${position}px`;
    enemyHTML.style.transform = `translateX(${translateX}vw)`;

    const runBack = setInterval(() => {
      enemyHTML.style.transform = `translateX(${translateX}vw)`;
      enemyHTML.style.backgroundPosition = `-${position}px`;
      if (position < imgWidth - animationTick) {
        position += animationTick;
        translateX += translateTick;
      } else {
        position = 0;
        clearInterval(runBack);
        this.animateIdle();
      }
    }, (this.animationTime / this.runSprites));
  }

  animateAttack1() {
    const imgWidth = this.imgHeight * this.numberOfAttack1Sprites;
    const animationTick = imgWidth / this.numberOfAttack1Sprites;
    let position = -(imgWidth - animationTick);

    enemyHTML.style.backgroundImage = `url(${this.imgPath}/Attack1.png)`;
    enemyHTML.style.backgroundPosition = `${position}px`;
    const attack = setInterval(() => {
      enemyHTML.style.backgroundPosition = `${position}px`;
      if (position < 0) {
        position += animationTick;
      } else {
        position = 0;
        clearInterval(attack);
      }
    }, (this.animationTime / this.numberOfAttack1Sprites));
  }

  animateAttack2() {
    const imgWidth = this.imgHeight * this.numberOfAttack1Sprites;
    const animationTick = imgWidth / this.numberOfAttack1Sprites;
    let position = -(imgWidth - animationTick);

    enemyHTML.style.backgroundImage = `url(${this.imgPath}/Attack2.png)`;
    enemyHTML.style.backgroundPosition = `${position}px`;
    const attack = setInterval(() => {
      enemyHTML.style.backgroundPosition = `${position}px`;
      if (position < 0) {
        position += animationTick;
      } else {
        position = 0;
        clearInterval(attack);
      }
    }, (this.animationTime / this.numberOfAttack1Sprites));
  }

  animateAttack3() {
    const imgWidth = this.imgHeight * this.numberOfAttack1Sprites;
    const animationTick = imgWidth / this.numberOfAttack1Sprites;
    let position = -(imgWidth - animationTick);

    enemyHTML.style.backgroundImage = `url(${this.imgPath}/Attack3.png)`;
    enemyHTML.style.backgroundPosition = `${position}px`;
    const attack = setInterval(() => {
      enemyHTML.style.backgroundPosition = `${position}px`;
      if (position < 0) {
        position += animationTick;
      } else {
        position = 0;
        clearInterval(attack);
      }
    }, (this.animationTime / this.numberOfAttack1Sprites));
  }

  animateDeath() {
    this.stopAnimationIdle();

    let position = this.imgWidth - this.animationTick;

    const death = setInterval(() => {
      enemyHTML.style.backgroundImage = `url(${this.imgPath}/Death.png)`;
      enemyHTML.style.backgroundPosition = `${-position}px`;

      if (position > 0) {
        position -= this.animationTick;
      } else {
        clearInterval(death);
      }
    }, this.animationInterval);
  }

  animateHitBar() {
    enemyHitBarHTML.style.animation = 'hit 2.5s';
    setTimeout(() => {
      enemyHitBarHTML.style.animation = 'none';
    }, 2500);
  }

  animateHit() {
    this.stopAnimationIdle();
    this.animateHitBar();

    let position = this.imgWidth - this.animationTick;

    const takeHit = setInterval(() => {
      enemyHTML.style.backgroundImage = `url(${this.imgPath}/Take-Hit.png)`;
      enemyHTML.style.backgroundPosition = `${-position}px`;

      if (position > 0) {
        position -= this.animationTick;
      } else {
        clearInterval(takeHit);
        this.animateIdle();
      }
    }, this.animationInterval);
  }
}

// Создаём класс для активных умений героя (SkillHero)
class SkillHero {
  constructor(name, type, damage, description, iconPath, animationAttackNumber) {
    this.name = name;
    this.type = type;
    this.damage = Math.round(damage);
    this.description = description;
    this.iconPath = iconPath;
    this.animationAttackNumber = animationAttackNumber;
  }

  dealDamage() {
    let damage;

    switch (this.type) {
      case 'physical':
        damage = this.damage - enemy.armor;
        break;
      case 'piercing':
        damage = this.damage;
        break;
    }

    enemy.health = enemy.health - damage;
    enemyHpHTML.innerHTML = enemy.health;
    enemyHitBarHTML.innerHTML = `-${damage}`;
  }

  addSkillToInteface() {
    const idIcon = `${this.name.split(' ').join('')}-icon`;
    const idDescription = `${this.name.split(' ').join('')}-description`;

    attackSkillsIconsHTML.insertAdjacentHTML('beforeend', `<img class="attack-skills__icon" id="${idIcon}" src="${this.iconPath}">`);

    attackSkillsDescriptionsHTML.insertAdjacentHTML('beforeend', `<p class="attack-skills__description" id="${idDescription}"><span class="attack-skills__name">${this.name}.</span> ${this.description}</p>`);

    const icon = document.getElementById(idIcon);
    const description = document.getElementById(idDescription);

    icon.onmouseover = () => {
      description.style.display = 'block';
    };

    icon.onmouseout = () => {
      description.style.display = 'none';
    };

    icon.onclick = () => {
      hero.endTurn(); // блокируем интерфейс
      hero.stopAnimationIdle(); // стоп анимации покоя
      hero.animateRun(); // запуск анимации бега
      switch (this.animationAttackNumber) { // запуск одной из анимаций атаки
        case 1:
          setTimeout(hero.animateAttack1.bind(hero), hero.animationTime);
          break;
        case 2:
          setTimeout(hero.animateAttack2.bind(hero), hero.animationTime);
          break;
        case 3:
          setTimeout(hero.animateAttack3.bind(hero), hero.animationTime);
          break;
      }
      setTimeout(hero.animateRunBack.bind(hero), (hero.animationTime * 2)); // анимация бега назад

      this.dealDamage();

      if (enemy.health <= 0) {
        setTimeout(enemy.animateDeath.bind(enemy), (hero.animationTime * 1.5)); // анимация смерти
        setTimeout(enemy.animateHitBar.bind(enemy), (hero.animationTime * 1.5)); // количество нанесённого урона
        setTimeout(() => alert(`Поздравляем! Могущественный ${enemy.name} повержен! Обновите страницу, чтобы совершить ещё один подвиг!`), (enemy.animationTime * 3.5));
      } else {
        setTimeout(enemy.animateHit.bind(enemy), (hero.animationTime * 1.5)); // анимация получения урона
        setTimeout(enemy.startTurn.bind(enemy), (hero.animationTime * 3));
      }
    };
  }
}

class SkillEnemy {
  constructor(name, type, damage, description, iconPath, animationAttackNumber) {
    this.name = name;
    this.type = type;
    this.damage = Math.round(damage);
    this.description = description;
    this.iconPath = iconPath;
    this.animationAttackNumber = animationAttackNumber;
  }

  dealDamage() {
    let damage;

    switch (this.type) {
      case 'physical':
        damage = this.damage - hero.armor;
        break;
      case 'piercing':
        damage = this.damage;
        break;
    }

    hero.health = hero.health - damage;
    heroHpHTML.innerHTML = hero.health;
    heroHitBarHTML.innerHTML = `-${damage}`;
  }

  addSkillToInteface() {
    enemy.skills.push(this);

    const idIcon = `${this.name.split(' ').join('')}-icon`;
    const idDescription = `${this.name.split(' ').join('')}-description`;

    enemyAttackSkillsIconsHTML.insertAdjacentHTML('beforeend', `<img class="attack-skills__icon" id="${idIcon}" src="${this.iconPath}">`);

    enemyAttackSkillsDescriptionsHTML.insertAdjacentHTML('beforeend', `<p class="attack-skills__description" id="${idDescription}"><span class="attack-skills__name">${this.name}.</span> ${this.description}</p>`);

    const icon = document.getElementById(idIcon);
    const description = document.getElementById(idDescription);

    icon.onmouseover = () => {
      description.style.display = 'block';
    };

    icon.onmouseout = () => {
      description.style.display = 'none';
    };
  }

  useSkill() {
    enemy.stopAnimationIdle();
    enemy.animateRun();
    switch (this.animationAttackNumber) {
      case 1:
        setTimeout(enemy.animateAttack1.bind(enemy), enemy.animationTime);
        break;
      case 2:
        setTimeout(enemy.animateAttack2.bind(enemy), enemy.animationTime);
        break;
      case 3:
        setTimeout(enemy.animateAttack3.bind(enemy), enemy.animationTime);
        break;
    }
    setTimeout(enemy.animateRunBack.bind(enemy), (enemy.animationTime * 2));

    this.dealDamage();

    if (hero.health <= 0) {
      setTimeout(hero.animateDeath.bind(hero), (enemy.animationTime * 1.5));
      setTimeout(hero.animateHitBar.bind(hero), (enemy.animationTime * 1.5));
      setTimeout(() => alert(`Вас изничтожил жалкий ${enemy.name}! Обновите страницу, чтобы опозориться вновь!`), (enemy.animationTime * 3.5));
    } else {
      setTimeout(hero.animateHit.bind(hero), (enemy.animationTime * 1.5));
      setTimeout(hero.startTurn.bind(hero), (enemy.animationTime * 3));
    }
  }
}

// -------------------- СОЗДАЁМ ОБЪЕКТЫ --------------------
// создаём объект местности, в которой всё происходит
const background = new BackgroundBattle(battleLocation[getRandomInt(0, (battleLocation.length - 1))], battleTimes[getRandomInt(0, (battleTimes.length - 1))], getRandomInt(1, 3));

// создаём героя
const chosenHero = prompt('Введите номер героя которого хотите выбрать: \n1) Самурай \n2) Воин \n3) Рыцарь \n4) Охотница', 1);
// const chosenHero = 1;
let hero;

if (Number(chosenHero) === 1) {
  hero = new Hero('Самурай', 'images/heroes/martial-hero', 1600, 200, 4, 6, 4, 6, getRandomInt(43, 53), getRandomInt(14, 21), getRandomInt(1, 6));
} else if (Number(chosenHero) === 2) {
  hero = new Hero('Воин', 'images/heroes/medieval-warrior', 1200, 150, 5, 6, 4, 4, getRandomInt(43, 53), getRandomInt(14, 21), getRandomInt(1, 6));
} else if (Number(chosenHero) === 3) {
  hero = new Hero('Рыцарь', 'images/heroes/hero-knight', 1980, 180, 4.2, 11, 4, 7, getRandomInt(43, 53), getRandomInt(14, 21), getRandomInt(1, 6));
} else {
  hero = new Hero('Охотница', 'images/heroes/huntress', 1200, 150, 5, 8, 3, 5, getRandomInt(43, 53), getRandomInt(14, 21), getRandomInt(1, 6));
}

// создаём врага
const chosenEnemy = getRandomInt(1, 4);
let enemy;

switch (chosenEnemy) {
  case 1:
    enemy = new Enemy('Скелет', 'images/enemies/skeleton', 600, 150, 4, 8, 4, getRandomInt(40, 50), getRandomInt(13, 23), getRandomInt(1, 6));
    break;
  case 2:
    enemy = new Enemy('Гоблин', 'images/enemies/goblin', 600, 150, 4, 8, 8, getRandomInt(40, 50), getRandomInt(13, 23), getRandomInt(1, 6));
    break;
  case 3:
    enemy = new Enemy('Гриб', 'images/enemies/mushroom', 600, 150, 4, 8, 8, getRandomInt(40, 50), getRandomInt(13, 23), getRandomInt(1, 6));
    break;
  case 4:
    enemy = new Enemy('Глаз', 'images/enemies/bat', 1200, 150, 4, 8, 8, getRandomInt(40, 50), getRandomInt(13, 23), getRandomInt(1, 6));
    break;
}

// создаём обычную атаку
const attackSkill = new SkillHero('Sword Attack', 'physical', hero.attack, `Простая атака мечом. Наносит ${damageInHTML(hero.attack, 'physical')} физического урона`, 'images/icons/hero-skill-icons/icon-attack.png', 1);

const powerAttackSkill = new SkillHero('Piercing Attack', 'piercing', hero.attack * 0.8, `Атака, игнорирующая броню противника. Наносит ${damageInHTML(Math.round(hero.attack * 0.8), 'piercing')} проникающего урона`, 'images/icons/hero-skill-icons/icon-power-attack.png', 2);

// создаём атаку противника
const enemyAttackSkill = new SkillEnemy('Basic Attack', 'physical', enemy.attack, `Атака мечом. Наносит ${damageInHTML(enemy.attack, 'physical')} физического урона`, 'images/icons/enemy-skill-icons/icon-attack.png', 1);

const enemyPowerAttackSkill = new SkillEnemy('Deadly Attack', 'piercing', enemy.attack * 0.8, `Атака, игнорирующая броню противника. Наносит ${damageInHTML(Math.round(enemy.attack * 0.8), 'piercing')} проникающего урона`, 'images/icons/enemy-skill-icons/icon-power-attack.png', 2);

// -------------------- ВЫПОЛНЕНИЕ КОДА --------------------
window.onload = () => {
  background.installBackground(); // устанавливаем фон в CSS

  hero.drawHero(); // отрисовываем героя и задаём ему размер
  hero.animateIdle(); // включаем анимацию при покое для героя
  enemy.drawEnemy(); // отрисовываем врага и задаём ему размер
  enemy.animateIdle(); // включаем анимацию при покое для врага

  attackSkill.addSkillToInteface(); // добавляем скилл нашему герою
  powerAttackSkill.addSkillToInteface(); // добавляем второй скилл

  enemyAttackSkill.addSkillToInteface(); // добавляем скилл врагу
  enemyPowerAttackSkill.addSkillToInteface();

  // fieldHTML.style.backgroundImage = `url(images/backgrounds/battle/test.jpg)`;
};
