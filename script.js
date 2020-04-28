/*VARIABLES*/
var obj = document.getElementById("obj");
var presetButtons = [];

/*CLASSES*/
//TODO: Breakout ease-in/ease-out envelope and add this setting to constructor
//TODO: Make animation settings editable via setters
//TODO: access CSS like this: 
	//element.style.setProperty("background-color", "red");
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
		cancelAnimationFrame(this.clockTrigger);

		this.calcFrame();
	}
  calcFrame(){
    this.percentDone = (this.frameDur*this.frameNum)/this.animDur;
    if (this.percentDone <= 1) {
    	this.clockTrigger = requestAnimationFrame(animationHandler);
      this.frameNum++;
      this.curData = this.animAlgorithm();
      this.paint();
    }
  }
	linear() {
  	var progress = 1-(Math.cos(this.percentDone*Math.PI)+1)/2;
    var invProgress = 1-progress;
    var result = [];
    for(var i=0; i<this.endData.length; i++) { 
    	result.push(this.startData[i]*invProgress + this.endData[i]*progress);
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

/*EXECUTION*/
var animFrameSize = new Animation(obj, "Linear", 10, 800);
/* TODO: Add functionality for addParameters in the class w/ customizable units. 
animFrameSize.addParameter("width", "px");
animFrameSize.addParameter("height", "px");
animFrameSize.addParameter("left", "px");
animFrameSize.addParameter("top", "px");
*/
animFrameSize.init([482, 482, 8, 8]);
addPreset([482, 482, 8, 8]);
addPreset([450, 450, 25, 25]);
addPreset([200, 450, 150, 25]);
