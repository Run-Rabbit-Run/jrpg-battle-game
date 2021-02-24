/* eslint-disable import/extensions */
import { fieldHTML } from '../variables.js';

export default class BackgroundBattle {
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
