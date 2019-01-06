

 //create variables for wins to keep track of how many games the user has won starts at 0
var wins = 0;


//create a variable /array for your guesses so far this will display the letter the user has entered
var  userGuesses= [];

//create a variable for guesses to keep track of how many guesses the user has left of 9
var guessesRemaining;

// Array of famous females
// please see list.js tab for var famousFemales = ["Susan Weston", "Mary Weston", "Debbie Dobbs", "Ann Stone", "Sonja Rasmussen"]

//First action is for the computer to randonmly chose a name from the array and store it. create a variable to store the chosen letter.  Set up the alphabet math.  
var computerChosen;

//stores the users last guess
var userGuess;
var blankLetters;

// Create variables that hold references to the places in the HTML where we want to display things.

    var computerChosenP = document.getElementById("guess-letter")
    var winsP = document.getElementById("wins-text");
    var lossesP = document.getElementById("losses-text");
    var guessesRemainingP = document.getElementById("guesses-remaining");
    var userGuessesP = document.getElementById("guesses-so-far");

$('#start').on('click', function () {
    reset();
    updateDisplay();
    
});


// set up a reset function
function reset() {
    userGuesses = [];
    guessesRemaining = 20;
    computerChosen = famousFemales[Math.floor(Math.random()*famousFemales.length)];
    blankLetters = [];
    for (i = 0; i < computerChosen.length; i++){
        if (computerChosen[i]===" "){
            blankLetters.push("&nbsp;&nbsp;")
        }
        else{ 
            blankLetters.push("_")    
        }
    }
}
        
function updateDisplay(){       
        userGuessesP.textContent = "Letters already guessed: " + userGuesses.join(" ");
        winsP.textContent = "Wins: " + wins;
        guessesRemainingP.textContent = "Number of guesses remaining: "  + guessesRemaining;
        computerChosenP.innerHTML =  blankLetters.join(" ");

    }   

//sets up a new game up
reset();
updateDisplay();



// This function is run whenever the user presses a key.
document.onkeyup = function(event) {
    userGuess=event.key;
    if(!/^[a-z]$/i.test(userGuess)) {
        return
    }
    
//detect if key has already been pressed, if yes, don't add to userGuesses variable

    if(userGuesses.includes(userGuess)){
        $('#buzzer').get(0).play();
        return
    }


    //2nd step is for the user to guess the letter up to 9 times. user types in a letter, decrease the guesses remaining, put the guess in the array of guesses so far
    guessesRemaining = guessesRemaining-1;
    userGuesses.push(userGuess);    

    //3rd step is for the computer to decide if user guesses the correct word then increase the wins by 1 and reset the game. when the user it out of guesses the "guesses left variable will be equal to 0.
    for (i = 0; i < computerChosen.length; i++){
        if (userGuess.toLowerCase() === computerChosen[i].toLowerCase()){
            blankLetters[i] = computerChosen[i]
        }
    }

    function userWin(){
        for (i=0; i < blankLetters.length;i++){
            if (blankLetters[i] === "_") {
                return false;
            }
        }
        return true;

    }
    
    updateDisplay();

    if (userWin() === true) {
       $('#applause').get(0).play();
       wins = wins+1;
       updateDisplay(); 
    }
    else if (guessesRemaining === 0){
        reset();
    }
}
















 


