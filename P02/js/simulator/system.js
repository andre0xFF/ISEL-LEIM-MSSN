class System {

  constructor() {
    this.time = millis();
    this.update()
  }

  get_delta() { return this.delta }

  update() {
    this.delta = (millis() - this.time) / 1000
    this.time = millis()
  }
}
