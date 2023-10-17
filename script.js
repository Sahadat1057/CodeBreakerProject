let secretCode;
let currentGuess = '';
let turnsLeft = 7;

function generateSecretCode() {
    secretCode = '';
    for (let i = 0; i < 3; i++) {
        secretCode += (Math.floor(Math.random() * 3) + 1).toString();
    }
    const generatedCodeElement = document.getElementById('generatedCode');
    generatedCodeElement.textContent = `Generated Code for Testing: ${secretCode}`;
    return secretCode;
}

function addToGuess(number) {
    if (currentGuess.length < 3) {
        currentGuess += number;
        document.getElementById('guess').value = currentGuess;
    }
}

function clearGuess() {
    currentGuess = '';
    document.getElementById('guess').value = currentGuess;
}

function checkGuess() {
    if (currentGuess.length === 3) {
        turnsLeft--;
        document.getElementById('clock').textContent = `Turns left: ${turnsLeft}`;
        let result = compareGuess(currentGuess, secretCode);
        log(`Guess: ${currentGuess}, Result: ${result}`);
        if (result === 'Correct') {
            log('Congratulations! You cracked the vault.');
            secretCode = generateSecretCode();
            turnsLeft = 7;
        }
        clearGuess();
        if (turnsLeft === 0) {
            log('Out of turns. Game over!');
            secretCode = generateSecretCode();
            turnsLeft = 7;
        }
    }
}

function compareGuess(guess, code) {
    if (guess == code) {
        return 'Correct';
    } else if (guess < code) {
        return 'Lower';
    } else if (guess > code) {
        return 'Higher';
    }
}

function log(message) {
    const logElement = document.getElementById('log');
    logElement.innerHTML += message + '<br>';
    logElement.scrollTop = logElement.scrollHeight;
}

// Generate the initial secret code
generateSecretCode();
