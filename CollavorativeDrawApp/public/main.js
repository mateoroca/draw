/* Copyright Mateo Jose Roca Clementis <mateojoserocaclemntis17@gmail.com>
 Released under the MIT license
https://opensource.org/licenses/MIT

 */

import { CollaborativeDrawingCanvas } from "./x-CollaborativeDrawingCanvas/x-drawingBoard.js";

function main() {
  const drawBoard = new CollaborativeDrawingCanvas();
  document.body.appendChild(drawBoard);
}

window.addEventListener("load", main);

//Made by Mateo Roca
