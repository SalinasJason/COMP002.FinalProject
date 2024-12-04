document.addEventListener('DOMContentLoaded', () => { // Added an event listener "DOMContentLoaded" to run the code only after the DOM has fully loaded

    let playerText = document.getElementById('turn'); // Declaring a variable named playerText and using getElementById to find the HTML element with the ID 'turn'.
    let restartBtn = document.getElementById('button-play-again'); // Declaring a variable named restartBtn and using getElementById to find the HTML element with the ID 'button-play-again'.
    let squares = Array.from(document.getElementsByClassName('game-square')); // Declaring a variable named squares and using getElementsByClassName to find all HTML elements with the class 'game-square', then converting the collection into an array.
   
    const O_TEXT = "O"; // Declaring a variable named O_TEXT and assigning it the value "O", representing one player's symbol.
    const X_TEXT = "X"; // Declaring a variable named X_TEXT and assigning it the value "X", representing the other player's symbol.
    let currentPlayer = X_TEXT; // Declaring a variable named currentPlayer and setting its initial value to X_TEXT, indicating the game starts with player "X".
    let spaces = Array(9).fill(null); // Declaring a variable named spaces and creating an array of 9 null values to track the state of each square on the game board.
    let count_plays = 0 // Declaring a variable named count_plays to track the number of plays

    const startGame = () => { // Function to initialize the game by adding click event listeners to each game square
        squares.forEach(square => square.addEventListener('click', squareClicked)) // Add a click event listener to each game square
    }

    function squareClicked(e) { // Function to handle the click event on game squares
        const id = e.target.id.split('-')[1]; // Declaring a variable named 'id' and assigning it the ID of the clicked square

        if(!spaces[id] && count_plays < 9){ // Checks if the square is null/empty and if the count plays is more than 9, execute the following code
            spaces[id] = currentPlayer  // Fills the square with the current player's symbol
            e.target.innerText = currentPlayer // Adds the current player's symbol to the square 

            if (playerHasWon() !== false) { // Checks if the current player has won by verifying if the playerHasWon() function does not return false. 
                playerText.innerText = `${currentPlayer} has won!`; // Displays the winning current player symbol with the text has won!
                let winning_blocks = playerHasWon(); // Gets the winning squares
                count_plays = 10 // Prevents further plays if player has won three in the row by making count_plays to 10 plays
                winning_blocks.forEach(index => squares[index].style.backgroundColor = 'lightgreen'); // Highlights the winning squares with a light green background color

                console.log(winning_blocks); // Console logs the winning squares
            }
            count_plays++ // Every time a player clicks on a square it increments by 1
            currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT // Switches players turn, if currentPlayer is equal to X_TEXT change it to O_TEXT or else change it to X_TEXT.
        }

        if(count_plays === 9) { // Checks if count plays is equal to 9, execute the following code
            playerText.innerHTML = 'Tied Game!' // Displays the text 'Tied Game'
        }
    }

    function playerHasWon() { // Function to check if a player has won
        for (const condition of winningCombinations) { // Iterate through each winning combination
            let [a, b, c] = condition; // Destructuring the array into three variables

            if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) { // Checks if all three squares are filled with the same player's symbol
                return [a, b, c]; // Returns the winning combination
            }
        }
        return false; // Return false if no winning combination is found
    }

       const winningCombinations = [ // Array of possible winning combinations
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal from top-left to bottom-right
        [2, 4, 6]  // Diagonal from top-right to bottom-left
    ];

    startGame() // Calls the startGame function to start the game
});