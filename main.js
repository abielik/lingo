showSecretWordForm();
const defaultGameValues = {
  totalGuesses: 0,
  timeRemaining: 60,
  isGameWon: false, // used to stop the timer from counting down when the game is won
};

const guessInputForm = document.querySelector("#guess-input-form");
const guessInput = document.querySelector("#guess-input");
const firstLetterBoxes = document.querySelectorAll(".letter-1");
const guessesRemaining = document.querySelector(".guesses-remaining span");
const secretWordForm = document.querySelector("#secret-word-form");
const secretWord = document.querySelector("#secret-word-input");
const clock = document.querySelector("#clock");
const endGameMessage = document.querySelector(".end-game-message");
const newGameButton = document.querySelector("#new-game-button");
const allBoxes = document.querySelectorAll(".letter");

guessInputForm.addEventListener("submit", handleGuessSubmit);
secretWordForm.addEventListener("submit", handleSecretWordSubmit);
newGameButton.addEventListener("click", handleNewGame);

function handleSecretWordSubmit(event) {
  event.preventDefault();
  hideSecretWordForm();
  // takes the first letter of the secret word and puts it in the first box
  firstLetterBoxes.forEach((box) => {
    box.innerText = secretWord.value[0].toUpperCase();
  });
  // begin clock countdown
  countdown();
}

function handleGuessSubmit(event) {
  event.preventDefault();
  // had CONST ROW in the global scope but would always use the first row. Works properly in this scope
  const row = document.querySelectorAll(
    `#guess-${defaultGameValues.totalGuesses + 1} .letter`
  );

  setLetters(guessInput.value.toUpperCase(), row);
  // if user inputs winning guess
  if (guessInput.value.toUpperCase() === secretWord.value.toUpperCase()) {
    defaultGameValues.isGameWon = true;
    setTimeout(function () {
      return showEndGameMessage(
        `Congrats, you guessed the secret word, ${secretWord.value.toUpperCase()}!`
      );
    }, 2000);
    return;
  }
  // reset input box to empty string
  guessInput.value = "";
  defaultGameValues.totalGuesses++;
  if (defaultGameValues.totalGuesses === 5) {
    showEndGameMessage(
      "Sorry, you ran out of guesses! The secret word was " +
        secretWord.value.toUpperCase()
    );
  }
  // decrement remaining guesses
  guessesRemaining.innerText = parseInt(guessesRemaining.innerText) - 1;
}

function setLetters(guessInput, row) {
  row.forEach((box, index) => {
    setTimeout(function () {
      box.innerText = guessInput[index];
    }, index * 350);

    setTimeout(function () {
      if (box.innerText === secretWord.value[index].toUpperCase()) {
        // correct letter correct spot
        box.style.backgroundColor = "red";
      } else if (secretWord.value.toUpperCase().includes(box.innerText)) {
        // correct letter wrong spot
        box.style.backgroundColor = "yellow";
        box.style.borderRadius = "50%";
      }
    }, index * 350);
  });
}

function showSecretWordForm() {
  document.body.classList.add("show-secret-word-form");
}

function hideSecretWordForm() {
  document.body.classList.remove("show-secret-word-form");
}

function showEndGameMessage(message) {
  endGameMessage.innerHTML = message;
  document.body.classList.add("show-end-game-message");
}

function hideEndGameMessage() {
  document.body.classList.remove("show-end-game-message");
}

function handleNewGame() {
  hideEndGameMessage();
  guessesRemaining.innerText = 5;
  resetDefaultValues();
  showSecretWordForm();
}

function countdown() {
  const timer = setInterval(function () {
    if (defaultGameValues.isGameWon) {
      return clearInterval(timer);
    }
    defaultGameValues.timeRemaining--;
    clock.innerText = defaultGameValues.timeRemaining;
    if (defaultGameValues.timeRemaining <= 0) {
      clearInterval(timer);
      showEndGameMessage(
        "Sorry, you ran out of time! The secret word was " +
          secretWord.value.toUpperCase()
      );
    }
  }, 1000);
}

function resetDefaultValues() {
  defaultGameValues.totalGuesses = 0;
  defaultGameValues.timeRemaining = 60;
  defaultGameValues.isGameWon = false;
  resetAllBoxes();
}

function resetAllBoxes() {
  allBoxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "transparent";
  });
}

function checkGuess(guess) {}
