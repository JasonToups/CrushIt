console.log('got some js!');

let game = {
  'boardWidth': 5,
  'boardHeight': 10,
  'score': 0,
  'goalColor': "",
  'timer': 30,
  'board': [],
  'currentMatch1': [],
  'currentMatch2': [],
}


$('button').on('click', () => {
  console.log('Game Start');
  gameStart();
  setTimer();
});

const handlePoke = (event) => {
  console.log(event.target);
  const color = $(event.target).css('background-color');
  $(event.target).addClass('poked').css('opacity', 0.3);
  compareColors(color, game.goalColor);
}

// Accepts two parameters to compare colors.
const compareColors = (color, validate) => {
  const colorValues = color.substring(4, color.length - 1).split(', ');
  const validateValues = validate.substring(4, validate.length - 1).split(', ');
  if (colorValues[0] === validateValues[0] && colorValues[1] === validateValues[1] && colorValues[2] === validateValues[2]) {
    console.log('got the same color!');
    score++
    // $('h1').text(`Scoreboard: ${score}`)
  } else {
    score--
    // $('h1').text(`Scoreboard: ${score}`)
  }
};

$('.squares').on('click', '.square', handlePoke);

/* Write Recursive function that validates the colors in all cardinal directions of the current square, and returns an array of matchable items to the game object in game.currentMatch1 and game.currentMatch2 */


const applyRandomColor = () => {
  const colors = ['rgb(100, 149, 237)', 'rgb(143, 188, 143)', 'rgb(64, 224, 208)', 'rgb(238, 130, 238)', 'rgb(255, 215, 0)', 'rgb(255, 99, 71)'];
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
  let color = applyRandomColor()
  game.goalColor = color;
  $('.goal-square').css('background-color', color);
}

