let startGame = false;
let mode;
let symbol = "";
let gameTurn;
let turnCounts;
let score_1 = 0;
let score_2 = 0;
let ties = 0;
let enableCellClick = true;


//> ... controls section ... <//


const controlsContainer = document.getElementById("controls");
const ctrlBtn1 = document.getElementById("ctrlBtn1");
const ctrlBtn2 = document.getElementById("ctrlBtn2");
const ctrlBtn3 = document.getElementById("ctrlBtn3");
const ctrlBtn4 = document.getElementById("ctrlBtn4");
const ctrlText = document.getElementById("ctrlText");

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

const resultTable = document.getElementById("resultTable");
const numOfTies = document.getElementById("numOfTies");

ctrlBtn1.onclick = () => {
    controlsContainer.removeChild(ctrlBtn1);
    controlsContainer.removeChild(ctrlBtn2);
    ctrlText.textContent = "player 1 (X), player 2 (O)";
    startGame = true;
    emptyCells();
    gameMode1();
    resultTable.removeAttribute("hidden");
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
    gameMode2("easy");
    resultTable.removeAttribute("hidden");
    document.getElementById("player-1").textContent = "you";
    document.getElementById("player-2").textContent = "computer";
}

ctrlBtn4.onclick = () => {
    controlsContainer.removeChild(ctrlBtn3);
    controlsContainer.removeChild(ctrlBtn4);
    startGame = true;
    emptyCells();
    gameMode2("hard");
    resultTable.removeAttribute("hidden");
    document.getElementById("player-1").textContent = "you";
    document.getElementById("player-2").textContent = "computer";
}

//> ... cells section ... <//

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
        return;
    }
}
randomizeCells();




// ... game modes ... //

function gameMode1() {
    mode = 1;
    turnCounts = 0;
    gameTurn = 1;
    ctrlText.textContent = "Player 1 turn (X)....";
    symbol = "X";
    // check if any cell is clicked
    for (let cell of cells) {
        cell.onclick = () => {
            // checks if the cell is empty to apply actions
            if (cell.textContent === "" && enableCellClick) {
                // if player 1:
                if (gameTurn === 1) {
                    cell.textContent = symbol;
                    turnCounts++;
                    if(checkWin()) playerWins("player 1");
                    else if (turnCounts === 9) tie(); // checks for a tie
                    else { // change values to player 2
                        ctrlText.textContent = "Player 2 turn (O)....";
                        symbol = "O";
                        gameTurn = 2;
                    }
                }
                // if player 2:
                else {
                    cell.textContent = symbol;
                    turnCounts++;
                    if(checkWin()) playerWins("player 2");
                    else if (turnCounts === 9) tie(); // checks for a tie
                    else {  // change values to player 2
                        ctrlText.textContent = "Player 1 turn (X)....";
                        symbol = "X";
                        gameTurn = 1;
                    }
                }
            }
        }
    }
}

function gameMode2(difficulty) {
    mode = 2;
    turnCounts = 0;
    gameTurn = 1;
    symbol = "X";
    ctrlText.textContent = "Your turn (X)....";
    // check if any cell is clicked
    for (let cell of cells) {
        cell.onclick = () => {
            // checks if the cell is empty to apply actions
            if (cell.textContent === "" && enableCellClick) {
                // player turn
                cell.textContent = symbol;
                turnCounts++;
                if(checkWin()) playerWins("you");
                else if (turnCounts === 9) tie(); // checks for a tie
                else { // computer turn
                    enableCellClick = false;
                    ctrlText.textContent = "computer turn (O)....";
                    symbol = "O";
                    gameTurn = 2;
                    setTimeout(() => {
                        easy(cells, difficulty);
                        turnCounts++;
                        if(checkWin()) playerWins("computer");
                        else if (turnCounts === 9) tie();
                        else {
                            ctrlText.textContent = "your turn (X)....";
                        }
                        enableCellClick = true;
                        gameTurn = 1;
                        symbol = "X";
                    }, 1000);
                }
            }
        }
    }
}

function gameMode3() {
    mode = 3;
}

function checkWin() {
    if (checkWinLine(0,1,2)) return true;
    else if (checkWinLine(3,4,5)) return true;
    else if (checkWinLine(6,7,8)) return true;
    else if (checkWinLine(0,3,6)) return true;
    else if (checkWinLine(1,4,7)) return true;
    else if (checkWinLine(2,5,8)) return true;
    else if (checkWinLine(0,4,8)) return true;
    else if (checkWinLine(2,4,6)) return true;
    return false;
}

function checkWinLine(index_1, index_2, index_3) {
    if(cells[index_1].textContent !== "" && cells[index_1].textContent === cells[index_2].textContent && cells[index_2].textContent === cells[index_3].textContent) {
        incrementScore(cells[index_1].textContent);
        colorCells("rgb(46, 240, 8)", cells[index_1], cells[index_2], cells[index_3]);
        setTimeout(() => {
            emptyCells();
            colorCells("", cells[index_1], cells[index_2], cells[index_3]);
            enableCellClick = true;
            ctrlText.textContent = `${mode === 1? `player 1`: `your`} turn (X)....`;
            symbol = "X";
            gameTurn = 1;
        }
        , 2000);
        return true;
    }
    return false;
}

function playerWins(winner) {
    symbol = "";
    enableCellClick = false;
    ctrlText.textContent = `${winner} wins!`;
    turnCounts = 0;
}

function tie() {
    enableCellClick = false;
    ctrlText.textContent = "A tie!";
    colorCells("rgb(255, 81, 81)", ...cells);
    document.getElementById("numOfTies").textContent = `${++ties}`;
    turnCounts = 0;
    setTimeout(() => {
        enableCellClick = true;
        emptyCells();
        colorCells("", ...cells);
        ctrlText.textContent = `${mode === 1? `player 1`: `your`} turn (X)....`;
        symbol = "X";
        gameTurn = 1;
    }, 2000);
}

function incrementScore(symbol) {
    if (symbol === "X") {
        score_1++;
        document.getElementById("score_1").textContent = `${score_1}`;
    }
    else if (symbol === "O") {
        score_2++;
        document.getElementById("score_2").textContent = `${score_2}`;
    }
}

function colorCells(color, ...cells) {
    for(let cell of cells) {
        cell.style.backgroundColor = color;
    }
}

function easy(cells, difficulty) {
    let array = cells.filter((cell) => cell.textContent === "");
    const randomIndex = Math.floor(Math.random()*array.length);
    array[randomIndex].textContent = "O";
}

function hard(cells) {
    let array = cells.filter((cell) => cell.textContent === "");
    const randomIndex = Math.floor(Math.random()*array.length);
    array[randomIndex].textContent = "O";
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
