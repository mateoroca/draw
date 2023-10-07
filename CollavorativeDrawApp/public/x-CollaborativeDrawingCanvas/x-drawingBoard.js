/* Copyright Mateo Jose Roca Clementis <mateojoserocaclemntis17@gmail.com>
 Released under the MIT license
https://opensource.org/licenses/MIT

 */

import { ControlllerCDC } from "./controller/ControlllerCDC.js";
import { ModelCDC } from "./model/modelCDC.js";
import { ViewCDC } from "./view/viewCDC.js";

class CollaborativeDrawingCanvas extends HTMLElement {
  constructor() {
    super();
    this.view = new ViewCDC();
    this.Model = new ModelCDC("ws://10.0.7.143:3000/session1");
    this.Controller = new ControlllerCDC(this.view, this.Model);
    const style = document.createElement("style");
    style.innerText = `@import 'x-CollaborativeDrawingCanvas/style/style.css'`;

    this.appendChild(style);
    this.appendChild(this.view);
  }
}

customElements.define(
  "collaborative-drawing-canvas",
  CollaborativeDrawingCanvas
);

export { CollaborativeDrawingCanvas };
