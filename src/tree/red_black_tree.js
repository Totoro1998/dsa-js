import binary_search_tree from './binary_search_tree.js';
import {
  is_root,
  RB_BLACK,
  RB_RED,
  is_black,
  uncle,
  from_parent_to,
  is_left_child,
  is_red,
  black_height_updated,
  get_height,
  get_data,
} from './bin_node_util.js';
import { bin_node } from './tree_node.js';

export default class red_black_tree extends binary_search_tree {
  constructor() {
    super();
  }
  /**
   * 更新高度
   * @param {*} x
   */
  update_height(x) {
    //此处的height已不再是指常规的树高，而是红黑树的黑高度
    x.height = Math.max(get_height(x.lc), get_height(x.rc)); //孩子一般黑高度相等，除非出现双黑
    return is_black(x) ? x.height++ : x.height; //若当前节点为黑，则计入黑深度
  }
  /**
   * 因新节点的引入，而导致父子节点同为红色的此类情况称为双红
   * 当前节点x的兄弟及两个孩子（初始时都是外部节点） ，始终均为黑色
   * 双红修正
   * @param {*} x
   */
  solve_double_red(x) {
    if (is_root(x)) {
      this.root.color = RB_BLACK;
      this.root.height++;
      return;
    }
    //否则x的父亲必然存在
    const p = x.parent;
    if (is_black(p)) {
      return;
    }
    const g = p.parent;
    const u = uncle(x);
    if (is_black(u)) {
      //若x与p同侧
      if (is_left_child(x) === is_left_child(p)) {
        p.color = RB_BLACK; //p由红转黑，x保持红
      } else {
        x.color = RB_BLACK;
      }
      g.color = RB_RED; //g必定由黑转红
      const gg = g.parent; //曾祖父
      let [parent, dir] = from_parent_to(g);
      if (dir) {
        parent[dir] = this.rotate_at(x); //调整后的子树根节点
        parent[dir].parent = gg; //与原曾祖父联接
      } else {
        this.root = this.rotate_at(x);
        this.root.parent = null;
      }
    } else {
      p.color = RB_BLACK;
      p.height++;
      u.color = RB_BLACK;
      u.height++;
      if (!is_root(g)) {
        g.color = RB_RED;
      }
      solve_double_red(g);
    }
  }
  /**
   * 双黑修正
   * @param {*} r
   */
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
        let [parent, dir] = from_parent_to(x);
        if (has_left_child(b)) {
          parent[dir].lc.color = RB_BLACK;
          this.update_height(parent[dir].lc);
        }
        if (has_right_child(parent[dir])) {
          parent[dir].rc.color = RB_BLACK;
          this.update_height(parent[dir].rc);
        }
        parent[dir].color = old_color;
        this.update_height(parent[dir]);
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
      const [parent, dir] = from_parent_to(p);
      parent[dir] = this.rotate_at(t);
      solve_double_black(r);
    }
  }
  insert(e) {
    let x = this.search(e);
    if (x) {
      return x;
    }
    //创建红节点x：以hot为父，黑高度0
    x = new bin_node(e, this.hot, null, null, 0);
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
    let x_old = x;
    this.solve_double_red(x);
    return x_old;
  }
  remove(e) {
    let x = this.search(e);
    if (!x) {
      return false;
    }
    const r = this.remove_at(x);
    if (!--this.size) {
      return true;
    }
    //若刚删除的节点是根节点，则将其置黑，并更新黑高度
    if (!this.hot) {
      this.root.color = RB_BLACK;
      this.update_height(this.root);
      return true;
    }
    //以下，原x必非根，hot必非空
    //若所有祖先的黑深度依然平衡，则无需调整
    if (black_height_updated(this.hot)) {
      return true;
    }
    //否则，若r为红，则只需要令其转黑
    if (is_red(r)) {
      r.color = RB_BLACK;
      r.height++;
      return true;
    }
    solve_double_black(r);
    return true;
  }
}
