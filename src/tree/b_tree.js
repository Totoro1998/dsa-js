import { bt_node } from './tree_node.js';

export default class b_tree {
  size;
  order;
  root;
  hot;
  constructor() {
    this.size = 0;
    this.order = 3;
    this.root = new bt_node();
  }
  solve_overflow(v) {
    if (this.order >= v.child.len()) {
      return;
    }
    let s = this.order >> 1;
    let u = new bt_node();
    for (let j = 0; j < this.order - s - 1; j++) {
      u.child.insert(j, v.child.remove(s + 1));
      u.key.insert(j, v.key.remove(s + 1));
    }
    u.child[this.order - s - 1] = v.child.remove(s + 1);
    if (u.child[0]) {
      for (let j = 0; j < this.order - s; j++) {
        u.child[j].parent = u;
      }
    }
    let p = v.parent;
    if (!p) {
      const node = new bt_node();
      p = node;
      this.root = node;
      p.child[0] = v;
      v.parent = p;
    }
    let r = 1 + p.key.search(v.key[0]);
    p.key.insert(r, v.key.remove(s));
    p.child.insert(r + 1, u);
    u.parent = p;
    this.solve_overflow(p);
  }
  solve_underflow(v) {
    if ((this.order + 1) >> 1 <= v.child.len()) {
      return;
    }
    let p = v.parent;
    if (!p) {
      if (!v.key.len() && v.child[0]) {
        this.root = v.child[0];
        this.root.parent = null;
        v.child[0] = null;
        v = null;
      }
      return;
    }
    let r = 0;
    while (p.child[r] !== v) {
      r++;
    }
    if (0 < r) {
      let ls = p.child[r - 1];
      if ((this.order + 1) >> 1 < ls.child.len()) {
        v.key.insert(0, p.key[r - 1]);
        p.key[r - 1] = ls.key.remove(ls.key.len() - 1);
        v.child.insert(0, ls.child.remove(ls.child.len() - 1));
        if (v.child[0]) {
          v.child[0].parent = v;
        }
        return;
      }
    }
    if (p.child.len() - 1 > r) {
      let rs = p.child[r + 1];
      if ((this.order + 1) >> 1 < rs.child.len()) {
        v.key.insert(v.key.len(), p.key[r]);
        p.key[r] = rs.key.remove(0);
        v.child.insert(v.child.len(), rs.child.remove(0));
        if (v.child[v.child.len() - 1]) {
          v.child[v.child.len() - 1].parent = v;
        }
        return;
      }
    }
    if (0 < r) {
      let ls = p.child[r - 1];
      ls.key.insert(ls.key.len(), p.key.remove(r - 1));
      p.child.remove(r);
      ls.child.insert(ls.child.len(), v.child.remove(0));
      if (ls.child[ls.child.len() - 1]) {
        ls.child[ls.child.len() - 1].parent = ls;
      }
      while (!v.key.empty()) {
        ls.key.insert(ls.key.len(), v.key.remove(0));
        ls.child.insert(ls.child.len(), v.child.remove(0));
        if (ls.child[ls.child.len() - 1]) {
          ls.child[ls.child.len() - 1].parent = ls;
        }
      }
      v = null;
    } else {
      let rs = p.child[r + 1];
      rs.key.insert(0, p.key.remove(r));
      p.child.remove(r);
      rs.child.insert(0, v.child.remove(v.child.len() - 1));
      if (rs.child[0]) {
        rs.child[0].parent = rs;
      }
      while (!v.key.empty()) {
        rs.key.insert(0, v.key.remove(v.key.len() - 1));
        rs.child.insert(0, v.child.remove(v.child.len() - 1));
        if (rs.child[0]) {
          rs.child[0].parent = rs;
        }
      }
      v = null;
    }
    solve_underflow(p);
    return;
  }
  get_order() {
    return this.order;
  }
  get_size() {
    return this.size;
  }
  get_root() {
    return this.root;
  }
  empty() {
    return !this.root;
  }
  search(e) {
    let v = this.root;
    this.hot = null;
    while (v) {
      let r = v.key.search(e);
      if (0 <= r && e === v.key[r]) {
        return v;
      }
      this.hot = v;
      v = v.child[r + 1];
    }
    return null;
  }
  insert(e) {
    const v = this.search(e);
    if (v) {
      return false;
    }
    let r = this.hot.key.search(e);
    this.hot.key.insert(r + 1, e);
    this.hot.child.insert(r + 2, null);
    this.size++;
    this.solve_overflow(this.hot);
    return true;
  }
  remove(e) {
    const v = this.search(e);
    if (!v) {
      return false;
    }
    let r = v.key.search(e);
    if (v.child[0]) {
      let u = v.child[r + 1];
      while (u.child[0]) {
        u = u.child[0];
      }
      v.key[r] = u.key[0];
      v = u;
      r = 0;
    }
    v.key.remove(r);
    v.child.remove(r + 1);
    this.size--;
    solve_underflow(v);
    return true;
  }
}
