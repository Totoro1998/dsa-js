import Vector from '../vector/Vector.js';
export default class Stack extends Vector {
  constructor() {
    super();
  }
  /**
   * 添加至末尾
   * @param {*} e
   */
  push(e) {
    this.insert(e);
  }
  /**
   * 删除末元素
   */
  pop() {
    return this.remove(this.size() - 1);
  }
  /**
   * 取顶，直接返回向量的末元素
   */
  top() {
    return this.elem[this.length() - 1];
  }
}
