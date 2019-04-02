var canvas = document.getElementById("canvas");

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var ctx = canvas.getContext("2d");

function Ball() {
  this.color = "orange";
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.ballRadius = 10;
  this.dy = 4; //horizantal dimension
  this.dx = 4; //vertical way dim
}

Ball.prototype.draw = function() {
  // console.log("yay");
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2, true);
  ctx.fill();
};

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

var ball = new Ball();
ball.draw();

//creation of Player1-Player2
var player1 = new Paddle("greenyellow", 10, canvas.height / 2, score1); // params are color, x pos, y pos for each new Paddle
player1.draw();
var player2 = new Paddle("greenyellow", 750, canvas.height / 2, score2);
player2.draw();

function keyDownHandler(e) {
  // console.log(e.key);
  //ctx.clearRect(this.x, this.y, this.w, this.h);
  if (e.key === "s") {
    // console.log("uppppp");
    // console.log(player1.y);
    player1.y -= 10;
  } else if (e.key === "z") {
    player1.y += 10;
  } else if (e.key === "ArrowUp") {
    player2.y -= 10;
  } else if (e.key === "ArrowDown") {
    player2.y += 10;
  }
  //ctx.clearRect(0, 0, 800, 600);
  //ball.draw();

  //player1.draw();
  //player2.draw();
}

///////draw functions + move the ball:

function draw() {
  ctx.clearRect(0, 0, 800, 600);

  ball.draw();
  player1.draw();
  player2.draw();
  ctx.fillText("score : " + score1, "score : " + score2, canvas.width / 2, 10);
  ctx.font = "20px Monospace";
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y + ball.r > canvas.height || ball.y < 0) {
    ball.vx *= -1;
  }

  if (ball.x - ball.r < player1.x + player1.w || ball.x + ball.r > player2.x) {
  }
  //when player1 hits ball
  if (ball.x - ball.r < player1.x + player1.w) {
  }
  //horizantally hits

  if (ball.y + ball.r > player1.y && ball.y < player1.y + player1.h) {
    score1++;
  } else clearInterval(init);

  //when palyer2 hits ball
  if (ball.x + ball.r > player2.x) {
  }
  if (ball.y + ball.r > player2.y && ball.y < player2.y + player2.h) {
    score2++;
  } else clearInterval(init);
  ball.vx *= -1;

  if (
    ball.x + ball.dx > canvas.width - ball.ballRadius ||
    ball.x + ball.dx < ball.ballRadius
  ) {
    ball.dx = -ball.dx;
  }
  if (
    ball.y + ball.dy > canvas.height - ball.ballRadius ||
    ball.y + ball.dy < ball.ballRadius
  ) {
    ball.dy = -ball.dy;
  }
}

document.onkeydown = keyDownHandler;

setInterval(draw, 10);
