const username: string | number = 'giansl';
const sum = (a: number, b: number): number => a + b;
sum(1, 2);


class Person {
  constructor(public age: number, public lastName : string) {}
}

const nico = new Person(22, 'Doe');
nico.age;
