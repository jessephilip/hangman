var dictionary = [
	{word: "hello", definition: "salutation"},
	{word: "underline", definition: "a line under a word"},
	{word: "girl", definition: "opposite of boy"},
	{word: "boy", definition: "opposite of girl"},
	{word: "goodybye", definition: "a made up word"},
	{word: "parameters", definition: "what you call arguments inside a function"},
	{word: "variable", definition: "placeholders for values"},
	{word: "collector", definition: "bad guys in Mass Effect 3"},
	{word: "mutant", definition: "word owned by FOX"},
	{word: "mutt", definition: "the best kind of dog"},
	{word: "hood", definition: "the last name of bad British accents"},
];

// easy mode would have 13 guesses
// 13 original guesses. do not count letters already tried.



// generate a random word for the user to guess

//window.onload = setSpaces(getWord());

var randNum = Math.floor(Math.random() * dictionary.length);
var word = dictionary[randNum].word;
console.log(word);
var choices = [];
var indices = [];
var guessCount = 0;
setSpaces(word);

document.onkeyup = function(event) {
	var userInput = String.fromCharCode(event.keyCode).toLowerCase();
	
	//return an alert and do not log the user input if it has already been attempted.
	if (choices.indexOf(userInput) >= 0) {
		alert("Letter already used.");
	}

	//put user's input into an array and print that to the screen. 
	else {
		choices.push(userInput);
		document.querySelector("#used").innerHTML = "Used Letters: " + choices.toString();
		if (word.indexOf(userInput) == -1) {
			guessCount++;
			document.querySelector("#misses").innerHTML = "Misses: " + guessCount;			
		}
		if (guessCount == 13) document.querySelector("#result").innerHTML = "YOU LOSE";
	}	

	//if userInput is not in the word

	// look through the word looking for each instance of the letter inputted.
	for (var i = 0; i < word.length; i++) {
		if (word[i] == userInput) indices.push(i);
	}

	console.log(indices);

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
	console.log(word);
	
	// loop through the array of user's choices looking for each letter of the word in that array
	// if that letter is found increase sum
	// if sum equals the number of letters in the word. player wins. todo: make it so player loses if he does not get this in enough tries
	// to get out of loop, break loop after trying all the letters in user's choices
	while (!win) {
		if (choices.indexOf(word[counter]) >= 0) sum++;
		console.log(sum);
		if (sum == word.length) 
			{
				win = true;
				document.querySelector("#result").innerHTML = "YOU WIN";
				document.querySelector("#definition").innerHTML = 
				"<p><span class='fa fa-quote-left'></span></p>" + dictionary[randNum].definition;
			}
		if (counter == choices.length) break;
		counter++;

	}

}


// Click listener to start a new game.
document.querySelector("#button").addEventListener("click", function() {
	//figure this part out
})



function getWord() {
	return dictionary[Math.floor(Math.random() * dictionary.length)].word;
}

function setSpaces(string) {
	for (var i = 0; i < string.length; i++) {
		document.querySelector("#wordSpace").innerHTML += ("<span id=letter" + i + ">_____" + " " + "</span>");
	}
}
