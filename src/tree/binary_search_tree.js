import { bin_node } from './tree_node.js';
import bin_tree from './bin_tree.js';
import {
  is_left_child,
  has_left_child,
  has_right_child,
  update_height,
  from_parent_to,
  is_right_child,
  get_data,
} from './bin_node_util.js';
export default class binary_search_tree extends bin_tree {
  hot; //命中的节点的父亲
  constructor() {
    super();
  }
  /**
   * 按照“3+4”结构链接三个节点及其四棵子树，返回重组之后的局部子树根节点位置
   * 子树根节点与上层节点之间的双向链接，均须由上层调用者完成
   * 可用于AVL和红黑树的局部平衡调整,返回b
   * @param {*} g
   * @param {*} p
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
   * 对v及其父亲、祖父做统一旋转调整
   * BST节点旋转变换统一算法（3节点 + 4子树），返回调整之后局部子树根节点的位置
   * 注意：尽管子树根会正确指向上层节点（如果存在），但反向的联接须由上层函数完成
   * v为非空孙辈节点
   * @param {*} v
   */
  rotate_at(v) {
    const p = v.parent;
    const g = p.parent;
    //zig (顺时针)
    if (is_left_child(p)) {
      //zig-zig
      if (is_left_child(v)) {
        p.parent = g.parent;
        //返回p
        return this.connect34(v, p, g, v.lc, v.rc, p.rc, g.rc);
      } else {
        //zig-zag  先zag然后zig
        v.parent = g.parent;
        //返回v
        return this.connect34(p, v, g, p.lc, v.lc, v.rc, g.rc);
      }
    } else {
      //zag （逆时针）
      if (is_right_child(v)) {
        //zag-zag
        p.parent = g.parent;
        return this.connect34(g, p, v, g.lc, p.lc, v.lc, v.rc);
      } else {
        //zag-zig  先zig然后zag
        v.parent = g.parent; //向上联接
        return this.connect34(g, v, p, g.lc, v.lc, v.rc, p.rc);
      }
    }
  }
  /**
   * 该函数查找成功后，返回查找到的节点，并将hot设置为该节点的父节点
   * 查找失败时，会返回已经比较过大小的“空节点”，并将hot设置为该“空节点”的父节点
   * @param {*} e
   */
  search(e) {
    if (!this.root || e === get_data(this.root)) {
      this.hot = null;
      return this.root;
    }
    this.hot = this.root;
    while (true) {
      const v = e < get_data(this.hot) ? this.hot.lc : this.hot.rc;
      if (!v || e === get_data(v)) {
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
    if (!this.hot) {
      this.root = x;
    } else {
      if (e < get_data(this.hot)) {
        this.hot.lc = x;
      } else {
        this.hot.rc = x;
      }
    }
    this.size++;
    //更新x及其历代祖先的高度
    this.update_height_above(x);
    return x;
  }
  remove(e) {
    let x = this.search(e);
    if (!x) {
      return false;
    }
    this.remove_at(x);
    this.size--;
    this.update_height_above(x);
    return true;
  }
  /**
   * BST节点删除算法：删除位置x所指的节点
   * 返回值指向实际被删除节点的接替者，hot指向实际被删除节点的父亲。二者均有可能是NULL
   * @param {*} x
   * @param {*} hot
   */
  remove_at(x) {
    let w = x; //实际被删除的节点
    let succ = null; //实际被删除节点的接替者
    /**
     * 若x的左子树为空，则可直接将x替换为其右子树
     */
    let [parent, dir] = from_parent_to(x);
    if (!has_left_child(x)) {
      if (dir) {
        parent[dir] = x.rc;
      } else {
        this.root = x.rc;
      }
      succ = x.rc;
    } else if (!has_right_child(x)) {
      if (dir) {
        parent[dir] = x.lc;
      } else {
        this.root = x.lc;
      }
      succ = x.lc;
    } else {
      //若左右子树均存在，则选择x的直接后继作为实际被摘除节点
      w = w.succ();
      const u = w.parent;
      [x.data, w.data] = [w.data, x.data]; //交换数据，其它的并没有进行更改
      //若恰好u是x(经过交换的),succ为空
      succ = w.rc; //只可能是右节点，因为w是直接后继
      get_data(u) === get_data(x) ? (u.rc = succ) : (u.lc = succ); //更新w的父节点
    }
    this.hot = w.parent; //记录实际被删除节点的父亲
    if (succ) {
      succ.parent = this.hot;
    }
    return succ;
  }
  stretch_to_left_path() {
    this.stretch_by_zag(this.root);
  }
  stretchToRPath() {
    this.stretch_by_zig(this.root);
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
    for (; get_data(x) !== get_data(p); x = x.parent) {
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
