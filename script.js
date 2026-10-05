
function createEl(tag, className, text) {
  const el = document.createElement(tag);
  el.className = className;
  el.textContent = text;
  return el;
}

// HEADER
function createHeader() {
  const header = createEl('header', 'header');
  const container = createEl('div', 'container');
  const wrapper = createEl('div', 'header__wrapper');
  const h1 = createEl('h1', 'header__title', 'Memory Game');
  const btnWrappers = createEl('div', 'header__btns');
  const btnGame = createEl('button', 'header__button', 'Новая игра');
  const btnLiders = createEl('button', 'header__button', 'Таблица лидеров');
  btnGame.setAttribute('type', 'button');
  btnLiders.setAttribute('type', 'button');
  header.appendChild(container);
  container.appendChild(wrapper);
  wrapper.appendChild(h1);
  wrapper.appendChild(btnWrappers);
  btnWrappers.appendChild(btnGame);
  btnWrappers.appendChild(btnLiders);
  return header;
}

document.body.append(createHeader());