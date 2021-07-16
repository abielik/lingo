const secretWord = "HELLO".split("");
const guess = "HELLO".split("");
console.log(guess);
console.log(secretWord);

const guessInputForm = document.querySelector("#guess-input-form");

guessInputForm.addEventListener("submit", handleGuessSubmit);

function handleGuessSubmit(event) {
  event.preventDefault();
  console.log("submitted");
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
compareGuessToSecretWord(guess, secretWord);
