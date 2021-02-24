/* eslint-disable import/extensions, max-len */
import SkillHero from '../classes/skill-hero.js';
import SkillEnemy from '../classes/skill-enemy.js';
import hero from './create-hero.js';
import enemy from './create-enemy.js';

const damageInHTML = (number, typeOfDamage) => `<span class="attack-skills__damage attack-skills__damage-${typeOfDamage}">${number}</span>`;

const attackSkill = new SkillHero('Sword Attack', 'physical', hero.attack, `Простая атака мечом. Наносит ${damageInHTML(hero.attack, 'physical')} физического урона`, 'images/icons/hero-skill-icons/icon-attack.png', 1);

const powerAttackSkill = new SkillHero('Piercing Attack', 'piercing', hero.attack * 0.8, `Атака, игнорирующая броню противника. Наносит ${damageInHTML(Math.round(hero.attack * 0.8), 'piercing')} проникающего урона`, 'images/icons/hero-skill-icons/icon-power-attack.png', 2);

const weakAttack = new SkillHero('Weak Attack', 'magic', hero.attack * 42, `Вита лениво взмахивает руками и наносит ${damageInHTML(Math.round(hero.attack * 42), 'magic')} единицы магического урона`, 'images/icons/hero-skill-icons/icon-blue-magic.png', 1);

const ThePowerOfVita = new SkillHero('The Power Of Vita', 'magic', hero.attack * 999, `Могущественная атака истинного олдфага моментально аннигилирует противника, нанося ${damageInHTML(Math.round(hero.attack * 999), 'magic')} единиц магического урона`, 'images/icons/hero-skill-icons/icon-red-magic.png', 2);

// создаём атаку противника
const enemyAttackSkill = new SkillEnemy('Basic Attack', 'physical', enemy.attack, `Атака мечом. Наносит ${damageInHTML(enemy.attack, 'physical')} физического урона`, 'images/icons/enemy-skill-icons/icon-attack.png', 1);

const enemyPowerAttackSkill = new SkillEnemy('Deadly Attack', 'piercing', enemy.attack * 0.8, `Атака, игнорирующая броню противника. Наносит ${damageInHTML(Math.round(enemy.attack * 0.8), 'piercing')} проникающего урона`, 'images/icons/enemy-skill-icons/icon-power-attack.png', 2);

export {
  attackSkill, powerAttackSkill, weakAttack, ThePowerOfVita, enemyAttackSkill, enemyPowerAttackSkill,
};
