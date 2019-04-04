intervalId = null;
var canvas = document.getElementById("canvas");

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var ctx = canvas.getContext("2d");
ctx.font = "20px Monospace";

var startBtn = StartButton();
//SCORE
var score1 = 0;
var score2 = 0;

function Ball() {
  this.isActive = true;
  this.color = "greentyellow";
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.ballRadius = 10;
  this.dy = 4; //horizantal direction
  this.dx = 4; //vertical direction
  this.x_speed = 6;
  this.y_speed = 6;
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
  // window.cancelAnimationFrame(intervalId);
  setTimeout(function() {
    // isActive = true;
    ball = new Ball();
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
    return true;
  }
  if (ball.x < -2 * ball.ballRadius) {
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
  this.score1 = 0;
  this.score2 = 0;
}

Paddle.prototype.draw = function() {
  //prototype is defining arrays----paddle prototype tied to draw
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.w, this.h);
};

var ball = new Ball();
//creation of Player1-Player2
var player1 = new Paddle("greenyellow", 10, canvas.height / 2, score1); // params are color, x pos, y pos for each new Paddle
var player2 = new Paddle("greenyellow", 755, canvas.height / 2, score2);

//                    ------------------- PLAYER ONE -------------------

Paddle.prototype.hitP1 = function() {
  if (
    ball.x < player1.x + player1.w &&
    ball.x + ball.dx > player1.x &&
    ball.y < player1.y + player1.h &&
    ball.y + ball.dy > player1.y
  ) {
    ball.dx = -ball.dx; // hit the ball on the opposite way
  }
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
  }
};

function displayScore() {
  ctx.fillText(
    " P1: " +
      score1 +
      "                                                  P2: " +
      score2,
    10,
    20
  );
}

function keyDownHandler(e) {
  //console.log(e);
  //ctx.clearRect(this.x, this.y, this.w, this.h);
  if (e.key === "s") {
    // console.log("uppppp");
    player1.y -= 60; // speed of the paddle
  } else if (e.key === "z") {
    player1.y += 60;
  } else if (e.key === "ArrowUp") {
    player2.y -= 60;
  } else if (e.key === "ArrowDown") {
    player2.y += 60;
  }
}

function StartButton() {
  return {
    w: 100,
    h: 50,
    x: canvas.width / 2 - 50,
    y: canvas.height / 2 - 25,

    draw: function() {
      ctx.strokeStyle = "greenyellow";
      ctx.lineWidth = "2";
      ctx.strokeRect(this.x, this.y, this.w, this.h);

      ctx.font = "18px Monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStlye = "Green";
      ctx.fillText("Start", W / 2, H / 2);
    }
  };
}

function checkPlaygroundExit() {}

//                          ---------------------DRAW FUNCTIONS------------------

function draw(now) {
  ctx.clearRect(0, 0, 800, 600);
  displayScore();
  player1.draw();
  player2.draw();
  ball.draw();

  if (player1.hitP1() && ball.checkBorderExit()) {
    score1++;
  }
  //   ball.reset();
  //   ball.dy = -4; //horizantal direction
  //   ball.dx = -4; //vertical direction
  // }

  if (player2.hitP2() && ball.checkBorderExit()) {
    score2++;
  }

  // if (now % 60 === 1) {
  ball.x += ball.dx;
  ball.y += ball.dy;
  // }

  if (ball.checkBorderExit()) {
    //if ball exits from left right axes reset the ball
    ball.reset();
  }

  ball.checkBorderRebounce();
  window.requestAnimationFrame(draw);

  //pLAYER 1
  // if (
  //   ball.y > canvas.height + ball.ballRadius ||
  //   ball.y < canvas.height + ball.ballRadius
  // ) {
  // }
  // if (ball.x - ball.ballRadius < player1.x + player1.w) {
  //   console.log("It works??");
  //   isActive = false;
  // }
  // if (
  //   ball.x < player1.x + player1.w &&
  //   ball.x + ball.dx > player1.x &&
  //   ball.y < player1.y + player1.h &&
  //   ball.y + ball.dy > player1.y
  // ) {
  //   ball.dx = -ball.dx;
  //   // isActive = true;
  // }
  // /// ------------ PLAYER TWO -------------

  // if (
  //   ball.x < player2.x + player2.w &&
  //   ball.x + ball.dx > player2.x &&
  //   ball.y < player2.y + player2.h &&
  //   ball.y + ball.dy > player2.y
  // ) {
  //   ball.dx = -ball.dx;
  //   score2++;
  // }

  // // ----------------------------------- BOUNCING OFF EDGES ----------------------------------

  // //-----------When it hits the left and right

  // if (ball.x + ball.dx > canvas.width - ball.ballRadius) {
  //   // console.log("passing the X axes");

  //   ball.dx = -ball.dx;
  //   isActive = false;
  // } else if (ball.x < 0) {
  //   ball.dx = +ball.dx;
  //   isActive = false;
  // }
  // ///------------------When it hits the bottom and top---------------
  // else if (
  //   ball.y + ball.dy > canvas.height - ball.ballRadius ||
  //   ball.y + ball.dy < ball.ballRadius
  // ) {
  //   ball.dy = -ball.dy;
  // }
}

document.onkeydown = keyDownHandler; //action when the key is pressed

// setInterval(draw, 10);

intervalId = window.requestAnimationFrame(draw);
