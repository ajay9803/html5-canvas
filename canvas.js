var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
c.fillRect(100, 200, 50, 50);
c.fillText('Sagar', 100, 300);