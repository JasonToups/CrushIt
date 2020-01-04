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
  console.log(gameBoardArray);
  return gameBoardArray;
}


const gameStart = () => {
  generateGameBoardArray(5, 4);
}

// console.log(gameBoardArray);
