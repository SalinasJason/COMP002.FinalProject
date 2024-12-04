document.addEventListener('DOMContentLoaded', () => { // Added an event listener "DOMContentLoaded" to run the code only after the DOM has fully loaded

    let playerText = document.getElementById('turn'); // Declaring a variable named playerText and using getElementById to find the HTML element with the ID 'turn'.
    let restartBtn = document.getElementById('button-play-again'); // Declaring a variable named restartBtn and using getElementById to find the HTML element with the ID 'button-play-again'.
    let squares = Array.from(document.getElementsByClassName('game-square')); // Declaring a variable named squares and using getElementsByClassName to find all HTML elements with the class 'game-square', then converting the collection into an array.
   
    const O_TEXT = "O"; // Declaring a variable named O_TEXT and assigning it the value "O", representing one player's symbol.
    const X_TEXT = "X"; // Declaring a variable named X_TEXT and assigning it the value "X", representing the other player's symbol.
    let currentPlayer = X_TEXT; // Declaring a variable named currentPlayer and setting its initial value to X_TEXT, indicating the game starts with player "X".
    let spaces = Array(9).fill(null); // Declaring a variable named spaces and creating an array of 9 null values to track the state of each square on the game board.

    const startGame = () => { // Function to initialize the game by adding click event listeners to each game square
        squares.forEach(square => square.addEventListener('click', squareClicked)) // Add a click event listener to each game square
    }

    function squareClicked(e) { // Function to handle the click event on game squares
        const id = e.target.id// Declare a variable named 'id' and assigning it the IDs of the clicked square

        if(!spaces[id]){ // Checks if the square is null/empty and if it is, execute the following code
            spaces[id] = currentPlayer  // Fills the square with the current player's symbol
            e.target.innerText = currentPlayer // Adds the current player's symbol to the square 

            currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT // Switches players turn, if currentPlayer is equal to X_TEXT change it to O_TEXT or else change it to X_TEXT.
            console.log(e.target) // Console logs the clicked square id
        }
    }

    startGame() // Calls the startGame function to start the game
});



