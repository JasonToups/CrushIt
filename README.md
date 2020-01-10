# Crush It - Block Crusher Game
A block crusher game built in JS for General Assembly Software Engineering Bootcamp in SF.

## Overview

Crush It is a *procedural block crushing game*, where the player taps squares to make *matches* of the same color. If the match is the same color as the Goal Block color, the *Goal Block Total* is reduced by the number of blocks matched. 

The goal for each round is to complete the *Goal Block Total* number requirement. 

If the Goal Block Total has been reached, the *next round* starts, and the following actions fire:
- the timer resets
- the board size is reduced
- the goal color score multiplier goes up
- another color is added to the board

The *difficulty increases* for each round, *within limits* to the minimum board size and amount of colors added.

The board size reduction happens for every round. On the *even* rounds the the *width* is reduced, and on the *odd* rounds the *height* is reduced.

## Project Goals & Purpose

I built this for my first project in the General Assembly SF Software Engineering Immersive program in a week from January 3rd 2020, to the 10th. 

Outside of the requirements for the project provided by GA, I wanted a game that met the following product requirements:
- Responsive Design that could be played on mobile & desktop
- No images folder, all assets should be drawn with CSS
- Simple and fast gameplay that’s easily accessible to players
- Complex logic happening behind the scenes, but only showing necessary info to the player
- Procedural difficulty ramping, so the game would quickly become more difficult over time

## User Stories

1. **Tutorial** screen appears with a *CTA Button*.
2. User selects CTA button and **game starts**.
3. *Gameboard* and *UI* appears.
4. The *UI* has the name of the game, the game timer, the score, the match goal, with a colored block representing the goal.
5. User selects a *colored game block* to *match* the color of another game block 1 space away to the cardinal directions; top, down, left or right.
6. Matched colors can only be connected by the cardinal directions. 
7. If the blocks make a match of at least two of the same colors connecting them, the pieces will be matched, and tallied up.
8. New colored blockd will appear where the matched colored blocks were removed.
9. At any point, a randomize button can be pressed to randomize all the colors on the board.
10. When the timer is done, the gameboard and UI disappears and an **endcard** appears with the final score, the goal counter, and a message congratulating the player if they met the goal, or asking them to try again if they didn’t meet the goal.  There will be a replay and contact info button on it.

## Technologies Used

- HTML, CSS, JS, JQuery
- DOM manipulation
- Animate CSS
- Bootstrap

## Mockups & Storyboard

Here are my mockups and storyboard included in the Design folder. 
<a href="/design/CrushIt-Storyboard.pdf">Crush_It _Storyboard.pdf</a>

## Project Approach

I first designed a **storyboard** to guide the engineering process and detail the requirements for the project, and to create **mockups** of the final product.

I designed the storyboard and mockups in **Sketch**, then exported the mockups to **Zeplin** to get **working CSS** for the buttons and views.

The mockups were layered on top of other artboards to create the storyboard with Sketch by using the <a href = "https://github.com/Atim33/autopdfexporter-sketch-plugin">Auto PDF Exporter nSlicer by Khy</a> to create the <a href="/design/CrushIt-Storyboard.pdf">Crush_It _Storyboard.pdf</a>.

From there, I created a **Trello** card to track the production of the game. The card included the *schedule, milestones, todo list for features, user stories, links, and milestones*. The sortable todo list was very helpful for keeping track of the next task for the project. I don’t think I could have met the deadline with all of the features I implemented without the todo list.

For the **engineering** side, I created the UI on the index.html page, and worked on creating the game board using a loop defined by values `game.boardWidthStart & game.boardHeightStart` stored in the **game object**.

Once I got the game board working, then I created a `randomize color function` to randomize all the colors on the board, by accessing the `game.colors` array, and the `game.numOfColors` value to determine how many of the colors from the colors array should be included.

After I got the gameboard filled with colors, I hooked up a touch event to grab a div from the game board, store it in `game.matchArray`, and went to work on the recursive **validateMatchArray() function**. The function checks the div that’s been stored in the `game.matchArray`, then checks each square in the four cardinal directions; up, down, left, right of the current block. If the background colors of the current square matches the background color of the neighboring square, that neighboring square div is sent to the `game.matchArray`, and the loop continues at the *next index* of `game.matchArray`. The end of the loop happens when it reaches the end of the `game.matchArray` and _no new blocks_ have been added.

Once I got that working, I gained momentum on the rest of the project pretty quickly. Features fell into place, and I was able to make game logic decisions and implement them pretty quickly. 

All along I wanted the game to be formatted to **play on mobile**, so I let that guide all of the design & engineering decisions along the way, but I couldn’t preview the game on my phone until I published it to <a href="https://jasontoups.github.io/CrushIt-BlockCrusherGame/">Github pages.</a> Then I was able to update my CSS a bit, and change the `game.boardWidthStart` & `game.boardHeightStart` values to accommodate the much smaller screen size from the desktop view.

## Installation Instructions

The game is *playable from the web*, click the following link to play on **desktop** or **mobile**.
<a href="https://jasontoups.github.io/CrushIt-BlockCrusherGame/">Crush It - Block Crushing Game</a>

## Unsolved Problems

The *animation timing* for the matches could be improved, and I could *iterate on the mobile view* some more. The styling of the borders on the rounded corners of the UI and tutorial card breakdown on mobile. So I would update that.


