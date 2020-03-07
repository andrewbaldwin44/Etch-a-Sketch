const body = document.querySelector("body");
const screenWidth = screen.width;

function createGrid(resizeValue) {
  const clearExisting = document.querySelector("#gridArea");
  if (clearExisting) {
    clearExisting.remove();
  }

  const mainGrid = document.createElement("div");
  mainGrid.setAttribute("id", "gridArea");
  mainGrid.style =
    `grid-template-columns: repeat(${resizeValue}, 1fr);
     grid-template-rows: repeat(${resizeValue}, 1fr)`
  body.appendChild(mainGrid);


  for (i = 0; i < (resizeValue*resizeValue); i++) {
    let gridItem = document.createElement("div");
    gridItem.setAttribute("class", "gridItems");
    gridItem.addEventListener("mouseover", (e) => selectGridFill(e));
    mainGrid.appendChild(gridItem);
  }
}

function getResizeValue() {
  let resizeValue = 16;
  resizeValue = prompt(
    `Please enter a number from 1 to 100. The number corresponds to the
     number of squares on each side of the grid!`, "16");
  do {
    if (resizeValue == null) {
      resizeValue = 16;
      return;
    }
    if (!parseInt(resizeValue)) {
      resizeValue = prompt(
        `"${resizeValue}" is not a number! Please enter a number from 1 to 100`);
    }
    if (resizeValue > 100 || resizeValue < 1) {
      resizeValue = prompt(
        `Please enter a number from 1 to 100`
      );
    }
  } while (!parseInt(resizeValue) || resizeValue > 100 || resizeValue < 1);

  createGrid(resizeValue);
}

function makeResizeButton() {
  const resizeButton = document.createElement("button");

  resizeButton.setAttribute("id", "customGrid");
  resizeButton.textContent = "Resize Grid";
  resizeButton.addEventListener("click", () => getResizeValue());

  body.appendChild(resizeButton);
}

function makeShadingPencil(){
  const shaderCheck = document.createElement("input");
  const shaderLabel = document.createElement("label");

  shaderCheck.setAttribute("type", "checkbox");
  shaderCheck.setAttribute("id", "shaderCheck");
  shaderLabel.textContent = "Shading Pencil";

  body.appendChild(shaderCheck);
  body.appendChild(shaderLabel);
}

function selectGridFill(e) {
  const shaderCheck = document.querySelector("#shaderCheck");
  let shadeDegree = +(e.target.style.backgroundColor.slice(-4, -1)) + 0.1;

  shaderCheck.checked
    ? e.target.style.backgroundColor = `rgba(0, 0, 0, ${shadeDegree})`
    : e.target.style.backgroundColor = "black"
}


createGrid("16");
makeResizeButton();
makeShadingPencil();
