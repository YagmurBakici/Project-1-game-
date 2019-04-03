var canvas = document.getElementById("canvas");

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var ctx = canvas.getContext("2d");
startBtn = {};

function Ball() {
  this.color = "greentyellow";
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.ballRadius = 10;
  this.dy = 4; //horizantal dimension
  this.dx = 4; //vertical way dim
  this.x_speed = 3;
  this.y_speed = 3;
}

Ball.prototype.draw = function() {
  // console.log("yay");
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2, true);
  ctx.fill();
};
var ball = new Ball();
ball.draw();

//to draw paddle(rectangle)
function Paddle(color, x, y, score) {
  this.color = color;
  this.x = x;
  this.y = y;
  this.h = 100;
  this.w = 20;
  this.score1 = 0;
  this.score2 = 0;
}

//score
var score1 = 0;
var score2 = 0;

Paddle.prototype.draw = function() {
  //G'nin yaptıgı kısım prototype is defining arrays/paddle prototype tied to draw
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.w, this.h);
};

//creation of Player1-Player2
var player1 = new Paddle("greenyellow", 10, canvas.height / 2, score1); // params are color, x pos, y pos for each new Paddle
player1.draw();
var player2 = new Paddle("greenyellow", 750, canvas.height / 2, score2);
player2.draw();

function keyDownHandler(e) {
  //console.log(e);
  //ctx.clearRect(this.x, this.y, this.w, this.h);
  if (e.key === "s") {
    // console.log("uppppp");
    // console.log(player1.y);
    player1.y -= 30; // speed of the paddle
  } else if (e.key === "z") {
    player1.y += 30;
  } else if (e.key === "ArrowUp") {
    player2.y -= 30;
  } else if (e.key === "ArrowDown") {
    player2.y += 30;
  }
}

///////draw functions

var isActive = true;
function draw() {
  ctx.clearRect(0, 0, 800, 600);

  player1.draw();
  player2.draw();

  if (isActive) {
    ball.draw();
  }

  //SHowing the Score
  ctx.fillText(
    " P1: " +
      score1 +
      "                                                    P2: " +
      score2,
    10,
    20
  );
  ctx.font = "20px Monospace";
  ball.x += ball.dx;
  ball.y += ball.dy;

  //???????????
  // if (ball.y + ball.r > canvas.height || ball.y < 0) {
  //   ball.vx *= -1;
  // }

  if (ball.x - ball.r < player1.x + player1.w || ball.x + ball.r > player2.x) {
  }

  // ------------------- PLAYER ONE -------------------
  //when player1 hits ball
  // if (ball.x - ball.r < player1.x + player1.w) {
  // }
  //horizantally hits

  if (ball.y + ball.r > player1.y && ball.y < player1.y + player1.h) {
    console.log(score1);
    score1++;
  }
  // player1--bouncing the ball on x axes
  if (ball.x - ball.r < player1.y + player1.w) {
    console.log("whar does this do?");
  }

  /// ------------ PLAYER TWO -------------
  //when palyer2 hits ball
  // if (ball.x + ball.r > player2.x) {
  // }

  if (ball.y + ball.r > player2.y && ball.y < player2.y + player2.h) {
    score2++;
  }
  //  ball.vx *= -1;

  // player2--bouncing the ball on x axes
  if (ball.x + ball.r > player2.x) {
    console.log("whar does this do?");
  }
  // --------------- BOUNCING OFF EDGES ----------
  //when it hits the left and right
  if (
    ball.x + ball.dx > canvas.width - ball.ballRadius ||
    ball.x + ball.dx < ball.ballRadius
  ) {
    console.log("wwwww");

    //return;
    ball.dx = -ball.dx;
    isActive = false;
  }

  ///when it hits the bottom and top
  else if (
    ball.y + ball.dy > canvas.height - ball.ballRadius ||
    ball.y + ball.dy < ball.ballRadius
  ) {
    ball.dy = -ball.dy;
  }
}

document.onkeydown = keyDownHandler; //action when the key is pressed

setInterval(draw, 10);
