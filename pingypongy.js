intervalId = null;
var canvas = document.getElementById("canvas");
var startBtn = document.getElementById("startbutton");
startBtn.onclick = function() {
  draw();
  startBtn.style.display = "none";
};
// draw yazardın eğer function içine koymasaydın: draw dont put the paranthesis because you call immediatly

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var ctx = canvas.getContext("2d");
ctx.font = "20px Monospace";

function Ball() {
  this.isActive = true;
  this.color = "greentyellow";
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.ballRadius = 10;
  this.dy = 8; //horizantal direction
  this.dx = 8; //vertical direction
  this.x_speed = 15;
  this.y_speed = 15;
}

Ball.prototype.draw = function() {
  // console.log("yay");
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2, true);
  ctx.fill();
};

Ball.prototype.setActive = function() {
  this.isActive = true;
};

Ball.prototype.reset = function() {
  console.log("reset");
  // ball = new Ball();
  ball = new Ball();
  // window.cancelAnimationFrame(intervalId);
  setTimeout(function() {
    // isActive = true;
    // intervalId = window.requestAnimationFrame(draw);
  }, 1000); // wait 1 second
  //ball.draw();
};

//bottom and top bouncing
Ball.prototype.checkBorderRebounce = function() {
  if (
    this.y + ball.dy > canvas.height - this.ballRadius ||
    this.y + this.dy < ball.ballRadius
  ) {
    this.dy = -this.dy;
  }
};

//right and left getting out off
Ball.prototype.checkBorderExit = function() {
  if (ball.x > canvas.width + 2 * ball.ballRadius) {
    // console.log("riıght sıde");

    return true;
  }
  if (ball.x < -2 * ball.ballRadius) {
    // console.log("left side");
    return true;
  }
  return false;
};

//To draw paddle(rectangle)
function Paddle(color, x, y, score) {
  this.color = color;
  this.x = x;
  this.y = y;
  this.h = 100;
  this.w = 20;
  this.score = 0;
}

Paddle.prototype.draw = function() {
  //prototype is defining arrays----paddle prototype tied to draw
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.w, this.h);
};

var ball = new Ball();
//creation of Player1-Player2
var player1 = new Paddle("greenyellow", 10, canvas.height / 2, 0); // params are color, x pos, y pos for each new Paddle
var player2 = new Paddle("greenyellow", 755, canvas.height / 2, 0);

//                    ------------------- PLAYER ONE -------------------

Paddle.prototype.hitP1 = function() {
  if (
    ball.x < player1.x + player1.w &&
    ball.x + ball.dx > player1.x &&
    ball.y < player1.y + player1.h &&
    ball.y + ball.dy > player1.y
  ) {
    ball.dx = -ball.dx; // hit the ball on the opposite way
    return true;
  }
  return false;
  // function + if ==>you need to return something bu ikisi olunca
};

//                   ------------------- PLAYER TWO -------------------

Paddle.prototype.hitP2 = function() {
  if (
    ball.x < player2.x + player2.w &&
    ball.x + ball.dx > player2.x &&
    ball.y < player2.y + player2.h &&
    ball.y + ball.dy > player2.y
  ) {
    ball.dx = -ball.dx;
    return true;
  }
  return false;
};

var playerOneScore = player1.score;
var playerTwoScore = player2.score;

function displayScore() {
  ctx.fillText(
    "   P1: " +
      playerOneScore +
      "                                                P2: " +
      playerTwoScore,
    0,
    20
  );
}

function keyDownHandler(e) {
  if (e.key === "s") {
    player1.y -= 60; // speed of the paddle
  } else if (e.key === "z") {
    //key up
    player1.y += 60;
  } else if (e.key === "ArrowUp") {
    player2.y -= 60;
  } else if (e.key === "ArrowDown") {
    player2.y += 60;
  }
}

//                          ---------------------DRAW FUNCTIONS------------------

function draw(now) {
  ctx.clearRect(0, 0, 800, 600);
  displayScore();
  player1.draw();
  player2.draw();
  ball.draw();
  player1.hitP1();
  player2.hitP2();

  ball.x += ball.dx;
  ball.y += ball.dy;
  // }

  if (ball.checkBorderExit()) {
    //if ball exits from left right axes reset the ball
    const winner = ball.x < 0 ? "player2" : "player1";
    // console.log("someone wins", winner);
    winner.score++;
    if (winner === "player1") {
      playerOneScore++;
    } else if (winner === "player2") {
      playerTwoScore++;
    }
    ball.reset();
  }

  ball.checkBorderRebounce();
  window.requestAnimationFrame(draw);
}

document.onkeydown = keyDownHandler; //action when the key is pressed

// intervalId = window.requestAnimationFrame(draw);
