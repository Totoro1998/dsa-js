import binary_search_tree from './binary_search_tree.js';
import { is_root, RB_BLACK, is_black, uncle, from_parent_to, is_red, black_height_updated } from './bin_node_util.js';
import { bin_node } from './tree_node.js';

export default class red_black_tree extends binary_search_tree {
  constructor() {
    super();
  }
  solve_double_red(x) {
    if (is_root(x)) {
      this.root.color = RB_BLACK;
      this.root.height++;
      return;
    }
    const p = x.parent;
    if (is_black(p)) {
      return;
    }
    const g = p.parent;
    const u = uncle(x);
    if (is_black(u)) {
      if (is_left_child(x) === is_left_child(p)) {
        p.color = RB_BLACK;
      } else {
        x.color = RB_BLACK;
      }
      g.color = RB_RED;
      const gg = g.parent;
      const r = from_parent_to(g) = this.rotate_at(x);
      r.parent = gg;
    } else {
      p.color = RB_BLACK;
      p.height++;
      u.color = RB_BLACK;
      u.height++;
      if (!is_root(g)) {
        g.color = RB_RED;
      }
      this.solve_double_red(g);
    }
  }
  solve_double_black(r) {
    let p = r ? r.parent : this.hot;
    if (!p) {
      return;
    }
    let s = r.data === p.lc.data ? p.rc : p.lc;
    if (is_black(s)) {
      let t = null;
      if (is_red(s.rc)) {
        t = s.rc;
      }
      if (is_red(s.lc)) {
        t = s.lc;
      }
      if (t) {
        const old_color = p.color;
        let b = from_parent_to(p) = this.rotate_at(t)
        if (has_left_child(b)) {
          b.lc.color = RB_BLACK;
          update_height(b.lc);
        }
        if (has_right_child(b)) {
          b.rc.color = RB_BLACK;
          update_height(b.rc);
        }
        b.color = old_color;
        update_height(b);
      } else {
        s.color = RB_RED;
        s.height--;
        if (is_red(p)) {
          p.color = RB_BLACK;
        } else {
          p.height--;
          solve_double_black(p);
        }
      }
    } else {
      s.color = RB_BLACK;
      p.color = RB_RED;
      let t = is_left_child(s) ? s.lc : s.rc;
      this.hot = p;
      from_parent_to(p) = this.rotate_at(t);
      solve_double_black(r);
    }
  }
  insert(e) {
    let x = this.search(e);
    if (x) {
      return x;
    }
    x = new bin_node(e, this.hot, null, null, 0);
    this.size++;
    let x_old = x;
    solve_double_red(x);
    return x_old;
  }
  remove(e) {
    let x = this.search(e);
    if (!x) {
      return false;
    }
    const r = this.remove_at(x, this.hot);
    if (!--this.size) {
      return true;
    }
    if (!this.hot) {
      this.root.color = RB_BLACK;
      update_height(this.root);
      return true;
    }
    if (black_height_updated(this.hot)) {
      return true;
    }
    if (is_red(r)) {
      r.color = RB_BLACK;
      r.height++;
      return true;
    }
    solve_double_black(r);
    return true;
  }
}
