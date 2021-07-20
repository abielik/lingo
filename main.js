showSecretWordForm();
let totalGuesses = 0;

const guessInputForm = document.querySelector("#guess-input-form");
const guessInput = document.querySelector("#guess-input");
const firstLetterBoxes = document.querySelectorAll(".letter-1");
const guessesRemaining = document.querySelector(".guesses-remaining span");
const secretWordForm = document.querySelector("#secret-word-form");
const secretWord = document.querySelector("#secret-word-input");
const clock = document.querySelector("#clock");

guessInputForm.addEventListener("submit", handleGuessSubmit);
secretWordForm.addEventListener("submit", handleSecretWordSubmit);

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
  const row = document.querySelectorAll(`#guess-${totalGuesses + 1} .letter`);

  setLetters(guessInput.value.toUpperCase(), row);
  // if user inputs winning guess
  if (guessInput.value.toUpperCase() === secretWord.value.toUpperCase()) {
    setTimeout(function () {
      return window.alert("You Win!");
    }, 1500);
  }
  // reset input box to empty string
  guessInput.value = "";
  totalGuesses++;
  if (totalGuesses === 5) {
    setTimeout(function () {
      window.alert("Sorry, you ran out of guesses");
    }, 2000);
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

function countdown() {
  let timeRemaining = 60;
  let timer = setInterval(function () {
    timeRemaining--;
    clock.innerText = timeRemaining;
    if (timeRemaining <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}
