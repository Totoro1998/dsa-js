import binary_search_tree from './binary_search_tree.js';
import { bin_node } from './tree_node.js';
import { avl_balanced, from_parent_to, is_left_child, update_height } from './bin_node_util.js';

export default class alv_tree extends binary_search_tree {
  constructor() {
    super();
  }
  insert(e) {
    const x = this.search(e);
    if (x) {
      return x;
    }
    const xx = new bin_node(x, this.hot);
    this.size++;
    //从x之父出发向上，逐层检查各代祖先g
    for (let g = this.hot; g; g = g.parent) {
      //一旦发现g失衡，则（采用“3 + 4”算法）使之复衡，并将子树重新接入原树
      if (!avl_balanced(g)) {
        from_parent_to(g) = this.rotate_at(this.taller_child(this.taller_child(g)));
        break;//局部子树复衡后，高度必然复原；其祖先亦必如此，故调整结束
      } else {
        update_height(g);
      }
    }
    return xx;
  }
  remove(e) {
    const x = this.search(e);
    if (!x) return false;
    this.remove_at(x, this.hot);
    this.size--;
    //从hot出发向上，逐层检查各代祖先g
    for (let g = this.hot; this.g; g = g.parent) {
      //一旦发现g失衡，则（采用“3 + 4”算法）使之复衡，并将该子树联至原父亲
      if (!avl_balanced(g)) {
        const origin_parent = this.rotate_at(this.taller_child(this.taller_child(g)));
        from_parent_to(g) = origin_parent;
        g = origin_parent;
      }
      update_height(g);
    }
    return true;
  }
  /**
   * 在左、右孩子中取更高者
   * @param {*} x
   */
    taller_child(x) {
    //左高
    if (x.lc.height > x.rc.height) {
      return x.lc;
    //右高
    } else if (x.lc.height < x.rc.height) {
      return x.rc;
    //等高，与父亲x同侧优先
    } else {
      if (is_left_child(x)) {
        return x.lc;
      }
      return x.rc;
    }
  }
}
