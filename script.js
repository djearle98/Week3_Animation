var allPresets = [];
var obj = document.getElementById("obj");
class Preset {
  constructor(width, height, left, top) {
    this.position = new Position(width, height, left, top)
    this.pNum = allPresets.push(this);
    var p = this;
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
  var startPosition = new Position(obj.style.width, obj.style.height, obj.style.left, obj.style.top);
  var endPosition = p.position;

  var currentPosition;
  
  //every X ms...
  //update current position w/some algorithm
  paint(endPosition);
}

function paint(p){
	obj.style.width = p.width + "px";
  obj.style.height = p.height + "px";
  obj.style.left = p.left + "px";
  obj.style.top = p.top + "px";
}

var p1 = new Preset(100, 200, 300, 10);
var p2 = new Preset(50, 50, 300, 10);
animate(p1);
