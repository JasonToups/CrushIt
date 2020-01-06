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

let game = {
  'boardWidth': 7,
  'boardHeight': 10,
  'score': 0,
  'matchGoal': "",
  'timer': 30,
  'board': [],
}

$('button').on('click', () => {
  console.log('Game Start');
  gameStart();
  setTimer();
});

const applyRandomColor = () => {
  const colors = ['cornflowerblue', 'cornflowerblue', 'cornflowerblue', 'darkseagreen', 'turquoise', 'violet', 'gold', 'tomato'];
  const index = Math.floor(Math.random() * colors.length)
  return colors[index];
}

/* This creates the Divs for the gameboard */
const generateGameBoard = () => {
  // to put the gameboard on the DOM
  // loop through the gameboard
  const $squares = $('.squares');
  const $row = $('<div class="row"/>');
  const $square = $('<div class="square"/>');
  for (let i = 0; i < game.boardWidth; i++) {
    // console.log('row dom loop working')
    // // for each index in the gameboard loop through the array
    $square.css('background-color', applyRandomColor());
    $row.append($square.clone());
    // $row.append($square);
  }

  for (let j = 0; j < game.boardHeight; j++) {
    // console.log('column dom loop working')
    $squares.append($row.clone());
    // $squares.append($row);
    // // // at each array in the gameboard index, create a div in the div squares class
  }
}

/* This randomizes the .square colors */
const updateSquareColors = () => {
  $('.square').each(function () {
    $(this).css('background-color', applyRandomColor());
  })
}

/* BUG - This is not stopping the timer once it reaches 0 */
const setTimer = () => {
  // function to run, time interval
  const timer = setInterval(() => {
    // console.log(game.timer);
    if (game.timer <= 0) {
      // used to stop SetInterval
      clearInterval(game.timer);
      if (game.timer > 0) setTimer();
    }
    updateTime();
    game.timer--;
  }, 1000);
}

const updateTime = () => {
  $('#timerNumber').text(`${game.timer}`);
}

const gameStart = () => {
  generateGameBoard();
  updateSquareColors();
  let goalColor = applyRandomColor()
  game.matchGoal = goalColor;
  $('.goal-square').css('background-color', goalColor);
}

