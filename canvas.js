var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

// c.fillStyle = "red";
// c.fillRect(100, 200, 50, 50);

// c.fillStyle = "purple";
// c.fillRect(400, 200, 50, 50);

// c.fillStyle = "blue";
// c.fillRect(250, 400, 50, 50);

// line

// c.beginPath();
// c.moveTo(100, 180);
// c.lineTo(250, 100);
// c.strokeStyle = "red";
// c.lineWidth = 2;
// c.stroke();
// c.lineTo(400, 180);
// c.strokeStyle = "black";
// c.lineWidth = 1;
// c.stroke();

// arc

class Circle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.strokeStyle = color;
      c.lineWidth = 1;
      c.stroke();
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
    };
  }
}

let circleArray = [];

for (let i = 0; i < 100; i++) {
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var dx = (Math.random() - 0.5) * 10;
  var dy = (Math.random() - 0.5) * 10;
  var radius = 40;

  let circle = new Circle(x, y, dx, dy, radius, getRandomColor());
  circleArray.push(circle);
}

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

animate();

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// for (let i = 1; i < 50; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 40, 0, Math.PI * 2);
// //   c.strokeStyle = getRandomColor();
//   c.lineWidth = 4;
//   c.fillStyle = getRandomColor();
// //   c.stroke();
//   c.fill();
// }
