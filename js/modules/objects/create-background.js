/* eslint-disable import/extensions, max-len */
import BackgroundBattle from '../classes/background-battle.js';
import getRandomInt from '../functions/random-int.js';

const battleLocation = ['field', 'forest', 'cave'];
const battleTimes = ['day', 'night'];

export default new BackgroundBattle(battleLocation[getRandomInt(0, (battleLocation.length - 1))], battleTimes[getRandomInt(0, (battleTimes.length - 1))], getRandomInt(1, 3));
