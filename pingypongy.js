var canvas = document.getElementById("canvas");

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var ctx = canvas.getContext("2d");
startBtn = {};

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

  if (ball.y + ball.r > canvas.height || ball.y < 0) {
    ball.vx *= -1;
  }

  if (ball.x - ball.r < player1.x + player1.w || ball.x + ball.r > player2.x) {
    console.log("hit??");
  }
  // player1--bouncing the ball on x axes
  if (ball.x - ball.r < player1.y + player1.w) {
  }
 // player1--bouncing the ball on y axes

  if (ball.y + ball.r > player1.y && ball.y < player1.y + player1.h) {
    score1++;
  // } else {
  //   //console.log("out of bounds");
  //   clearInterval();
  // }

 // player2--bouncing the ball on x axes
  if (ball.x + ball.r > player2.x) {
  }

   // player2--bouncing the ball on y axes
  if (ball.y + ball.r > player2.y && ball.y < player2.y + player2.h) {
    score2++;
  // } else {
  //   clearInterval(init);
  //   // console.log("out of bounds");
  // }
  ball.vx *= -1;
  //when it hits the left and right
  if (ball.x + ball.dx > canvas.width - ball.ballRadius);
  else if (ball.x + ball.dx < ball.ballRadius) {
    score1++;
   
    return;

    ball.dx = -ball.dx;
   

    
    console.log("hit on side");
  }

  ///when it hits the bottom and top
  if (
    ball.y + ball.dy > canvas.height - ball.ballRadius ||
    ball.y + ball.dy < ball.ballRadius
  ) {
    console.log("hit on top and bottom");
    ball.dy = -ball.dy;
  }
}

document.onkeydown = keyDownHandler;

setInterval(draw, 10);
