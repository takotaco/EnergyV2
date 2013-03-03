var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
canvas.setAttribute('tabindex','0');
canvas.focus();


var gameState = new Object();
gameState.curFatness = 3;
gameState.sucking = false;
gameState.gameOver = false;
gameState.posX = 0;
gameState.posY = 0;
gameState.draw = function () {
	drawBG();
	drawDeevil(this.posX, this.posY, this.gameOver, this.sucking, this.curFatness);
}

var keyMap = {37 : false, 39 : false, 38 : false, 40 : false, 90: false};

$(canvas).keydown(function(e) {

	if (e.keyCode in keyMap) {
		keyMap[e.keyCode] = true;
	}

	move();

	gameState.draw();

}).keyup(function(e) {
	if (e.keyCode in keyMap) {
		keyMap[e.keyCode] = false;
	}

	if (!keyMap[90]) {
		gameState.sucking = false;
	}

	move();

	gameState.draw();
});

function move() {

	var x = 0;
	var y = 0;
	var speed = 3;

	
	if (keyMap[37]) {
		//left
		x = -1;
	}
	if (keyMap[39]) {
		//right
		x = 1;
	}
	if (keyMap[40]) {
		//down
		y = 1;
	}
	if (keyMap[38]) {
		//up
		y = -1;
	}
	if (keyMap[90]) {
		//z = sucking
		gameState.sucking = true;
	}	

	if (gameState.posX > 1*speed && x === -1) {
		gameState.posX = gameState.posX + x*speed;
	}
	if (gameState.posX < (618 - 1*speed) && x === 1) {
		gameState.posX = gameState.posX + x*speed;
	}

	if ((gameState.posY > 1*speed) && (y === -1)) {
		gameState.posY = gameState.posY + y*speed;
	}
	if ((gameState.posY < (412 - 1*speed)) && (y === 1)) {
		gameState.posY = gameState.posY + y*speed;
	}
}

function drawDeevil(x, y, dead, sucking, fatness) {
	//max fatness = 3
	var row;
	var col = fatness;
	if (sucking === true) {
		row = 0;
	}
	else {
		row = 1;
	}
	if (dead === true) {
		row = 2;
		col = 0;
	}


	var deevil = new Image();
	deevil.onload = function () {
		ctx.drawImage(deevil, col*32, row*32, 32, 32, x, y, 32, 32);
	}
	deevil.src = 'assets/deevil_animation1.png';
}

function drawBG() {
	var bgTiles = new Image();
	bgTiles.onload = function () {
		for (var i=0; i < 10; i++) {
			for (var j = 0; j < 7; j++) {
				ctx.drawImage(bgTiles, 64, 0, 64, 64, i*64, j*64, 64, 64);
			}
		}
	};
	bgTiles.src = 'assets/tiles.png';
};

gameState.draw();