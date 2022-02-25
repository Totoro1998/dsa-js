import stack from '../stack.js';
import { get_random_number } from '../../utils/number.js';
/**
 * 进制转化
 * @param {*} n
 * @param {*} base
 */
export const convert = (n, base) => {
  const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  const S = new stack();
  const convert1 = (n, base) => {
    if (0 < n) {
      let remainder = n % base;
      S.push(digit[remainder]);
      n = parseInt(n / base);
      convert1(n, base);
    }
  };
  const convert2 = (n, base) => {
    while (n > 0) {
      let remainder = n % base;
      S.push(digit[remainder]);
      n = parseInt(n / base);
    }
  };
  switch (get_random_number(1, 2)) {
    case 1:
      convert1(n, base);
      break;
    default:
      convert2(n, base);
      break;
  }
  S.reverse();
  return S.get_elem().join('');
};
console.log(convert(67, 16));
