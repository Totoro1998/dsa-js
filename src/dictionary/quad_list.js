import { quad_list_node } from './quad_list_node.js';
import uniqueId from 'lodash-es/uniqueId.js';
/**
 * 四连表
 */
export default class quad_list {
  size;
  header;
  trailer;
  unique_id;
  init() {
    this.header = new quad_list_node(); //创建头哨兵节点
    this.trailer = new quad_list_node(); //创建尾哨兵节点
    this.header.succ = this.trailer;
    this.header.pred = null;
    this.trailer.pred = this.header;
    this.trailer.succ = null;
    this.header.above = this.trailer.above = null;
    this.header.below = this.trailer.below = null;
    this.size = 0;
    this.unique_id = uniqueId();
  }
  clear() {
    const old_size = this.size;
    while (0 < this.size) {
      this.remove(this.header.succ);
    }
    return old_size;
  }
  constructor() {
    this.init();
  }
  len() {
    return this.size;
  }
  empty() {
    return this.size <= 0;
  }
  first() {
    return this.header.succ;
  }
  last() {
    return this.trailer.pred;
  }
  valid(p) {
    return p && p.succ && p.pred;
  }
  remove(p) {
    p.pred.succ = p.succ;
    p.succ.pred = p.pred;
    this.size--;
    const e = p.entry;
    p = null;
    return e;
  }
  /**
   * 将e作为p的后继，b的上邻插入
   * @param {*} e
   * @param {*} p
   * @param {*} b
   */
  insert_after_above(e, p, b) {
    this.size++;
    return p.insert_as_succ_above(e, b);
  }
  traverse(visit) {
    let p = this.header;
    while (true) {
      if (!p || !p.succ) {
        return;
      } else {
        p = p.succ;
        visit(p.data);
      }
    }
  }
}
