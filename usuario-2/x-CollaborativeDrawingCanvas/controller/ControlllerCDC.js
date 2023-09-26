class ControlllerCDC {
  constructor(innerView, innerModel) {
    this.view = innerView;
    this.model = innerModel;

    this.view.canvas.addEventListener(
      "mousedown",
      this.startDrawing.bind(this)
    );
    this.view.canvas.addEventListener("mousemove", this.draw.bind(this));
    this.view.canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
    /* --------------------------------------------------------------------------------- */
    this.ctx = this.view.getCanvasContext();
    this.socket = this.model.getWebSocketConnection();
    /* --------------------------------------------------------------------------------- */
    this.socket.onmessage = (event) => {
      this.handleWebSocketMessage(event);
    };
    /* --------------------------------------------------------------------------------- */
    this.view.eraseButton.addEventListener("click", () => {
      // Configurar el color de trazo en blanco
      this.ctx.strokeStyle = " rgb(255, 255, 240)";
      // Configurar el modo de composición para borrar
      this.ctx.globalCompositeOperation = "destination-out";
      this.localState.strokeColor = " rgb(255, 255, 240)";
    });
    /* --------------------------------------------------------------------------------- */
    this.view.colorPalette.addEventListener("input", (event) => {
      // Configurar el color de trazo en el color seleccionado
      this.ctx.strokeStyle = event.target.value;
      // Restablecer el modo de composición para dibujar normalmente
      this.ctx.globalCompositeOperation = "source-over";
      this.localState.strokeColor = event.target.value;
    });
    /* --------------------------------------------------------------------------------- */
    this.view.strokeWidthInput.addEventListener("input", (event) => {
      this.ctx.lineWidth = event.target.value;
      this.localState.strokeWidth = event.target.value;
      // Configura el grosor del trazo en función del valor del input
    });
    /* --------------------------------------------------------------------------------- */

    this.view.deleteSessionButton.addEventListener("click");
    /* --------------------------------------------------------------------------------- */
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    /* --------------------------------------------------------------------------------- */
    this.localState = {
      strokeColor: this.view.colorPalette.value,
      strokeWidth: this.view.strokeWidthInput.value,
    };
    /* --------------------------------------------------------------------------------- */
  }

  enable() {}
  disable() {}

  handleWebSocketMessage(event) {
    if (event.data instanceof Blob) {
      this.__processBlobData(event.data);
    } else {
      const data = JSON.parse(event.data);
      this.__handleJsonData(data);
    }
  }

  __processBlobData(blob) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const textData = event.target.result;
    };
    reader.readAsText(blob);
  }

  __handleJsonData(data) {
    if (data.type === "history") {
      data.data.forEach((stroke) => {
        this.__drawStroke(stroke);
      });
    } else if (data.type === "draw") {
      this.__drawStroke(data.data);
    }
  }

  startDrawing(e) {
    this.isDrawing = true;
    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
  }

  draw(e) {
    if (!this.isDrawing) return;

    this.ctx.strokeStyle = this.localState.strokeColor;
    this.ctx.lineWidth = this.localState.strokeWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.stroke();

    // Enviar los trazos al servidor WebSocket (Sesión de Dibujo 2)
    const message = {
      type: "draw",
      data: {
        session: "session1", // Identifica la sesión de dibujo
        startX: this.lastX,
        startY: this.lastY,
        endX: e.offsetX,
        endY: e.offsetY,
        color: this.ctx.strokeStyle, // Color del trazo
        strokeWidth: this.ctx.lineWidth, // Grosor del trazo
      },
    };

    this.socket.send(JSON.stringify(message));

    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  __drawStroke(stroke) {
    this.ctx.beginPath();
    this.ctx.moveTo(stroke.startX, stroke.startY);
    this.ctx.lineTo(stroke.endX, stroke.endY);
    this.ctx.strokeStyle = stroke.color; // Color del trazo
    this.ctx.lineWidth = stroke.strokeWidth; // Grosor del trazo
    this.ctx.stroke();
  }
}

export { ControlllerCDC };
