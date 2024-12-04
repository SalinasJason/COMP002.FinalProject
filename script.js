document.addEventListener('DOMContentLoaded', () => { // Added an event listener "DOMContentLoaded" to run the code only after the DOM has fully loaded

    let playerText = document.getElementById('turn'); // Declaring a variable named playerText and using getElementById to find the HTML element with the ID 'turn'.
    let restartBtn = document.getElementById('button-play-again'); // Declaring a variable named restartBtn and using getElementById to find the HTML element with the ID 'button-play-again'.
    let squares = Array.from(document.getElementsByClassName('game-square')); // Declaring a variable named squares and using getElementsByClassName to find all HTML elements with the class 'game-square', then converting the collection into an array.
   
    const O_TEXT = "O"; // Declaring a variable named O_TEXT and assigning it the value "O", representing one player's symbol.
    const X_TEXT = "X"; // Declaring a variable named X_TEXT and assigning it the value "X", representing the other player's symbol.
    let currentPlayer = X_TEXT; // Declaring a variable named currentPlayer and setting its initial value to X_TEXT, indicating the game starts with player "X".
    let spaces = Array(9).fill(null); // Declaring a variable named spaces and creating an array of 9 null values to track the state of each square on the game board.
    let count_plays = 0 // Declaring a variable named count_plays to track the number of plays
    

     // Initialize win counts from sessionStorage or set to 0 if not found
     let xWins = sessionStorage.getItem('xWins') ? parseInt(sessionStorage.getItem('xWins')) : 0; // Loads 'xWins' from sessionStorage if it exists, otherwise set to 0
     let oWins = sessionStorage.getItem('oWins') ? parseInt(sessionStorage.getItem('oWins')) : 0; // Loads 'oWins' from sessionStorage if it exists, otherwise set to 0
 
     // Display current win counts
     document.getElementById('scoreboard-x').innerText = xWins; // Using getElementById to get 'scoreboard-x' and set its inner text to xWins
     document.getElementById('scoreboard-o').innerText = oWins; // Using getElementById to get 'scoreboard-o' and set its inner text to xWins

     console.log(sessionStorage)
    playerText.innerText = `It's ${currentPlayer}'s turn`; // Display whose turn it is at the start of the game

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

                if (currentPlayer === X_TEXT) {
                    xWins++; // Increment the win count for player X
                    document.getElementById('scoreboard-x').innerText = xWins; // Updates the scores for X-wins
                    sessionStorage.setItem('xWins', xWins); // Saves the updated score to sessionStorage

                } else {
                    oWins++; // Increment the win count for player O
                    document.getElementById('scoreboard-o').innerText = oWins; // Updates the display for O-wins
                    sessionStorage.setItem('oWins', oWins); // Saves the updated score to sessionStorage
                }
                
                console.log(winning_blocks); // Console logs the winning squares
            } 
            
            else {
                count_plays++ // Every time a player clicks on a square it increments by 1
                currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT // Switches players turn, if currentPlayer is equal to X_TEXT change it to O_TEXT or else change it to X_TEXT.
                playerText.innerText = `It's ${currentPlayer}'s turn`; // Updates whose turn it is
            }
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

    restartBtn.addEventListener('click', restart) // Added a 'click' event listener to the restart button to reset the game when clicked

    function restart() { // Function to reset the game 
        spaces.fill(null) // Resets the spaces array

        squares.forEach( square => { // Iterate over each square in the squares array
            square.innerText = '' // Resets the squares to empty/null
            square.style.backgroundColor = '' // Resets the background color to default
        })


        currentPlayer = X_TEXT // Resets the current player to X_TEXT
        count_plays = 0; // Resets the play count
        playerText.innerText = `It's ${currentPlayer}'s turn`; // Resets the turn message
    }

    startGame() // Calls the startGame function to start the game
});