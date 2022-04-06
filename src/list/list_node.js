export default class list_node {
  data; //数值
  pred; //前驱
  succ; //后继
  constructor(data, pred, succ) {
    this.data = data;
    this.pred = pred;
    this.succ = succ;
  }
  /**
   * 紧靠当前节点之前插入新节点
   */
  insert_as_pred(e) {
    const node = new list_node(e, this.pred, this);
    if (this.pred) {
      this.pred.succ = node;
    }
    this.pred = node;
    return node;
  }
  /**
   * 紧靠当前节点之后插入新节点
   */
  insert_as_succ(e) {
    const node = new list_node(e, this, this.succ);
    if (this.succ) {
      this.succ.pred = node;
    }
    this.succ = node;
    return node;
  }
}
