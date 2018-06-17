var canvas,c,gameStatus,score,bestScore,playerX,playerY,numEnemies,upKey,downKey,leftKey,rightKey,little,buttondim;
    var xPos = new Array();
	  var yPos = new Array();
	  var xSpd = new Array();
	  var ySpd = new Array();
		function init() {
      console.log('init');
			canvas = document.getElementById('canvas');
			c = canvas.getContext('2d');
			                if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {document.body.ontouchstart = mousePressed; document.body.ontouchend = mouseReleased;}
				else { 
      document.body.onmousedown = mousePressed;
					document.body.onmouseup = mouseReleased;}
      start();
		}
		function start() {
      console.log('start');
			gameStatus = 0;
			score = 0;
			if (localStorage.bestScore) {bestScore = localStorage.bestScore} else {bestScore = 0}
			upKey, downKey, leftKey, rightKey = false;
			numEnemies = 0;
			playerX = window.innerWidth / 2 - 10;
      playerY = window.innerHeight / 2 - 10;
			active = setInterval('run()', 1);
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
			
			score++;}      window.webkitRequestAnimationFrame(function() {paint();});
		}
      
  function mousePressed(e) {
				console.log('mouse press');
		        var x;
                var y;
                if (event.pageX || event.pageY) { 
                    x = event.pageX;
                    y = event.pageY;
                }
		if(gameStatus==0) {
                if (x >= window.innerWidth - buttondim * 2 - 20 && x <= window.innerWidth - buttondim - 20 && y >= window.innerHeight - buttondim * 2 - 20 && y <= window.innerHeight - buttondim - 20) {
				if(score>bestScore)
					bestScore = score;
				score = 0;
				playerX = 190;
        playerY = 190;
				numEnemies = 0;
				gameStatus = 1;
			}
			return;
		}                
                if (x >= window.innerWidth - buttondim * 2 - 20 && x <= window.innerWidth - buttondim - 20 && y >= window.innerHeight - buttondim * 3 - 20 && y <= window.innerHeight - buttondim * 2 - 20) {downKey = false; upKey = true; console.log('up')}
                if (x >= window.innerWidth - buttondim * 2 - 20 && x <= window.innerWidth - buttondim - 20 && y >= window.innerHeight - buttondim - 20 && y <= window.innerHeight - 20) {upKey = false; downKey = true;console.log('down')}
                if (x >= window.innerWidth - buttondim * 3 - 20 && x <= window.innerWidth - buttondim * 2 - 20 && y >= window.innerHeight - buttondim * 2 - 20 && y <= window.innerHeight - buttondim - 20) {rightKey = false; leftKey = true;console.log('left')}
                if (x >= window.innerWidth - buttondim - 20 && x <= window.innerWidth - 20 && y >= window.innerHeight - buttondim * 2 - 20 && y <= window.innerHeight - buttondim - 20) {leftKey = false; rightKey = true;console.log('right')}
                }
	function mouseReleased(e) {
		        /*var x;
                var y;
                if (event.pageX || event.pageY) { 
                    x = event.pageX;
                    y = event.pageY;
                }
                if (x >= 370 && x <= 395 && y >= 345 && y <= 370) {upKey = false;console.log('up release');}
                if (x >= 370 && x <= 395 && y >= 345 && y <= 370) {downKey = false;console.log('down release');}
                if (x >= 345 && x <= 370 && y >= 370 && y <= 395) {leftKey = false;console.log('left release');}
                if (x >= 395 && x <= 420 && y >= 370 && y <= 395) {rightKey = false;console.log('right release');}*/
                downKey = false;
                upKey = false;
                leftKey = false;
                rightKey = false;
	}

	function paint() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
	buttondim = little / 11;
    c.fillStyle = 'yellow';
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);
		c.fillStyle = 'white';
		c.fillRect(20,20,window.innerWidth - 40,window.innerHeight - 40);
      				c.fillStyle = 'orange';
	c.fillRect(window.innerWidth - buttondim * 2 - 20, window.innerHeight - buttondim * 3 - 20, buttondim, buttondim);
	c.fillRect(window.innerWidth - buttondim * 2 - 20, window.innerHeight - buttondim - 20, buttondim, buttondim);
	c.fillRect(window.innerWidth - buttondim * 3 - 20, window.innerHeight - buttondim * 2 - 20, buttondim, buttondim);
	c.fillRect(window.innerWidth - buttondim - 20, window.innerHeight - buttondim * 2 - 20, buttondim, buttondim);
	c.fillStyle = 'black';
	c.fillRect(window.innerWidth - buttondim * 2 - 20, window.innerHeight - buttondim * 2 - 20, buttondim, buttondim);
		if(gameStatus==1){c.fillStyle = 'blue';c.fillRect(playerX, playerY, little / 22, little / 22);}
		c.fillStyle = 'red';
		for(f=0;f<numEnemies;f++)
			c.fillRect(xPos[f], yPos[f], little / 44, little / 44);
		c.fillStyle = 'black';
		c.fillText('Score: '+Math.floor(score/100), 5, 15);
		c.fillText('Best Score: '+Math.floor(bestScore/100), 5, window.innerHeight - 5);
		if(gameStatus==0) {
			c.fillStyle = 'black';
			c.fillText('PRESS THE BLACK BUTTON TO START A NEW GAME!', window.innerWidth / 2 - c.measureText('PRESS THE BLACK BUTTON TO START A NEW GAME!').width / 2, window.innerHeight / 2);
		}
	}