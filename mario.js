// get canvas element
const canvas = document.getElementById("canvas1");

// set canvas height / width

canvas.height = innerHeight - 6;
canvas.width = innerWidth - 6;

// get context of the canvas

let c = canvas.getContext("2d");

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
    this.draw();
    this.y += this.dy;
    this.x += this.dx;

    if (this.y + this.h + this.dy > canvas.height) {
      this.dy = 0;
    } else {
      this.dy += 1;
    }

    if (keys.left.pressed) {
      this.dx = -10;
    } else if (keys.right.pressed) {
      this.dx = 10;
    } else {
      this.dx = 0;
    }
  };
}

let theSquare = new Square(100, 100, 50, 50, 0, 0, "red");
let keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

// animate the square

const animateSquare = () => {
  c.clearRect(0, 0, innerWidth, innerHeight);
  requestAnimationFrame(animateSquare);
  theSquare.update();
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
