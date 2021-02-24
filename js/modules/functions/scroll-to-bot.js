/* eslint-disable import/extensions */
import { battleLogHTML } from '../variables.js';

export default () => {
  const observerConfig = {
    childList: true,
  };
  const observerCallback = () => {
    battleLogHTML.scrollTop = battleLogHTML.scrollHeight;
  };
  const observer = new MutationObserver(observerCallback);
  observer.observe(battleLogHTML, observerConfig);
};
