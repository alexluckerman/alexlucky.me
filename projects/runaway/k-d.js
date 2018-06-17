		var canvas,c,gameStatus,score,bestScore,playerX,playerY,numEnemies,upKey,downKey,leftKey,rightKey,little;
    var xPos = [];
	  var yPos = [];
	  var xSpd = [];
	  var ySpd = [];
		function init() {
      console.log('init');
			canvas = document.getElementById('canvas');
			c = canvas.getContext('2d');
      document.body.onkeydown = keyPressed;
      document.body.onkeyup = keyReleased;
      start();
		}
		function start() {
      console.log('start');
			gameStatus = 0;
			score = 0;
			if (localStorage.bestScore) {bestScore = localStorage.bestScore;} else {bestScore = 0;}
			upKey = false;
			downKey = false;
			leftKey = false;
			rightKey = false;
			numEnemies = 0;
			playerX = window.innerWidth / 2 - 10;
      playerY = window.innerHeight / 2 - 10;
			active = setInterval(function() {run();}, 10);
		}
		function run() {
			if (window.innerHeight > window.innerWidth) {little = window.innerWidth;}
			else {little = window.innerHeight;}
      if (gameStatus == 1) {
			if(upKey) {
				playerY--;
			}
			else if(downKey) {
				playerY++;

			}
			if(leftKey) {
				playerX--; 
			}
			else if(rightKey) {
				playerX++;
			}
        			if(playerY<20){playerY=20;}
  			if (playerY>window.innerHeight - 40){playerY=window.innerHeight - 40;}
        if(playerX<20){playerX=20;}
        if (playerX>window.innerWidth - 40){playerX=window.innerWidth - 40;}
      if((score%100===0) && (numEnemies<30)) {
  			if(Math.round(Math.random()*2)===0) {
					xPos[numEnemies] = -1 * (window.innerWidth / 44) + Math.round(Math.random()*2)*window.innerWidth;
					yPos[numEnemies] = playerY + window.innerHeight / 88;
					xSpd[numEnemies] = 1;
					ySpd[numEnemies] = 0;
				} else {
					xPos[numEnemies] = playerX + window.innerWidth / 88;
					yPos[numEnemies] = -1 * (window.innerHeight / 44) + Math.round(Math.random()*2)*window.innerHeight;
					xSpd[numEnemies] = 0;
					ySpd[numEnemies] = 1;
				}
				numEnemies++;
			}
			
			//move enemies
			for(i=0;i<numEnemies;i++) {
				if(xPos[i]<20)
					xSpd[i] = 1;
				else if(xPos[i]>window.innerWidth - 30)
					xSpd[i] = -1;
				if(yPos[i]<20)
					ySpd[i] = 1;
				else if(yPos[i]>window.innerHeight - 30)
					ySpd[i] = -1;
				xPos[i] += xSpd[i];
				yPos[i] += ySpd[i];
				if(-1 * (little / 22)<(playerX-xPos[i])&&(playerX-xPos[i])<little / 44&&
				-1 * (little / 22)<(playerY-yPos[i])&&(playerY-yPos[i]<little / 44)) {gameStatus = 0;}
			}
			
			score++;}      paint();
		}
      
  function keyPressed(e) {
		var key = e.keyCode;
		if(gameStatus===0) {
			if(key==32) {
				if(score>bestScore)
					bestScore = score;
				score = 0;
				playerX = window.innerWidth / 2 - 10;
        playerY = window.innerHeight / 2 - 10;
				numEnemies = 0;
				gameStatus = 1;
			}
			return;
		}
		
		switch(key) {
		case 38:	downKey = false; upKey = true; break;
		case 40:	upKey = false; downKey = true; break;
		case 37:	rightKey = false; leftKey = true; break;
		case 39:	leftKey = false; rightKey = true; break;
		}
	}
	function keyReleased(e) {
		var key = e.keyCode;
		switch(key) {
		case 38:	upKey = false; break;
		case 40:	downKey = false; break;
		case 37:	leftKey = false; break;
		case 39:	rightKey = false; break;
		}
	}

	function paint() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    c.fillStyle = 'yellow';
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);
		c.fillStyle = 'white';
		c.fillRect(20,20,window.innerWidth - 40,window.innerHeight - 40);
		if(gameStatus==1){c.fillStyle = 'blue';c.fillRect(playerX, playerY, little / 22, little / 22);}
		c.fillStyle = 'red';
		for(f=0;f<numEnemies;f++)
			c.fillRect(xPos[f], yPos[f], little / 44, little / 44);
		c.fillStyle = 'black';
		c.fillText('Score: '+Math.floor(score/100), 5, 15);
		c.fillText('Best Score: '+Math.floor(bestScore/100), 5, window.innerHeight - 5);
		if(gameStatus===0) {
			c.fillStyle = 'black';
			c.fillText('PRESS SPACEBAR TO START A NEW GAME!', window.innerWidth / 2 - c.measureText('PRESS SPACEBAR TO START A NEW GAME!').width / 2, window.innerHeight / 2);
		}
	}