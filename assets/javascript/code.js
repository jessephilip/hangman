//todo: implement game lock for once game has ended
//todo: instructions require game to start over automatically

var dictionary = [
    { word: "hello", definition: "salutation" },
    { word: "underline", definition: "a line under a word" },
    { word: "girl", definition: "opposite of boy" },
    { word: "boy", definition: "opposite of girl" },
    { word: "goodybye", definition: "a made up word" },
    { word: "parameters", definition: "what you call arguments inside a function" },
    { word: "variable", definition: "placeholders for values" },
    { word: "collector", definition: "bad guys in Mass Effect 3" },
    { word: "mutant", definition: "word owned by FOX" },
    { word: "mutt", definition: "the best kind of dog" },
    { word: "hood", definition: "the last name of bad British accents" },
    { word: "new", definition: "not old" },
    { word: "white", definition: "white, #fff, rgb(255,255,255)" },
    { word: "black", definition: "black, #000, rgb(0,0,0)" },
    { word: "true", definition: 'rue with a "t"' },
    { word: "array", definition: "of sunshine" },
    { word: "hunter", definition: "err, should I hunt" },
    { word: "magic", definition: "gathers things" },
    { word: "twelve", definition: "comes after eleven" },
    { word: "loop", definition: "for, while, do while" },
    { word: "aliens", definition: "<img src='assets/images/aliens.jpg' height='150px' width='150px' alt='xenomorph cute'>" },
    { word: "fire", definition: "<img src='assets/images/fireElemental.png' alt='fire elemental'>" },
    { word: "words", definition: "some people have the best words" },
    { word: "pizza", definition: "the fifth element" },
    { word: "stairs", definition: "broken escalator" },
    { word: "billion", definition: "bigger than 1" },
    { word: "hope", definition: "she slapped me once" },
    { word: "code", definition: "&uarr; &uarr; &darr; &darr; &larr; &rarr; &larr; &rarr; b a start" },
    { word: "shark", definition: "big fish with teeth" },
    { word: "horse", definition: "yelling too much" },
    { word: "paternal", definition: "fondness for DNA donations" },
    { word: "math", definition: "2 + 2 = 5" },
    { word: "box", definition: "beware the most innerest" },
    { word: "drama", definition: "that class you took in high school" },
    { word: "flight", definition: "the process of leaving the ground" },
    { word: "chill", definition: "works with Netflix" },
    { word: "caring", definition: "is sharing" },
    { word: "ignorance", definition: "rhymes with fignorance" },
    { word: "victory", definition: "rides on a white stallion" },
    { word: "roof", definition: "raise it" }

];

// easy mode would have 13 guesses
// 13 original guesses. do not count letters already tried.
// generate a random word for the user to guess
// hard has 7 guesses
// sudden death has one guess

// randNum holds a random number used to pick a random word
var randNum;

// word holds the random word
var word;

// choices holds the user's input
var choices = [];

// indices holds the position(s) of the user's input in the word
var indices = [];

// guessCount holds the number of wrong guesses by the user
var guessCount = 0;

// guessLimit is the LOSE condition. if the guess limit is reached, the game ends
var guessLimit = 13;

// score tracks the overall score of all games
var score = 0;

// variable for locking the game after the player wins or loses
var gameLock = false;

//initiage the game with a random word and the correct number of spaces
setSpaces(getWord());

// document.onkeyup listens for the user's input
document.onkeyup = function(event) {
//console.log(event);
    var userInput = String.fromCharCode(event.keyCode).toLowerCase();

    if ((event.keyCode >= 65) && (event.keyCode <= 90) && (gameLock == false))  {

        //turn color of #message black for style
        document.querySelector("#message").style.color = "gray"; 

        //return an alert and do not log the user input if it has already been attempted.
        if (choices.indexOf(userInput) >= 0) {
            alert("Letter already used.");
        }

        //put user's input into an array and print that to the screen.
        else {
            choices.push(userInput);
            document.querySelector("#used").innerHTML = "Used Letters: " + choices.toString();
            
            // userInput is not in the word guessCount goes up and the game could end
            if (word.indexOf(userInput) == -1) {
                guessCount++;
                document.querySelector("#misses").innerHTML = "Misses: " + guessCount + "/" + guessLimit;
                document.querySelector("#image").src = "assets/images/easy/clean/scaffold-" + guessCount + ".png";
            }

            // LOSE condition. if guessCount reaches guessLimit, the user loses
            if (guessCount == guessLimit) {
                document.querySelector("#result").innerHTML = "YOU LOSE";
                if (guessLimit == 13) score--;
                if (guessLimit == 7) score-=5;
                if (guessLimit == 1) score-=10;
                updateScore();
                gameLock = true;
            }
        }
        
        //if userInput is in the word
        // look through the word looking for each instance of the letter inputted.
        for (var i = 0; i < word.length; i++) {
            if (word[i] == userInput) indices.push(i);
        }

//console.log(indices);
        
        // print the matching letters to the screen
        if (indices.length > 0) {
            for (i = 0; i < indices.length; i++) {
                document.querySelector("#letter" + indices[i]).innerHTML = "  " + userInput + "  ";
            }

            // clear indices before user inputs new letters.
            indices = [];
        }

        //win condition. if user guesses all the letters in the word
        var win = false;
        var sum = 0;
        var counter = 0;

//console.log(word);

        // loop through the array of user's choices looking for each letter of the word in that array
        // if that letter is found increase sum
        // if sum equals the number of letters in the word. player wins. todo: make it so player loses if he does not get this in enough tries
        // to get out of loop, break loop after trying all the letters in user's choices
        while (!win) {
            if (choices.indexOf(word[counter]) >= 0) sum++;
//console.log(sum);

            if (sum == word.length) {
                win = true;
                document.querySelector("#result").innerHTML = "YOU WIN";
                document.querySelector("#definition").innerHTML =
                    "<span class='fa fa-quote-left'></span>" + "  " + dictionary[randNum].definition + "  " + 
                    "<span class='fa fa-quote-right'</span>";

                // the below if statements are for certain instances that load an iframe youtube video 
                if (dictionary[randNum].word == "shark") {
                    playVideo("https://www.youtube.com/embed/1WJaqpi1PDg?autoplay=1");
                 }

                if (dictionary[randNum].word == "horse") {
                    playVideo("https://www.youtube.com/embed/b3_lVSrPB6w?autoplay=1");
                }

                if (dictionary[randNum].word == "paternal") {
                    playVideo("https://www.youtube.com/embed/HseMjKYs4Ug?list=PL54856EB4DCF67FD6?autoplay=1");
                }

                if (dictionary[randNum].word == "math") {
                    playVideo("https://www.youtube.com/embed/5joa2C0i20w?autoplay=1");
                }

                if (dictionary[randNum].word == "drama") {
                    playVideo("https://www.youtube.com/embed/y8Kyi0WNg40?autoplay=1");
                }

                if (dictionary[randNum].word == "flight") {
                    playVideo("https://www.youtube.com/embed/nG2rNBFzkGE?autoplay=1");
                }

                if (dictionary[randNum].word == "chill") {
                    playVideo("https://www.youtube.com/embed/R39e30FL37U?autoplay=1");
                }

                if (dictionary[randNum].word == "caring") {
                    playVideo("https://www.youtube.com/embed/PAqxWa9Rbe0?autoplay=1");
                }

                if (dictionary[randNum].word == "victory") {
                    playVideo("https://www.youtube.com/embed/PZ_7ipJ6Cx8?autoplay=1");
                }                

                // increase the score based on the difficulty setting
                if (guessLimit == 13) score++;
                if (guessLimit == 7) score+=5;
                if (guessLimit == 1) score+=10;
                updateScore();
                gameLock = true;
            }
            
            if (counter == choices.length) break;
            counter++;
        }
    }
}


// Click listener to start a new game.
document.querySelector("#button").addEventListener("click", function() {
    //figure this part out
    reset();
    setSpaces(getWord());
});

// click listener for easy mode
document.querySelector("#easy").addEventListener("click", function() {
    //figure this part out
    guessLimit = 13;
    reset();
    setSpaces(getWord());
});

// click listener for hard mode
document.querySelector("#hard").addEventListener("click", function() {
    //figure this part out
    guessLimit = 7;
    reset();
    setSpaces(getWord());
});

// click listener for sudden-death mode
document.querySelector("#sudden-death").addEventListener("click", function() {
    //figure this part out
    guessLimit = 1;
    reset();    
    setSpaces(getWord());
});

// function generates and returns random word from dictionary
function getWord() {
    randNum = Math.floor(Math.random() * dictionary.length);
    word = dictionary[randNum].word;
    console.log(word);
    return word;
}

// function sets up the number of blank spaces on the screen
function setSpaces(string) {
    for (var i = 0; i < string.length; i++) {
        document.querySelector("#wordSpace").innerHTML += "<span id=letter" + i + ">_" + " " + "</span>";
        document.querySelector("#message").style.color = "white";
    }
}

// updates the score
function updateScore() {
	document.querySelector("#score").innerHTML = "Score: " + score;
}

function playVideo(link) {
    var location = document.querySelector("#video");
    var iFrame = document.createElement("iframe");
    iFrame.src = link;
    iFrame.width = "400";
    iFrame.height = "250";
    iFrame.frameborder = "0";
    iFrame.style.position = "absolute";
    iFrame.style.left = "595px";
    iFrame.style.top = "155px";
    location.appendChild(iFrame);
    location.style.display = "block";

}

// resets multiple parameters necessary for a new game
function reset() {
    guessCount = 0;
    win = false
    counter = 0;
    sum = 0;
    choices = [];
    indices = [];
    gameLock = false;
    document.querySelector("#wordSpace").innerHTML = "";
    document.querySelector("#definition").innerHTML = "";
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#used").innerHTML = "Used Letters: ";
    document.querySelector("#misses").innerHTML = "Misses: 0/" + guessLimit;
    document.querySelector("#image").src = "assets/images/easy/clean/scaffold-only.png";
    document.querySelector("#video").innerHTML = "";

}
