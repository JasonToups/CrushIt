const game = {
  'boardWidth': 10,
  'boardWidthMin': 4,
  'boardHeight': 9,
  'boardHeightMin': 5,
  'score': 0,
  'scoreMultiplier': 2,
  'goalColor': "",
  // 'goalNumber': 30,
  'goalNumber': 0,
  'goalCurrentNumber': 0,
  'goalTotalNumber': 0,
  // 'round': 1,
  'round': 2,
  'colors': ['rgb(100, 149, 237)', 'rgb(143, 188, 143)', 'rgb(66, 213, 198)', 'rgb(238, 130, 238)', 'rgb(255, 215, 0)', 'rgb(255, 99, 71)'],
  'numOfColors': 3,
  'time': 0,
  // 'roundTime': 30,
  'roundTime': 2,
  'matchArray': [],
  'animationTime': 1200,
  'gameOver': false,
}

const createRandomButton = () => {
  console.log('Randomize Board');
  const $randomize = $('<button class="randomize">Randomize</button>');
  $(".random").append($randomize);
};

$('.random').on('click', '.randomize', () => {
  console.log('Randomize');
  updateSquareColors();
});

/* -------- Handles Touch Event -------- */
const handlePoke = (event) => {
  // console.log(event.target);
  $(event.target).addClass('selected');
  $(event.target).addClass('animated pulse infinite');

  /* Sending event target to game object */
  game.matchArray.push(event.target);
  // console.log(validateMatch(event.target, $('.goal-square')));
  validateMatchArray();
  return validateMatch(event.target, $('.goal-square'));
};

$('.squares').on('click', '.square', handlePoke);

/* -------- Scoring ---------- */
/* When matches are made and sent to the game.matchArray. 
After the function runs, it should invoke the scoring function.
The scoring() will take no parameters, but will use the game.matchArray.
It will loop through the array and check for the background color of each index in the array.
If the index color is the same as the goal color, then each block point will be multiplied by the game.pointMultiplier
Otherwise each block is worth 1 point.*/

/* add a class , then Set timeout for time, then remove the class before randomizing the color or tallying the score.  */

const scoring = () => {
  if (game.matchArray.length >= 2) {
    for (let i = 0; i < game.matchArray.length; i++) {
      const current = game.matchArray[i];
      if (validateMatch(game.matchArray[i], $('.goal-square'))) {
        game.score += game.scoreMultiplier;
        $('#scoreNumber').text(`${game.score}`);
        game.goalCurrentNumber--;
        game.goalTotalNumber++;
        $('#goalNumber').text(`${game.goalCurrentNumber}`);
        $(game.matchArray[i]).removeClass('match');
        // removing the dotted boarder class
        // removing the animation class
        setTimeout(() => { $(current).css('background-color', applyRandomColor()); }, game.animationTime);
        // applyRandomColor(game.matchArray[i]);
        // $(game.matchArray[i]).css('background-color', applyRandomColor());
      } else {
        game.score++;
        $('#scoreNumber').text(`${game.score}`);
        $(game.matchArray[i]).removeClass('match');
        setTimeout(() => { $(current).css('background-color', applyRandomColor()); }, game.animationTime);
        // $(game.matchArray[i]).css('background-color', applyRandomColor());
      }
    }
  } else {
    for (let j = 0; j <= game.matchArray.length; j++) {
      $(game.matchArray[j]).removeClass('match');
      // $(game.matchArray[j]).css('background-color', applyRandomColor());
    }
  }
  game.matchArray = [];
  gameController();
}

/* -------- Checking squares for Matches to fill the game.matchArray -------- */
/* A Recursive function that validates the colors in all cardinal directions of the current square, and returns an array of matchable items to the game object*/

//POSSIBLE UPDATE - This function should accept 2 parameters, so i can pass in game.matchArray1, game.matchArray2, and pass in the class name i plan on appending to the div to control the recursive function, .match1, .match2
const validateMatchArray = () => {
  // console.log('Validate Match Array Function Start');
  let matchArray = game.matchArray;

  for (let i = 0; i <= matchArray.length; i++) {
    // console.log(`Match Array index ${i}`);
    let parent = parseInt($(matchArray[i]).parent().attr('id'));
    let currentIndex = $(matchArray[i]).index();
    // console.log(`rows ${parent}`);
    // console.log(`column ${currentIndex}`);

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
    /* This section checks the game.matchArray and if the square div is already included, then it will be skipped. 
    Only new divs should appear in array */

    /* -- When the variables used below were defined, if the square is on the boarder it should return False */
    $(currentSquare).addClass('match highlight animated heartBeat');
    setTimeout(() => {
      $(currentSquare).removeClass('highlight heartBeat');
    }, game.animationTime)

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
      // console.log('Validate Match Array Function End');
      // console.log(game.matchArray);
      scoring();
      return game.matchArray;
    }

  }
  /* I don't think this section ever runs */
  // console.log(game.matchArray);
  scoring();
  return game.matchArray;
};

/* ----- Validates Match Between Two Squares ----- */
/* This can be used to verify that the game goal color matches a square color */
const validateMatch = (square1, square2) => {
  // console.log('validate match function');
  const current = $(square1).css('background-color');
  const validate = $(square2).css('background-color');
  // console.log(current);
  // console.log(validate);
  if (current === validate) {
    return true;
  } else {
    return false;
  }
};

/* -- Chooses a random color from the color array -- */
/* Colors are stored in game.colors */
/* The number of colors are stored in game.numOfColors */
const applyRandomColor = () => {
  const colorsSlice = game.colors.slice(0, game.numOfColors);
  const index = Math.floor(Math.random() * colorsSlice.length)
  return colorsSlice[index];
}
/* ------- Creating the Game Board ------- */
/* It uses the dimensions from the game.boardWidth & game.boardHeight to determine board size */
const generateGameBoard = () => {
  const $squares = $('.squares');
  for (let i = 0; i < game.boardHeight; i++) {
    const $rows = $(`<div class="rows" id=${i}/>`);
    // console.log('appending a rows');
    for (let j = 0; j < game.boardWidth; j++) {
      // console.log('appending a square');
      const $square = $('<div class="square"/>');
      $square.css('background-color', applyRandomColor());
      $rows.append($square);
    }
    $squares.append($rows);
  }
}

/* This randomizes all .square colors */
const updateSquareColors = () => {
  $('.square').each(function () {
    $(this).css('background-color', applyRandomColor());
  })
}

/* ------ Starts the game timer ------ */
/* Value is stored in game.time */
// When the time is up, send to gameController()
// If Goal has been met, new round should begin with increasing difficulty
// If Goal has not been met, game over screen with score.
/* track what the old round is and the new round to clear the interval */
const setTimer = (newRound) => {
  // function to run , time interval
  const timer = setInterval(() => {
    if (newRound) {
      clearInterval(timer);
      // setTimer();
    }
    if (game.time === 0) {
      // used to stop setInterval
      // game.gameOver = true;
      console.log('Game Time === 0');
      clearInterval(timer);
      gameController();
      if (game.time > 0) setTimer();
    }
    updateTime();
    if (game.time > 0) game.time--;
    console.log(game.time);
  }, 1000);
}

const updateTime = () => {
  $('#timerNumber').text(`${game.time}`);
}



/* --------- Game Controller --------- */
// If Goal has been met, new round should begin with increasing difficulty
// If Goal has not been met, game over screen with score.

const gameController = () => {
  if (game.round > 1 && game.time === 0) {
    if (game.gameOver) {
      return;
    }
    endcard();
    game.gameOver = true;
    // break;
  } else if (game.round === 1 && game.time === 0) {
    if (game.gameOver) {
      return;
    }
    endcard();
    game.gameOver = true;

    // break;
  } else if (game.goalCurrentNumber <= 0 && game.time > 0) {
    setTimer(true);
    game.scoreMultiplier++;
    //wrap this in a conditional that checks the width & height, and only runs if it's greater than, game.widthMin game.widthMax
    // game.boardWidth--;
    // game.boardHeight--;
    if (game.boardWidth > game.boardWidthMin) {
      game.boardWidth--;
    }
    if (game.boardHeight > game.boardHeightMin) {
      game.boardHeight--;
    }
    game.round++;
    game.time = game.roundTime;
    if (game.numOfColors < game.colors.length) {
      game.numOfColors++;
    };
    $(".square").remove();
    $(".rows").remove();
    generateGameBoard();
    updateGameGoalColor();
  }
  // // check for endgame condition, if game.round > 1, success endcard, include game.goalTotalNumber & game.round in the endcard
  // // // if 1 then failure endcard, include difference between game.goalNumber & game.goalCurrentNumber in the endcard text.
  // if game.goalCurrentNumber === 0
  // // reset timer, update game.goal color, add one to game.scoreMultiplier, remove 1 from game.boardWidth & game.boardHeight, add 1 to game.round, generate gameboard()  
};

const endcard = () => {
  console.log('GAME OVER')
  $('body').css('background-image', 'linear-gradient(to bottom, #99fcff, #7965fa)');
  $('body').css('height', '100vh');

  $(".squares").remove();
  $(".randomize").remove();
  // also remove header
  $("header").remove();

  /* TODO update the .endcard  */

  if (game.round > 1 && game.time === 0) {
    const $endcardHeader = $('<h1>You Win!</h1>');
    $(".endcard").append($endcardHeader);
    const $endcardBody = $(`<p>You crushed<br><span>${game.goalTotalNumber}</span> goal blocks<br> in <span>${game.round} rounds!<span></p>`);
    $(".endcard").append($endcardBody);
    const $endcardScore = $(`<h2>Final Score: ${game.score}</h2>`);
    $(".endcard").append($endcardScore);
  } else {
    const $endcardHeader = $('<h1>Try Again!</h1>');
    $(".endcard").append($endcardHeader);
    const $endcardBody = $(`<p>You were <br>${game.goalNumber - game.goalTotalNumber} blocks away from winning.<br> 
    Play again to get to round 2.</p>`);
    $(".endcard").append($endcardBody);
  }
};

/* breakout updating the game goal color into its own function so i can call it for a new round */
const updateGameGoalColor = () => {
  let color = applyRandomColor();
  game.goalColor = color;
  game.goalCurrentNumber = game.goalNumber;
  $('#goalNumber').text(`${game.goalCurrentNumber}`);
  $('.goal-square').css('background-color', color);
}

// $('.start').on('click', () => {
//   console.log('Game Start');
//   gameStart();
// });

const tutorial = () => {
  const $tutorialHeader = $('<h1>Are you ready to<br><span>CRUSH IT???</span></h1>');
  $(".tutorial").append($tutorialHeader);
  const $tutorialBody = $(`<p><span>Match at least 2</span> of the same colored blocks to <span>Crush</span> them!</p>
  <div class="squares">
  <div class="row">
  <div class="square" style="background-color: rgb(100, 149, 237);"></div><div class="square" style="background-color: rgb(100, 149, 237);"></div></div></div>
  <p>Crush <span>${game.goalNumber} Goal Blocks</span>,</p>
  <p>before the <span>${game.roundTime} second Timer</span> runs out!</p>`);
  $(".tutorial").append($tutorialBody);

  console.log('Start button created');
  const $start = $('<button class="start">Start!</button>');
  $(".tutorial").append($start);
  $('.start').on('click', () => {
    console.log('Game Start');
    gameStart();
  });
};

const ui = () => {
  const $header = $('<header></header>');
  const $uiHeader = $('<h1>Crush it!</h1>');
  const $uiBody = $(`
  <div class="container-fluid">
    <div class= "row">
    <div class="col-4" id="timer">
      Timer<br><span id="timerNumber"></span>
    </div>
    <div class="col-4" id="goal">
      Goal <span id="goalNumber"></span>
      <div class="goal-square"></div>
    </div>
      <div class="col-4" id="score">
        Score<br><span id="scoreNumber">0</span>
    </div>
      </div>
    </div>`);
  $("body").prepend($header);
  $("header").append($uiHeader);
  $("header").append($uiBody);
};


const gameStart = () => {
  $('.tutorial').remove();
  game.time = game.roundTime;
  $(".tutorial").remove();
  setTimer();
  ui();
  generateGameBoard();
  createRandomButton();
  updateGameGoalColor();
}

tutorial();