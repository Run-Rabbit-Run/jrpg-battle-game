/* eslint-disable import/extensions */
import { heroPassiveSkillsIconsHTML, enemyPassiveSkillsIconsHTML } from '../variables.js';

export default class PassiveSkills {
  constructor(name, passiveSkillFunction, passiveSkillDescription, iconName) {
    this.name = name;
    this.description = passiveSkillDescription;
    this.passiveSkill = passiveSkillFunction;
    this.iconPath = `images/icons/hero-skill-icons/${iconName}`;
  }

  addTo(person) { // person hero or enemy
    const idIcon = `${this.name.split(' ').join('')}-${person}-icon`;
    const idDescription = `${this.name.split(' ').join('')}-${person}-description`;

    const html = person === 'enemy' ? enemyPassiveSkillsIconsHTML : heroPassiveSkillsIconsHTML;

    html.insertAdjacentHTML('beforeend', `<img class="passive-skill__icon" id="${idIcon}" src="${this.iconPath}">`);

    html.insertAdjacentHTML('beforeend', `<p class="passive-skill__description" id="${idDescription}"><span class="passive-skill__name">${this.name}</span></br>${this.description}</p>`);

    const icon = document.getElementById(idIcon);
    const description = document.getElementById(idDescription);

    icon.onmouseover = () => {
      description.style.opacity = '1';
    };

    icon.onmouseout = () => {
      description.style.opacity = '0';
    };

    this.passiveSkill();
  }
}
