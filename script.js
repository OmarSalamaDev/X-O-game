let startGame = false;
let symbol = "";



//> ... controls section ... <//

const controlsContainer = document.getElementById("controls");
const ctrlBtn1 = document.getElementById("ctrlBtn1");
const ctrlBtn2 = document.getElementById("ctrlBtn2");
const ctrlBtn3 = document.getElementById("ctrlBtn3");
const ctrlBtn4 = document.getElementById("ctrlBtn4");
const ctrlText = document.getElementById("ctrlText");

ctrlBtn1.onclick = () => {
    controlsContainer.removeChild(ctrlBtn1);
    controlsContainer.removeChild(ctrlBtn2);
    ctrlText.textContent = "player 1 (X), player 2 (O)";
    startGame = true;
    emptyCells();
    gameMode1();
}

ctrlBtn2.onclick = () => {
    controlsContainer.removeChild(ctrlBtn1);
    controlsContainer.removeChild(ctrlBtn2);
    ctrlBtn3.removeAttribute("hidden");
    ctrlBtn4.removeAttribute("hidden");
}

ctrlBtn3.onclick = () => {
    controlsContainer.removeChild(ctrlBtn3);
    controlsContainer.removeChild(ctrlBtn4);
    startGame = true;
    emptyCells();
    gameMode2();
}

ctrlBtn4.onclick = () => {
    controlsContainer.removeChild(ctrlBtn3);
    controlsContainer.removeChild(ctrlBtn4);
    startGame = true;
    emptyCells();
    gameMode3();
}

//> ... cells section ... <//

const cells = [
    document.getElementById("cell1"),
    document.getElementById("cell2"),
    document.getElementById("cell3"),
    document.getElementById("cell4"),
    document.getElementById("cell5"),
    document.getElementById("cell6"),
    document.getElementById("cell7"),
    document.getElementById("cell8"),
    document.getElementById("cell9")
];

for (let cell of cells) {
    cell.onclick = () => {
        if (cell.textContent === "") {
            cell.textContent = symbol;
        }
    }
}

function emptyCells() {
    for (let cell of cells) {
        cell.textContent = "";
    }
}

function randomizeCells() {
    for (let cell of cells) {
        const random = Math.floor(Math.random()*2);
        cell.textContent = (random === 1)? "X" : "O";
    }
    if (!startGame) {
        setTimeout(randomizeCells, 500);
    }
    else {
        emptyCells();
    }
}
randomizeCells();


// sdfgdfgfdgh/ldsg;vdf//

function gameMode1() {
    let gameTurn = 1;
    ctrlText.textContent = "Player 1 turn (X)....";
    symbol = "X";
}

function gameMode2() {
    let gameTurn = 1;
    ctrlText.textContent = "Your turn (x)....";
}

function gameMode3() {
    let gameTurn = 1;
    ctrlText.textContent = "Your turn (x)....";
}














//> ... theme switching logic ... <//
let isDarkTheme = false;
let switchThemeBtn = document.getElementById("switchThemeBtn");

function switchTheme() {
    if (!isDarkTheme) {
        document.body.style.backgroundColor = "black";
        isDarkTheme = true;
        document.body.style.filter = "invert(99%)";
    }
    else {
        document.body.style.backgroundColor = "white";
        document.body.style.filter = "invert(0)";
        isDarkTheme = false;
    }
}
