const canvas = document.getElementById("canvas1");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext("2d");

let mouse = {
  x: 100,
  y: 100,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  console.log(mouse);
});

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, radius, 0, Math.PI * 2);
      c.fillStyle = this.color;
      c.stroke();
      c.fill();
    };
  }
}

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

let bigCircle;
let smallCircle;

const init = () => {
  bigCircle = new Circle(centerX, centerY, 200, "purple");
  smallCircle = new Circle(mouse.x, mouse.y, 30, "red");
};

const distance = (x1, y1, x2, y2) => {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

const animate = () => {
  c.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  smallCircle.x = mouse.x;
  smallCircle.y = mouse.y;

  if (distance(smallCircle.x, smallCircle.y, bigCircle.x, bigCircle.y) <= smallCircle.radius + bigCircle.radius) {
    bigCircle.color = 'red';
  } else {
    bigCircle.color = 'purple';
  }

  bigCircle.draw();
  smallCircle.draw();
};

init();
animate();
