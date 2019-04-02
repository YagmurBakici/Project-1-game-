var canvas = document.getElementById("canvas");

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var ctx = canvas.getContext("2d");

var w = canvas.width;
var h = canvas.height;

var rightPressed = false;
var leftPressed = false;

//to draw paddle(rectangle)
function Paddle(color, padId) {
  this.color = color;
  this.x = 0;
  this.y = 0;
  this.h = 100;
  this.w = 100;
  this.keys = {
    up: padId === "a" ? "s" : "z",
    down: padId === "a" ? "KeyZ" : "ArrowDown"
  };
  this.listen();
}

Paddle.prototype.draw = function() {
  //G'nin yaptıgı kısım prototype is defining arrays/paddle prototype tied to draw

  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.w, this.h);
};

Paddle.prototype.listen = function() {
  function keyDownHandler(e) {
    console.log("logged", e.key);

    if (e.key == this.keys.up) {
      this.y -= 10;
    } else if (e.key == this.keys.down) {
      this.y += 10;
    }
    // force thıs to be Paddle{} in keyDownHandler scope
  }
  document.onkeydown = keyDownHandler.bind(this);
};

//to draw circle
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = 3;
  this.radius = 5;
}

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();
};

var update = function() {
  ball.update();
};
var ball = new Ball(200, 300);

Ball.prototype.update = function() {
  this.x += this.x_speed;
  this.y += this.y_speed;
};

var update = function() {
  ball.update(player.paddle, computer.paddle);
};

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if (this.x - 5 < 0) {
    // hitting the left wall
    this.x = 5;
    this.x_speed = -this.x_speed;
  } else if (this.x + 5 > 400) {
    // hitting the right wall
    this.x = 395;
    this.x_speed = -this.x_speed;
  }

  if (this.y < 0 || this.y > 600) {
    // a point was scored
    this.x_speed = 0;
    this.y_speed = 3;
    this.x = 200;
    this.y = 300;
  }
  if (top_y > 300) {
    if (
      top_y < paddle1.y + paddle1.height &&
      bottom_y > paddle1.y &&
      top_x < paddle1.x + paddle1.width &&
      bottom_x > paddle1.x
    ) {
      // hit the player's paddle
      this.y_speed = -3;
      this.x_speed += paddle1.x_speed / 2;
      this.y += this.y_speed;
    }
  } else {
    if (
      top_y < paddle2.y + paddle2.height &&
      bottom_y > paddle2.y &&
      top_x < paddle2.x + paddle2.width &&
      bottom_x > paddle2.x
    ) {
      // hit the computer's paddle
      this.y_speed = 3;
      this.x_speed += paddle2.x_speed / 2;
      this.y += this.y_speed;
    }
  }
};

// //circle/ball draw
// var ball=new circle()
// ball.x=w/2;
// ball.y=h/2;
// ball.r=20;

// /////Player1
var player1 = new Paddle("greenyellow", "a");
player1.x = 10;
player1.y = h / 2;
player1.w = 20;
player1.h = 100;

var player2 = new Paddle("greenyellow", "b");
player2.x = 750;
player2.y = h / 2;
player2.w = 20;
player2.h = 100;

//moving the player1
// document.addEventListener("keypress", keyDownHandler, false); //for the keyboard-the default value for both is false because at the beginning the control buttons are not pressed.
// document.addEventListener("keypress", keyUpHandler, false);
// function keyDownHandler(e) {
//   console.log("logged", e.key);

//   if (e.key == "Up" || e.key == "ArrowUp") {
//     // console.log("rıght key");
//     player1.y -= 10;

//     rightPressed = true;
//   } else if (e.key == "Down" || e.key == "ArrowDown") {
//     // console.log("left key");
//     player1.y += 5;
//     leftPressed = true;
//   } else if (e.key == "s" || e.key == "KeyS") {
//     console.log("right keycheck");
//     player2.y -= 10;

//     rightPressed = true;
//   } else if (e.key == "z" || e.key == "KeyZ") {
//     // console.log("left key");
//     player2.y += 5;
//     leftPressed = true;
//   }
// }

// function keyUpHandler(e) {
//   if (e.key == "Up" || e.key == "ArrowUp") {
//     rightPressed = false;
//   } else if (e.key == "Down" || e.key == "ArrowDown") {
//     leftPressed = false;
//   } else if (e.key == "S" || e.key == "KeyS") {
//     rightPressed = false;
//   } else if (e.key == "Z" || e.key == "KeyZ") {
//     leftPressed = false;
//   }
// }
// if (rightPressed) {
//   paddleX += 7;
// } else if (leftPressed) {
//   paddleX -= 7;
// }
// if (rightPressed && paddleX < canvas.width - paddleWidth) {
//   paddleX += 7;
// } else if (leftPressed && paddleX > 0) {
//   paddleX -= 7;
// }

// Paddle();

// /////Player2 (or computer)

// ctx.fillStyle = "red";
// ctx.fillRect(100, 100, 50, 50);
// console.log("here", ctx);

///////DRAW function
function draw() {
  ctx.clearRect(0, 0, 800, 600); //to clear th page at the end
  player1.draw();
  player2.draw();
  ball.draw();
}

//move the ball:
/*
ball.x += ball.dx;
ball.y += ball.dy;

if (ball.y + ball.r > h || ball.y < 0) {
  ball.vx *= -1;
}

if (ball.x - ball.r < player1.x + player1.w || ball.x + ball.r > player2.x) {
 
}
//when player1 hits ball
if ( ball.x-ball.r<player1.x+player1.w){}

if (ball) {}
//when palyer2 hits ball
else if(ball.x+ ball.r>player2.x){}
ball.vx *= -1; 



  if()
  x + ball.dx > canvas.width - ball.ballRadius ||
  x + ball.dx < ball.ballRadius
) {
  ball.dx = -ball.dx;
}
if (
  y + ball.dy > canvas.height - ball.ballRadius ||
  y + ball.dy < ball.ballRadius
) {
  ball.dy = -ball.dy;
}

x += ball.dx;
y += ball.dy;
*/
setInterval(draw, 10); //method calls a function at specified intervals(in milisec.)
