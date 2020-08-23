
// defining class names
const classNames = {
    cell: 'cell',
    cellContent: 'cell-content', 
    populated: 'populated',
    winner: 'winner'
};

// defining users
const user = {
    x: 'X',
    o: 'O'
};

const winnerType = {
    tie: 'tie'
};

// winning matrix
const winningMatrix = {
    0: [[1,2],[3,6],[4,8]],
    1: [[0,2],[4,7]],
    2: [[0,1],[5,8],[4,6]],
    3: [[0,6],[4,5]],
    4: [[3,5],[1,7],[0,8]],
    5: [[3,4],[2,8]],
    6: [[7,8],[0,3],[2,4]],
    7: [[6,8],[1,4]],
    8: [[6,7],[2,5],[0,4]]
};

// making empy cell values
let cellValues = ['','','','','','','','',''];
// making X as first player
let isXNext = true;
// making winning user
let winningUser;
// making number of turns
let numberOfTurnsLeft = 9;
// tracking the winner combination
let winningCombination = [];

// selecting all cells in the document
const cells = document.querySelectorAll(`.${classNames.cell}`);
// selecting modal overlay
const modalOverlay = document.querySelector('#modal-overlay');
// selecting winner container
const winnerDetails = document.querySelector("#winner-container > span");

// selecting a start new game button
const newGameButton = document.querySelector("#new-game-button");

// calculating the winner
const calculateWinner = (chosenIndex) => {
    const winningRanges = winningMatrix[chosenIndex];

    for (let i = 0; i < winningRanges.length; i++) {
        const currentEntry = cellValues[chosenIndex];
        const firstOption = cellValues[winningRanges[i][0]];
        const secondOption = cellValues[winningRanges[i][1]];
        const thirdOption = cellValues[winningRanges[i][2]];

        if (currentEntry === firstOption && firstOption === secondOption) {
            winningUser = currentEntry;
            winningCombination = [chosenIndex, winningRanges[i][0], winningRanges[i][1]]
            return true;
            
        }
    }

    if (numberOfTurnsLeft === 0) {
        winningUser = winnerType.tie;
        winningCombination = []
        return true;
    }

    return false;

};

// showing overlay when game is finished and displaying correct winner
const showModal = () => {

    if (winningUser === winnerType.tie) {
        winnerDetails.innerHTML = `It is a tie.`;
        modalOverlay.style.display = 'flex'; 
    } else {
        winnerDetails.innerHTML = `Winner is ${winningUser}`;
    }
    modalOverlay.style.display = 'flex';

};

const highlightWinningCells = () => {
    cells[winningCombination[0]].classList.add(classNames.winner);
    cells[winningCombination[1]].classList.add(classNames.winner);
    cells[winningCombination[2]].classList.add(classNames.winner);

};

// defining actions when new game button is pressed
const startGame = () => {
    // clearing all fields and resetting all constants
    cellValues = ['','','','','','','','',''];
    isXNext = true;
    winningUser;
    numberOfTurnsLeft = 9;
    winningCombination = [];
    // emptying fields and removing all classes
    cells.forEach((c, i) =>{
        const cellContent = c.querySelector(`.${classNames.cellContent}`);
        cellContent.innerHTML = cellValues[i];
        cellContent.classList.remove(classNames.populated);
        c.classList.remove(classNames.winner);
    });

    modalOverlay.style.display = 'none';
};


newGameButton.addEventListener('click', () =>{
    startGame();
})

// looping through all selected cells
cells.forEach((c, i ) => {
    c.addEventListener('click', () => {

        // if the cellvalue is not existing (not clicked)
        if (!cellValues[i]) {
            // first click checks if isXNext is true then makes it user.x
            // if isXNext isn't true, then makes it user.o
            cellValues[i] = isXNext ? user.x : user.o;
            isXNext = !isXNext;
            numberOfTurnsLeft--;
            


            if(calculateWinner(i)) {
                if (winningUser !== winnerType.tie) {
                    highlightWinningCells();
                }
                showModal();
            };

            // defining cellcontent and giving to its innerHTML value of clicked cellValue[i]
            const cellContent = c.querySelector(`.${classNames.cellContent}`);
            cellContent.innerHTML = cellValues[i];

            // after clicking, cellcontents gets class populated
            cellContent.classList.add(classNames.populated)

        }


    });

});