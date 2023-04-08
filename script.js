// initialize variables
var canvas;
var canvasContext;
var ballX = 300;
var ballY = 200;
var ballSpeedX = 5;
var ballSpeedY = 5;
var paddle1Y = 150;
var paddle2Y = 150;
var paddleHeight = 100;
var paddleWidth = 10;
var player1Score = 0;
var player2Score = 0;
var winningScore = 3;
var showingWinScreen = false;

// initialize event listeners
window.onload = function() {
	canvas = document.getElementById('canvas');
	canvasContext = canvas.getContext('2d');
	setInterval(function() {
		drawEverything();
		moveEverything();
	}, 1000/30);

	canvas.addEventListener('mousemove', function(event) {
		var mousePos = calculateMousePos(event);
		paddle1Y = mousePos.y - (paddleHeight/2);
	});

	canvas.addEventListener('mousedown', handleMouseClick);
};

// helper functions
function drawEverything() {
	drawRect(0,0,canvas.width,canvas.height,'black'); // canvas
	drawRect(0,paddle1Y,paddleWidth,paddleHeight,'white'); // left paddle
	drawRect(canvas.width-paddleWidth,paddle2Y,paddleWidth,paddleHeight,'white'); // right paddle
	drawCircle(ballX, ballY, 10, 'white'); // ball
	drawText(player1Score, 100, 100, 'white'); // player 1 score
	drawText(player2Score, canvas.width-100, 100, 'white'); // player 2 score

	if (showingWinScreen) {
		drawText("Game Over", canvas.width/2, canvas.height/2, 'white');
		drawText("Click to continue", canvas.width/2, canvas.height/2+50, 'white');
	}
}

function drawRect(leftX, topY, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(leftX, topY, width, height);
}

function drawCircle(centerX, centerY, radius, color) {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

function drawText(text, x, y, color) {
	canvasContext.fillStyle = color;
	canvasContext.font = "30px Arial";
	canvasContext.fillText(text, x, y);
}

function moveEverything() {
	if (showingWinScreen) {
		return;
	}

	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballX < 0) {
		if (ballY > paddle1Y && ballY < paddle1Y+paddleHeight) {
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (paddle1Y+paddleHeight/2);
			ballSpeedY = deltaY * 0.35;
		} else {
			player2Score++; // must be before ballReset()
			ballReset();
		}
	}

	if (ballX > canvas.width) {
		if (ballY > paddle2Y && ballY < paddle2Y+paddleHeight) {
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (paddle2Y+paddleHeight/2);
			ballSpeedY = deltaY * 0.35;
		} else {
			player1Score++; // must be before ballReset()
			ballReset();
		}
	}

	if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
	}

	if (ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}

	// move computer paddle
	computerMovement();

	if (player1Score >= winningScore || player2Score >= winningScore) {
		showingWinScreen = true;
	}
}

function ballReset() {
	if (player1Score >= winningScore || player2Score >= winningScore) {
		player1Score = 0;
		player2Score = 0;
		showingWinScreen = true;
	}
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

function calculateMousePos(event) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = event.clientX - rect.left - root.scrollLeft;
	var mouseY = event.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	};
}

function handleMouseClick(event) {
	if (showingWinScreen) {
		player1Score = 0;
		player2Score = 0;
		showingWinScreen = false;
	}
}

function computerMovement() {
	var paddle2YCenter = paddle2Y + (paddleHeight/2);
	if (paddle2YCenter < ballY-35) {
		paddle2Y += 6;
	} else if (paddle2YCenter > ballY+35) {
		paddle2Y -= 6;
	}
}

// call the game initialization function
window.onload = function() {
	canvas = document.getElementById('canvas');
	canvasContext = canvas.getContext('2d');
	
	var framesPerSecond = 30;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);

	canvas.addEventListener('mousemove', function(event) {
		var mousePos = calculateMousePos(event);
		paddle1Y = mousePos.y - (paddleHeight/2);
	});

	canvas.addEventListener('mousedown', handleMouseClick);
};
