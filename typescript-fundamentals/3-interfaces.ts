type Ssn = number;

interface Person {
  height?: number;
  age: number;
  name: string;
  lastName: string;
  ssn: Ssn;
}
// ? means optional

const person: Person = {
  // height: 1.69,
  age: 29,
  name: 'John',
  lastName: 'Smith',
  ssn: 123456789
}