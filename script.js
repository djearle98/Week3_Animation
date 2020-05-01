var editButton = document.getElementById("edit");
editButton.onclick = editClicked;

let root = document.documentElement;

function editClicked(){
  root.style.setProperty('--canvas-width', "50vw");
  root.style.setProperty('--node-size', "200px");
}
