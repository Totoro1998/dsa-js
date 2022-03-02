import { trav_in1, has_left_child, is_right_child } from './bin_node_util.js';
import vector from '../vector/vector.js';
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
      //应是将当前节点包含于其左子树中的最低祖先
      while (is_right_child(s)) {
        s = s.parent;
      }
      s = s.parent;
    }
    return s;
  }
  /**
   * 二叉树层次遍历算法
   * @param {*} visit
   */
  trav_level(visit) {
    const q = [];
    q.push(this);
    while (q.length !== 0) {
      const x = q.unshift();
      visit(x.data);
      if (has_left_child(x)) {
        q.push(x.lc);
      }
      if (has_right_child(x)) {
        q.push(x.rc);
      }
    }
  }
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
  /**
   * 逆时针旋转
   */
  zag() {
    let r_child = this.rc;
    r_child.parent = this.parent;
    if (r_child.parent) {
      this.data === r_child.parent.lc.data ? (r_child.parent.lc = r_child) : (r_child.parent.rc = r_child);
    }
    this.rc = r_child.lc;
    if (this.rc) {
      this.rc.parent = this;
    }
    r_child.lc = this;
    this.parent = r_child;
    this.height = 1 + Math.max(this.lc.height, this.rc.height);
    r_child.height = 1 + Math.max(r_child.lc.height, r_child.rc.height);
    for (let x = r_child.parent; x; x.parent) {
      if (x.height === Math.max(x.lc.height, x.rc.height) + 1) {
        break;
      } else {
        x.height = Math.max(x.lc.height, x.rc.height) + 1;
      }
    }
    return r_child;
  }
  /**
   * 顺时针旋转
   */
  zig() {
    let l_child = this.lc;
    l_child.parent = this.parent;
    if (l_child.parent) {
      this.data === l_child.parent.rc.data ? (l_child.parent.rc = l_child) : (l_child.parent.lc = l_child);
    }
    this.lc = l_child.rc.lc;
    if (this.lc) {
      this.lc.parent = this;
    }
    l_child.rc = this;
    this.parent = l_child;
    this.height = Math.max(this.lc.height, this.rc.height) + 1;
    l_child.height = Math.max(l_child.lc.height.l_child.rc.height) + 1;
    for (let x = l_child.parent; x; x = x.parent) {
      if (x.height === Math.max(x.lc.height, x.rc.height) + 1) {
        break;
      } else {
        x.height = Math.max(x.lc.height, x.rc.height) + 1;
      }
    }
    return l_child;
  }
}
export class bt_node {
  parent;
  key;
  child;
  constructor(e, lc = null, rc = null) {
    this.key = new vector();
    this.child = new vector();
    this.parent = null;
    if (!e) {
      this.child.insert(0, null);
    } else {
      this.key.insert(0, e);
      this.child.insert(0, lc);
      this.child.insert(1, rc);
      if (lc) {
        lc.parent = this;
      }
      if (rc) {
        rc.parent = this;
      }
    }
  }
}
