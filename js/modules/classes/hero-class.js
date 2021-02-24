/* eslint-disable import/extensions, max-len, class-methods-use-this */
import {
  heroHTML, heroHpHTML, heroArmorHTML, heroStatsHTML, heroHitBarHTML,
} from '../variables.js';

export default class Hero {
  constructor(name, imgPath, idleSprites, runSprites, deathSprites, takeHitSprites, attack1Sprites, health = 100, baseAttack = 10, armor = 1, imgHeight = 200, scaleMultiplier = 4) {
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
  }

  drawHero() {
    heroHTML.style.width = `${this.imgHeight}vw`;
    heroHTML.style.height = `${this.imgHeight}vw`;
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
    const lastSpritePosition = (this.imgHeight * this.idleSprites) - this.imgHeight;

    this.idle = setInterval(() => {
      heroHTML.style.backgroundPosition = `-${position}vw`;
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

  animateRun() {
    heroHTML.style.backgroundImage = `url(${this.imgPath}/Run.png)`;

    let position = 0;
    let translateX = 0;
    const translateTick = (100 / 2) / this.runSprites;
    const lastSpritePosition = (this.imgHeight * this.runSprites) - this.imgHeight;

    const run = setInterval(() => {
      heroHTML.style.backgroundPosition = `-${position}vw`;
      heroHTML.style.transform = `translateX(${translateX}vw)`;
      if (Math.round(position) < Math.round(lastSpritePosition)) {
        position += this.imgHeight;
        translateX += translateTick;
      } else {
        position = 0;
        clearInterval(run);
      }
    }, (this.animationTime / this.runSprites));
  }

  animateRunBack() {
    heroHTML.style.backgroundImage = `url(${this.imgPath}/RunBack.png)`;

    let position = 0;
    const translateTick = (100 / 2) / this.runSprites;
    let translateX = (100 / 2) - translateTick;
    const lastSpritePosition = (this.imgHeight * this.runSprites) - this.imgHeight;

    const runBack = setInterval(() => {
      heroHTML.style.backgroundPosition = `-${position}vw`;
      heroHTML.style.transform = `translateX(${translateX}vw)`;
      if (Math.round(position) < Math.round(lastSpritePosition)) {
        position += this.imgHeight;
        translateX -= translateTick;
      } else {
        position = 0;
        clearInterval(runBack);
        this.animateIdle();
      }
    }, (this.animationTime / this.runSprites));
  }

  animateAttack1() {
    heroHTML.style.backgroundPosition = '0vw';
    heroHTML.style.backgroundImage = `url(${this.imgPath}/Attack1.png)`;

    let position = 0;
    const lastSpritePosition = (this.imgHeight * this.attack1Sprites) - this.imgHeight;

    const attack = setInterval(() => {
      heroHTML.style.backgroundPosition = `-${position}vw`;
      if (Math.round(position) < Math.round(lastSpritePosition)) {
        position += this.imgHeight;
      } else {
        position = 0;
        clearInterval(attack);
      }
    }, (this.animationTime / this.attack1Sprites));
  }

  animateAttack2() {
    heroHTML.style.backgroundPosition = '0vw';
    heroHTML.style.backgroundImage = `url(${this.imgPath}/Attack2.png)`;

    let position = 0;
    const lastSpritePosition = (this.imgHeight * this.attack1Sprites) - this.imgHeight;

    const attack = setInterval(() => {
      heroHTML.style.backgroundPosition = `-${position}vw`;

      if (Math.round(position) < Math.round(lastSpritePosition)) {
        position += this.imgHeight;
      } else {
        position = 0;
        clearInterval(attack);
      }
    }, (this.animationTime / this.attack1Sprites));
  }

  animateAttack3() {
    heroHTML.style.backgroundPosition = '0vw';
    heroHTML.style.backgroundImage = `url(${this.imgPath}/Attack3.png)`;

    let position = 0;
    const lastSpritePosition = (this.imgHeight * this.attack1Sprites) - this.imgHeight;

    const attack = setInterval(() => {
      heroHTML.style.backgroundPosition = `-${position}vw`;

      if (Math.round(position) < Math.round(lastSpritePosition)) {
        position += this.imgHeight;
      } else {
        position = 0;
        clearInterval(attack);
      }
    }, (this.animationTime / this.attack1Sprites));
  }

  animateDeath() {
    this.stopAnimationIdle();
    heroHTML.style.backgroundImage = `url(${this.imgPath}/Death.png)`;

    let position = 0;
    const lastSpritePosition = (this.imgHeight * this.deathSprites) - this.imgHeight;

    const death = setInterval(() => {
      heroHTML.style.backgroundPosition = `-${position}vw`;

      if (Math.round(position) < Math.round(lastSpritePosition)) {
        position += this.imgHeight;
      } else {
        clearInterval(death);
      }
    }, (this.animationTime / this.deathSprites));
  }

  animateHitBar() {
    heroHitBarHTML.style.animation = 'hit 3s';
    setTimeout(() => {
      heroHitBarHTML.style.animation = 'none';
    }, 2500);
  }

  animateHit() {
    this.stopAnimationIdle();
    this.animateHitBar();
    heroHTML.style.backgroundImage = `url(${this.imgPath}/Take-Hit.png)`;

    let position = 0;
    const lastSpritePosition = (this.imgHeight * this.takeHitSprites) - this.imgHeight;

    const takeHit = setInterval(() => {
      heroHTML.style.backgroundPosition = `-${position}vw`;

      if (Math.round(position) < Math.round(lastSpritePosition)) {
        position += this.imgHeight;
      } else {
        clearInterval(takeHit);
        this.animateIdle();
      }
    }, (this.animationTime / this.takeHitSprites));
  }
}
