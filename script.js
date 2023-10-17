let secretCode;
let currentGuess = '';
let turnsLeft = 7;

function generateSecretCode() {
    secretCode = '';
    for (let i = 0; i < 3; i++) {
        secretCode += (Math.floor(Math.random() * 3) + 1).toString();
    }
    const generatedCodeElement = document.getElementById('generatedCode');
    // generatedCodeElement.textContent = `Generated Code for Testing: ${secretCode}`;
    return secretCode;
}

function addToGuess(number) {
    if (currentGuess.length < 3) {
        currentGuess += number;
        document.getElementById('guess').value = currentGuess;
        if (currentGuess.length === 3) {
            checkGuess();
        }
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
            endGame(true);
            return;
        }
        clearGuess();
        if (turnsLeft === 0) {
            log('Out of turns. Game over!');
            endGame(false);
            return;
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

function endGame(isWinner) {
    if (isWinner) {
        document.getElementById('youWinModal').style.display = 'block';
    } else {
        document.getElementById('youLoseModal').style.display = 'block';
    }
    turnsLeft = 7; 
    document.getElementById('clock').textContent = `Turns left: ${turnsLeft}`

    document.getElementById('log').innerHTML = '';
    clearGuess();

    // Reset the game after a delay (e.g., 3 seconds)
    setTimeout(() => {
        document.getElementById('youWinModal').style.display = 'none';
        document.getElementById('youLoseModal').style.display = 'none';
        document.getElementById('log').innerHTML = '';

        // You can also add additional reset logic here
        generateSecretCode();
    }, 3000); // Reset the game after 3 seconds
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function log(message) {
    const logElement = document.getElementById('log');
    logElement.innerHTML += message + '<br>';
    logElement.scrollTop = logElement.scrollHeight;
}

// Generate the initial secret code
generateSecretCode();

