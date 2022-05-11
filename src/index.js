import './style.css';

const body = document.querySelector('body');

const container = document.createElement('div');
container.classList.add('container');

const title = document.createElement('h1');
title.textContent = 'Virtual keyboard in Windows OS';
title.classList.add('title');
container.appendChild(title);

const textArea = document.createElement('textarea');
textArea.classList.add('textarea');
textArea.setAttribute('placeholder', 'Press left ctrl + alt to change language to Ukrainian');
container.appendChild(textArea);

body.appendChild(container);

const end = textArea.selectionEnd;
textArea.setSelectionRange(end, end);
textArea.focus();

const keyCode = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0',
  'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP',
  'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ',
  'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ',
  'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp',
  'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space',
  'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];

const keyShifted = [
  '~',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '_',
  '+',
  'backspace',
  'tab',
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  '{',
  '}',
  '|',
  'del',
  'caps lock',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  ';',
  '\'',
  'enter',
  'shift',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  '<',
  '>',
  '?',
  '↑',
  'Shift',
  'ctrl',
  'win',
  'alt',
  'space',
  'alt',
  '←',
  '↓',
  '→',
  'ctrl',
];

const keyUkrainian = ["'", '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
  'backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ї', '\\',
  'del', 'caps lock', 'ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є', 'enter',
  'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift', 'ctrl', 'win', 'alt', 'space', 'alt', '←', '↓', '→', 'ctrl'];
const keyUkrainianShifted = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
  'backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ї', '/', 'del', 'caps lock',
  'Ф', 'І', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Є', 'enter', 'shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь',
  'Б', 'Ю', ',', '↑', 'Shift', 'ctrl', 'win', 'alt', 'space', 'alt', '←', '↓', '→', 'ctrl'];

const keyLayout = [
  '`',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '-',
  '=',
  'backspace',
  'tab',
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  '[',
  ']',
  '\\',
  'del',
  'caps lock',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  ';',
  '\'',
  'enter',
  'shift',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  ',',
  '.',
  '/',
  '↑',
  'Shift',
  'ctrl',
  'win',
  'alt',
  'space',
  'alt',
  '←',
  '↓',
  '→',
  'ctrl',
];

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
    changeLangKeys: '',
    language: 'en',
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys(keyLayout));

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    container.appendChild(this.elements.main);

    this.makeActiveKey();
    this.changeLang();

    document.addEventListener('keydown', (event) => {
      event.preventDefault();
    });
  },

  createKeys(array) {
    const fragment = document.createDocumentFragment();

    array.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'del', 'enter', 'Shift'].indexOf(key) !== -1;

      // Add attributes
      keyElement.setAttribute('type', 'button');
      keyElement.setAttribute('data-id', `${key}`);

      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = 'backspace';

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.triggerEvents();
          });

          break;

        case 'caps lock':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = 'caps lock';

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--capslockActive', this.properties.capsLock);
          });

          keyElement.addEventListener('keydown', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--capslockActive', this.properties.capsLock);
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = 'enter';

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvents();
          });

          break;

        case 'shift':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = 'shift';

          keyElement.addEventListener('mousedown', () => {
            this.toggleShift();
            keyElement.classList.toggle('keyboard__key--capslockActive', this.properties.shift);
          });

          keyElement.addEventListener('mouseup', () => {
            this.toggleShift();
            keyElement.classList.toggle('keyboard__key--capslockActive', this.properties.shift);
          });

          break;

        case 'Shift':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = 'shift';

          keyElement.addEventListener('mousedown', () => {
            this.toggleShift();
            keyElement.classList.toggle('keyboard__key--capslockActive', this.properties.shift);
          });

          keyElement.addEventListener('mouseup', () => {
            this.toggleShift();
            keyElement.classList.toggle('keyboard__key--capslockActive', this.properties.shift);
          });

          break;

        case 'alt':
          keyElement.textContent = 'alt';

          break;

        case 'win':
          keyElement.textContent = 'win';

          break;

        case 'ctrl':
          keyElement.textContent = 'ctrl';

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvents();
          });

          break;

        case 'tab':
          keyElement.textContent = 'tab';

          keyElement.addEventListener('click', () => {
            this.properties.value += '  ';
            this.triggerEvents();
          });

          break;

        case 'del':
          keyElement.textContent = 'del';

          keyElement.addEventListener('click', () => {
            this.properties.value = '';
            this.triggerEvents();
          });

          keyElement.addEventListener('keydown', () => {
            this.properties.value = '';
            this.triggerEvents();
          });

          break;

        default:
          keyElement.classList.add('keyboard__key');
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this.triggerEvents();
          });

          // keyElement.addEventListener('keydown', (e) => {
          //   this.properties.value += this.properties.capsLock ? e.key.toUpperCase() : e.key.toLowerCase();
          //   this.triggerEvents();
          // });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    // eslint-disable-next-line no-restricted-syntax
    for (const key of this.elements.keys) {
      if (key.innerText.toLowerCase() !== 'backspace' && key.innerText.toLowerCase() !== 'caps lock'
            && key.innerText.toLowerCase() !== 'enter' && key.innerText.toLowerCase() !== 'shift'
            && key.innerText.toLowerCase() !== 'tab' && key.innerText.toLowerCase() !== 'ctrl'
            && key.innerText.toLowerCase() !== 'win' && key.innerText.toLowerCase() !== 'alt'
            && key.innerText.toLowerCase() !== 'del') {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  toggleShift() {
    this.properties.shift = !this.properties.shift;

    if (this.properties.shift) {
      while (this.elements.keysContainer.childNodes.length > 0) {
        Keyboard.elements.keysContainer.removeChild(Keyboard.elements.keysContainer.lastChild);
      }
      this.elements.keys = [];

      this.elements.keysContainer.append(this.createKeys(this.properties.language === 'en' ? keyShifted : keyUkrainianShifted));
      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    } else {
      while (this.elements.keysContainer.childNodes.length > 0) {
        Keyboard.elements.keysContainer.removeChild(Keyboard.elements.keysContainer.lastChild);
      }
      this.elements.keys = [];
      this.elements.keysContainer.append(this.createKeys(this.properties.language === 'en' ? keyLayout : keyUkrainian));
      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    }
  },

  triggerEvents() {
    textArea.innerHTML = this.properties.value;
  },

  makeActiveKey() {
    const touchEventImitation = new Event('click');
    const keyPressEventImitation = new Event('mousedown');
    const keyUpEventImitation = new Event('mouseup');

    document.addEventListener('keydown', (event) => {
      const keyTarget = this.elements.keys[keyCode.indexOf(event.code)];
      if (keyTarget) {
        if (keyTarget.textContent !== 'shift' && keyTarget.textContent !== 'Shift'
      && keyTarget.textContent !== 'ctrl' && keyTarget.textContent !== 'alt') {
          keyTarget.dispatchEvent(touchEventImitation);
        } else {
          keyTarget.dispatchEvent(keyPressEventImitation);
        }
        keyTarget.classList.add('pressed');
      }
    });

    document.addEventListener('keyup', (event) => {
      const keyTarget = this.elements.keys[keyCode.indexOf(event.code)];
      if (keyTarget) {
        if (keyTarget.textContent === 'shift' || keyTarget.textContent === 'Shift'
      || keyTarget.textContent === 'ctrl' || keyTarget.textContent === 'alt' || keyTarget.textContent === 'caps lock') {
          keyTarget.dispatchEvent(keyUpEventImitation);
        }
        keyTarget.classList.remove('pressed');
      }
    });
  },

  changeLang() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Alt') {
        Keyboard.properties.changeLangKeys += 'alt';
      }
      if (e.key === 'Control') {
        Keyboard.properties.changeLangKeys += 'ctrl';
      }

      if (Keyboard.properties.changeLangKeys.includes('ctrl') && Keyboard.properties.changeLangKeys.includes('alt')) {
        while (this.elements.keysContainer.childNodes.length > 0) {
          Keyboard.elements.keysContainer.removeChild(Keyboard.elements.keysContainer.lastChild);
        }
        this.properties.language = (this.properties.language === 'en') ? 'ua' : 'en';
        this.elements.keys = [];
        this.elements.keysContainer.append(this.createKeys(this.properties.language === 'en'
          ? keyLayout : keyUkrainian));
        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

        document.addEventListener('keyup', () => {
          const alt = /alt/g;
          const ctrl = /ctrl/g;
          this.properties.changeLangKeys = this.properties.changeLangKeys.replace(alt, '');

          this.properties.changeLangKeys = this.properties.changeLangKeys.replace(ctrl, '');
        });
      }
    });
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
