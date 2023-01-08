var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

/*here we add nextSequence function to play music and show animation when we clicked anykey*/
$(document).keypress(function() {
  if (!started) {
    $(".level-title").text("Level " + level);
    nextSequence(); // call the next nextSequence function when user hit a key
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); // here when we click any button the value of the id associated with that button gonna store in userChosenColour
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $(".level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}


function nextSequence() { // nextSequence function will play music randomly
  userClickedPattern = [];
  level++; // increase the level by 1 each time when nextSequence function will call
  $(".level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(".anykey").on("click", function(){
  if (!started) {
    $(".level-title").text("Level " + level);
    nextSequence(); // call the next nextSequence function when user hit a key
    started = true;
  }
});
