// describe("generatePassword", () => {
//   it("returns an empty string if the user inputs a non-number value for password length", () => {
//     window.prompt = jest.fn(() => "not a number");
//     expect(generatePassword()).toBe("");
//   });

//   it("returns an empty string if the user inputs a password length less than 8 or greater than 128", () => {
//     window.prompt = jest.fn(() => "5");
//     expect(generatePassword()).toBe("");
//     window.prompt = jest.fn(() => "200");
//     expect(generatePassword()).toBe("");
//   });

//   it("prompts the user for character types and generates a password containing those types", () => {
//     // mock the user prompts
//     window.prompt = jest.fn(() => "16");
//     window.confirm = jest.fn(() => true);
//     // generate a password with only lowercase characters
//     characterBank = [];
//     expect(generatePassword()).match(/^[a-z]{16}$/);
//     // generate a password with only uppercase characters
//     characterBank = [];
//     expect(generatePassword()).match(/^[A-Z]{16}$/);
//     // generate a password with only numbers
//     characterBank = [];
//     expect(generatePassword()).match(/^[0-9]{16}$/);
//     // generate a password with only special characters
//     characterBank = [];
//     expect(generatePassword()).match(
//       /^[!#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]{16}$/
//     );
//     // generate a password with all character types
//     characterBank = [];
//     window.confirm = jest.fn(() => true);
//     expect(generatePassword()).match(
//       /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~])[a-zA-Z0-9!#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]{16}$/
//     );
//   });

//   it("prompts the user to select at least one character type if no types are selected", () => {
//     window.prompt = jest.fn(() => "16");
//     window.confirm = jest.fn(() => false);
//     expect(generatePassword()).toBe("");
//     expect(window.alert).toHaveBeenCalledWith(
//       "password must contain at least one character type"
//     );
//   });
// });

// describe("writePassword", () => {
//   it("sets the value of the #password input to the result of generatePassword", () => {
//     const mockPassword = "password123";
//     generatePassword = jest.fn(() => mockPassword);
//     const passwordInput = document.createElement("input");
//     passwordInput.id = "password";
//     document.body.appendChild(passwordInput);
//     writePassword();
//     expect(passwordInput.value).toBe(mockPassword);
//   });
// });

// describe("generateBtn click event listener", () => {
//   it("attaches the writePassword function to the click event of the #generate button", () => {
//     const mockButton = document.createElement("button");
//     mockButton.id = "generate";
//     mockButton.addEventListener = jest.fn();
//     document.body.appendChild(mockButton);
//     generateBtn();
//     expect(mockButton.addEventListener).toHaveBeenCalledWith(
//       "click",
//       writePassword
//     );
//   });
// });

import { generatePassword } from "./app";

describe("generatePassword", () => {
  let mockPassword: string;
  let mockButton: HTMLButtonElement;
  let passwordInput: HTMLInputElement;

  beforeEach(() => {
    mockPassword = "aA1bB2cC3dD4eE5";
    mockButton = document.createElement("button");
    passwordInput = document.createElement("input");
    passwordInput.setAttribute("id", "password");
    document.body.appendChild(mockButton);
    document.body.appendChild(passwordInput);
  });

  afterEach(() => {
    document.body.removeChild(mockButton);
    document.body.removeChild(passwordInput);
  });

  it("should return an empty string if password length is less than 16", () => {
    const result = generatePassword(15);
    expect(result).equal("");
  });

  it("should return a password with 16 lowercase letters if length is 16", () => {
    const result = generatePassword(16);
    expect(result).match(/^[a-z]{16}$/);
  });

  it("should return a password with 16 uppercase letters if length is 17", () => {
    const result = generatePassword(17);
    expect(result).match(/^[A-Z]{16}$/);
  });

  it("should return a password with 16 digits if length is 18", () => {
    const result = generatePassword(18);
    expect(result).match(/^[0-9]{16}$/);
  });

  it("should return a password with 16 special characters if length is 19", () => {
    const result = generatePassword(19);
    expect(result).match(/^[!@#$%^&*()]{16}$/);
  });

  it("should show an alert message when the Generate Password button is clicked", () => {
    window.alert = jest.fn();
    generatePassword(16);
    mockButton.click();
    expect(window.alert).toHaveBeenCalledWith("Password copied to clipboard");
  });

  it("should set the generated password as the value of the password input field when the Generate Password button is clicked", () => {
    generatePassword = jest.fn(() => mockPassword);
    mockButton.click();
    expect(passwordInput.value).equal(mockPassword);
  });

  it("should invoke addEventListener with 'click' and a callback function when the Generate Password button is created", () => {
    mockButton.addEventListener = jest.fn();
    generatePassword(16);
    expect(mockButton.addEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function)
    );
  });
});
