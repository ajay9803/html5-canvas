// get canvas element
const canvas = document.getElementById("canvas1");

// set canvas height / width

canvas.height = innerHeight - 6;
canvas.width = innerWidth - 6;

// get context of the canvas

let c = canvas.getContext("2d");

// the platform
class ThePlatform {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  // draw the platform
  draw = () => {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.w, this.h);
  };
}

// the square
class Square {
  constructor(x, y, w, h, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  // draw the square
  draw = () => {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.w, this.h);
  };

  // update square's position
  update = () => {
    console.log(this.dy);
    this.draw();
    this.y += this.dy;
    this.x += this.dx;

    if (this.y + this.h + this.dy > canvas.height) {
      this.dy = 0;
    } else {
      this.dy += 1;
    }

    if (keys.left.pressed) {
      this.dx = -5;
    } else if (keys.right.pressed) {
      this.dx = 5;
    } else {
      this.dx = 0;
    }
  };
}

let theSquare = new Square(100, 300, 50, 50, 0, 0, "red");
let keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let platform = new ThePlatform(500, 200, 200, 20, "blue");

// animate the square

const animateSquare = () => {
  c.clearRect(0, 0, innerWidth, innerHeight);
  requestAnimationFrame(animateSquare);

  platform.draw();
  theSquare.update();

  if (
    theSquare.y + theSquare.h <= platform.y &&
    theSquare.y + theSquare.h + theSquare.dy >= platform.y &&
    theSquare.x + theSquare.w >= platform.x &&
    theSquare.x <= platform.x + platform.w
  ) {
    theSquare.dy = 0;
  }
};

animateSquare();

// create key down event listener
addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    // move to the right
    case 39:
      keys.right.pressed = true;
      break;

    // move to the left
    case 37:
      keys.left.pressed = true;
      break;

    // jump
    case 38:
      theSquare.dy -= 20;
      break;
  }
});

// create key up event listener
addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 39:
      keys.right.pressed = false;
      break;

    // move to the left
    case 37:
      keys.left.pressed = false;
      break;

    // jump
    case 38:
      break;
  }
});

const getDistance = (x1, y1, x2, y2) => {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};
