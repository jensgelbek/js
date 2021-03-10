let car = {make: "volvo", year: 2011}
console.log(car) //1

let carCopy = {...car};
console.log(carCopy) //2

carCopy.year = 2018;

console.log(car) //3
console.log(carCopy) //4

