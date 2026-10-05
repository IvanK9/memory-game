const CARD_FACES = ["🐙", "🦋", "🌿", "🍄", "🐬", "🌸", "🦉", "🍑"];
const CARD_PAIRS_COUNT = 8;

let firstCard = null;
let lockBoard = false;
let flipBackTimer = null;
let movesCount = 0;
let matchedCount = 0;
let isGameFinished = false;

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

  btnGame.addEventListener("click", newGame);
  return header;
}

document.body.append(createHeader());

// GAME

function gameField() {
  const main = createEl("main", "game");
  const container = createEl("div", "container");
  const gameWrapper = createEl("div", "game__wrapper");
  const field = createEl("ul", "game__field list-reset");
  const stats = createEl("div", "game__stats");
  const moves = createEl("div", "game__moves", "Ходов: 0");
  const matchedPairs = createEl(
    "div",
    "game__matched-pairs",
    "Совпадений: 0 из 8",
  );
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
  const card = createEl("li", "game__card card");
  card.dataset.value = cardData.value;

  const inner = createEl("div", "card__inner");
  const back = createEl("div", "card__face card__face--back", "?");
  const front = createEl("div", "card__face card__face--front", cardData.face);

  inner.append(back, front);
  card.append(inner);
  card.addEventListener("click", cardClick);
  return card;
}

function cardClick(event) {
  const card = event.currentTarget;

  if (
    isGameFinished ||
    lockBoard ||
    card.classList.contains("card--open") ||
    card.classList.contains("card--matched")
  ) {
    return;
  }

  card.classList.add("card--open");
  if (firstCard === null) {
    firstCard = card;
    return;
  }

  movesCount += 1;
  document.querySelector(".game__moves").textContent = `Ходов: ${movesCount}`;

  if (card.dataset.value === firstCard.dataset.value) {
    handleMatch(card);
  } else {
    handleMismatch(card);
  }
}

function handleMatch(card) {
  card.classList.add("card--matched");
  firstCard.classList.add("card--matched");
  matchedCount += 1;
  document.querySelector(".game__matched-pairs").textContent =
    `Совпадений: ${matchedCount} из 8`;
  firstCard = null;

  if (matchedCount === CARD_PAIRS_COUNT) {
    finishGame();
  }
}

function handleMismatch(card) {
  lockBoard = true;
  const secondCard = card;

  flipBackTimer = setTimeout(() => {
    secondCard.classList.remove("card--open");
    firstCard.classList.remove("card--open");
    firstCard = null;
    lockBoard = false;
  }, 1500);
}

function createModal() {
  const modal = createEl("dialog", "modal");
  const modalWrapper = createEl("div", "modal__wrapper");
  const modalTitle = createEl("h2", "modal__title", "Победа!!!");
  const modalText = createEl("p", "modal__text", "");
  const modalBtns = createEl("div", "modal__btns");
  const modalNewGame = createEl(
    "button",
    "modal__btn modal__btn-new",
    "Новая игра",
  );
  const modalClose = createEl(
    "button",
    "modal__btn modal__btn-close",
    "Закрыть",
  );

  modalWrapper.append(modalTitle, modalText, modalBtns);
  modalBtns.append(modalNewGame, modalClose);
  modal.append(modalWrapper);

  modalNewGame.addEventListener('click', () => {
    modal.close();
    newGame();
  });

  modalClose.addEventListener('click', ()=> {
    modal.close();
  });

  return modal;
}

function finishGame() {
  isGameFinished = true;
  const modal = document.querySelector(".modal");
  const text = document.querySelector(".modal__text");

  text.textContent = `Вы нашли все пары за ${movesCount} ходов!`;
  modal.showModal();

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
}

function newGame() {
  firstCard = null;
  lockBoard = false;
  isGameFinished = false;

  if (flipBackTimer) {
    clearTimeout(flipBackTimer);
    flipBackTimer = null;
  }

  movesCount = 0;
  matchedCount = 0;
  document.querySelector(".game__moves").textContent = `Ходов: ${movesCount}`;
  document.querySelector(".game__matched-pairs").textContent =
    `Совпадений: ${matchedCount} из 8`;

  const field = document.querySelector(".game__field");
  field.replaceChildren();
  buildDeck().forEach((cardData) => field.append(createCard(cardData)));
}

document.body.append(gameField(), createModal());
