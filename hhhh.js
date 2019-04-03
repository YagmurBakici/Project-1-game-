function draw() {
  //   console.log(ball.x, ball.y);

  //   ctx.clearRect(0, 0, 800, 600);
  //   ball.draw();
  //   player1.draw();
  //   player2.draw();

  //   //SHowing the Score
  //   ctx.fillText(
  //     " P1: " +
  //       score1 +
  //       "                                                    P2: " +
  //       score2,
  //     10,
  //     20
  //   );
  //   ctx.font = "20px Monospace";

  //   //Moving the ball
  //   ball.x += ball.dx;
  //   ball.y += ball.dy;

  //   if (ball.y + ball.r > canvas.height || ball.y < 0) {
  //     ball.vx *= -1;
  //   }

  //   if (ball.x - ball.r < player1.x + player1.w || ball.x + ball.r > player2.x) {
  //     console.log("hit??");
  //   }
  // player1--bouncing the ball on x axes
  if (ball.x - ball.r < player1.y + player1.w) {
  }

  //   //BOUNCING THIRD TRYYYYYYYYYYYYY !!!!
  //   function bounce() {
  //     return (
  //       player1.x < player2 + player2.w &&
  //       player1.y + player2.h &&
  //       player2.x < player1.x + player1.w &&
  //       player2 < player1 + player2.h
  //     );
  //   }
  // var paddle=ball.dx<0 ? player1;
  // if (bounce(paddle.x, paddle.y, paddle.w, paddle.h,ball.x,ball.y,ball.dx,ball.vx))
  //ERASE ABOVE!!!!!!!CAUSE ITS NOT WORKING

  // player1--bouncing the ball on y axes

  //   if (ball.y + ball.r > player1.y && ball.y < player1.y + player1.h) {
  //     score1++;
  //     // } else {
  //     //   //console.log("out of bounds");
  //     //   clearInterval();
  //   }

  // player2--bouncing the ball on x axes
  if (ball.x + ball.r > player2.x) {
  }

  // player2--bouncing the ball on y axes
  //   if (ball.y + ball.r > player2.y && ball.y < player2.y + player2.h) {
  //     score2++;
  // } else {
  //   clearInterval(init);
  //   // console.log("out of bounds");
  // }
  ball.vx *= -1;
  //when it hits the left and right
  // if (
  //   ball.x + ball.dx > canvas.width - ball.ballRadius ||
  //   ball.x + ball.dx < ball.ballRadius
  // ) {
  //   score1++, (ball.dx = -ball.dx);

  //   return;

  //   console.log("hit on side");
  // }

  ///when it hits the bottom and top
  // if (
  //   ball.y + ball.dy > canvas.height - ball.ballRadius ||
  //   ball.y + ball.dy < ball.ballRadius
  // ) {
  //   console.log("hit on top and bottom");
  //   ball.dy = -ball.dy;
  //   return;
  // }
  //   }
}
