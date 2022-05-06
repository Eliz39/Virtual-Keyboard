const body = document.querySelector('body');

const container = document.createElement('div');
container.classList.add('container');

const title = document.createElement('h1');
title.textContent = 'Virtual keyboard for Microsoft OS';
title.classList.add('title');
container.appendChild(title);

const keyboard = document.createElement('div');
container.classList.add('keyboard');
container.appendChild(keyboard);

body.appendChild(container);
