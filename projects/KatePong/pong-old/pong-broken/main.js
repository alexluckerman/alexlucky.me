/*jslint sloppy: true, browser: true */
// Definitions
var h, w, clickw, clickh, pongw, pongh, pongl, pongm, ballw, ballt, balll, bspeed, redge, rpedge, wtop, wbottom, psect, pleftb, pleftt, pmiddleb, pmiddlet, prightb, prightt, topleft, topright, bottomleft, bottomright, pong1, pong2, ball, cpos1, cpos2, bposl, bpost, dir;
// Initializer
function init() {
    h = window.innerHeight;
    w = window.innerWidth;
    clickw = Math.round(w / 2);
    clickh = Math.round(h / 2);
    pongw = Math.round(w / 15 * 3);
    pongh = Math.round(h * 0.033);
    pongl = Math.round(w / 2 - (pongw / 2));
    pongm = Math.round((w - pongw) / 12);
    ballw = Math.round(w * 0.066);
    ballt = Math.round(h / 2 - (ballw / 2));
    balll = Math.round(w / 2 - (ballw / 2));
    bspeed = Math.round(1500 / h);
    redge = w - ballw;
    rpedge = w - pongw;
    wtop = pongh + 5;
    wbottom = h - pongh - ballw - 5;
    psect = pongw / 3;
    pleftb = (-1 * psect) + 1;
    pleftt = psect - 1;
    pmiddleb = (-1 * psect) + psect + 1;
    pmiddlet = (2 * psect) - 1;
    prightb = (-1 * psect) + (2 * psect) + 1;
    prightt = (3 * psect) - 1;
    topleft = document.getElementById('topleft');
    topright = document.getElementById('topright');
    bottomleft = document.getElementById('bottomleft');
    bottomright = document.getElementById('bottomright');
    pong1 = document.getElementById('pong1');
    pong2 = document.getElementById('pong2');
    ball = document.getElementById('ball');
    cpos1 = pongl;
    cpos2 = pongl;
    bposl = balll;
    bpost = ballt;
    dir = 5;
    /* window.alert('Available height is ' + h);
    window.alert('Available width is ' + w);
    window.alert('Your pong size is ' + pongw + ' x ' + pongh);
    window.alert('Your pong is ' + pongl + ' pixels from the left');
    window.alert('Your pong moves ' + pongm + ' per key click');
    window.alert('Your ball size is ' + ballw + ' x ' + ballw);
    window.alert('Your ball is located at ' + balll + ' x ' + ballt);
    window.alert('Ball bottom collision location is ' + wbottom);
    window.alert('Ball top collision location is ' + wtop);
    window.alert('Ball speed is ' + bspeed + ' milliseconds per pixel');
    window.alert('psect:' + psect + ' pleftb:' + pleftb + ' pleftt:' + pleftt + ' pmiddleb:' + pmiddleb + ' pmiddlet:' + pmiddlet + ' prightb:' + prightb + ' prightt:' + prightt); */
// Screen rendering engine
    topleft.style.width = clickw + 'px';
    topleft.style.height = clickh + 'px';
    topleft.style.left = '0px';
    topleft.style.top = '0px';
    topright.style.width = clickw + 'px';
    topright.style.height = clickh + 'px';
    topright.style.left = clickw + 'px';
    topright.style.top = '0px';
    bottomleft.style.width = clickw + 'px';
    bottomleft.style.height = clickh + 'px';
    bottomleft.style.left = '0px';
    bottomleft.style.top = clickh + 'px';
    bottomright.style.width = clickw + 'px';
    bottomright.style.height = clickh + 'px';
    bottomright.style.left = clickw + 'px';
    bottomright.style.top = clickh + 'px';
    pong1.style.width = pongw + 'px';
    pong1.style.height = pongh + 'px';
    pong1.style.left = pongl + 'px';
    pong2.style.width = pongw + 'px';
    pong2.style.height = pongh + 'px';
    pong2.style.left = pongl + 'px';
    ball.style.width = ballw + 'px';
    ball.style.height = ballw + 'px';
    ball.style.left = balll + 'px';
    ball.style.top = ballt + 'px';
    ball.style.display = 'inline';
    window.alert('Init!');
    setInterval(moveBall(), bspeed);
}
// Key input tracker
function keyCheck(k) {
    var obj = window.event ? event : k, key = obj.keyCode;
    if (key === 37 && cpos1 > 0) {
        cpos1 = cpos1 - pongm;
    }
    if (key === 39 && cpos1 < rpedge) {
        cpos1 = cpos1 + pongm;
    }
    if (key === 65 && cpos2 > 0) {
        cpos2 = cpos2 - pongm;
    }
    if (key === 68 && cpos2 < rpedge) {
        cpos2 = cpos2 + pongm;
    }
    pong2.style.left = cpos1 + 'px';
    pong1.style.left = cpos2 + 'px';
}
// Ball movement engine
function moveBall() {
    switch (dir) {
    case 1:
        bpost = bpost - 1;
        break;
    case 2:
        bpost = bpost - 1;
        bposl = bposl + 1;
        break;
    case 4:
        bpost = bpost + 1;
        bposl = bposl + 1;
        break;
    case 5:
        bpost = bpost + 1;
        break;
    case 6:
        bpost = bpost + 1;
        bposl = bposl - 1;
        break;
    case 8:
        bpost = bpost - 1;
        bposl = bposl - 1;
        break;
    }
// Ball repainting engine
    ball.style.top = bpost + 'px';
    ball.style.left = bposl + 'px';
// Ball collision detection engine
    if (bposl === redge) {
        colDetect('r');
    }
    if (bposl === 0) {
        colDetect('l');
    }
    if (bpost === h) {
        window.alert('Player 2 won!');
        location.reload();
    }
    if (bpost === 0) {
        window.alert('Player 1 won!');
        location.reload();
    }
    if (bpost === wbottom && bposl >= cpos1 + pleftb && bposl <= cpos1 + pleftt) {
        // window.alert('Collision detected: Bottom left');
        colDetect('bl');
    }
    if (bpost === wbottom && bposl >= cpos1 + pmiddleb && bposl <= cpos1 + pmiddlet) {
        // window.alert('Collision detected: Bottom middle');
        colDetect('bm');
    }
    if (bpost === wbottom && bposl >= cpos1 + prightb && bposl <= cpos1 + prightt) {
        // window.alert('Collision detected: Bottom right');
        colDetect('br');
    }
    if (bpost === wtop && bposl >= cpos2 + pleftb && bposl <= cpos2 + pleftt) {
        // window.alert('Collision detected: Top left');
        colDetect('tl');
    }
    if (bpost === wtop && bposl >= cpos2 + pmiddleb && bposl <= cpos2 + pmiddlet) {
        // window.alert('Collision detected: Top middle');
        colDetect('tm');
    }
    if (bpost === wtop && bposl >= cpos2 + prightb && bposl <= cpos2 + prightt) {
        // window.alert('Collision detected: Top right');
        colDetect('tr');
    }
}
// Ball collision handler
function colDetect(h) {
    switch (h) {
    case 'r':
        if (dir === 2) {
            dir = 8;
        }
        if (dir === 4) {
            dir = 6;
        }
        break;
    case 'l':
        if (dir === 8) {
            dir = 2;
        }
        if (dir === 6) {
            dir = 4;
        }
        break;
    case 'bl':
        if (dir === 4) {
            dir = 6;
        }
        if (dir === 5) {
            dir = 8;
        }
        if (dir === 6) {
            dir = 8;
        }
        break;
    case 'bm':
        if (dir === 6) {
            dir = 8;
        }
        if (dir === 5) {
            dir = 1;
        }
        if (dir === 4) {
            dir = 2;
        }
        break;
    case 'br':
        if (dir === 4) {
            dir = 2;
        }
        if (dir === 5) {
            dir = 2;
        }
        if (dir === 6) {
            dir = 8;
        }
        break;
    case 'tl':
        if (dir === 2) {
            dir = 4;
        }
        if (dir === 1) {
            dir = 6;
        }
        if (dir === 8) {
            dir = 6;
        }
        break;
    case 'tm':
        if (dir === 2) {
            dir = 4;
        }
        if (dir === 1) {
            dir = 5;
        }
        if (dir === 8) {
            dir = 6;
        }
        break;
    case 'tr':
        if (dir === 2) {
            dir = 4;
        }
        if (dir === 1) {
            dir = 4;
        }
        if (dir === 8) {
            dir = 6;
        }
        break;
    }
}