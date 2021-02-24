/* eslint-disable import/extensions, max-len, no-alert */
import {
  enemyAttackSkillsIconsHTML, enemyAttackSkillsDescriptionsHTML, heroHpHTML, heroHitBarHTML, battleLogHTML,
} from '../variables.js';
import hero from '../objects/create-hero.js';
import enemy from '../objects/create-enemy.js';

export default class SkillEnemy {
  constructor(name, type, damage, description, iconPath, animationAttackNumber) {
    this.name = name;
    this.type = type;
    this.damage = Math.round(damage);
    this.description = description;
    this.iconPath = iconPath;
    this.animationAttackNumber = animationAttackNumber;
  }

  dealDamage() {
    let damage = null;

    switch (this.type) {
      case 'physical':
        damage = this.damage - hero.armor;
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

    hero.health -= damage;
    if (hero.health < 0) { hero.health = 0; }
    heroHpHTML.innerHTML = hero.health;
    heroHitBarHTML.innerHTML = `-${damage}`;

    battleLogHTML.insertAdjacentHTML('beforeend', `<p class="battle-log__item">Персонаж <span class="enemy-name">${enemy.name}</span> использует умение <span class="attack-skills__name">${this.name}</span>, и наносит <span class="attack-skills__damage-${this.type}">${damage}</span> урона персонажу <span class="hero-name">${hero.name}</span></p>`);
  }

  addSkillToInteface() {
    enemy.skills.push(this);

    const idIcon = `${this.name.split(' ').join('')}-icon`;
    const idDescription = `${this.name.split(' ').join('')}-description`;

    enemyAttackSkillsIconsHTML.insertAdjacentHTML('beforeend', `<img class="attack-skills__icon" id="${idIcon}" src="${this.iconPath}">`);

    enemyAttackSkillsDescriptionsHTML.insertAdjacentHTML('beforeend', `<p class="attack-skills__description" id="${idDescription}"><span class="attack-skills__name">${this.name}</span></br>${this.description}</p>`);

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
      // no default
    }
    setTimeout(enemy.animateRunBack.bind(enemy), (enemy.animationTime * 2));

    this.dealDamage();

    if (hero.health <= 0) {
      setTimeout(hero.animateDeath.bind(hero), (enemy.animationTime * 1.5));
      setTimeout(hero.animateHitBar.bind(hero), (enemy.animationTime * 1.5));
      setTimeout(() => alert(`Вас изничтожил жалкий ${enemy.name}! \nОбновите страницу, чтобы опозориться вновь!`), (enemy.animationTime * 3.5));
    } else {
      setTimeout(hero.animateHit.bind(hero), (enemy.animationTime * 1.5));
      setTimeout(hero.startTurn.bind(hero), (enemy.animationTime * 3));
    }
  }
}
