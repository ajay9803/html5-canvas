var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

c.fillStyle = "red";
c.fillRect(100, 200, 50, 50);

c.fillStyle = "purple";
c.fillRect(400, 200, 50, 50);

c.fillStyle = "blue";
c.fillRect(250, 400, 50, 50);

// line

c.beginPath();
c.moveTo(100, 180);
c.lineTo(250, 100);
c.strokeStyle = "red";
c.lineWidth = 2;
c.stroke();
c.lineTo(400, 180);
c.strokeStyle = "black";
c.lineWidth = 1;
c.stroke();

// arc

// c.beginPath();
// c.arc(100, 500, 40, 0, Math.PI * 2);
// c.strokeStyle = "red";
// c.lineWidth = 4;
// c.fillStyle = "black";
// c.stroke();
// c.fill();

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]; 
  }
  return color;
}

for (let i = 1; i < 50; i++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
  c.beginPath();
  c.arc(x, y, 40, 0, Math.PI * 2);
//   c.strokeStyle = getRandomColor();
  c.lineWidth = 4;
  c.fillStyle = getRandomColor();
//   c.stroke();
  c.fill();
}
