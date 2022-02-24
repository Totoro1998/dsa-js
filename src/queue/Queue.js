import list from '../list/list.js';
export default class Queue extends list {
  constructor() {
    super();
  }
  /**
   * 尾部插入
   */
  enqueue(e) {
    this.insertAsLast(e);
  }
  /**
   * 首部删除
   */
  dequeue() {
    return this.remove(this.first());
  }
  /**
   * 对首
   */
  front() {
    return this.first().data;
  }
}
