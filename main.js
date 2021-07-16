const secretWord = "HELLO".split("");
//console.log("secret word is: ", secretWord);

let totalGuesses = 0;
const guessInputForm = document.querySelector("#guess-input-form");
const guessInput = document.querySelector("#guess-input");
const firstLetterBoxes = document.querySelectorAll(".letter-1");
const guessesRemaining = document.querySelector(".guesses-remaining span");

// takes the first letter of the secret word and puts it in the first box
firstLetterBoxes.forEach((box) => {
  box.innerText = secretWord[0];
});

guessInputForm.addEventListener("submit", handleGuessSubmit);

function handleGuessSubmit(event) {
  event.preventDefault();

  // had CONST ROW in the global scope but would always use the first row. Works properly in this scope
  const row = document.querySelectorAll(`#guess-${totalGuesses + 1} .letter`);
  setLetters(guessInput.value.toUpperCase(), row);
  if (guessInput.value.toUpperCase() === secretWord.join("")) {
    window.alert("You Win!");
  }

  // reset input box to empty string
  guessInput.value = "";
  totalGuesses++;
  if (totalGuesses === 5) {
    window.alert("Sorry, you ran out of guesses");
  }
  // decrement remaining guesses
  guessesRemaining.innerText = parseInt(guessesRemaining.innerText) - 1;
}

function setLetters(guessInput, row) {
  row.forEach((box, index) => {
    box.innerText = guessInput[index];

    if (box.innerText === secretWord[index]) {
      // correct letter correct spot
      box.style.backgroundColor = "red";
    } else if (secretWord.includes(box.innerText)) {
      // correct letter wrong spot
      box.style.backgroundColor = "yellow";
      box.style.borderRadius = "50%";
    }
  });
}
