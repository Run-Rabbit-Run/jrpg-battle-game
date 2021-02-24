/* eslint-disable import/extensions, no-console */
import { attackSkillsIconsHTML, battleLogHTML, enemyArmorHTML } from '../variables.js';
import enemy from './create-enemy.js';
import PassiveSkills from '../classes/passive-skills.js';

const armorBreaker = () => {
  const skills = attackSkillsIconsHTML.querySelectorAll('.attack-skills__icon');
  skills.forEach((skill) => {
    skill.addEventListener('click', () => {
      if (enemy.armor > 0) {
        battleLogHTML.insertAdjacentHTML('beforeend', `<p class="battle-log__item"><span class="enemy-name">${enemy.name}</span> теряет <span class="stats__value--silver">1</span> единицу брони</p>`);
      }
      enemy.armor -= 1;
      if (enemy.armor < 0) { enemy.armor = 0; }
      enemyArmorHTML.textContent = enemy.armor;
    });
  });
};
const passiveArmorBreaker = new PassiveSkills('Armor Breaker', armorBreaker, 'Каждая атака героя разрушает вражескую броню.', 'icon-weapon-breaker.png');

const inspiration = () => {
  console.log('Трепещите смертные! Её величество Виталина вступила в битву!');
};
const inspirationWave = new PassiveSkills('Inspiration Wave', inspiration, 'Ежедневные тренировки, усердное изучение древних фолиантов и вера в себя помогли Вите стать одной из самых могущественных волшебниц Астрала. Она не нуждается в бонусах, вместо этого Вита воодушевляет окружающих.</br>Союзники получают +100 к морали.', 'icon-vita-power.jpg');

export { passiveArmorBreaker, inspirationWave };
