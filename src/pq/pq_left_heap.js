import bin_tree from '../tree/bin_tree.js';
import { bin_node } from '../tree/tree_node.js';
export default class pq_left_heap extends bin_tree {
  constructor(e, lo, hi) {
    super();
    if (e) {
      for (let i = lo; i < hi; i++) {
        this.insert(e[i]);
      }
    }
  }
  insert(e) {
    this.root = this.merge(this.root, new bin_node(e, null));
    this.size++;
  }
  get_max() {
    return this.root.data;
  }
  del_max() {
    const l_heap = this.root.lc;
    if (l_heap) {
      l_heap.parent = null;
    }
    const r_heap = this.root.rc;
    if (r_heap) {
      r_heap.parent = null;
    }
    const e = this.root.data;
    this.root = null;
    this.size--;
    this.root = this.merge(l_heap, r_heap);
    return e;
  }
  merge(a, b) {
    if (!a) {
      return b;
    }
    if (!b) {
      return a;
    }
    //一般情况，首先保证b不大
    if (a.data < b.data) {
      [a, b] = [b, a];
    }
    //将a的右子堆与b合并
    a.rc = merge(a.rc, b);
    a.rc.parent = a;
    //如有必要交换a的左右子堆。以确保右子堆的npl不大
    if (!a.lc || a.lc.npl < a.rc.npl) {
      [a.lc, a.rc] = [a.rc, a.lc];
    }
    //更新a的npl
    a.npl = a.rc ? a.rc.npl + 1 : 1;
    return a;
  }
}
