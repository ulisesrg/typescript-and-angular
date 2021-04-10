class Transportation {
  private speed: number;
  private mode: string;

  constructor(speed: number, mode: string) {
    this.speed = speed;
    this.mode = mode;
  }

  getSpeed() {
    return this.speed;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  getMode() {
    return this.mode;
  }

  setMode(mode: string) {
    this.mode = mode;
  }
}

const transportation: Transportation = new Transportation(20, 'land');

class Car extends Transportation {
  private doorsQuantity: number;

  constructor(speed: number, mode: string, doorsQuantity: number) {
    super(speed, mode);
    this.doorsQuantity = doorsQuantity;
  }

  // getSpeed() {
  //   return 'my speed is that of a car and is: ' + super.getSpeed();
  // }
  // error because returns a string

  getSpeed() {
    return super.getSpeed() + 10;
  }

  getDoorsQuantity() {
    return this.doorsQuantity;
  }

  setDoorsQuantity(doorsQuantity: number) {
    this.doorsQuantity = doorsQuantity;
  }
}

const car: Car = new Car(20, 'land', 4);
