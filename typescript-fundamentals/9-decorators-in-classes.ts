function init(target) {
  return class extends target {
    name = 'John';
    lastName = 'Smith';

    sayMyName() {
      return `${this.nombre} ${this.apellido}`;
    }
  };
}

@init
class P {
  constructor() {}

  sayMyName() {}
}

const p: P = new P();
console.log(p.sayMyName()); // John Smith
