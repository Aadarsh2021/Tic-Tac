const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const popup = document.getElementById('popup');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');

let xTurn = true;
let scores = { X: 0, O: 0 };

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    xTurn = true;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.addEventListener('click', handleClick, { once: true });
    });
    popup.style.display = 'none';
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = xTurn ? 'x' : 'o';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
        updateScore(currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    xTurn = !xTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function endGame(draw) {
    if (draw) {
        message.innerText = 'Draw!';
    } else {
        message.innerText = `${xTurn ? "X" : "O"} Wins!`;
    }
    popup.style.display = 'flex';
}

function updateScore(winner) {
    scores[winner.toUpperCase()]++;
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

restartButton.addEventListener('click', startGame);

startGame();
