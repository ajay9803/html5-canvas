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
  constructor(x, y, w, h, dx, dy, color, ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.shouldJump = false;
  }

  // draw the square
  draw = () => {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.w, this.h);
  };

  // update square's position
  update = () => {
    console.log(this.shouldJump);
    this.draw();
    this.y += this.dy;
    this.x += this.dx;
    console.log("this running everytime");

    if (this.y + this.h + this.dy > canvas.height) {
      this.dy = 0;
      this.shouldJump = true;
    } else {
      this.dy += 1;
    }
  };
}

let theSquare = new Square(0, canvas.height - 50, 50, 50, 0, 0, "red");
let keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};
let platform = new ThePlatform(900, 500, 200, 20, "blue");
let platform1 = new ThePlatform(1200, 500, 200, 20, "blue");
let platform2 = new ThePlatform(1800, 500, 200, 20, "blue");

let platforms = [platform, platform1, platform2];

// animate the square

const animateSquare = () => {
  c.clearRect(0, 0, innerWidth, innerHeight);
  requestAnimationFrame(animateSquare);

  platforms.forEach((platform) => {
    platform.draw();
  });
  theSquare.update();
  theSquare.dx = 2;
      platforms.forEach((platform) => {
        platform.x -= 5;
      });

  // if (keys.left.pressed && theSquare.x >= 100) {
  //   theSquare.dx = -5;
  // } else if (keys.right.pressed && theSquare.x <= 400) {
  //   theSquare.dx = 5;
  // } else {
  //   if (keys.left.pressed) {
  //     platforms.forEach((platform) => {
  //       platform.x += 5;
  //     });
  //   } else if (keys.right.pressed) {
  //     platforms.forEach((platform) => {
  //       platform.x -= 5;
  //     });
  //   }
  //   theSquare.dx = 0;
  // }

  platforms.forEach((platform) => {
    if (
      (theSquare.y <= platform.y + platform.h + 5 &&
        theSquare.y + theSquare.h - theSquare.dy >= platform.y &&
        theSquare.x + theSquare.w >= platform.x &&
        theSquare.x <= platform.x + platform.w) ||
      theSquare.y <= 0
    ) {
      theSquare.dy = 20;
    }

    if (
      theSquare.y + theSquare.h <= platform.y &&
      theSquare.y + theSquare.h + theSquare.dy >= platform.y &&
      theSquare.x + theSquare.w >= platform.x &&
      theSquare.x <= platform.x + platform.w
    ) {
      theSquare.dy = 0;
      theSquare.shouldJump = true;
    }
  });
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
      if (theSquare.shouldJump) {
      theSquare.dy -= 20;
      theSquare.shouldJump = false;
      }
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
