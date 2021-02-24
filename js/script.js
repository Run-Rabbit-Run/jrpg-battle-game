/* eslint-disable import/extensions, max-len */
import background from './modules/objects/create-background.js';
import hero from './modules/objects/create-hero.js';
import enemy from './modules/objects/create-enemy.js';
import {
  attackSkill, powerAttackSkill, weakAttack, ThePowerOfVita, enemyAttackSkill, enemyPowerAttackSkill,
} from './modules/objects/active-skills.js';
import { passiveArmorBreaker, inspirationWave } from './modules/objects/passive-skills.js';
import scrollToBot from './modules/functions/scroll-to-bot.js';

scrollToBot(); // Устанавливаем скролл у battle log в нижнее положение при каждом сообщении

// ВЫПОЛНЕНИЕ КОДА
window.onload = () => {
  background.installBackground(); // устанавливаем фон в CSS

  hero.drawHero(); // отрисовываем героя и задаём ему размер
  hero.animateIdle(); // включаем анимацию при покое для героя
  enemy.drawEnemy(); // отрисовываем врага и задаём ему размер
  enemy.animateIdle(); // включаем анимацию при покое для врага

  if (hero.name === 'Вита') {
    weakAttack.addSkillToInteface();
    ThePowerOfVita.addSkillToInteface();
    inspirationWave.addTo('hero');
  } else {
    attackSkill.addSkillToInteface();
    powerAttackSkill.addSkillToInteface();
    passiveArmorBreaker.addTo('hero'); // добавляем пассивное умение герою
  }

  enemyAttackSkill.addSkillToInteface(); // добавляем скилл врагу
  enemyPowerAttackSkill.addSkillToInteface();
};
