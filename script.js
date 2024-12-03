document.addEventListener('DOMContentLoaded', () => { // Added an event listener "DOMContentLoaded" to run the code only after the DOM has fully loaded

    let playerText = document.getElementById('turn'); // Declaring a variable named playerText and using getElementById to find the HTML element with the ID 'turn'.
    let restartBtn = document.getElementById('button-play-again'); // Declaring a variable named restartBtn and using getElementById to find the HTML element with the ID 'button-play-again'.
    let boxes = Array.from(document.getElementsByClassName('game-square')); // Declaring a variable named boxes and using getElementsByClassName to find all HTML elements with the class 'game-square', then converting the collection into an array.
   
    const O_TEXT = "O"; // Declaring a constant named O_TEXT and assigning it the value "O", representing one player's symbol.
    const X_TEXT = "X"; // Declaring a constant named X_TEXT and assigning it the value "X", representing the other player's symbol.
    let currentPlayer = X_TEXT; // Declaring a variable named currentPlayer and setting its initial value to X_TEXT, indicating the game starts with player "X".
    let spaces = Array(9).fill(null); // Declaring a variable named spaces and creating an array of 9 null values to track the state of each square on the game board.

    console.log(spaces); // Console logs the spaces.
});



