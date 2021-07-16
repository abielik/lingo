const secretWord = "HELLO".split("");
console.log("secret word is: ", secretWord);

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

  compareGuessToSecretWord(
    guessInput.value.toUpperCase().split(""),
    secretWord
  );

  // reset input box to empty string
  guessInput.value = "";
  totalGuesses++;
  guessesRemaining.innerText = parseInt(guessesRemaining.innerText) - 1;
}

function compareGuessToSecretWord(guessInput, secretWord) {
  // if correct guess
  if (guessInput.join() === secretWord.join()) {
    console.log("CORRECT GUESS!");
    return;
  }

  guessInput.forEach((letter, index) => {
    // if letter is correct and in correct position
    if (secretWord[index] === letter) {
      console.log("right letter right spot");
    } else if (secretWord.includes(letter)) {
      // else if letter is correct but in wrong position
      console.log("right letter WRONG spot");
    } else {
      // wrong letter
      console.log("wrong letter");
    }
  });
}

function setLetters(guessInput, row) {
  console.log("what is row: ", row);
  row.forEach((box, index) => {
    box.innerText = guessInput[index];
  });
}
