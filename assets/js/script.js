
// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
   let buttons = document.getElementsByTagName("button");

   for (let button of buttons) {
       button.addEventListener("click", function() {
           if (this.getAttribute("data-type") === "submit") {
               checkAnswer();
           } else {
               let gameType = this.getAttribute("data-type");
               runGame(gameType);
           }
       });
   }

   document.getElementById("answer-box").addEventListener("keydown", function(event) {
       if (event.key === "Enter") {
           checkAnswer();
       }
   });

   runGame("addition");

});


// setting the focus is having your curser already in the selection answer box. each time the awnser box is called the cursor will be there for the answer
/**
* The main game "loop", called when the script is first loaded
* and after the user's answer has been processed
*/
function runGame(gameType) {
   document.getElementById("answer-box").value = "";
   document.getElementById("answer-box").focus();

   // Creates two random numbers between 1 and 25
   let num1 = Math.floor(Math.random() * 25) + 1;
   let num2 = Math.floor(Math.random() * 25) + 1;

   if (gameType === "addition") {
       displayAdditionQuestion(num1, num2);
   } else if (gameType === "multiply") {
       displayMultiplyQuestion(num1, num2);
   } else if (gameType === "subtract") {
       displaySubtractQuestion(num1, num2);
   }  else if (gameType === "division") {
       displayDivisionQuestion(num1 * num2, num2);
   }  else {
       alert(`Unknown game type: ${gameType}`);
       throw `Unknown game type: ${gameType}. Aborting!`;
   }

}

/**
* Checks the answer against the first element in
* the returned calculateCorrectAnswer array
*/
function checkAnswer() {

   let userAnswer = parseInt(document.getElementById("answer-box").value);
   let calculatedAnswer = calculateCorrectAnswer();
   let isCorrect = userAnswer === calculatedAnswer[0];

   if (isCorrect) {
       alert("Hey! You got it right! :D");
       incrementScore();
   } else {
       alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
       incrementWrongAnswer();
   }

   runGame(calculatedAnswer[1]);

}

/**
* Gets the operands (the numbers) and the operator (plus, minus etc)
* directly from the dom, and returns the correct answer.
*/
function calculateCorrectAnswer() {

   let operand1 = parseInt(document.getElementById('operand1').innerText);
   let operand2 = parseInt(document.getElementById('operand2').innerText);
   let operator = document.getElementById("operator").innerText;

   if (operator === "+") {
       return [operand1 + operand2, "addition"];
   } else if (operator === "x") {
       return [operand1 * operand2, "multiply"];
   } else if (operator === "-") {
       return [operand1 - operand2, "subtract"];
   } else if (operator === "/") {
       return [operand1 / operand2, "division"];
   } else {
       alert(`Unimplemented operator ${operator}`);
       throw `Unimplemented operator ${operator}. Aborting!`;
   }

}

/**
* Gets the current score from the DOM and increments it by 1
*/
function incrementScore() {

   let oldScore = parseInt(document.getElementById("score").innerText);
   document.getElementById("score").innerText = ++oldScore;

}

/**
* Gets the current tally of incorrect answers from the DOM and increments it by 1
*/
function incrementWrongAnswer() {

   let oldScore = parseInt(document.getElementById("incorrect").innerText);
   document.getElementById("incorrect").innerText = ++oldScore;
   
}

function displayAdditionQuestion(operand1, operand2) {

   document.getElementById('operand1').textContent = operand1;
   document.getElementById('operand2').textContent = operand2;
   document.getElementById('operator').textContent = "+";
   
}

// need to keep the operand 1 as the larger number to keep from neg number ( could use if statement but ternary operator is shorter )

function displaySubtractQuestion(operand1, operand2) {

   document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
   document.getElementById('operand2').textContent = operand2 > operand2 ? operand1 : operand2;
   document.getElementById('operator').textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {

   document.getElementById('operand1').textContent = operand1;
   document.getElementById('operand2').textContent = operand2;
   document.getElementById('operator').textContent = "x";

}
// always want awnser to be a whole number - integer (cant be 10/3 = 3.333) = multiply 2 operands together to form one side of the equation
// TERNARY OPERATOR = question checking goes before ? is operand 1 bigger than op 2? if so return operand 1 if not (else) : return operand 2
function displayDivisionQuestion(operand1, operand2) {

   document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
   document.getElementById('operand2').textContent = operand2 > operand2 ? operand1 : operand2;
   document.getElementById('operator').textContent = "/";

}


// -----------------------------------------------------------------


// // https://codepen.io/rpandrews/pen/oKRLxY
// let playerChoice = document.querySelectorAll('.playerChoice');

// for (var i = 0; i < playerChoice.length; i++) {
//    playerChoice[i].addEventListener('click', function() {
//       const opponent = ['Rock', 'Paper', 'Scissors', 'Lizard','Spock'];
//       const opponentHand = opponent[Math.floor(Math.random() * 5)];

//       let playerHand = this.value;
//       // https://codepen.io/rpandrews/pen/oKRLxY // limited, included new icons and choices
//       if (playerHand === opponentHand) {
//          alert(`It's a draw!\n${playerHand} vs ${opponentHand}`);
//       } else if (playerHand === 'Scissors' && opponentHand === 'Paper') {
//          alert(`You win!\n${playerHand} vs ${opponentHand}`);
//       } else if (playerHand === 'Paper' && opponentHand === 'Rock') {
//         alert(`You win!\n${playerHand} vs ${opponentHand}`);
//      }  else if (playerHand === 'Rock' && opponentHand === 'Lizard') {
//         alert(`You win!\n${playerHand} vs ${opponentHand}`);
//      }  else if (playerHand === 'Lizard' && opponentHand === 'Spock') {
//         alert(`You win!\n${playerHand} vs ${opponentHand}`);
//      }  else if (playerHand === 'Spock' && opponentHand === 'Scissors') {
//         alert(`You win!\n${playerHand} vs ${opponentHand}`);
//      }  else if (playerHand === 'Rock' && opponentHand === 'Scissors') {
//         alert(`You win!\n${playerHand} vs ${opponentHand}`);
//      }  else if (playerHand === 'Scissors' && opponentHand === 'Lizard') {
//         alert(`You win!\n${playerHand} vs ${opponentHand}`);
//      }  else if (playerHand === 'Lizard' && opponentHand === 'Paper') {
//         alert(`You win!\n${playerHand} vs ${opponentHand}`);
//      }  else if (playerHand === 'Paper' && opponentHand === 'Spock') {
//         alert(`You win!\n${playerHand} vs ${opponentHand}`);
//      }  else if (playerHand === 'Spock' && opponentHand === 'Rock') {
//         alert(`You win!\n${playerHand} vs ${opponentHand}`);
//      }  else {
//          alert(`You lose!\n${playerHand} vs ${opponentHand}`);
//       }
//    });
// }