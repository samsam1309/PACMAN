'use strict'

const PACMAN = '🟡'
var gPacman
var gSavedGhost = []

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver


    if (nextCell === FOOD) {
        gGame.foodCount--
        console.log(gGame.foodCount, ' gGame.foodCount');
        updateScore(1);
        checkVictory()
    }
    if (gPacman.isSuper && nextCell === SUPER_FOOD) {
        return
    }
    if (nextCell === SUPER_FOOD) {
        activateSuperPower()
    }

    if (gPacman.isSuper && nextCell === GHOST) {
        saveGhost(nextLocation)
    }

    if (!gPacman.isSuper && nextCell === GHOST) {
        gameOver()
        return
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }





    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}


function activateSuperPower() {
    gPacman.isSuper = true;
    console.log("gPacman.isSuper", gPacman.isSuper);

    

    setTimeout(() => {
        gPacman.isSuper = false;
        console.log("saveGhost", gSavedGhost)
        for (var i = 0; i < gSavedGhost.length; i++) {
            gGhosts.push(gSavedGhost[i])
        }
        console.log("gGhosts", gGhosts)
        gSavedGhost = []

        console.log("gPacman.isSuper après 5 secondes", gPacman.isSuper);
    }, 5000);
}


function saveGhost(location) {

    console.log("location", location)
    for (var i = 0; i < gGhosts.length; i++) {
        if (location.i === gGhosts[i].location.i &&
            location.j === gGhosts[i].location.j) {
            var killedGhost = gGhosts.splice(i, 1)
            gSavedGhost.push(killedGhost[0])
        }

    }
    console.log("saveGhost", gSavedGhost)
}