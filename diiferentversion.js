var canvas = document.getElementById("canvas");

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var ctx = canvas.getContext("2d");

var w = canvas.width;
var h = canvas.height;

var rightPressed = false;
var leftPressed = false;

//to draw paddle(rectangle)
function Paddle(color, padId, x, y) {
  this.color = color;
  this.x = x;
  this.y = y;
  this.h = 100;
  this.w = 20;
  this.keys = {
    up: padId === "a" ? "s" : "ArrowUp",
    down: padId === "a" ? "z" : "ArrowDown"
  };
  this.listen();
  this.draw();
  //this.interval = setInterval(this.draw, 10);
}

Paddle.prototype.draw = function() {
  //G'nin yaptıgı kısım prototype is defining arrays/paddle prototype tied to draw
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.w, this.h);
};

Paddle.prototype.listen = function() {
  function keyDownHandler(e) {
    console.log(e.key === "s");

    if (e.key === this.keys.up) {
      this.y -= 10;
    } else if (e.key === this.keys.down) {
      this.y += 10;
    }

    this.draw();
  }
  // binding forces this to be Paddle{} in keyDownHandler scope
  document.onkeydown = keyDownHandler.bind(this);
};

//to draw circle
var ball = {
  x: w / 2,
  y: h / 2,
  ballRadius: 10,
  dy: 4, //horizantal
  dx: 4, //vertical way dim
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2, true);
    ctx.fill();
  }
};

// //circle/ball draw
// var ball=new circle()
// ball.x=w/2;
// ball.y=h/2;
// ball.r=20;

// /////Player1
//                      color id x y
var player1 = new Paddle("red", "a", 10, h / 2);
// player1.x = 10;
// player1.y = h / 2;
// player1.w = 20;
// player1.h = 100;

var player2 = new Paddle("greenyellow", "b", 750, h / 2);
// player2.x = 750;
// player2.y = h / 2;
// player2.w = 20;
// player2.h = 100;

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
// function draw() {
//   ctx.clearRect(0, 0, 800, 600); //to clear th page at the end
//   player1.draw();
//   player2.draw();
//   ball.draw();
// }

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
// setInterval(draw, 10); //method calls a function at specified intervals(in milisec.)
