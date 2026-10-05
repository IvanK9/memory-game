const CARD_FACES = ["🐙", "🦋", "🌿", "🍄", "🐬", "🌸", "🦉", "🍑"];
const CARD_PAIRS_COUNT = 8;

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  el.className = className;
  el.textContent = text;
  return el;
}

// HEADER
function createHeader() {
  const header = createEl("header", "header");
  const container = createEl("div", "container");
  const wrapper = createEl("div", "header__wrapper");
  const h1 = createEl("h1", "header__title", "Memory Game");
  const btnWrappers = createEl("div", "header__btns");
  const btnGame = createEl("button", "header__button", "Новая игра");
  const btnLiders = createEl("button", "header__button", "Таблица лидеров");
  btnGame.setAttribute("type", "button");
  btnLiders.setAttribute("type", "button");
  header.appendChild(container);
  container.appendChild(wrapper);
  wrapper.appendChild(h1);
  wrapper.appendChild(btnWrappers);
  btnWrappers.appendChild(btnGame);
  btnWrappers.appendChild(btnLiders);
  return header;
}

document.body.append(createHeader());

// GAME

function gameField() {
  const main = createEl('main', 'game');
  const container = createEl('div', 'container');
  const gameWrapper = createEl('div', 'game__wrapper');
  const field = createEl('ul', 'game__field list-reset');
  const stats = createEl('div', 'game__stats');
  const moves = createEl('div', 'game__moves', 'Ходов: 0');
  const matchedPairs = createEl('div', 'game__matched-pairs', 'Совпадений: 0');
  stats.append(moves, matchedPairs);

  buildDeck().forEach((cardData) => field.append(createCard(cardData)));

  main.append(container);
  container.append(gameWrapper);
  gameWrapper.append(field);
  gameWrapper.append(stats);
  return main;
}

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildDeck() {
  const pairs = [];
  CARD_FACES.forEach((face, index) => {
    pairs.push({ value: index, face });
    pairs.push({ value: index, face });
  });
  return shuffle(pairs);
}

function createCard(cardData) {
  const card = createEl('li', 'game__card card');
  card.dataset.value = cardData.value;

  const inner = createEl('div', 'card__inner');
  const back = createEl('div', 'card__face', '?');
  const front = createEl('div', 'card__face', cardData.face);

  inner.append(back, front);
  card.append(inner);
  return card;
}



document.body.append(gameField());

