import stack from '../stack.js';
/**
 * 括号匹配
 * @param {*} exp
 * @param {*} lo
 * @param {*} hi
 */
export const paren = (exp, lo = 0, hi = exp.length - 1) => {
  const S = new stack();
  for (let i = lo; i <= hi; i++) {
    switch (exp[i]) {
      case '(':
      case '[':
      case '{':
        S.push(exp[i]);
        break;
      case ')':
        if (S.empty() || '(' !== S.pop()) {
          return false;
        }
        break;
      case ']':
        if (S.empty() || '[' !== S.pop()) {
          return false;
        }
        break;
      case '}':
        if (S.empty() || '{' !== S.pop()) {
          return false;
        }
        break;
      default:
        break;
    }
  }
  return S.empty();
};
const exp = ['{', '(', ')', '}'];
console.log(paren(exp));
