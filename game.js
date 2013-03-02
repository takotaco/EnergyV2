var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');


function test() {
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,700,450);
}

//test();

function drawBG() {
	var bgTiles = document.CreateElement('image');
	bgTiles.src = 'assets/tiles.png';
	ctx.drawImage(img, 0, 0, 50, 50, 0, 0, 50, 50);
}

drawBG();