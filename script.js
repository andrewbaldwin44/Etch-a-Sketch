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

  for (let i = 0; i < (resizeValue*resizeValue); i++) {
    let gridItem = document.createElement("div");
    gridItem.setAttribute("class", "gridItems");

    gridItem.addEventListener("pointerenter", selectGridFill);

    mainGrid.appendChild(gridItem);
  }
}

function createGridSelectors(){
  const gridSelectors = document.createElement("section");

  const shaderSelector = document.createElement("div");
  const shaderCheck = document.createElement("input");
  const shaderLabel = document.createElement("label");

  const multicolorSelector = document.createElement("div");
  const multicolorCheck = document.createElement("input");
  const multicolorLabel = document.createElement("label");

  const colorSelector = document.createElement("div");
  const colorInput = document.createElement("input");
  const colorInputLabel = document.createElement("label");

  const gridLineSelector= document.createElement("div");
  const toggleGridLines = document.createElement("input");
  const toggleGridLinesLabel = document.createElement("label");

  const resizeSelector = document.createElement("div");
  const resizeInput = document.createElement("input");
  const resizeInputLabel = document.createElement("label");

  const clearGridButton = document.createElement("button");

  gridSelectors.setAttribute("id", "gridSelectors");

  shaderCheck.setAttribute("type", "checkbox");
  shaderCheck.setAttribute("id", "shaderCheck");
  shaderCheck.setAttribute("name", "shaderCheck");
  shaderCheck.setAttribute("for", "shaderCheck");
  shaderLabel.textContent = "Shading Pencil";

  multicolorCheck.setAttribute("type", "checkbox");
  multicolorCheck.setAttribute("id", "multicolorCheck");
  multicolorCheck.setAttribute("name", "multicolorCheck");
  multicolorLabel.setAttribute("for", "multicolorCheck");
  multicolorLabel.textContent = " Multicolored Brush";

  colorInput.setAttribute("type", "color");
  colorInput.setAttribute("id", "colorInput");
  colorInput.setAttribute("name", "colorInput");
  colorInput.setAttribute("for", "colorInput");
  colorInputLabel.textContent = "Select a Color";

  toggleGridLines.setAttribute("type", "checkbox");
  toggleGridLines.setAttribute("id", "toggleGridLines");
  toggleGridLines.setAttribute("name", "toggleGridLines");
  toggleGridLines.addEventListener("click", toggleGridLine);
  toggleGridLinesLabel.setAttribute("for", "toggleGridLines");
  toggleGridLinesLabel.textContent = "Toggle Gridlines";

  resizeInput.setAttribute("type", "text");
  resizeInput.setAttribute("id", "resizeInput");
  resizeInput.setAttribute("name", "resizeInput");
  resizeInput.setAttribute("type", "number");
  resizeInput.setAttribute("min", "1");
  resizeInput.setAttribute("max", "100");
  resizeInput.value = "16";
  resizeInput.addEventListener("input", resizeGrid);
  resizeInput.addEventListener("change", blockInvalidInput);
  resizeInputLabel.setAttribute("for", "resizeInput");
  resizeInputLabel.textContent = "Resize Grid";

  clearGridButton.setAttribute("id", "clearGridButton");
  clearGridButton.textContent = "Clear Grid";
  clearGridButton.addEventListener("click", clearGrid);

  shaderSelector.appendChild(shaderCheck);
  shaderSelector.appendChild(shaderLabel);
  gridSelectors.appendChild(shaderSelector);

  multicolorSelector.appendChild(multicolorCheck);
  multicolorSelector.appendChild(multicolorLabel);
  gridSelectors.appendChild(multicolorSelector);

  colorSelector.appendChild(colorInput);
  colorSelector.appendChild(colorInputLabel);
  gridSelectors.appendChild(colorSelector);

  gridLineSelector.appendChild(toggleGridLines);
  gridLineSelector.appendChild(toggleGridLinesLabel);
  gridSelectors.appendChild(gridLineSelector);

  resizeSelector.appendChild(resizeInputLabel);
  resizeSelector.appendChild(resizeInput);
  gridSelectors.appendChild(resizeSelector);

  gridSelectors.appendChild(clearGridButton);

  body.appendChild(gridSelectors);
}

function resizeGrid(e) {
  let resizeValue = e.target.value;

  if (resizeValue <= 100 && resizeValue >= 1 && resizeValue != "") {
    createGrid(resizeValue);
  }
}

function blockInvalidInput(e) {
  let resizeValue = e.target.value;
  if (resizeValue > 100) {
    resizeValue = 100;
    e.target.value = 100;
  }
  else if(resizeValue == "") {
    resizeValue = 16;
    e.target.value = 16;
  }
  else if (resizeValue < 1) {
    resizeValue = 1;
    e.target.value = 1;
  }

  createGrid(resizeValue);
}

function toggleGridLine(e) {
  const gridItems = document.querySelectorAll(".gridItems");
  if (e.target.checked) {
    gridItems.forEach((item) => {
      item.style.border = "none";
    });
  }
  else {
    gridItems.forEach((item) => {
      item.style.border = "1px solid black";
    });
  }
}

function clearGrid() {
  const mainGrid = document.querySelector("#gridArea");
  createGrid(Math.sqrt(mainGrid.childElementCount));
}

function selectGridFill(e) {
  const shaderCheck = document.querySelector("#shaderCheck");
  const colorSelected = document.querySelector("#colorInput");
  let shadeDegree = +(e.target.style.backgroundColor.slice(-4, -1)) + 0.1;

  if (shaderCheck.checked && multicolorCheck.checked) {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    e.target.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${shadeDegree})`;
  }
  else if (multicolorCheck.checked) {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
  else if (colorSelected.value != "#000000" && shaderCheck.checked) {
    let r = parseInt(colorSelected.value.slice(1, 3), 16);
    let g = parseInt(colorSelected.value.slice(3, 5), 16);
    let b = parseInt(colorSelected.value.slice(5, 8), 16);
    e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b}, ${shadeDegree})`;
  }
  else if (colorSelected.value != "#000000") {
    e.target.style.backgroundColor = colorSelected.value;
  }
  else if (shaderCheck.checked) {
    e.target.style.backgroundColor = `rgba(0, 0, 0, ${shadeDegree})`;
  }

  else {
    e.target.style.backgroundColor = "rgb(0, 0, 0)";
  }
}
createGridSelectors();
createGrid("16");
