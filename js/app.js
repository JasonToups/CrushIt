let game = {
  'boardWidth': 7,
  'boardHeight': 10,
  'score': 0,
  'goalColor': "",
  'colors': ['rgb(100, 149, 237)', 'rgb(143, 188, 143)', 'rgb(64, 224, 208)', 'rgb(238, 130, 238)', 'rgb(255, 215, 0)', 'rgb(255, 99, 71)'],
  'numOfColors': 5,
  'timer': 30,
  'board': [],
  'matchArray': [],
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

  /* Sending event target to game object */
  game.matchArray.push(event.target);
  console.log(validateMatch(event.target, $('.goal-square')));
  validateMatchArray();
  return validateMatch(event.target, $('.goal-square'));
};

$('.squares').on('click', '.square', handlePoke);

/* Write Recursive function that validates the colors in all cardinal directions of the current square, and returns an array of matchable items to the game object in game.currentMatch1 and game.currentMatch2 */


//This function should accept 2 parameters, so i can pass in game.matchArray1, game.matchArray2, and pass in the class name i plan on appending to the div to control the recursive function, .match1, .match2
const validateMatchArray = () => {
  console.log('Validate Match Array Function Start');
  let matchArray = game.matchArray;

  for (let i = 0; i <= matchArray.length; i++) {
    console.log(`Match Array index ${i}`);
    let parent = parseInt($(matchArray[i]).parent().attr('id'));
    let currentIndex = $(matchArray[i]).index();
    console.log(`row ${parent}`);
    console.log(`column ${currentIndex}`);

    /* Getting the neighboring squares in 4 cardinal directions */
    let currentSquare = matchArray[i];
    let squareAbove = $(`#${parent > 0 ? parent - 1 : false}`).children().eq(currentIndex);
    let squareBelow = $(`#${parent < game.boardHeight ? parent + 1 : false}`).children().eq(currentIndex);
    let squareLeft = currentIndex > 0 ? $(`#${parent}`).children().eq(currentIndex).prev() : false;
    let squareRight = currentIndex < game.boardWidth ? $(`#${parent}`).children().eq(currentIndex).next() : false;

    /* Getting the background colors from the squares in 4 cardinal directions from the current index  */
    let currentSquareColor = ($(currentSquare).css('background-color'));
    let squareAboveColor = ($(squareAbove).css('background-color'));
    let squareBelowColor = ($(squareBelow).css('background-color'));
    let squareLeftColor = ($(squareLeft).css('background-color'));
    let squareRightColor = ($(squareRight).css('background-color'));

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
      console.log('Validate Match Array Function End');
      console.log(game.matchArray);
      return game.matchArray;
    }

  }
  console.log(game.matchArray);
  return game.matchArray;
};

/* ----- Validates Match Between Two Squares ----- */
/* This can be used to verify that the game goal color matches a square color */
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

/* -- Chooses a random color from the color array -- */
/* Colors are stored in game.colors */
/* It should use the number from game.numOfColors as an argument. */
const applyRandomColor = (number) => {
  const colorsSlice = game.colors.slice(0, number);
  const index = Math.floor(Math.random() * colorsSlice.length)
  return colorsSlice[index];
}
/* ------- Creating the Game Board ------- */
/* It uses the dimensions from the game.boardWidth & game.boardHeight to determine board size */
const generateGameBoard = () => {
  const $squares = $('.squares');
  for (let i = 0; i < game.boardHeight; i++) {
    const $row = $(`<div class="row" id=${i}/>`);
    // console.log('appending a row');
    for (let j = 0; j < game.boardWidth; j++) {
      // console.log('appending a square');
      const $square = $('<div class="square"/>');
      $square.css('background-color', applyRandomColor(game.numOfColors));
      $row.append($square);
    }
    $squares.append($row);
  }
}

/* This randomizes all .square colors */
const updateSquareColors = () => {
  $('.square').each(function () {
    $(this).css('background-color', applyRandomColor(game.numOfColors));
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
  let color = applyRandomColor(game.numOfColors);
  game.goalColor = color;
  $('.goal-square').css('background-color', color);
}