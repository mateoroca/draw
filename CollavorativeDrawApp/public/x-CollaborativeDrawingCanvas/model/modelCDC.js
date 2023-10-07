/* Copyright Mateo Jose Roca Clementis <mateojoserocaclemntis17@gmail.com>
 Released under the MIT license
https://opensource.org/licenses/MIT

 */

class ModelCDC {
  constructor(url) {
    this.socket = new WebSocket(url);
  }

  getWebSocketConnection() {
    return this.socket;
  }
}

export { ModelCDC };

//Made by Mateo Roca
