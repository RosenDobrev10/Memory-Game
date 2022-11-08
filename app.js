const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];

let isStarted = false;
let level = 0;

$("button").click(function () {
    if (!isStarted) {
        $("h1").text(`Level ${level}`);
        $("button").fadeOut();
        nextSequence();
        isStarted = true;
    }
});

$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length - 1);
});

function checkAnswer(level) {
    if (gamePattern[level] === userPattern[level]) {
        if (gamePattern.length === userPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        playAgain();
    }
}

function nextSequence() {
    userPattern = [];
    level++;
    $("h1").text(`Level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(color) {
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

function animatePress(color) {
    $(`#${color}`).addClass("pressed");
    setTimeout(function () {
        $(`#${color}`).removeClass("pressed");
    }, 100);
}

function playAgain() {
    if (level >= 9) {
        $("h1").html("Excellent Memory<br> Well Done👌");
    } else if (level >= 6) {
        $("h1").html("Very good Memory<br> Close To Excellence👋");
    } else if (level >= 3) {
        $("h1").html("Good Memory<br> You Can Do Better✊");
    } else {
        $("h1").html("Bad Memory<br> Try Again👎");
    }
    level = 0;
    gamePattern = [];
    isStarted = false;
    $("button").fadeIn();
    $("button").text("Play again");
}
