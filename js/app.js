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
  console.log(Game.board);
  // setTimer();
});

const generateGameBoardArray = (width, height) => {
  // to generate the gameboard array
  // take the width passed as an argument
  let gameBoardArray = [];
  // loop through the width
  for (let i = 0; i < width; i++) {
    // The height will be the y limit
    // console.log(`width = ${i}`);
    let gameBoardArrayHeight = [];
    for (let j = 0; j < height; j++) {
      // within each y index, there should be a width length array pushed to each x index.
      // console.log(`height = ${j}`);
      gameBoardArrayHeight.push(new Square);
    }
    gameBoardArray.push(gameBoardArrayHeight);
  }
  Game.board = gameBoardArray
  // console.log(gameBoardArray);
  return Game.board;
}

const applyRandomColor = () => {
  const colors = ['cornflowerblue', 'cornflowerblue', 'cornflowerblue', 'darkseagreen', 'turquoise', 'violet', 'gold', 'tomato'];
  const index = Math.floor(Math.random() * colors.length)
  return colors[index];
}
/* -- Somewhat working code --- */
/* -- The rows are identical, random colors not working --- */
const refreshBoardDOM = () => {
  // to put the gameboard on the DOM
  // loop through the gameboard
  const $squares = $('.squares');
  const $row = $('<div class="row"/>');
  const $square = $('<div class="square"/>');
  for (let i = 0; i < Game.board.length; i++) {
    console.log('row dom loop working')
    // // for each index in the gameboard loop through the array
    $square.css('background-color', applyRandomColor());
    $row.append($square.clone());
    // $row.append($square);
  }

  for (let j = 0; j < Game.board[0].length; j++) {
    console.log('column dom loop working')
    $squares.append($row.clone());
    // $squares.append($row);
    // // // at each array in the gameboard index, create a div in the div squares class
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


const updateSquareColors = () => {
  $('.square').each(function () {
    $(this).css('background-color', applyRandomColor());
  })
}

const gameStart = () => {
  generateGameBoardArray(5, 10);
  refreshBoardDOM();
  updateSquareColors();
}

