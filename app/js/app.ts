/* eslint-disable spaced-comment */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable max-len */
// declaring empty array to password output and the characterbank that holds all the possible characters
let passwordOutput: string[] = [];
let characterBank: string[] = [];

//  declaring constiables of  all the options for characters below

const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbersList = "0123456789";
const specialcharactersList = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

//  creating new arrays below that contain all the charcaters of the arrays above, but this time each character is spilt up individually so that we can pick characters individually later on.

const lowerAlphabetArray: string[] = lowerAlphabet.split("");
const upperAlphabetArray: string[] = upperAlphabet.split("");
const numbersListArray: string[] = numbersList.split("");
const specialcharactersListArray: string[] = specialcharactersList.split("");

// Write password to the #password input . use null check to prevent error
function writePassword(): void {
  console.log("clicked");
  const password = generatePassword();
  let passwordText: HTMLInputElement | null =
    document.querySelector("#password");
  if (passwordText !== null) {
    passwordText.value = password;
  }
}
// Add event listener to generate button. use null check to prevent error
const generateBtn: HTMLButtonElement | null =
  document.querySelector("#generate");
if (generateBtn !== null) {
  generateBtn.addEventListener("click", writePassword);
}
// add generate Password function below that generates prompts  when generate button is clicked. prompts to ask user what characters they want included in the pasword. Conditionals added that specify if user click 'ok' in confrim window then the corresponding character array should be added to the characterbank bank of characters that the password can contain.
function generatePassword(): string {
  const passwordLength = prompt(
    "How many characters do you want your password to contain?"
  );
  //    alert if user inputs NaN. called generate password function again if user triggered this alert so that the prompt workflow restarts from beginning.

  // eslint-disable-next-line radix
  // if length is null then length will be 0 so we can avoid a sitaution where null is passed thru which causes an error
  if (isNaN(parseInt(passwordLength || "0"))) {
    alert("you must enter a number");
    return "";
  }
  //    alert if user inputs length less than 8 or greater than 128. called generate password function again if user triggered this alert so that the prompt workflow restarts from beginning.
  // eslint-disable-next-line radix
  // if length is null then length will be 0 so we can avoid a sitaution where null is passed thru which causes an error
  if (
    parseInt(passwordLength || "0") < 8 ||
    parseInt(passwordLength || "0") > 128
  ) {
    alert("Password must be between 8 and 128 characters in length");
    return "";
  }

  //    turning string input of password length into number and putting it into a variable
  // eslint-disable-next-line radix
  const inputtedPasswordLength: number = parseInt(passwordLength || "0");

  const lowercase = confirm(
    "Do you want to include any lowercase characters in your password?"
  );
  if (lowercase === true) {
    characterBank = [...characterBank, ...lowerAlphabetArray];
  }
  const uppercase = confirm(
    "Do you want to include any uppercase characters in your password?"
  );
  if (uppercase === true) {
    characterBank = [...characterBank, ...upperAlphabetArray];
  }
  const numbers = confirm(
    "Do you want to include any numbers in your password?"
  );

  if (numbers === true) {
    characterBank = [...characterBank, ...numbersListArray];
  }

  const specialCharacters = confirm(
    "Do you want to include any special characters in your password?"
  );

  if (specialCharacters === true) {
    characterBank = [...characterBank, ...specialcharactersListArray];
  }

  // eslint-disable-next-line spaced-comment
  //conditional to check if user clicked ok on at least 1 character type
  if (
    specialCharacters === false &&
    numbers === false &&
    uppercase === false &&
    lowercase === false
  ) {
    //alert if user didnt select at least on of the character types
    alert("password must contain at least one character type");
    generatePassword();
  }
  //for loop that loops through character bank and selects a random character each time until it reachs the users inputted password length.
  for (let i = 0; i < inputtedPasswordLength; i++) {
    const randomCharactersSelector =
      characterBank[Math.floor(Math.random() * characterBank.length)];

    passwordOutput = [...passwordOutput, randomCharactersSelector];
  }

  //returning result of password output and also taking out commas  between the characters
  return passwordOutput.join("");
}
