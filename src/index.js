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
container.appendChild(textArea);

body.appendChild(container);

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oniput: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    container.appendChild(this.elements.main);
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
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
      'Shift',
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
      'shift',
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

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'del', 'enter', 'shift'].indexOf(key) !== -1;

      // Add attributes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = 'backspace';

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.triggerEvents('oniput');
          });

          break;

        case 'caps lock':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = 'caps lock';

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--capslockActive', this.properties.capsLock);
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = 'enter';

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvents('oniput');
          });

          break;

        case 'shift':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = 'shift';

          // keyElement.addEventListener('click', () => {
          //     this.properties.value += '\n';
          // })

          break;

        case 'Shift':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = 'shift';

          // keyElement.addEventListener('click', () => {
          //     this.properties.value += '\n';
          // })

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');

          keyElement.addEventListener('click', () => {
            this.properties.value = ' ';
            this.triggerEvents('oniput');
          });

          break;

        default:
          keyElement.classList.add('keyboard__key');
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this.triggerEvents('oniput');
          });

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

  triggerEvents(handlerName) {
    if (this.eventHandlers[handlerName] === 'oninput') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
