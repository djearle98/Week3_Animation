var allPresets = [];
var obj = document.getElementById("obj");
var currentPosition, startPosition, endPosition;
var animationDuration = 1000; // in ms
var animating = false;
var interval;
var frameNum = 0;
var frameDuration = 10; //ms

class Preset {
  constructor(width, height, left, top) {
    this.position = new Position(width, height, left, top)
    this.pNum = allPresets.push(this) - 1;
    addButton(this);
  }
}
class Position {
	constructor (width, height, left, top) {
  	this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
  }
}

function addButton(p) {
  var button = document.createElement("button");
  button.setAttribute("type", "button");
  button.addEventListener("click", function(){animate(p);}, false);
  var text = document.createTextNode("Preset " + p.pNum);
  button.appendChild(text);
  document.body.appendChild(button);
}

function animate(p) {
  startPosition = currentPosition;
  endPosition = p.position;
  clearInterval(interval);
  interval = setInterval(frame, frameDuration);
  frameNum = 0;
  animating = true;
}

function frame(){
  //Calculate position value
  var percentDone = frameDuration*frameNum/animationDuration;
  if (percentDone <= 1 && animating == true) {
  	frameNum++;
    currentPosition = linearAnimation(percentDone);
	  paint();
  } else {
    clearInterval(interval);
    animating = false;
  }
}

function paint(){
	//update the canvas
	obj.style.width = currentPosition.width + "px";
  obj.style.height = currentPosition.height + "px";
  obj.style.left = currentPosition.left + "px";
  obj.style.top = currentPosition.top + "px";
}

function linearAnimation(percentDone) {

var invPercentDone = 1-percentDone;
  /* currentPosition.width = startPosition.width*invPercentDone + endPosition.width*percentDone;
  currentPosition.height = startPosition.height*invPercentDone + endPosition.height*percentDone;
  currentPosition.left = startPosition.left*invPercentDone + endPosition.left*percentDone;
  */
  var width = startPosition.width*invPercentDone + endPosition.width*percentDone;
  var height = startPosition.height*invPercentDone + endPosition.height*percentDone;
  var left = startPosition.left*invPercentDone + endPosition.left*percentDone;
  var top = startPosition.top*invPercentDone + endPosition.top*percentDone;
  return new Position(width, height, left, top);

}

var p1 = new Preset(475, 475, 12.5, 12.5);
var p2 = new Preset(450, 450, 25, 25);
var p3 = new Preset(100, 45, 200, 100);
var p4 = new Preset(30, 30, 400, 400);
var p4 = new Preset(50, 400, 225, 50);

currentPosition = p1.position;
paint();
