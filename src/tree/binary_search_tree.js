import { bin_node } from './tree_node.js';
import bin_tree from './bin_tree.js';
import { is_left_child, has_left_child, has_right_child, update_height } from './bin_node_util.js';
export default class binary_search_tree extends bin_tree {
  hot; //命中的节点的父亲
  constructor() {
    super();
  }
  /**
   *
   * @param {*} a
   * @param {*} b
   * @param {*} c
   * @param {*} T0
   * @param {*} T1
   * @param {*} T2
   * @param {*} T3
   */
  connect34(a, b, c, T0, T1, T2, T3) {
    a.lc = T0;
    if (T0) {
      T0.parent = a;
    }
    a.rc = T1;
    if (T1) {
      T1.parent = a;
    }
    update_height(a);
    c.lc = T2;
    if (T2) {
      T2.parent = c;
    }
    c.rc = T3;
    if (T3) {
      T3.parent = c;
    }
    update_height(c);
    b.lc = a;
    a.parent = b;
    b.rc = c;
    c.parent = b;
    update_height(b);
    return b;
  }
  /**
   * BST节点旋转变换统一算法（3节点 + 4子树），返回调整之后局部子树根节点的位置
   * 注意：尽管子树根会正确指向上层节点（如果存在），但反向的联接须由上层函数完成
   * @param {*} v
   */
  rotate_at(v) {
    const p = v.parent;
    const g = p.parent;
    if (is_left_child(p)) {
      if (is_left_child(v)) {
        p.parent = g.parent;
        return this.connect34(v, p, g, v.lc, v.rc, p.rc, g.rc);
      } else {
        v.parent = g.parent;
        return connect34(p, v, g, p.lc, v.lc, v.rc, g.rc);
      }
    } else {
      if (is_right_child(v)) {
        p.parent = g.parent;
        return connect34(g, p, v, g.lc, p.lc, v.lc, v.rc);
      } else {
        v.parent = g.parent; //向上联接
        return connect34(g, v, p, g.lc, v.lc, v.rc, p.rc);
      }
    }
  }
  /**
   * 该函数查找成功后，返回查找到的节点，并将hot设置为该节点的父节点
   * 查找失败时，会返回已经比较过大小的“空节点”，并将hot设置为该“空节点”的父节点
   * @param {*} e
   */
  search(e) {
    if (!this.root || e === this.root.data) {
      this.hot = null;
      return this.root;
    }
    this.hot = this.root;
    while (true) {
      const v = e < this.hot.data ? this.hot.lc : this.hot.rc;
      if (!v || e === v.data) {
        return v;
      }
      this.hot = v;
    }
  }
  insert(e) {
    let x = this.search(e);
    if (x) {
      return x;
    }
    //创建新节点x：以e为关键码，以hot为父
    x = new bin_node(e, this.hot);
    this.size++;
    //更新x及其历代祖先的高度
    this.update_height_above(x);
    return x;
  }
  remove(e) {
    const x = this.search(e);
    if (!x) {
      return false;
    }
    this.remove_at(x, this.hot);
    this.size--;
    this.update_height_above(x);
    return x;
  }
  /**
   * BST节点删除算法：删除位置x所指的节点
   * 返回值指向实际被删除节点的接替者，hot指向实际被删除节点的父亲——二者均有可能是NULL
   * @param {*} x
   * @param {*} hot
   */
  remove_at(x, hot) {
    const w = x; //实际被删除的节点
    const succ = null; //实际被删除节点的接替者
    /**
     * 若x的左子树为空，则可直接将x替换为其右子树
     */
    if (!has_left_child(x)) {
      x = x.rc;
      succ = x;
    } else if (!has_right_child(x)) {
      x = x.lc;
      succ = x;
    } else {
      //若左右子树均存在，则选择x的直接后继作为实际被摘除节点
      w = w.succ();
      [x.data, w.data] = [w.data, x.data]; //交换数据
      succ = w.rc; //只可能是右节点，因为w是直接后继
      const u = w.parent;
      //若恰好u是x(经过交换的),succ为空
      u.data === x.data ? (u.rc = succ) : (u.lc = succ); //更新w的父节点
    }
    hot = w.parent; //记录实际被删除节点的父亲
    if (succ) {
      succ.parent = hot; //将被删除节点的接替者与hot相联
    }
    w.data = null;
    w = null;
    return succ;
  }
  stretchToLPath() {
    stretch_by_zag(this.root);
  }
  stretchToRPath() {
    stretch_by_zig(this.root);
  }
  stretch() {}
  /**
   * 通过zag旋转调整，将BST子树x拉伸成最左侧通路
   * @param {*} x
   */
  stretch_by_zag(x) {
    let c = 0;
    let p = x;
    while (p.rc) {
      p = p.rc;
    }
    while (x.lc) {
      x = x.lc;
    }
    for (; x.data !== p.data; x = x.parent) {
      while (x.rc) {
        x.zag();
        c++;
      }
    }
  }
  stretch_by_zig(x) {
    let c = 0;
    let v = x;
    while (x.lc) {
      x = x.lc;
    }
    for (; v; v = v.rc) {
      while (v.lc) {
        v = v.zig();
        c++;
      }
    }
  }
}