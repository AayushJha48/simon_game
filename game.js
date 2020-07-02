

// Global Variables
let counter = 0;              // To check key is pressed first time
let level = 0;                // Keep a check on level
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];         // Random generated pattern
let userClickedPattern = [];  // Pattern of user

// Creating Sequence or Updating sequence for gamePattern
function nextSequence () {

  // Incrementing level and Changing the header tag
  level += 1;
  $('#level-title').html(`Level ${level}`);

  // Section for random chosen color.
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // adding animation to the random color
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour)
  userClickedPattern = []
}

// Section for user chosen color
$('.btn').click((event) => {
  let userChosenColour = $(event.target).attr('id');
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length - 1)
})


// Used to play sound
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

// Used to animate the pressed color
function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed')
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed')
  }, 100)
}

// To start or restart the game
$(document).keypress(() => {
  if(counter === 0) {
    counter = 1;
    nextSequence()
  } else {
    console.log("Key pressed again")
  }
})

// check the answer
function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('Success')
  } else {
    playSound('wrong')
    $('body').addClass('game-over')
    setTimeout(() => {
      $('body').removeClass('game-over')
    }, 200)
    $('h1').html('Game Over, Press Any Key to Restart')
    startOver();
    return;
  }

  // check if all elements of pattern are checked
  if(gamePattern.length - 1 === currentLevel) {
    setTimeout(function () {
      nextSequence()
      console.log(`gamePattern : ${gamePattern}`)
      console.log(`userClickedPattern : ${userClickedPattern}`)
    }, 1000)
  }
}

// Function to reset the values to restart the game
function startOver() {
  level = 0;
  counter = 0;
  gamePattern = [];
}
