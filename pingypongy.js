intervalId = null;
var canvas = document.getElementById("canvas");
var startBtn = document.getElementById("startbutton");
var sound = new Audio("pong3.wav");
var sound2 = new Audio("clap.wav");
var ball, player1, player2;

whosTurn = "p1";

startBtn.onclick = function() {
  startBtn.style.display = "none";
  ball = new Ball();
  //creation of Player1-Player2
  player1 = new Paddle("greenyellow", 10, canvas.height / 2, 0); // params are color, x pos, y pos for each new Paddle
  player2 = new Paddle("greenyellow", 755, canvas.height / 2, 0);
  intervalId = window.requestAnimationFrame(draw);
}; // draw yazardın eğer function içine koymasaydın: draw dont put the paranthesis because you call immediatly

//Changing colors of the background
function generateRandomColor() {
  const possibleColors = ["#E3CDFB", "#FAFADA", "#E6F9DE"];
  console.log(Math.floor(Math.random() * possibleColors.length));
  const rand = Math.floor(Math.random() * possibleColors.length);
  return possibleColors[rand];
}

// function color(list) {
//   return "#" +
//     (list += [blue, pink, orange, green][Math.floor(Math.random() * 16)]) &&
//     list.length == 6
//     ? list
//     : color(list);
// }
// ("");

// Changes the color of the background using STYLE
function changeBackgroundColor() {
  var colorBg = document.querySelector("body");
  colorBg.style.backgroundColor = generateRandomColor();
}

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var ctx = canvas.getContext("2d");
ctx.font = "20px Monospace";

function Ball() {
  reset = false;
  this.color = "greentyellow";
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.ballRadius = 8;
  this.dy = whosTurn === "p2" ? -6 : 6; //horizantal direction
  this.dx = whosTurn === "p2" ? -6 : 6; //vertical direction/speed
  this.x_speed = 10;
  this.y_speed = 10;
}

Ball.prototype.draw = function() {
  // console.log("yay");
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2, true);
  ctx.fill();
};

var reset = false;

Ball.prototype.reset = function() {
  reset = true;

  setTimeout(() => {
    console.log("reset");
    ball = new Ball();
  }, 1000);
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
    // console.log("right sıde");

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

//                    ------------------- PLAYER ONE -------------------

Paddle.prototype.hitP1 = function() {
  if (
    ball.x < player1.x + player1.w &&
    ball.x + ball.dx > player1.x &&
    ball.y < player1.y + player1.h &&
    ball.y + ball.dy > player1.y
  ) {
    ball.dx = -ball.dx; // hit the ball on the opposite way
    sound.play();
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
    sound.play();
    return true;
  }
  return false;
};

function displayScore() {
  ctx.fillText(
    "   P1: " +
      player1.score +
      "                                                P2: " +
      player2.score,
    0,
    20
  );
}

function keyDownHandler(e) {
  if (e.key === "s" || e.key === "S") {
    player1.y -= 70; // speed of the paddle
  } else if (e.key === "z" || e.key === "Z" || e.key === "w") {
    //key up
    player1.y += 70;
  } else if (e.key === "ArrowUp") {
    player2.y -= 70;
  } else if (e.key === "ArrowDown") {
    player2.y += 70;
  }
}
//                                   ------------WINNER-------------
function setScore(winner) {
  console.log(winner);
  if (reset === false) {
    if (winner === "player1") {
      player1.score++;
      whosTurn = "p1";

      sound2.play();
    } else if (winner === "player2") {
      player2.score++;
      whosTurn = "p2";

      sound2.play();
    }
    ball.reset();

    if (winner === "player1") {
      ball.dy = 7; //horizantal direction
      ball.dx = 7; //vertical direction/speed
    } else if (winner === "player2") {
      ball.dy = -7; //horizantal direction
      ball.dx = -7; //vertical direction/speed
    }
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
    setScore(ball.x < 0 ? "player2" : "player1");
  }
  ball.checkBorderRebounce();
  window.requestAnimationFrame(draw);
}

document.onkeydown = keyDownHandler; //action when the key is pressed
setInterval(changeBackgroundColor, 1000);

// intervalId = window.requestAnimationFrame(draw);
