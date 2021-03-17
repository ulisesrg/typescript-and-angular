class Human {
  private age: number;
  private height: number;
  private ssn: string;

  constructor(age: number, height: number, ssn: string) {
    this.age = age;
    this.height = height;
    this.ssn = ssn;
  }
}

class Student extends Human {
  private id: string;

  constructor(age: number, height: number, ssn: string, id: string) {
    super(age, height, ssn);
    this.id = id;
  }
}

let human: Human = new Human(27, 1.69, '123456789');
let student: Student = new Student(27, 1.69, '123456789', '456');

human = student; // not error, they share the same structure
// student = human; // error, since id is missing