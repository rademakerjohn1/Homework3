// Declaring global variables
var generateBtn = document.querySelector("#generate");
var clearBtn = document.querySelector("#clear");
clearBtn.disabled = true;
var passwordLength;
var upperChar;
var lowerChar;
var numChar;
var specialChar;
var charString = "";
var finalString = "";
var passwordText = document.querySelector("#password");

// Prompt user to enter password length between 8-128 characters, run selectCharType if valid number
function findPasswordLength() {

    passwordLength = prompt("Choose character length \n(at least 8 and no more than 128)");
    
    if (passwordLength >= 8 && passwordLength <= 128) {
        alert("Your password will be " + passwordLength + " characters long");
        selectCharType();
    }
    else if (passwordLength === null) {
        return;
        
    }
    else if (typeof(passwordLength) !== "number" || passwordLength < 8 || passwordLength > 128) {
        findPasswordLength();
    }
}

// Prompt user to choose at least one character type, store results, run generateCharString() if at least one type is chosen
function selectCharType() {

    alert("Choose at least one character type to include: \n  1. Uppercase \n  2. Lowercase \n  3. Numeric \n  4. Special");
    
    upperChar = confirm("Do you want to use uppercase characters?");
    lowerChar = confirm("Do you want to use lowercase characters?");
    numChar = confirm("Do you want to use numeric characters?");
    specialChar = confirm("Do you want to use special characters?");
    
    if (upperChar === false && lowerChar === false && numChar === false && specialChar === false) {
        selectCharType();
    }
    else if (upperChar === true || lowerChar === true || numChar === true || specialChar === true) {
        generateCharString();
    }
}

// Adds string of characters to empty charString based on presence of true values from selectCharType(), runs generatePassword() if there are characters in string
function generateCharString() {

    if (upperChar === true) {
        charString += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (lowerChar === true) {
        charString += "abcdefghijklmnopqrstuvwxyz";
    }
    if (numChar === true) {
        charString += "0123456789";
    }
    if (specialChar === true) {
        charString += " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    }

    if (charString !== "") {
        generatePassword();
    }
}

// Generates and returns random string from charString
function generatePassword() {
    for (var i = 0; i < passwordLength; i++) {
        finalString += charString.charAt(Math.floor(Math.random() * charString.length));
    }
    
    if (finalString === "") {
        return;
    }
    else { 
        generateBtn.disabled = true;
        clearBtn.disabled = false;
        return finalString;
    }
}

// Calls series of functions when generateBtn is clicked, outputs random password
function writePassword() {
    findPasswordLength();
    
    if (finalString === "") {
        return;
    }
    else {
        passwordText.value = finalString;
    }
}

// Clears current password
function clearPassword() {
    upperChar = false;
    lowerChar = false;
    numChar = false;
    specialChar = false;
    charString = "";
    finalString = "";
    passwordText.value = "";
    generateBtn.disabled = false;
    clearBtn.disabled = true;
}

// Click event listeners for buttons
generateBtn.addEventListener("click", writePassword);
clearBtn.addEventListener("click", clearPassword);