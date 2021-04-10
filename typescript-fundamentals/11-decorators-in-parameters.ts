function logParameter(target, propertyKey, parameterIndex) {
  const metadataKey = `log_${propertyKey}_parameters`;
  if (Array.isArray(target[metadataKey])) {
    target[metadataKey].push(parameterIndex);
  } else {
    target[metadataKey] = [parameterIndex];
  }
  console.log(target);
  console.log(propertyKey);
  console.log(parameterIndex);
}

class P {
  greet(
    message: string,
    @logParameter otherMessage: string
  ): string {
    return message;
  }
}

const p = new P();
p.greet('hello', 'friend');

/* 
Output:
P { greet: [Function], log_greet_parameters: [ 1 ] }
greet
1
*/
