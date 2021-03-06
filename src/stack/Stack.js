import vector from '../vector/vector.js';
export default class stack extends vector {
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
    return this.remove_by_index(this.len() - 1);
  }
  /**
   * 取顶，直接返回向量的末元素
   */
  top() {
    return this.elem[this.len() - 1];
  }
}
