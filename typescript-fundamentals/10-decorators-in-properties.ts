function logProperty(target, key) {
  let _val = target[key];
  const getter = () => {
    console.log(`Get: ${key} => ${_val}`);
    return _val;
  };

  const setter = (newValue) => {
    console.log(`Set: ${key} => ${newValue}`);
    _val = newValue;
  };

  const objectProperty = {
    get: getter,
    set: setter,
  };

  Object.defineProperty(target, key, objectProperty);
}

class Dog {
  @logProperty
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const d = new Dog('Doug'); // Set: name => 'Doug'
d.name = 'Patch'; // Set: name => 'Patch'
const nameFromClass = d.name; // Get: name => 'Patch'
