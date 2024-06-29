

    //==========> ... global variables ... <==========//


let startGame = false;
let turnCounts;
let enableCellClick;


    //==========> ... controls section ... <==========//


const controlsContainer = document.getElementById("controls");
const ctrlBtn1 = document.getElementById("ctrlBtn1");
const ctrlBtn2 = document.getElementById("ctrlBtn2");
const ctrlBtn3 = document.getElementById("ctrlBtn3");
const ctrlBtn4 = document.getElementById("ctrlBtn4");
const ctrlText = document.getElementById("ctrlText");
const lowerSection = document.getElementById("lowerSection");
const resultTable = document.getElementById("resultTable");
const backBtn = document.getElementById("backBtn"); 

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

const winPosibilites = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

ctrlBtn1.onclick = () => {
    controlsContainer.removeChild(ctrlBtn1);
    controlsContainer.removeChild(ctrlBtn2);
    controlsContainer.appendChild(ctrlText);
    lowerSection.appendChild(resultTable);
    lowerSection.appendChild(backBtn);
    document.getElementById("player-1").textContent = "player 1";
    document.getElementById("player-2").textContent = "player 2";
    startGame = true;
    emptyCells();
    gameMode1();
}

ctrlBtn2.onclick = () => {
    controlsContainer.removeChild(ctrlBtn1);
    controlsContainer.removeChild(ctrlBtn2);
    controlsContainer.appendChild(ctrlBtn3);
    controlsContainer.appendChild(ctrlBtn4);
}

ctrlBtn3.onclick = () => {
    controlsContainer.removeChild(ctrlBtn3);
    controlsContainer.removeChild(ctrlBtn4);
    controlsContainer.appendChild(ctrlText);
    lowerSection.appendChild(resultTable);
    lowerSection.appendChild(backBtn);
    startGame = true;
    emptyCells();
    gameMode2("easy");
    document.getElementById("player-1").textContent = "you";
    document.getElementById("player-2").textContent = "computer";
}

ctrlBtn4.onclick = () => {
    controlsContainer.removeChild(ctrlBtn3);
    controlsContainer.removeChild(ctrlBtn4);
    controlsContainer.appendChild(ctrlText);
    lowerSection.appendChild(resultTable);
    lowerSection.appendChild(backBtn);
    startGame = true;
    emptyCells();
    gameMode2("hard");
    document.getElementById("player-1").textContent = "you";
    document.getElementById("player-2").textContent = "computer";
}

window.onload = () => {
    controlsContainer.removeChild(ctrlBtn3);
    controlsContainer.removeChild(ctrlBtn4);
    controlsContainer.removeChild(ctrlText);
    lowerSection.removeChild(resultTable);
    lowerSection.removeChild(backBtn);
    randomizeCells();
}


    //==========> ... cells functions ... <==========//


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

function colorCells(color, ...cells) {
    for(let cell of cells) {
        cell.style.backgroundColor = color;
    }
}


    //==========> ... player class ... <==========//


class Player {
    score = 0;
    static ties = 0;
    constructor(name, symbol, number) {
        this.name = name;
        this.symbol = symbol;
        this.number = number;
    }
    wins(playerToStartFrom) {
        ctrlText.textContent = `${this.name} wins!`;
        document.getElementById(`score_${this.number}`).textContent = `${++this.score}`;
        // reset every thing after 2 sec.
        setTimeout(() => {  
            emptyCells();
            colorCells("", ...cells);
            ctrlText.textContent = `${playerToStartFrom.name} (${playerToStartFrom.symbol})....`;
            enableCellClick = true;
            turnCounts = 0;
        }, 2000);
    }
    tie(playerToStartFrom) {
        ctrlText.textContent = "A tie!";
        colorCells("var(--secondary-color)", ...cells);
        document.getElementById("numOfTies").textContent = `${++Player.ties}`;
         // reset every thing after 2 sec.
         setTimeout(() => {  
            emptyCells();
            colorCells("", ...cells);
            ctrlText.textContent = `${playerToStartFrom.name} (${playerToStartFrom.symbol})....`;
            enableCellClick = true;
            turnCounts = 0;
        }, 2000);
    }
}
    

    //==========> ... game logic ... <==========//


function gameMode1() {
    // objects and variables setup.
    const player1 = new Player("player 1", "X", 1);
    const player2 = new Player("player 2", "O", 2);
    let currentPlayer = player1;
    turnCounts = 0;
    enableCellClick = true;
    ctrlText.textContent = `${currentPlayer.name} (${currentPlayer.symbol})....`;
    // irretate over the cells and check for click actions. 
    cells.forEach((cell) => {
        cell.onclick = () => {
            if (cell.textContent === "" && enableCellClick) {  // checks if the cell is empty.
                enableCellClick = false;
                cell.textContent = currentPlayer.symbol;
                turnCounts++;
                if(checkWin()) {  // check for a win.
                    currentPlayer.wins(player1);
                    currentPlayer = player1;
                }
                else if (turnCounts === 9) {  // check for a tie.
                    currentPlayer.tie(player1);
                    currentPlayer = player1;
                }
                else {  // if no win nor tie, change the current player to the other one.
                    currentPlayer.number === 1? currentPlayer = player2: currentPlayer = player1;
                    ctrlText.textContent = `${currentPlayer.name} (${currentPlayer.symbol})....`;
                    enableCellClick = true;
                }
            }
        }
    });
}

function gameMode2(difficulty) {
    // objects and variables setup.
    const player = new Player("you", "X", 1);
    const computer = new Player("computer", "O", 2);
    turnCounts = 0;
    enableCellClick = true;
    ctrlText.textContent = `${player.name} (${player.symbol})....`;
    // irretate over the cells and check for click actions. 
    cells.forEach((cell) => {
        cell.onclick = () => {
            if (cell.textContent === "" && enableCellClick) {  // checks if the cell is empty.
                // player turn
                enableCellClick = false;
                cell.textContent = player.symbol;
                turnCounts++;
                if(checkWin()) player.wins(player);  // check if the player wins.
                else if (turnCounts === 9) player.tie(player);  // check for a tie.
                // computer turn
                else {  
                    ctrlText.textContent = `${computer.name} (${computer.symbol})....`;
                    setTimeout(() => {
                        difficulty === "hard"? hard(): easy();
                        turnCounts++;
                        if(checkWin()) computer.wins(player);   // check if the computer wins.
                        else if (turnCounts === 9) computer.tie(player);    // check for a tie.
                        else { // return to player 
                            enableCellClick = true;
                            ctrlText.textContent = `${player.name} (${player.symbol})....`;
                        }   
                    }, 1000);
                }
            }
        }
    });
}

function checkWin() {
    for(let i = 0; i < 8; i++) {
        if(cells[winPosibilites[i][0]].textContent !== ""
            && cells[winPosibilites[i][0]].textContent === cells[winPosibilites[i][1]].textContent
            && cells[winPosibilites[i][1]].textContent === cells[winPosibilites[i][2]].textContent
        ){
            colorCells("var(--main-color)", cells[winPosibilites[i][0]], cells[winPosibilites[i][1]], cells[winPosibilites[i][2]]);
            return true;
        }
    }
    return false;
}

function easy() {
    let array = cells.filter((cell) => cell.textContent === "");
    const randomIndex = Math.floor(Math.random()*array.length);
    array[randomIndex].textContent = "O";
}

function hard() {
    let order1 = [];    //>  |O|O| |
    let order2 = [];    //>  |X|X| |
    let order3 = [];    //>  |O| | |
    let order4 = [];    //>  |X| | |
    let order5 = [];    //>  | | | |
    let order6 = [];    //>  |X|O| |

    if(turnCounts === 1) {    // at the first round, if the player filled one of the corners, fill the middle cell to minimize the players chance of winning.
        if(cells[0].textContent === "X" || cells[2].textContent === "X" || cells[6].textContent === "X" || cells[8].textContent === "X") {
            cells[4].textContent = "O";
            return;
        }
    }

    for(let i = 0; i < 8; i++) {
        let cell1 = cells[winPosibilites[i][0]].textContent;
        let cell2 = cells[winPosibilites[i][1]].textContent;
        let cell3 = cells[winPosibilites[i][2]].textContent;
        let sum = cell1 + cell2 + cell3;
        
        if (sum.length === 3) continue;    // if the line is full, skip it.

        // check for empty cells and add them to the array.
        let emptyCells = [];     
        if (cell1 === "") emptyCells.push(winPosibilites[i][0]);
        if (cell2 === "") emptyCells.push(winPosibilites[i][1]);
        if (cell3 === "") emptyCells.push(winPosibilites[i][2]);
        
        // determine the order of the line
        if (sum.length === 0) order5.push(...emptyCells);   // if the line is empty, add the indices to order 5.
        else if (sum.length === 1) {  // if the line has only one symbol.
            if (sum === "O") order3.push(...emptyCells);   // if the symbol is "O", add the index to order 3.
            else order4.push(...emptyCells);   // if the symbol is "X", add the index to order 4.
        }
        else if (sum.length === 2) {    // if the line has two symbols.
            if (sum === "OO") order1.push(...emptyCells);   // if the line has "OO", add the index to order 1.
            else if (sum === "XX") order2.push(...emptyCells);    // if the line has "XX", add the index to order 2.
            else order6.push(...emptyCells);    // if the line has "OX", add the index to order 6.
        }
    }

    let ol1 = order1.length;
    let ol2 = order2.length;
    let ol3 = order3.length;
    let ol4 = order4.length;
    let ol5 = order4.length; 
    let ol6 = order4.length; 

    if (ol1 !== 0) cells[order1[Math.floor(Math.random()*ol1)]].textContent = "O";    // if order 1 isn't empty.
    else if (ol2 !== 0) cells[order2[Math.floor(Math.random()*ol2)]].textContent = "O";    // if order 2 isn't empty.
    else if (ol3 !== 0) cells[order3[Math.floor(Math.random()*ol3)]].textContent = "O";    // if order 3 isn't empty.
    else if (ol4 !== 0) cells[order4[Math.floor(Math.random()*ol4)]].textContent = "O";    // if order 4 isn't empty.
    else if (ol5 !== 0) cells[order5[Math.floor(Math.random()*ol5)]].textContent = "O";    // if order 5 isn't empty.
    else cells[order6[Math.floor(Math.random()*ol6)]].textContent = "O";  
}


    //==========> ... back button logic ... <==========//


    backBtn.onclick = () => {
        controlsContainer.appendChild(ctrlBtn1);
        controlsContainer.appendChild(ctrlBtn2);
        controlsContainer.removeChild(ctrlText);
        document.getElementById("score_1").textContent = "0";
        document.getElementById("score_2").textContent = "0";
        document.getElementById("numOfTies").textContent = "0";
        lowerSection.removeChild(resultTable);
        lowerSection.removeChild(backBtn);
        cells.forEach((cell) => cell.onclick = null);
        startGame = false;
        turnCounts = 0;
        Player.ties = 0;
        emptyCells();
        randomizeCells();
    }


    //==========> ... theme switching logic ... <==========//

    
let isDarkTheme = false;
const switchThemeBtn = document.getElementById("switchThemeBtn");

switchThemeBtn.onclick = () => {
    if (!isDarkTheme) {
        document.documentElement.style.setProperty("--body-background-color", "black");
        document.documentElement.style.setProperty("--body-content-color", "white");
        document.documentElement.style.setProperty("--main-color", "rgb(65, 192, 39)");
        document.documentElement.style.setProperty("--secondary-color", "rgb(193, 16, 16)");
        switchThemeBtn.textContent = "Light Theme";
        isDarkTheme = true;
    }
    else {
        document.documentElement.style.setProperty("--body-background-color", "white");
        document.documentElement.style.setProperty("--body-content-color", "black");
        document.documentElement.style.setProperty("--main-color", "rgb(46, 240, 8)");
        document.documentElement.style.setProperty("--secondary-color", "rgb(255, 81, 81)");
        switchThemeBtn.textContent = "Dark Theme";
        isDarkTheme = false;
    }
}



