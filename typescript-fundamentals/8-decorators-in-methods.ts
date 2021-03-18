function log(target, key) {
  console.log(key + 'it has been called');
}
// target -> Robot
// key -> sayMyName

class Robot {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  @log
  sayMyName() {
    console.log(this.name);
  }
}

const robot: Robot = new Robot('Alan');

robot.sayMyName();
/* 
it will print:
'Alan' 'sayMyName se ha llamado'
*/
