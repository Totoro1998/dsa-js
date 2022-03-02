import binary_search_tree from './binary_search_tree.js';
import { bin_node } from './tree_node.js';
import { is_left_child, is_right_child, update_height, has_right_child } from './bin_node_util.js';

export default class splay_tree extends binary_search_tree {
  constructor() {
    super();
  }
  /**
   * 在节点p与lc（可能为空）之间建立父（左）子关系
   * @param {*} lc
   * @param {*} p
   */
  attach_as_lc(lc, p) {
    p.lc = lc;
    if (lc) {
      lc.parent = p;
    }
  }
  /**
   * 在节点p与lc（可能为空）之间建立父（右）子关系
   * @param {*} lc
   * @param {*} p
   */
  attach_as_rc(p, rc) {
    p.rc = rc;
    if (rc) {
      rc.parent = p;
    }
  }
  /**
   * 将节点v伸展至根
   * @param {*} v
   */
  splay(v) {
    if (!v) {
      return null;
    }
    let p, g;
    while (true) {
      p = v.parent;
      g = p.parent;
      if (!(p && g)) {
        break;
      }
      let gg = g.parent;
      if (is_left_child(v)) {
        if (is_left_child(p)) {
          this.attach_as_lc(p.rc, g);
          this.attach_as_lc(v.rc, p);
          this.attach_as_rc(p, g);
          this.attach_as_rc(v, p);
        } else {
          this.attach_as_lc(v.rc, p);
          this.attach_as_rc(g, v.lc);
          this.attach_as_lc(g, v);
          this.attach_as_rc(v, p);
        }
      } else if (is_right_child(p)) {
        this.attach_as_rc(g, p.lc);
        this.attach_as_rc(p, v.lc);
        this.attach_as_lc(g, p);
        this.attach_as_lc(p, v);
      } else {
        this.attach_as_rc(p, v.lc);
        this.attach_as_lc(v.rc, g);
        this.attach_as_rc(v, g);
        this.attach_as_lc(p, v);
      }
      if (!gg) {
        v.parent = null;
      } else {
        g.data === gg.lc.data ? this.attach_as_lc(v, gg) : this.attach_as_rc(gg, v);
      }
      update_height(g);
      update_height(p);
      update_height(v);
    }
    p = v.parent;
    if (p) {
      if (is_left_child(v)) {
        this.attach_as_lc(v.rc, p);
        this.attach_as_rc(v, p);
      } else {
        this.attach_as_rc(p, v.lc);
        this.attach_as_lc(p, v);
      }
      update_height(p);
      update_height(v);
    }
    v.parent = null;
    return v;
  }
  search(e) {
    const p = super.search(e);
    this.root = this.splay(p ? p : this.hot);
    return this.root;
  }
  insert(e) {
    if (!this.root) {
      this.size++;
      this.root = new bin_node(e);
      return this.root;
    }
    if (e === this.search(e).data) {
      return this.root;
    }
    this.size++;
    let t = this.root;
    if (this.root.data < e) {
      const node = new bin_node(e, null, t, t.rc);
      this.root = node;
      t.parent = this.root;
      if (has_right_child(t)) {
        t.rc.parent = this.root;
        t.rc = null;
      }
    } else {
      const node = new bin_node(e, null, t.lc, t);
      this.root = node;
      t.parent = node;
      if (has_left_child(t)) {
        t.lc.parent = this.root;
        t.lc = null;
      }
    }
    this.update_height_above(t);
    return this.root;
  }
  remove(e) {
    if (!this.root || e !== this.search(e).data) {
      return false;
    }
    const w = this.root;
    if (has_left_child(this.root)) {
      this.root = this.root.rc;
      if (this.root) {
        this.root.parent = null;
      }
    } else if (!has_right_child(this.root)) {
      this.root = this.root.lc;
      if (this.root) {
        this.root.parent = null;
      }
    } else {
      const l_tree = this.root.lc;
      l_tree.parent = null;
      this.root.lc = null;
      this.root = this.root.rc;
      this.root.parent = null;
      this.search(w.data);
      this.root.lc = l_tree;
      l_tree.parent = this.root;
    }
    w.data = null;
    w = null;
    this.size--;
    if (this.root) {
      update_height(this.root);
    }
    return true;
  }
}
