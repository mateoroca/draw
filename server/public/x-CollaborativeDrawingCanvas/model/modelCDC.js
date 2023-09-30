class ModelCDC {
  constructor(url) {
    this.socket = new WebSocket(url);
  }

  getWebSocketConnection() {
    return this.socket;
  }
}

export { ModelCDC };
