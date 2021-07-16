const secretWord = "HELLO".split("");

console.log(secretWord);

const guessInputForm = document.querySelector("#guess-input-form");
const guessInput = document.querySelector("#guess-input");

guessInputForm.addEventListener("submit", handleGuessSubmit);

function handleGuessSubmit(event) {
  event.preventDefault();
  console.log(guessInput.value);
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
