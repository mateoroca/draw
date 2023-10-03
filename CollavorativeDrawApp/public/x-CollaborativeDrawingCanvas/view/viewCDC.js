class ViewCDC extends HTMLElement {
  constructor() {
    super();

    this.container = document.createElement("div");
    this.container.classList.add("divContainer");
    this.appendChild(this.container);

    this.canvas = document.createElement("canvas");
    this.canvas.width = 1000;
    this.canvas.height = 550;

    this.ctx = this.canvas.getContext("2d");
    this.container.appendChild(this.canvas);

    this.divTools = document.createElement("div");
    this.divTools.classList.add("divTools");

    this.colorPalette = document.createElement("input");
    this.colorPalette.type = "color";
    this.colorPalette.classList.add("color-palette");

    this.eraseButton = document.createElement("button");
    this.eraseButton.textContent = "Borrar";
    this.eraseButton.classList.add("eraser-button");

    this.strokeWidthInput = document.createElement("input");
    this.strokeWidthInput.type = "range";
    this.strokeWidthInput.min = 1;
    this.strokeWidthInput.max = 20;
    this.strokeWidthInput.value = 2;
    this.strokeWidthInput.classList.add("stroke-width");

    this.deleteSessionButton = document.createElement("button");
    this.deleteSessionButton.classList.add("btn");

    this.paragraph = document.createElement("p");
    this.paragraph.classList.add("paragraph");
    this.paragraph.textContent = "Delete History Strokes";

    this.iconWrapper = document.createElement("span");
    this.iconWrapper.classList.add("icon-wrapper");

    this.svgIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this.svgIcon.classList.add("icon");
    this.svgIcon.setAttribute("width", "30px");
    this.svgIcon.setAttribute("height", "30px");
    this.svgIcon.setAttribute("viewBox", "0 0 24 24");
    this.svgIcon.setAttribute("fill", "none");

    this.svgIcon.innerHTML = `
  <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
`;

    this.deleteSessionButton.appendChild(this.paragraph);
    this.iconWrapper.appendChild(this.svgIcon);
    this.deleteSessionButton.appendChild(this.iconWrapper);

    this.divTools.appendChild(this.eraseButton);
    this.divTools.appendChild(this.strokeWidthInput);
    this.divTools.appendChild(this.colorPalette);
    this.divTools.appendChild(this.deleteSessionButton);
    this.container.appendChild(this.divTools);
  }

  getCanvasContext() {
    return this.ctx;
  }
}

customElements.define("view-cdc", ViewCDC);

export { ViewCDC };

//Made by Mateo Roca
