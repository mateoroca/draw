class ViewCDC extends HTMLElement {
  constructor() {
    super();

    // Crear un contenedor div
    this.container = document.createElement("div");
    this.container.classList.add("divContainer");
    this.appendChild(this.container);

    // Crear un elemento canvas y agregarlo al contenedor
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1000;
    this.canvas.height = 550;

    // Obtener el contexto del lienzo
    this.ctx = this.canvas.getContext("2d");
    this.container.appendChild(this.canvas);

    this.divTools = document.createElement("div");
    this.divTools.classList.add("divTools");
    // Crear una paleta de colores
    this.colorPalette = document.createElement("input");
    this.colorPalette.type = "color";
    this.colorPalette.classList.add("color-palette");

    // Crear un botón para la goma de borrar
    this.eraseButton = document.createElement("button");
    this.eraseButton.textContent = "Borrar";
    this.eraseButton.classList.add("eraser-button");

    // ...

    // Crear un input para ajustar el grosor del trazo
    this.strokeWidthInput = document.createElement("input");
    this.strokeWidthInput.type = "range";
    this.strokeWidthInput.min = 1;
    this.strokeWidthInput.max = 20; // Establece el rango máximo según tus necesidades
    this.strokeWidthInput.value = 2; // Establece un valor inicial
    this.strokeWidthInput.classList.add("stroke-width");

    // Crear un botón para borrar la sesión con icono y texto
    this.deleteSessionButton = document.createElement("button");
    this.deleteSessionButton.classList.add("btn"); // Agrega la clase "btn" al botón

    // Crea un párrafo dentro del botón para el texto "Delete"
    this.paragraph = document.createElement("p");
    this.paragraph.classList.add("paragraph");
    this.paragraph.textContent = "Delete Draw Session";

    // Crea un contenedor para el icono
    this.iconWrapper = document.createElement("span");
    this.iconWrapper.classList.add("icon-wrapper");

    // Crea el elemento SVG para el icono
    this.svgIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this.svgIcon.classList.add("icon");
    this.svgIcon.setAttribute("width", "30px");
    this.svgIcon.setAttribute("height", "30px");
    this.svgIcon.setAttribute("viewBox", "0 0 24 24");
    this.svgIcon.setAttribute("fill", "none");

    // Agrega el contenido del icono SVG
    this.svgIcon.innerHTML = `
  <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
`;

    // Agrega el párrafo y el icono SVG al botón
    this.deleteSessionButton.appendChild(this.paragraph);
    this.iconWrapper.appendChild(this.svgIcon);
    this.deleteSessionButton.appendChild(this.iconWrapper);

    // ...

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

// Registrar el componente personalizado
customElements.define("view-cdc", ViewCDC);

export { ViewCDC };
