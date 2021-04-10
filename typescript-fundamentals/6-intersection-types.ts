interface Interface1 {
  prop1: number;
}

interface Interface2 {
  prop2: number;
  prop3: number;
}

interface Interface3 {
  prop2: number;
}

type InterfaceIntersection = Interface1 & Interface2 & Interface3;

const interfaceIntersection: InterfaceIntersection = {
  // since it is an intersection, it will need to have prop1, prop2 and prop3, if any of those are missing, it will throw an error
  prop1: 2,
  prop2: 3,
  prop3: 3,
  // prop4: 5 // error, since it is not in the previous interfaces
}