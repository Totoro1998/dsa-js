/**
 * 是否是根节点
 * @param {*} x
 */
export const is_root = (x) => {
  return !x.parent;
};
/**
 * 是否是父节点的左子节点
 * @param {*} x
 */
export const is_left_child = (x) => {
  return !is_root && x.data === x.parent.lc.data;
};
/**
 * 是否是父节点的右子节点
 * @param {*} x
 */
export const is_right_child = (x) => {
  return !is_root && x.data === x.parent.rc.data;
};
/**
 * 是否有父节点
 * @param {*} x
 */
export const has_parent = (x) => {
  return !is_root;
};
/**
 * 是否有左子节点
 * @param {*} x
 */
export const has_left_child = (x) => {
  return x.lc;
};
/**
 * 是否有右子节点
 * @param {*} x
 */
export const has_right_child = (x) => {
  return x.rc;
};
/**
 * 是否有子节点
 * @param {*} x
 */
export const has_child = (x) => {
  return has_left_child(x) || has_right_child(x);
};
/**
 * 左右子节点都拥有
 * @param {*} x
 */
export const has_both_child = (x) => {
  return has_left_child(x) && has_right_child(x);
};
/**
 * 是否是叶子节点
 * @param {*} x
 */
export const is_leaf = (x) => {
  return !has_child(x);
};
/**
 * 兄弟
 * @param {*} x
 */
export const sibling = (x) => {
  return is_left_child(x) ? x.parent.rc : x.parent.lc;
};
/**
 * 叔叔
 * @param {*} x
 */
export const uncle = (x) => {
  return is_left_child(x.parent) ? x.parent.parent.rc : x.parent.parent.lc;
};
/**
 * 来自父节点的引用
 * @param {*} x
 */
export const FromParentTo = (x) => {
  return is_root(x) ? x : is_left_child(x) ? x.parent.lc : x.parent.rc;
};
/**
 * 中序遍历迭代版1
 * @param {*} e
 * @param {*} visit
 */
export const trav_in1 = (e, visit) => {};
/**
 * 中序遍历迭代版2
 * @param {*} e
 * @param {*} visit
 */
export const trav_in2 = (e, visit) => {};
/**
 * 中序遍历迭代版3
 * @param {*} e
 * @param {*} visit
 */
export const trav_in3 = (e, visit) => {};
/**
 * 中序遍历迭代版4
 * @param {*} e
 * @param {*} visit
 */
export const trav_in4 = (e, visit) => {};
/**
 * 中序遍历递归版
 * @param {*} e
 * @param {*} visit
 */
export const trav_in5 = (e, visit) => {};
