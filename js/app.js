console.log('got some js!');

let game = {
  'boardWidth': 7,
  'boardHeight': 10,
  'score': 0,
  'goalColor': "",
  'timer': 30,
  'board': [],
  'matchArray': [],
  'currentMatch2': [],
}


$('button').on('click', () => {
  console.log('Game Start');
  gameStart();
  setTimer();
});

/* -------- Handles Touch Event -------- */
const handlePoke = (event) => {
  console.log(event.target);
  // $(event.target).addClass('poked');
  $(event.target).addClass('animated heartBeat');
  /* Finding Current Index of Poke and Parent row ID */
  // let parent = parseInt($(event.target).parent().attr('id'));
  // console.log(parent);
  // console.log(typeof parent);
  // let currentIndex = $(event.target).index();
  // console.log(currentIndex);
  // console.log(typeof currentIndex);

  /* Sending event target to game object */
  game.matchArray.push(event.target);
  console.log(validateMatch(event.target, $('.goal-square')));
  return validateMatch(event.target, $('.goal-square'));
}

$('.squares').on('click', '.square', handlePoke);

/* Write Recursive function that validates the colors in all cardinal directions of the current square, and returns an array of matchable items to the game object in game.currentMatch1 and game.currentMatch2 */


// If I can navigate up one .row and down one .row at the same index, I can compare the squares to validate the match
const validateMatchArray = (matchArray) => {
  for (let i = 0; i < matchArray.length; i++) {
    /* Finding Current Index of Poke and Parent row ID */
    let parent = parseInt($(matchArray).eq(i).parent().attr('id'));
    console.log(`row ${parent}`);
    // console.log(typeof parent);
    let currentIndex = $(matchArray).eq(i).index();
    console.log(`column ${currentIndex}`);
    let currentSquare = $(matchArray).eq(i);
    console.log(`column ${currentIndex}`);
    // console.log(typeof currentIndex);
    /* Getting the squares in 4 cardinal directions from the current index */
    let parentBelow = $(`#${parent + 1}`).children().eq(currentIndex);
    let parentAbove = $(`#${parent - 1}`).children().eq(currentIndex);
    let indexLeft = $(`#${parent}`).children().eq(currentIndex).prev();
    let indexRight = $(`#${parent}`).children().eq(currentIndex).next();
    console.log('currentSquare');
    console.log(currentSquare);
    console.log('parentBelow');
    console.log(parentBelow);
    console.log('parentAbove');
    console.log(parentAbove);
    console.log('indexLeft');
    console.log(indexLeft);
    console.log('indexRight');
    console.log(indexRight);

    let currentSquareColor = ($(currentSquare).css('background-color'));
    let parentBelowColor = ($(parentBelow).css('background-color'));
    let parentAboveColor = ($(parentAbove).css('background-color'));
    let indexLeftColor = ($(indexLeft).css('background-color'));
    let indexRightColor = ($(indexRight).css('background-color'));
    console.log(`currentSquareColor = ${currentSquareColor}`);
    console.log(`parentBelowColor = ${parentBelowColor}`);
    console.log(`parentAboveColor = ${parentAboveColor}`);
    console.log(`indexLeftColor = ${indexLeftColor}`);
    console.log(`indexRightColor = ${indexRightColor}`);
  }
}

/* ----- Validates Match Between Two Squares ----- */
const validateMatch = (square1, square2) => {
  console.log('validate match function');
  const current = $(square1).css('background-color');
  const validate = $(square2).css('background-color');
  console.log(current);
  console.log(validate);
  if (current === validate) {
    game.score++;
    $('#scoreNumber').text(`${game.score}`);
    return true;
  } else {
    return false;
  }
}

const applyRandomColor = () => {
  const colors = ['rgb(100, 149, 237)', 'rgb(143, 188, 143)', 'rgb(64, 224, 208)', 'rgb(238, 130, 238)', 'rgb(255, 215, 0)', 'rgb(255, 99, 71)'];
  const index = Math.floor(Math.random() * colors.length)
  return colors[index];
}
/* ------- Creating the Game Board ------- */
const generateGameBoard = () => {
  const $squares = $('.squares');
  for (let i = 0; i < game.boardHeight; i++) {
    const $row = $(`<div class="row" id=${i}/>`);
    // console.log('appending a row');
    for (let j = 0; j < game.boardWidth; j++) {
      // console.log('appending a square');
      const $square = $('<div class="square"/>');
      $square.css('background-color', applyRandomColor());
      $row.append($square);
    }
    $squares.append($row);
  }
}

/* This randomizes all .square colors */
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
  // updateSquareColors();
  let color = applyRandomColor()
  game.goalColor = color;
  $('.goal-square').css('background-color', color);
}