const secretWord = "HELLO".split("");
console.log(secretWord);

const guessInputForm = document.querySelector("#guess-input-form");
const guessInput = document.querySelector("#guess-input");
const firstLetterBoxes = document.querySelectorAll(".letter-1");
const firstGuess = document.querySelectorAll("#guess-1 .letter");
console.log("firstGuess:", firstGuess);

// takes the first letter of the secret word and puts it in the first box
firstLetterBoxes.forEach((box) => {
  box.innerText = secretWord[0];
});

guessInputForm.addEventListener("submit", handleGuessSubmit);

function handleGuessSubmit(event) {
  event.preventDefault();
  console.log(guessInput.value);
  setLetters(guessInput.value.toUpperCase(), firstGuess);
  compareGuessToSecretWord(
    guessInput.value.toUpperCase().split(""),
    secretWord
  );
  guessInput.value = "";
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
  row.forEach((box, index) => {
    box.innerText = guessInput[index];
  });
}
