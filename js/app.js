let game = {
  'boardWidth': 7,
  'boardHeight': 7,
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
  $(event.target).addClass('selected');
  $(event.target).addClass('animated pulse infinite');
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
  validateMatchArray();
  return validateMatch(event.target, $('.goal-square'));
}

$('.squares').on('click', '.square', handlePoke);

/* Write Recursive function that validates the colors in all cardinal directions of the current square, and returns an array of matchable items to the game object in game.currentMatch1 and game.currentMatch2 */


// If I can navigate up one .row and down one .row at the same index, I can compare the squares to validate the match
const validateMatchArray = () => {
  console.log('Validate Match Array Function Start');
  let matchArray = game.matchArray;
  /*  This is how this for loop should start */
  for (let i = 0; i <= matchArray.length; i++) {

    /* DEBUGGING FOR LOOP */
    // for (let i = 0; i < 20; i++) {
    /* Finding Current Index of Poke and Parent row ID */
    console.log(`Match Array index ${i}`)
    // let parent = parseInt($(matchArray).eq(i).parent().attr('id'));
    let parent = parseInt($(matchArray[i]).parent().attr('id'));
    let currentIndex = $(matchArray[i]).index();
    console.log(`row ${parent}`);
    // console.log(typeof parent);
    console.log(`column ${currentIndex}`);
    // let currentSquare = $(matchArray).eq(i);
    let currentSquare = matchArray[i];
    // console.log(typeof currentIndex);
    /* Getting the squares in 4 cardinal directions from the current index */
    /* somewhat working code */
    // let squareAbove = $(`#${parent > 0 ? parent - 1 : parent}`).children().eq(currentIndex);
    // let squareBelow = $(`#${parent <= game.boardHeight ? parent + 1 : parent}`).children().eq(currentIndex);
    let squareAbove = $(`#${parent > 0 ? parent - 1 : false}`).children().eq(currentIndex);
    let squareBelow = $(`#${parent < game.boardHeight ? parent + 1 : false}`).children().eq(currentIndex);
    // let squareLeft = $(`#${parent}`).children().eq(currentIndex > 0 ? currentIndex : false).prev();
    let squareLeft = currentIndex > 0 ? $(`#${parent}`).children().eq(currentIndex).prev() : false;
    let squareRight = currentIndex < game.boardWidth ? $(`#${parent}`).children().eq(currentIndex).next() : false;
    // console.log('currentSquare');
    // console.log(currentSquare);
    // console.log('squareAbove');
    // console.log(squareAbove);
    // console.log('squareBelow');
    // console.log(squareBelow);
    // console.log('squareLeft');
    // console.log(squareLeft);
    // console.log('squareRight');
    // console.log(squareRight);

    /* Getting the background colors from the squares in 4 cardinal directions from the current index  */
    let currentSquareColor = ($(currentSquare).css('background-color'));
    let squareAboveColor = ($(squareAbove).css('background-color'));
    let squareBelowColor = ($(squareBelow).css('background-color'));
    let squareLeftColor = ($(squareLeft).css('background-color'));
    let squareRightColor = ($(squareRight).css('background-color'));
    // console.log(`currentSquareColor = ${currentSquareColor}`);
    // console.log(`squareAboveColor = ${squareAboveColor}`);
    // console.log(`squareBelowColor = ${squareBelowColor}`);
    // console.log(`squareLeftColor = ${squareLeftColor}`);
    // console.log(`squareRightColor = ${squareRightColor}`);

    /* ----- Control Flow for Pushing Square Divs to Game Match Array ----- */
    /* write includes() where it checks the game.matchArray and if the current div is already included, then skip it. 
    Only new divs should appear in array */

    /* -- When defining the variables used below, if the square is on the boarder it should return False */
    $(currentSquare).addClass('match');

    let currentArrayLength = game.matchArray.length;

    if (squareAbove) {
      if (currentSquareColor === squareAboveColor && !game.matchArray.includes(squareAbove) && !$(squareAbove).hasClass("match")) {
        $(squareAbove).addClass('match');
        game.matchArray.push(squareAbove);
      }
    }
    if (squareBelow) {
      if (currentSquareColor === squareBelowColor && !game.matchArray.includes(squareBelow) && !$(squareBelow).hasClass("match")) {
        $(squareBelow).addClass('match');
        game.matchArray.push(squareBelow);
      }
    }
    if (squareLeft) {
      if (currentSquareColor === squareLeftColor && !game.matchArray.includes(squareLeft) && !$(squareLeft).hasClass("match")) {
        $(squareLeft).addClass('match');
        game.matchArray.push(squareLeft);
      }
    }
    if (squareRight) {
      if (currentSquareColor === squareRightColor && !game.matchArray.includes(squareRight) && !$(squareRight).hasClass("match")) {
        $(squareRight).addClass('match');
        game.matchArray.push(squareRight);
      }
    }
    if (i === game.matchArray.length - 1) {
      console.log('end of the loop');
      return game.matchArray;
    }

  }
  console.log(game.matchArray);
  return game.matchArray;
};

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
};

const applyRandomColor = () => {
  /* ---- This is the array of colors I want to use in the game */
  // const colors = ['rgb(100, 149, 237)', 'rgb(143, 188, 143)', 'rgb(64, 224, 208)', 'rgb(238, 130, 238)', 'rgb(255, 215, 0)', 'rgb(255, 99, 71)'];
  /* ---- This is the array of colors I'm using for debugging the game.matchArray Loop ----- */
  const colors = ['rgb(100, 149, 237)', 'rgb(143, 188, 143)', 'rgb(64, 224, 208)'];
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