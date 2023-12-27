function GameWorld() {
  this.balls = CONSTANTS.ballsParams.map((params) => new Ball(...params));

  this.whiteBall = this.balls.find((ball) => ball.color === COLOR.WHITE);

  this.stick = new Stick(
    new Vector2(413, 413),
    this.whiteBall.shoot.bind(this.whiteBall)
  );

  this.table = {
    TopY: 57,
    RightX: 1443,
    BottomY: 768,
    LeftX: 57,
  };
}

GameWorld.prototype.handleCollision = function () {
  for (let i = 0; i < this.balls.length; i++) {
    this.balls[i].handleBallInPocket();
    this.balls[i].collideWithTable(this.table);
    for (let j = i + 1; j < this.balls.length; j++) {
      const firstBall = this.balls[i];
      const secondBall = this.balls[j];
      firstBall.collideWithBall(secondBall);
    }
  }
};

GameWorld.prototype.update = function () {
  this.handleCollision();

  this.stick.update();

  for (let i = 0; i < this.balls.length; i++) {
    this.balls[i].update(CONSTANTS.delta);
  }

  if (!this.ballsMoving() && this.stick.shot) {
    this.stick.reposition(this.whiteBall.position);
  }
};

GameWorld.prototype.draw = function () {
  Canvas.draw(sprites.background, 0, 0);
  for (let i = 0; i < this.balls.length; i++) {
    this.balls[i].draw();
  }
  this.stick.draw();
};

GameWorld.prototype.ballsMoving = function () {
  const hasMovingObject = this.balls.some((ball) => ball.moving === true);

  let ballsMoving = hasMovingObject ? true : false;

  return ballsMoving;
};
