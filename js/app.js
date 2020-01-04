console.log('got some js!');

class Square {
  constructor(color, divClass) {
    this.color = this.applyRandomColor();
    this.divClass = '<div class="square"/>';
  }
  applyRandomColor() {
    const colors = ['cornflowerblue', 'cornflowerblue', 'cornflowerblue', 'darkseagreen', 'turquoise', 'violet', 'gold', 'tomato'];
    const index = Math.floor(Math.random() * colors.length)
    return colors[index];
  }
}

class Game {
  constructor() {
    this.score = 0;
    this.matchGoal = "";
    this.board = [];
  }
}

$('button').on('click', () => {
  console.log('Game Start');
  gameStart();
  // setTimer();
});

const generateGameBoardArray = (width, height) => {
  // to generate the gameboard array
  // take the width passed as an argument
  let gameBoardArray = [];
  // loop through the width
  for (let i = 0; i < width; i++) {
    // The width will be the x limit
    // console.log(`width = ${i}`);
    let gameBoardArrayHeight = [];
    for (let j = 0; j < height; j++) {
      // within each x index, there should be a height length array pushed to each x index.
      // console.log(`height = ${j}`);
      gameBoardArrayHeight.push(new Square);
    }
    gameBoardArray.push(gameBoardArrayHeight);
  }
  Game.board = gameBoardArray
  // console.log(gameBoardArray);
  return Game.board;
}

/* ---- UNDER CONSTRUCTION ----- */
const refreshBoardDOM = () => {
  // to put the gameboard on the DOM
  // loop through the gameboard
  const $squares = $('.squares');
  for (let i = 0; i < Game.board.length; i++) {
    const $square = $('<div class="square"/>');
    // // for each index in the gameboard loop through the array
    for (let j = 0; j < Game.board[i].length; j++) {
      const $square = $('<div class="square"/>');
      // // // at each array in the gameboard index, create a div in the div squares class

    }
  }
}

const createSquares = (numberOfSquares) => {
  const $squares = $('.squares');
  for (let i = 1; i <= numberOfSquares; i++) {
    const $square = $('<div class="square"/>');
    $square.css('background-color', applyRandomColor())
    $squares.append($square);
  }
}

const gameStart = () => {
  generateGameBoardArray(5, 4);
}

// console.log(gameBoardArray);
