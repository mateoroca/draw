import { CollaborativeDrawingCanvas } from "./x-CollaborativeDrawingCanvas/x-drawingBoard.js";

function main() {
  const drawBoard = new CollaborativeDrawingCanvas();
  document.body.appendChild(drawBoard);
}

window.addEventListener("load", main);
