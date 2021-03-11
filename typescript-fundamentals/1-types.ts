// Types

let a: string = 'hello';
a = 'hi';
// a = 2; // error

let b = 'see ya'; // type inference
b = 'bye';
// b = 2; // error

let c: number = 10;
// c = 'hi'; // error
c = 20;
c = 10 + 10;
const num1 = 10;
const num2 = 20;
c = num1 + num2;

function sum(num1: number, num2: number): number {
  return num1 + num2;
}

// sum(1, '2'); // error

function vanillaJavascriptSum(num1, num2) {
  return num1 + num2;
}

let anyValue: any = 10;
anyValue = 'Hi';

// Type Keyword

type dni = number;
let dniNumber: dni = 123;
let dniNumber2: dni = 456;
