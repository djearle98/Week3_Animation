var obj = document.getElementById("obj");
var parameters = ["width", "height", "left", "top", "border-radius", "background-color"];
var presets = [];

function addPreset(data) {
  var i = presets.push(document.createElement("button")) - 1;
  var button = presets[i];
  button.setAttribute("type", "button");
  button.addEventListener("click", function() {
    changeCSS(data);
  }, false);
  var text = document.createTextNode("Preset: [" + data + "]");
  button.appendChild(text);
  document.body.appendChild(button);
}
function changeCSS(data){
	for (var i=0; i<parameters.length; i++){
  	obj.style.setProperty(parameters[i], data[i])
  }
}
/*EXECUTION*/
addPreset(["95%", "95%", "2.5%", "2.5%", "0px", "#f00"]);
addPreset(["90%", "90%", "5%", "5%", "15px", "#0ff"]);
addPreset(["50%", "90%", "25%", "5%", "50px", "#808080"]);
document.getElementsByTagName("button")[0].click();
