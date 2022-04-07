import { bin_node } from './tree_node.js';
import { update_height } from './bin_node_util.js';
export default class bin_tree {
  size;
  root;
  /**
   * 更新节点x及其祖先的高度
   * @param {*} x
   */
  update_height_above(x) {
    while (x) {
      update_height(x);
      x = x.parent;
    }
  }
  constructor() {
    this.size = 0;
    this.root = null;
  }
  /**
   *规模
   */
  len() {
    return this.size;
  }
  /**
   * 判空
   */
  empty() {
    return !root;
  }
  /**
   * 树根
   */
  root() {
    return this.root;
  }
  /**
   * 插入根节点
   * @param {*} e
   */
  insert_as_root(e) {
    this.size = 1;
    this.root = new bin_node(e);
    return this.root;
  }
  /**
   * e作为x的左孩子（原无）插入
   * @param {*} x
   * @param {*} e
   */
  insert_as_lc(x, e) {
    this.size++;
    x.insert_as_lc(e);
    this.update_height_above(x);
    return x.lc;
  }
  /**
   * e作为x的右孩子（原无）插入
   * @param {*} x
   * @param {*} e
   */
  insert_as_rc(x, e) {
    this.size++;
    x.insert_as_rc(e);
    this.update_height_above(x);
    return x.rc;
  }
  /**
   * s作为x的左子树插入
   * @param {*} x
   * @param {*} t
   */
  attach_as_lc(x, s) {
    x.lc = s.root;
    x.lc.parent = x;
    this.size += s.len();
    this.update_height_above(x);
    s.root = undefined;
    s.size = 0;
    s = undefined;
    return x;
  }
  /**
   * s作为x的右子树插入
   * @param {*} x
   * @param {*} s
   */
  attach_as_rc(x, s) {
    x.rc = s.root;
    x.rc.parent = x;
    this.size += s.len();
    this.update_height_above(x);
    s.root = undefined;
    s.size = 0;
    s = undefined;
    return x;
  }
  /**
   * 删除以x处节点为根的子树，返回该子树原先的规模
   * @param {*} x
   */
  remove(x) {
    from_parent_to(x) = undefined;
    this.update_height_above(x.parent);
    const n = remove_at(x);
    this.size -= n;
    return n;
  }
  /**
   * 删除二叉树中位置x处的节点及其后代，返回被删除节点的总数
   * @param {*} x 
   */
  remove_at(x) {
    if (!x) {
      return 0
    }
    let n = 1 + remove_at(x.lc) + remove_at(x.rc)
    x.data = undefined;
    x = null;
    return n
  }
  /**
   * 将子树x从当前树中摘除，并将其转换为一棵独立子树
   * @param {*} x
   */
  secede(x) {
    from_parent_to(x) = undefined; //切断来自父节点的引用
    this.update_height_above(x.parent);
    const s = new bin_tree()
    s.root = x;
    s.size = x.len();
    x.parent = undefined;
    this.size -= s.size;
    return s;
  }
  /**
   * 层次遍历
   * @param {*} visit
   */
  trav_level(visit) {
    if (this.root) {
      this.root.trav_level(visit);
    }
  }
  /**
   * 先序遍历
   * @param {*} visit
   */
  trav_pre(visit) {
    if (this.root) {
      this.root.trav_pre(visit);
    }
  }
  /**
   * 中序遍历
   * @param {*} visit
   */
  trav_in(visit) {
    if (this.root) {
      this.root.trav_in(visit);
    }
  }
  /**
   * 后序遍历
   * @param {*} visit
   */
  trav_post(visit) {
    if (this.root) {
      this.root.trav_post(visit);
    }
  }
}
