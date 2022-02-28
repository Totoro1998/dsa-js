import { bin_node } from './bin_node.js';
import bin_tree from './bin_tree.js';
import { is_left_child } from './bin_node_util.js';

const update_height = (x) => {
  x.height = Math.max(x.lc.height, x.rc.height) + 1;
  return x.height;
};
export default class bin_search_tree extends bin_tree {
  hot; //命中的节点父亲
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
  remove_at(x, hot) {
    const w = x;
    const succ = null;
    if (!this.has_left_child(x)) {
      x = x.rc;
      succ = x;
    } else if (!this.has_right_child(x)) {
      x = x.lc;
      succ = x;
    } else {
      w = w.succ();
      [x.data, w.data] = [w.data, x.data];
      const u = w.parent;
      succ = w.rc;
      u.data === x.data ? (u.rc = succ) : (u.lc = succ);
    }
    hot = w.parent;
    if (succ) {
      succ.parent = hot;
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
