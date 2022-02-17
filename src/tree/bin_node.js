import { trav_in1, has_left_child, is_right_child } from './bin_node_util.js';
export class bin_node {
  data = undefined; // 数值
  parent = undefined; // 父节点
  lc = undefined; // 左孩子
  rc = undefined; // 右孩子
  height = undefined; // 高度
  npl = undefined; // Null Path Length（左式堆，空节点通路长度）
  color = undefined; // 颜色（红黑树）
  /**
   * 构造函数
   * @param {*} data
   * @param {*} parent
   * @param {*} lc
   * @param {*} rc
   * @param {*} height
   * @param {*} npl
   * @param {*} color
   */
  constructor(data, parent, lc, rc, height, npl, color) {
    this.data = data;
    this.parent = parent;
    this.lc = lc;
    this.rc = rc;
    this.height = height;
    this.npl = npl;
    this.color = color;
  }
  /**
   * 统计当前节点的后代总数
   */
  size() {}
  /**
   * 作为当前节点的左孩子插入
   * @param {*} e
   */
  insert_as_lc(e) {
    this.lc = new BindNode(e, this);
    return this.lc;
  }
  /**
   * 作为当前节点的右孩子插入
   * @param {*} e
   */
  insert_as_rc(e) {
    this.rc = new BindNode(e, this);
    return this.rc;
  }
  /**
   * 取当前节点的直接后继,相对于中序遍历
   */
  succ() {
    let s = this;
    if (this.rc) {
      s = this.rc;
      while (has_left_child(s)) {
        s = s.lc;
      }
    } else {
      while (is_right_child(x)) {
        s = s.parent;
      }
      s = s.parent;
    }
    return s;
  }
  /**
   * 子树层次遍历
   * @param {*} visit
   */
  trav_level(visit) {}
  /**
   * 子树先序遍历
   * @param {*} visit
   */
  trav_pre(visit) {}
  /**
   * 子树中序遍历
   * @param {*} visit
   */
  trav_in(visit) {
    switch (get_random_number(1, 5)) {
      case 1:
        trav_in1(this, visit);
        break;
      case 2:
        trav_in2(this, visit);
        break;
      case 3:
        trav_in3(this, visit);
        break;
      case 4:
        trav_in4(this, visit);
        break;
      default:
        trav_in5(this, visit);
    }
  }
  /**
   * 子树后序遍历
   * @param {*} visit
   */
  trav_post(visit) {}
}
