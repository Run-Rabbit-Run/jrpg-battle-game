/* eslint-disable import/extensions, max-len, class-methods-use-this */
import {
  enemyHTML, enemyHpHTML, enemyArmorHTML, enemyHitBarHTML,
} from '../variables.js';
import getRandomInt from '../functions/random-int.js';

export default class Enemy {
  constructor(name, imgPath, idleSprites, runSprites, deathSprites, takeHitSprites, attack1Sprites, health, baseAttack, armor = 1, imgHeight = 150, scaleMultiplier = 4) {
    this.name = name;
    this.attack = baseAttack;
    this.health = health;
    this.armor = armor;
    this.imgPath = imgPath;
    this.imgHeight = (imgHeight * scaleMultiplier) / (1440 / 100);
    this.animationTime = 800;
    this.idleSprites = idleSprites;
    this.runSprites = runSprites;
    this.deathSprites = deathSprites;
    this.takeHitSprites = takeHitSprites;
    this.attack1Sprites = attack1Sprites;
    this.skills = [];
  }

  drawEnemy() {
    enemyHTML.style.width = `${this.imgHeight}vw`;
    enemyHTML.style.height = `${this.imgHeight}vw`;
    enemyHpHTML.innerHTML = `${this.health}`;
    enemyArmorHTML.innerHTML = `${this.armor}`;
  }

  animateIdle() {
    enemyHTML.style.backgroundImage = `url(${this.imgPath}/Idle.png)`;

    let position = 0;
    const lastSpritePosition = (this.imgHeight * this.idleSprites) - this.imgHeight;

    this.idle = setInterval(() => {
      enemyHTML.style.backgroundPosition = `-${position}vw`;

      if (Math.round(position) < Math.round(lastSpritePosition)) {
        position += this.imgHeight;
      } else {
        position = 0;
      }
    }, (this.animationTime / this.idleSprites));
  }

  stopAnimationIdle() {
    clearInterval(this.idle);
  }

  startTurn() {
    const randomSkillNumber = getRandomInt(0, (this.skills.length - 1));

    this.skills[randomSkillNumber].useSkill();
  }

  animateRun() {
    enemyHTML.style.backgroundImage = `url(${this.imgPath}/Run.png)`;

    const imgWidth = this.imgHeight * this.runSprites;
    const animationTick = imgWidth / this.runSprites;
    const translateTick = (100 / 2) / this.runSprites;
    let position = -(imgWidth - animationTick);
    let translateX = 0;

    const run = setInterval(() => {
      enemyHTML.style.backgroundPosition = `${position}vw`;
      enemyHTML.style.transform = `translateX(-${translateX}vw)`;

      if (Math.round(position) < 0) {
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
    enemyHTML.style.backgroundPosition = `-${position}vw`;
    enemyHTML.style.transform = `translateX(${translateX}vw)`;

    const runBack = setInterval(() => {
      enemyHTML.style.transform = `translateX(${translateX}vw)`;
      enemyHTML.style.backgroundPosition = `-${position}vw`;
      if (Math.round(position) < imgWidth - animationTick) {
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
    enemyHTML.style.backgroundImage = `url(${this.imgPath}/Attack1.png)`;

    const imgWidth = this.imgHeight * this.attack1Sprites;
    const animationTick = imgWidth / this.attack1Sprites;
    let position = -(imgWidth - animationTick);

    enemyHTML.style.backgroundPosition = `${position}vw`;

    const attack = setInterval(() => {
      enemyHTML.style.backgroundPosition = `${position}vw`;
      if (Math.round(position) < 0) {
        position += animationTick;
      } else {
        position = 0;
        clearInterval(attack);
      }
    }, (this.animationTime / this.attack1Sprites));
  }

  animateAttack2() {
    enemyHTML.style.backgroundImage = `url(${this.imgPath}/Attack2.png)`;

    const imgWidth = this.imgHeight * this.attack1Sprites;
    const animationTick = imgWidth / this.attack1Sprites;
    let position = -(imgWidth - animationTick);

    enemyHTML.style.backgroundPosition = `${position}vw`;

    const attack = setInterval(() => {
      enemyHTML.style.backgroundPosition = `${position}vw`;
      if (Math.round(position) < 0) {
        position += animationTick;
      } else {
        position = 0;
        clearInterval(attack);
      }
    }, (this.animationTime / this.attack1Sprites));
  }

  animateAttack3() {
    const imgWidth = this.imgHeight * this.attack1Sprites;
    const animationTick = imgWidth / this.attack1Sprites;
    let position = -(imgWidth - animationTick);

    enemyHTML.style.backgroundImage = `url(${this.imgPath}/Attack3.png)`;
    enemyHTML.style.backgroundPosition = `${position}vw`;
    const attack = setInterval(() => {
      enemyHTML.style.backgroundPosition = `${position}vw`;
      if (Math.round(position) < 0) {
        position += animationTick;
      } else {
        position = 0;
        clearInterval(attack);
      }
    }, (this.animationTime / this.attack1Sprites));
  }

  animateDeath() {
    this.stopAnimationIdle();

    const lastSpritePosition = (this.imgHeight * this.deathSprites) - this.imgHeight;
    let position = lastSpritePosition;

    const death = setInterval(() => {
      enemyHTML.style.backgroundImage = `url(${this.imgPath}/Death.png)`;
      enemyHTML.style.backgroundPosition = `-${position}vw`;

      if (Math.round(position) > 0) {
        position -= this.imgHeight;
      } else {
        clearInterval(death);
      }
    }, (this.animationTime / this.deathSprites));
  }

  animateHitBar() {
    enemyHitBarHTML.style.animation = 'hit 3s';
    setTimeout(() => {
      enemyHitBarHTML.style.animation = 'none';
    }, 2500);
  }

  animateHit() {
    this.stopAnimationIdle();
    this.animateHitBar();

    const lastSpritePosition = (this.imgHeight * this.deathSprites) - this.imgHeight;
    let position = lastSpritePosition;

    const takeHit = setInterval(() => {
      enemyHTML.style.backgroundImage = `url(${this.imgPath}/Take-Hit.png)`;
      enemyHTML.style.backgroundPosition = `-${position}vw`;

      if (Math.round(position) > 0) {
        position -= this.imgHeight;
      } else {
        clearInterval(takeHit);
        this.animateIdle();
      }
    }, (this.animationTime / this.takeHitSprites));
  }
}
