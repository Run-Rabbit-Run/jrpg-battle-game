/* eslint-disable import/extensions, no-alert, max-len */
import {
  attackSkillsIconsHTML, attackSkillsDescriptionsHTML, enemyHpHTML, enemyHitBarHTML, battleLogHTML,
} from '../variables.js';
import hero from '../objects/create-hero.js';
import enemy from '../objects/create-enemy.js';

export default class SkillHero {
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
      case 'magic':
        damage = this.damage;
        break;
      // no default
    }

    damage = (damage < 0) ? 0 : damage;

    enemy.health -= damage;
    if (enemy.health < 0) { enemy.health = 0; }
    enemyHpHTML.innerHTML = enemy.health;
    enemyHitBarHTML.innerHTML = `-${damage}`;

    battleLogHTML.insertAdjacentHTML('beforeend', `<p class="battle-log__item">Персонаж <span class="hero-name">${hero.name}</span> использует умение <span class="attack-skills__name">${this.name}</span>, и наносит <span class="attack-skills__damage-${this.type}">${damage}</span> урона персонажу <span class="enemy-name">${enemy.name}</span></p>`);
  }

  addSkillToInteface() {
    const idIcon = `${this.name.split(' ').join('')}-icon`;
    const idDescription = `${this.name.split(' ').join('')}-description`;

    attackSkillsIconsHTML.insertAdjacentHTML('beforeend', `<img class="attack-skills__icon" id="${idIcon}" src="${this.iconPath}">`);

    attackSkillsDescriptionsHTML.insertAdjacentHTML('beforeend', `<p class="attack-skills__description" id="${idDescription}"><span class="attack-skills__name">${this.name}</span></br>${this.description}</p>`);

    const icon = document.getElementById(idIcon);
    const description = document.getElementById(idDescription);

    icon.onmouseover = () => {
      description.style.display = 'block';
    };

    icon.onmouseout = () => {
      description.style.display = 'none';
    };

    icon.addEventListener('click', () => {
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
        // no default
      }
      setTimeout(hero.animateRunBack.bind(hero), (hero.animationTime * 2)); // анимация бега назад

      this.dealDamage();

      if (enemy.health <= 0) {
        setTimeout(enemy.animateDeath.bind(enemy), (hero.animationTime * 1.5)); // анимация смерти
        setTimeout(enemy.animateHitBar.bind(enemy), (hero.animationTime * 1.5)); // количество нанесённого урона
        setTimeout(() => alert(`Поздравляем! \nМогущественный ${enemy.name} повержен! \nОбновите страницу, чтобы совершить ещё один подвиг!`), (enemy.animationTime * 3.5));
      } else {
        setTimeout(enemy.animateHit.bind(enemy), (hero.animationTime * 1.5)); // анимация получения урона
        setTimeout(enemy.startTurn.bind(enemy), (hero.animationTime * 3)); // ход переходит врагу
      }
    });
  }
}
