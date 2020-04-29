/*VARIABLES*/
var obj = document.getElementById("obj");
var presetButtons = [];

/*CLASSES*/
class Animation {
  constructor(obj, animAlgorithm, ease, frameDur, animDur) {
    this.obj = obj;
    this.setAnimAlgorithm(animAlgorithm);
    this.frameDur = frameDur; //ms
    this.animDur = animDur; //ms
    this.ease = ease;

    this.animating = false;
    this.frameNum = 0;
    this.clock = null;
    this.startData = [];
    this.curData = [];
    this.endData = [];
    this.percentDone = 0;
    this.progress = 0;
    this.parameters = [];
  }
  
  addParameter(name, unit){
  	/*var p = {
    	name: name,
      unit: unit,
    };
    */
  	this.parameters.push({
    	name: name,
      unit: unit,
      display: function(value){
      	if(unit=="rgb"){
        	return "rgb("+value+")";
        } else {
        	return""+value+unit;
        }
      }
    });
  }
  
  setAnimAlgorithm(algorithm) {
    switch (algorithm.toLowerCase()) {
      case "linear":
        this.animAlgorithm = this.linear;
        break;
      default:
        this.animAlgorithm = this.linear;
    }
  }

  get progress() {
    if (this.ease == true) {
      return 1 - (Math.cos(this.percentDone * Math.PI) + 1) / 2;
    } else {
      return this.percentDone;
    }
  }
  set progress(value) {}
  anim(endData) {
    this.endData = endData;
    this.startData = this.curData;
    this.frameNum = 0;
    cancelAnimationFrame(this.clock);

    this.calcFrame();
  }
  calcFrame() {
    this.percentDone = (this.frameDur * this.frameNum) / this.animDur;
    if (this.percentDone <= 1) {
      this.frameNum++;
      this.curData = this.animAlgorithm();
      this.paint();
      this.clock = requestAnimationFrame(animationHandler);
    }
  }
  linear() {
    var progress = this.progress;
    var invProgress = 1 - progress;
    var result = [];
    for (var i = 0; i < this.endData.length; i++) {
    	if(Array.isArray(this.endData[i])){
      	var subResult = [];
      	for (var j = 0; j < this.endData[i].length; j++) {
          subResult.push(this.startData[i][j] * invProgress + this.endData[i][j] * progress);
        }
				result.push(subResult);
      } else {
	      result.push(this.startData[i] * invProgress + this.endData[i] * progress);
      }
    }
    return result;
  }
  paint() {
    //update the object
		for(var i=0; i<this.parameters.length; i++){
    	this.obj.style.setProperty(this.parameters[i].name, this.parameters[i].display(this.curData[i]));
    }
  }
  init(data) {
    this.curData = data;
    this.paint();
  }
}

/*FUNCTIONS*/
function addPreset(data) {
  var i = presetButtons.push(document.createElement("button")) - 1;
  var button = presetButtons[i];
  button.setAttribute("type", "button");
  button.addEventListener("click", function() {
    onclickHandler(data);
  }, false);
  var text = document.createTextNode("Preset: [" + data + "]");
  button.appendChild(text);
  document.body.appendChild(button);
}
function onclickHandler(data) {
  animFrameSize.anim(data)
}
function animationHandler() {
  animFrameSize.calcFrame();
  console.log("FRAME");
}

/*EXECUTION*/
var animFrameSize = new Animation(obj, "Linear", true, 10, 800);
animFrameSize.addParameter("width", "%");
animFrameSize.addParameter("height", "%");
animFrameSize.addParameter("left", "%");
animFrameSize.addParameter("top", "%");
animFrameSize.addParameter("border-radius", "px");
animFrameSize.addParameter("background-color","rgb");

animFrameSize.init([95, 95, 2.5, 2.5, 0, [255,0,0]]);
addPreset([95, 95, 2.5, 2.5, 0, [255,0,0]]);
addPreset([90, 90, 5, 5, 15, [0,255, 255]]);
addPreset([50, 90, 25, 5, 50, [128,128,128]]);
