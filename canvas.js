var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

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
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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
  for (let i = 0; i < 400; i++) {
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

  // c.beginPath();
  // c.arc(x, y, radius, 0, Math.PI * 2);
  // c.strokeStyle = "red";
  // c.lineWidth = 1;
  // c.stroke();
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
