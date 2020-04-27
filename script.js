/*VARIABLES*/
//	HTML Objects
var obj = document.getElementById("obj");

/*CLASSES*/
class Animation {
  constructor(obj, animType, frameDur, animDur) {
    this.obj = obj;
    if (true){  //animType == "Linear"
    	this.animAlgorithm = this.linear;
    }
    this.frameDur = frameDur; //ms
    this.animDur = animDur; //ms
    
    this.animating = false;
    this.frameNum = 0;
    this.clockTrigger = null;
    this.startData = [];
    this.curData = [];
    this.endData = [];
    this.percentDone = 0;

  }
  anim(endData) {
  	this.endData = endData;
    this.startData = this.curData;
    this.frameNum = 0;
  	this.animating = true;

		this.calcFrame();
	}
  calcFrame(){
    this.clockTrigger = requestAnimationFrame(animationHandler, this.frameDur);
    this.percentDone = (this.frameDur*this.frameNum)/this.animDur;
    if (this.percentDone <= 1) {
      this.frameNum++;
      this.curData = this.animAlgorithm();
      this.paint();
    } /*else {
      cancelAnimationFrame(this.clockTrigger);
    } */
 
  }
	linear() {
    var invPercentDone = 1-this.percentDone;
    var result = [];
    for(var i=0; i<this.endData.length; i++) { 
    	result.push(this.startData[i]*invPercentDone + this.endData[i]*this.percentDone);
    }
    return result;
  }
  paint(){
    //update the object
    this.obj.style.width = this.curData[0] + "px";
    this.obj.style.height = this.curData[1] + "px";
    this.obj.style.left = this.curData[2] + "px";
    this.obj.style.top = this.curData[3] + "px";
  }
  init(data){
  	this.curData = data;
    this.paint();
  }

}

/*FUNCTIONS*/
var presetButtons = [];
function addPreset(data) {
  var i = presetButtons.push(document.createElement("button"))-1;
  var button = presetButtons[i];
  button.setAttribute("type", "button");
  button.addEventListener("click", function(){onclickHandler(data);}, false);
  var text = document.createTextNode("Preset: ["+data+"]");
  button.appendChild(text);
  document.body.appendChild(button);
}

function onclickHandler(data) {
	animFrameSize.anim(data)
}
function animationHandler(){
	animFrameSize.calcFrame();
  console.log("FRAME");
}
var animFrameSize = new Animation(obj, "Linear", 10, 1000)
/*
animFrameSize.addParameter("width", "px");
animFrameSize.addParameter("height", "px");
animFrameSize.addParameter("left", "px");
animFrameSize.addParameter("top", "px");
*/
animFrameSize.init([100, 100, 200, 200]);
addPreset([300, 300, 10, 10]);
addPreset([100, 600, 70, 100]);
addPreset([30, 10, 50, 400]);
