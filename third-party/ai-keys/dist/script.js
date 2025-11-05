import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4';

const config = {
  theme: 'dark',
  muted: false,
  exploded: false,
  platform: 'macos',
  one: {
    travel: 26,
    text: 'ok',
    key: 'Meta',
    hue: 114,
    saturation: 1.4,
    brightness: 1.2,
    buttonElement: document.querySelector('#one'),
    textElement: document.querySelector('#one .key__text') },

  two: {
    travel: 26,
    text: 'Tab',
    key: 'Tab',
    hue: 0,
    saturation: 0,
    brightness: 1.4,
    buttonElement: document.querySelector('#two'),
    textElement: document.querySelector('#two .key__text') },

  three: {
    travel: 18,
    text: 'create.',
    key: 'c',
    hue: 0,
    saturation: 0,
    brightness: 0.4,
    buttonElement: document.querySelector('#three'),
    textElement: document.querySelector('#three .key__text') },

  four: {
    travel: 18,
    text: 'create.',
    key: 'v',
    hue: 0,
    saturation: 0,
    brightness: 0.4,
    buttonElement: document.querySelector('#four'),
    textElement: document.querySelector('#four .key__text') },

  five: {
    travel: 18,
    text: 'create.',
    key: 'Escape',
    hue: 0,
    saturation: 0,
    brightness: 0.4,
    buttonElement: document.querySelector('#five'),
    textElement: document.querySelector('#five .key__text') } };



const clickAudio = new Audio(
'https://cdn.freesound.org/previews/378/378085_6260145-lq.mp3');

clickAudio.muted = config.muted;

const ctrl = new Pane({
  title: 'config',
  expanded: true });


const update = () => {
  document.documentElement.dataset.theme = config.theme;
  document.documentElement.dataset.platform = config.platform;
};

const sync = event => {
  if (
  !document.startViewTransition ||
  event.target.controller.view.labelElement.innerText !== 'theme')

  return update();
  document.startViewTransition(() => update());
};

ctrl.addBinding(config, 'platform', {
  options: {
    macos: 'macos',
    gemini: 'gemini',
    claude: 'claude',
    // openai: 'openai',
    perplexity: 'perplexity' } });



ctrl.
addBinding(config, 'muted').
on('change', () => clickAudio.muted = config.muted);

ctrl.addBinding(config, 'theme', {
  label: 'theme',
  options: {
    system: 'system',
    light: 'light',
    dark: 'dark' } });



const ids = ['one', 'two', 'three', 'four', 'five'];
for (const id of ids) {
  config[id].buttonElement.style.setProperty('--travel', config[id].travel);
  config[id].buttonElement.style.setProperty(
  '--saturate',
  config[id].saturation);

  config[id].buttonElement.style.setProperty('--hue', config[id].hue);
  config[id].buttonElement.style.setProperty(
  '--brightness',
  config[id].brightness);

  config[id].buttonElement.addEventListener('pointerdown', () => {
    if (!config.muted) {
      clickAudio.currentTime = 0;
      clickAudio.play();
    }
  });
}

// handle the key bindings
window.addEventListener('keydown', event => {
  for (const id of ids) {
    if (event.key === config[id].key) {
      config[id].buttonElement.dataset.pressed = true;
      if (!config.muted) {
        clickAudio.currentTime = 0;
        clickAudio.play();
      }
    }
  }
});
window.addEventListener('keyup', event => {
  for (const id of ids) {
    if (event.key === config[id].key || event.key === 'Meta')
    config[id].buttonElement.dataset.pressed = false;
  }
});

ctrl.on('change', sync);
update();