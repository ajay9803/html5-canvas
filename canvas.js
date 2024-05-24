var canvas1 = document.getElementById("canvas1");

canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;

var c = canvas1.getContext("2d");

const mouse = {
  x: undefined,
  y: undefined,
};

let maxRadius = 40;
let minRadius = 4;

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", () => {
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;
  init();
});

class Circle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;

    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.strokeStyle = color;
      c.fillStyle = color;
      c.lineWidth = 1;
      c.stroke();
      c.fill();
    };

    this.update = function () {
      this.draw();
      if (
        this.x + this.radius > window.innerWidth ||
        this.x - this.radius < 0
      ) {
        this.dx = -this.dx;
      }
      if (
        this.y + this.radius > window.innerHeight ||
        this.y - this.radius < 0
      ) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;

      if (
        mouse.x - this.x < 100 &&
        mouse.x - this.x > -100 &&
        mouse.y - this.y < 100 &&
        mouse.y - this.y > -100
      ) {
        if (this.radius < maxRadius) {
          this.radius += 1;
        }
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }
    };
  }
}
let circleArray = [];

const init = () => {
  circleArray = [];
  for (let i = 0; i < 600; i++) {
    var x = Math.random() * (window.innerWidth - maxRadius * 2) + maxRadius;
    var y = Math.random() * (window.innerHeight - maxRadius * 2) + maxRadius;
    var dx = (Math.random() - 0.5) * 4;
    var dy = (Math.random() - 0.5) * 4;
    var radius = Math.random() * 3 + 1;

    let circle = new Circle(x, y, dx, dy, radius, getRandomColor());
    circleArray.push(circle);
  }
};

const animate = () => {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  requestAnimationFrame(animate);
  for (let circle of circleArray) {
    circle.update();
  }
};

init();
animate();

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// canvas 2

let canvas2 = document.getElementById("canvas2");

canvas2.height = window.innerHeight;
canvas2.width = window.innerWidth;

let c2 = canvas2.getContext("2d");

const centerx = canvas2.width / 2;
const centery = canvas2.height / 2;

// draw the head

c2.beginPath();
c2.arc(centerx, centery, 100, 0, Math.PI * 2);

// draw the mouth

c2.moveTo(centerx + 50, centery + 20);

c2.arc(centerx, centery + 20, 50, 0, Math.PI);

// draw left eye

c2.moveTo(centerx - 20, centery - 30);

c2.arc(centerx - 30, centery - 30, 10, 0, Math.PI * 2);

// draw right eye

c2.moveTo(centerx + 40, centery - 30);

c2.arc(centerx + 30, centery - 30, 10, 0, Math.PI * 2);

// draw the nose

c2.moveTo(centerx, centery);
c2.lineTo(centerx + 10, centery + 20);
c2.lineTo(centerx - 10, centery + 20);
c2.lineTo(centerx, centery);

// draw the hat

c2.moveTo(centerx - 98, centery - 25);
c2.lineTo(centerx, centery - 250);
c2.lineTo(centerx + 98, centery - 25);

// draw left ear

c2.moveTo(centerx - 98, centery - 25);
c2.quadraticCurveTo(centerx - 120, centery - 10, centerx - 98, centery + 25);

// draw draw right ear
// c2.moveTo(centerx + 98, centery - 25);
// c2.bezierCurveTo(
//   centerx + 120,
//   centery - 25,
//   centerx + 120,
//   centery + 25,
//   centerx + 98,
//   centery + 25
// );

c2.moveTo(centerx + 98, centery - 25);
c2.quadraticCurveTo(centerx + 120, centery - 10, centerx + 98, centery + 25);

c2.stroke();

// canvas 3

const canvas3 = document.getElementById("canvas3");
canvas3.height = window.innerHeight;
canvas3.width = window.innerWidth;
const c3 = canvas3.getContext("2d");

let player = {
  x: centerx,
  y: centery,
  dx: 0,
  dy: 0,
  speed: 10,
  w: 70,
  h: 70,
};

const image = document.getElementById("source");

const drawPlayer = () => {
  c3.drawImage(image, player.x, player.y, player.w, player.h);
};

const moveUp = () => {
  if (player.y > 0) {
    player.y -= player.speed;
  }
};
const moveDown = () => {
  if (player.y + 70 < canvas3.height) {
    player.y += player.speed;
  }
};

const moveLeft = () => {
  if (player.x > 0) {
    player.x -= player.speed;
  }
};
const moveRight = () => {
  console.log(player.x);
  if (player.x + 50 < canvas3.width) {
    player.x += player.speed;
  }
};

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    moveRight();
  } else if (event.key === "ArrowLeft") {
    moveLeft();
  } else if (event.key === "ArrowUp") {
    moveUp();
  } else if (event.key === "ArrowDown") {
    moveDown();
  }
  console.log(event);
});

const updatePlayerPosition = () => {
  c3.clearRect(0, 0, window.innerWidth, window.innerHeight);
  drawPlayer();
  requestAnimationFrame(updatePlayerPosition);
};

updatePlayerPosition();
