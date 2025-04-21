// Player variables
var x = 50;
var y = 50;
var diameter = 25;

// Obstacle variables
var obstacles = [];
var obstacleCount = 5;

// Static obstacle via mouse click
var staticObstacle = null;

// Exit area
var exitX = 750;
var exitY = 550;
var exitSize = 50;

// Game state
var won = false;

function setup() {
  createCanvas(800, 600);
  createObstacles();
}

function draw() {
  background(0);
  drawBorders();

  if (!won) {
    drawExit();
    movePlayer();
    drawPlayer();
    moveObstacles();
    drawStaticObstacle();
    checkWinCondition();
  } else {
    displayWinMessage();
  }
}


function drawPlayer() {
  fill(24, 200, 29);
  circle(x, y, diameter);
}

function movePlayer() {
  if (keyIsDown(83)) y += 5;       // S
  if (keyIsDown(87)) y -= 5;       // W
  if (keyIsDown(68)) x += 5;       // D
  if (keyIsDown(65)) x -= 5;       // A
}

function drawStaticObstacle() {
  if (staticObstacle != null) {
    fill(200, 50, 200);
    rect(staticObstacle.x, staticObstacle.y, 30, 30);
  }
}

function createObstacles() {
  for (var i = 0; i < obstacleCount; i++) {
    obstacles.push({
      x: random(width),
      y: random(height),
      w: random(20, 60),
      h: random(20, 60),
      color: [random(255), random(255), random(255)],
      speedX: random(-2, 2),
      speedY: random(-2, 2)
    });
  }
}

function moveObstacles() {
  for (var i = 0; i < obstacles.length; i++) {
    var obs = obstacles[i];
    obs.x += obs.speedX;
    obs.y += obs.speedY;

    // Wrap around
    if (obs.x > width) obs.x = 0;
    if (obs.x < 0) obs.x = width;
    if (obs.y > height) obs.y = 0;
    if (obs.y < 0) obs.y = height;

    fill(obs.color);
    rect(obs.x, obs.y, obs.w, obs.h);
  }
}

function drawBorders() {
  stroke(255);
  strokeWeight(4);
  noFill();
  rect(0, 0, width, height);
}

function drawExit() {
  noStroke();
  fill(255, 255, 0);
  rect(exitX, exitY, exitSize, exitSize);
}

function checkWinCondition() {
  if (x > exitX && x < exitX + exitSize && y > exitY && y < exitY + exitSize) {
    won = true;
  }
}

function displayWinMessage() {
  fill(0, 255, 0);
  textSize(64);
  textAlign(CENTER, CENTER);
  text("You Win!", width / 2, height / 2);
}

// Place static obstacle on mouse click
function mousePressed() {
  staticObstacle = {
    x: mouseX,
    y: mouseY
  };
}
