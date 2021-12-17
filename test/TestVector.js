import Vector from '../src/vector/Vector.js';
const vec = new Vector([
  1, 9, 3, 8, 4, 10, 2, 7, 11, 18, 20, 19, 15, 14, 17, 33, 24, 25, 28, 29, 30, 31, 40, 39, 38, 36,
]);
vec.sort();
console.log(vec.search(40));
