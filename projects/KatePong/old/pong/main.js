var pong1, pong2, ball, game, cpos, bposl, bpost, dir;
function init() {
pong1 = document.getElementById("pong1");
pong2 = document.getElementById("pong2");
ball = document.getElementById("ball");
game = document.getElementById("game");
cpos = 240;
bposl = 280;
bpost = 279;
dir = 5;
pscore = 0;
aiscore = 0;
setInterval("moveBall()",10);
alert("Init!");
}
function keyCheck(k) {
var obj = window.event ? event : k;
var key = obj.keyCode;
if (key==37 && cpos > 0) {
cpos = cpos - 40;
}
if(key==39 && cpos < 480) {
cpos = cpos + 40;
}
pong2.style.left = cpos + "px";
}
function moveBall() {
switch(dir)
{
case 1:
bpost = bpost - 1;
break
case 2:
bpost = bpost - 1;
bposl = bposl + 1;
break
case 3:
bposl = bposl + 1;
break;
case 4:
bpost = bpost + 1;
bposl = bposl + 1;
break;
case 5:
bpost = bpost + 1
break;
case 6:
bpost = bpost + 1;
bposl = bposl - 1;
break
case 7:
bposl = bposl - 1;
break
case 8:
bpost = bpost - 1;
bposl = bposl - 1;
break
}
ball.style.top = bpost + "px";
ball.style.left = bposl + "px";
if (bposl == 600);
{
colDetect("r");
}
if (bposl == 0);
{
colDetect("l");
}
if (bpost == 600)
{
alert("You lost!");
window.close();
}
if (bpost == 0)
{
alert("You won!");
window.close();
}
if (bpost == 575 && bposl > cpos && bposl < cpos + 40 )
{
colDetect("bl");
}
if (bpost == 575 && bposl > cpos + 41 && bposl < cpos + 80)
{
colDetect("bm");
}
if (bpost == 575 && bposl > cpos + 81 && bposl < cpos + 120)
{
colDetect("br")
}
if (bpost == 25 && bposl > cpos && bposl < cpos + 40 )
{
colDetect("tl");
}
if (bpost == 25 && bposl > cpos + 41 && bposl < cpos + 80)
{
colDetect("tm");
}
if (bpost == 25 && bposl > cpos + 81 && bposl < cpos + 120)
{
colDetect("tr");
}
}
function colDetect(h){
switch(h){
case "r":
if (dir == 2) {
dir = 8;
}
if (dir == 4) {
dir = 6;
}
if (dir == 3) {
dir = 7;
}
break;
case "l":
if (dir == 8) {
dir = 2;
}
if (dir == 6) {
dir = 4;
}
if (dir == 7) {
dir = 3;
}
break;
case "bl":
if (dir == 4) {
dir = 6; 
}
if (dir == 5) {
dir = 8;
}
if (dir == 6) {
dir = 8;
}
break;
case "bm":
if (dir == 6) {
dir = 8; 
}
if (dir == 5) {
dir = 1;
}
if (dir == 4) {
dir = 2;
}
break;
case "br":
if (dir == 4) {
dir = 2; 
}
if (dir == 5) {
dir = 2;
}
if (dir == 6) {
dir = 8;
}
break;
case "tl":
if (dir == 2) {
dir = 4; 
}
if (dir == 1) {
dir = 6;
}
if (dir == 8) {
dir = 6;
}
break;
case "tm":
if (dir == 2) {
dir = 4
}
if (dir == 1) {
dir = 5;
}
if (dir == 8) {
dir = 6;
}
break;
case "tr":
if (dir == 2) {
dir = 4; 
}
if (dir == 1) {
dir = 4;
}
if (dir == 8) {
dir = 6;
}
break;
}
}