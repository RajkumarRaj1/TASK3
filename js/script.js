const cards = [
  "🐶",
  "🐱",
  "🐰",
  "🦊",
  "🐶",
  "🐱",
  "🐰",
  "🦊",
  "🐶",
  "🐱",
  "🐰",
  "🦊",
  "🐶",
  "🐱",
  "🐰",
  "🦊",
];

let cardElements = [];
let firstCard, secondCard;
let lockBoard = false;
let matchedCards = 0;

const gameBoard = document.getElementById("game-board");
const restartButton = document.getElementById("restart");

function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add(
    "card",
    "bg-white",
    "flex",
    "items-center",
    "justify-center",
    "h-32",
    "w-32",
    "text-5xl",
    "cursor-pointer",
    "shadow-lg",
    "transition",
    "duration-300",
    "ease-in-out",
    "transform-right",
    "hover:scale-105"
  );
  cardElement.dataset.cardValue = card;
    cardElement.innerHTML = `<img src="/public/apple.png">`;
  cardElement.addEventListener("click", flipCard);
  gameBoard.appendChild(cardElement);
  cardElements.push(cardElement);
}

function shuffleCards() {
  cardElements = [];
  gameBoard.innerHTML = "";
  const shuffledCards = cards.sort(() => 0.5 - Math.random());
  shuffledCards.forEach(createCard);
}

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.innerText = this.dataset.cardValue;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;
    checkForMatch();
  }
}

function checkForMatch() {
  const isMatch = firstCard.dataset.cardValue === secondCard.dataset.cardValue;

  if (isMatch) {
    matchedCards += 2;
    resetBoard();
    if (matchedCards === cards.length) {
      setTimeout(() => alert("Congratulations! You Win"),
        500
      );
    }
  } else {
    setTimeout(() => {
      firstCard.innerText = "";
      secondCard.innerText = "";
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

restartButton.addEventListener("click", shuffleCards);
shuffleCards();
