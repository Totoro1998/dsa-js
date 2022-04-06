import entry from './entry.js';
export class quad_list_node {
  entry;
  pred;
  succ;
  above; //上邻
  below; //下邻
  //值，左右上
  constructor(e, p, s, a, b) {
    if (!e) {
      e = new entry();
    }
    this.entry = e;
    this.pred = p;
    this.succ = s;
    this.above = a;
    this.below = b;
  }
  /**
   * 插入新节点，其插入于当前节点之后、节点b之上
   * @param {*} e
   * @param {*} b
   */
  insert_as_succ_above(e, b) {
    const x = new quad_list_node(e, this, this.succ, null, b);
    this.succ.pred = x;
    this.succ = x;
    if (b) {
      b.above = x; //设置垂直逆向链接
    }
    return x;
  }
}
