/**
 * F(0)=0
 * F(1)=1
 * F(n)=F(n-1)+F(n-2)（n≧2）
 */
export default class Fib {
  #f;
  #g; //当前Fibonacci项
  /**
   * 初始化为不小于n的最小Fibonacci项
   * @param {*} n
   */
  constructor(n) {
    this.#f = 1;
    this.#g = 0;
    while (this.#g < n) {
      this.next();
    }
  }
  /**
   * 获取当前Fibonacci项
   */
  get() {
    return this.#g;
  }
  /**
   * 转至下一Fibonacci项
   */
  next() {
    this.#g += this.#f;
    this.#f = this.#g - this.#f;
    return this.#g;
  }
  /**
   * 转至下一Fibonacci项
   */
  prev() {
    this.#f = this.#g - this.#f;
    this.#g = this.#g - this.#f;
    return this.#g;
  }
}
