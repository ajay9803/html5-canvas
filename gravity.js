const canvas = document.getElementById("canvas1");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

let gravity = 1;
let friction = 0.85;

class Circle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = color;
      c.fill();
      c.stroke();
    };

    this.update = () => {
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * friction;
      } else {
        this.dy += gravity;
      }

      if (this.x - this.radius < 0 || this.x + this.radius + this.dx > canvas.width) {
        this.dx = -this.dx;
      }
      this.y += this.dy;
      this.x += this.dx;
      console.log(this.dy);
      this.draw();
    };
  }
}

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

let circleArray;
let maxRadius = 30;

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const init = () => {
  circleArray = [];
  let theRadius = 30;
  for (let i = 0; i < 300; i++) {
    var x = randomIntFromRange(radius, canvas.width - theRadius);
    var y = randomIntFromRange(0, canvas.height - theRadius);
    var dx = randomIntFromRange(-4, 4);
    var dy = 1;
    var radius = randomIntFromRange(5, 30);

    let circle = new Circle(x, y, dx, dy, radius, getRandomColor());
    circleArray.push(circle);
  }
};

const animateBall = () => {
  c.clearRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(animateBall);
  for (var circle of circleArray) {
    circle.update();
  }
};

init();
animateBall();
