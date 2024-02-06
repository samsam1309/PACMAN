'use strict'

const WALL = '🟦'
const FOOD = '•'
const EMPTY = ' '
const SUPER_FOOD = "◉"
const CHERRY = "🍒"

// Model
const gGame = {
    score: 0,
    isOn: false,
    foodCount: 55
}
var gBoard
const CHERRY_INTERVAL = setInterval(renderCherry, 10000)

function onInit() {

    closeLoseModal()
    closeWinModal()
    gGame.foodCount = 55;
    updateScore(0)
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true


    // moveGhosts()
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            if (i === 1 && j === 1 ||
                i === 1 && j === size - 2 ||
                i === size - 2 && j === size - 2 ||
                i === size - 2 && j === 1) {
                board[i][j] = SUPER_FOOD
            }
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}



function updateScore(diff) {
    // DONE: update model and dom
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
}

function gameOver() {
    clearInterval(CHERRY_INTERVAL)
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '🪦')
    playGameOverSound()
    openLoseModal()
    gGame.isOn = false
}



function checkVictory() {
    if (checkWin()) {
        playWinSound()
        openWinModal();
        gGame.isOn = false;
    }
}

function checkWin() {
    return !gGame.foodCount
}

function openLoseModal() {
    var modal = document.querySelector(".loseModal")
    modal.style.display = "block"
}

function closeLoseModal() {
    var modal = document.querySelector(".loseModal")
    modal.style.display = "none"

}

function openWinModal() {
    var modal = document.querySelector(".winModal")
    modal.style.display = "block"
}

function closeWinModal() {
    var modal = document.querySelector(".winModal")
    modal.style.display = "none"

}

function renderCherry() {
    console.log("gBoard", gBoard)
    var emptyCell = findEmptyCell(gBoard);
    console.log("emptyCell", emptyCell)
    if (emptyCell) {
        gBoard[emptyCell.i][emptyCell.j] = CHERRY;
        renderBoard(gBoard);
    }
}

function findEmptyCell(board) {
    var emptyCells = [];
    console.log("board", board)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                emptyCells.push({ i, j });
            }
        }
    }

    if (emptyCells.length === 0) {
        return null; // Aucune cellule vide trouvée
    }

    var randomIdx = getRandomIntInclusive(0, emptyCells.length);
    console.log("emptyCells", emptyCells)
    return emptyCells[randomIdx];
}

var backgroundMusic;

function startBackgroundMusic() {
    if (!backgroundMusic) {
        backgroundMusic = new Audio('arcade.mp3');
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.4; 
    }

    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
}

function playGameOverSound() {
    var gameOverSound = new Audio('gameover.mp3')
    gameOverSound.volume = 1;
    gameOverSound.play()
}

function playWinSound() {
    var winSound = new Audio('win.mp3')
    winSound.volume = 1;
    winSound.play()
}