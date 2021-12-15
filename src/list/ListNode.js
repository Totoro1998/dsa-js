export default class ListNode {
  data; //数值
  pred; //前驱
  succ; //后继
  constructor(data = undefined, pred = undefined, succ = undefined) {
    this.data = data;
    this.pred = pred;
    this.succ = succ;
  }
  /**
   * 紧靠当前节点之前插入新节点
   */
  insertAsPred(e) {
    const node = new ListNode(e, this.pred, this);
    if (this.pred) {
      this.pre.succ = node;
    }
    this.pred = node;
    return node;
  }
  /**
   * 紧靠当前节点之后插入新节点
   */
  insertAsSucc(e) {
    const node = new ListNode(e, this, this.succ);
    if (this.succ) {
      this.succ.pre = node;
    }
    this.succ = node;
    return node;
  }
}
