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
export const from_parent_to = (x) => {
  return is_root(x) ? x : is_left_child(x) ? x.parent.lc : x.parent.rc;
};
/**
 * 先序遍历迭代版1
 * @param {*} x
 * @param {*} visit
 */
export const trav_pre1 = (x, visit) => {
  const s = [];
  if (x) {
    s.push(x);
  }
  while (s.length > 0) {
    x = s.pop();
    visit(x.data);
    if (has_right_child(x)) {
      s.push(x.rc);
    }
    if (has_left_child(x)) {
      s.push(x.lc);
    }
  }
};
/**
 * 先序遍历迭代版2
 * @param {*} x
 * @param {*} visit
 */
export const trav_pre2 = (x, visit) => {
  const s = [];
  while (true) {
    visit_along_left_branch(x, visit, s);
    if (s.length === 0) {
      break;
    }
    x = s.pop();
  }
};
/**
 * 中序遍历迭代版1
 * @param {*} e
 * @param {*} visit
 */
export const trav_in1 = (x, visit) => {
  const s = [];
  while (true) {
    go_along_left_branch(x, s);
    if (s.length === 0) {
      break;
    }
    x = s.pop();
    visit(x.data);
    x = x.rc;
  }
};
/**
 * 中序遍历迭代版2
 * @param {*} e
 * @param {*} visit
 */
export const trav_in2 = (e, visit) => {
  const s = [];
  while (true) {
    if (x) {
      s.push(x);
      x = x.lc;
    } else if (s.length !== 0) {
      x = s.pop(); //尚未访问的最低祖先节点退栈
      visit(x.data);
      x = x.rc; //遍历祖先的右子树
    } else {
      break;
    }
  }
};
/**
 * 中序遍历迭代版3
 * @param {*} e
 * @param {*} visit
 */
export const trav_in3 = (e, visit) => {
  let back_track = false;
  while (true) {
    if (!back_track && has_left_child(x)) {
      x = x.lc;
    } else {
      visit(x.data);
      if (has_right_child(x)) {
        x = x.rc;
        back_track = false;
      } else {
        x = x.succ();
        if (!x) {
          break;
        }
        back_track = true;
      }
    }
  }
};
/**
 * 中序遍历迭代版4
 * @param {*} e
 * @param {*} visit
 */
export const trav_in4 = (e, visit) => {};
/**
 * 中序遍历迭代版5
 * @param {*} e
 * @param {*} visit
 */
export const trav_in5 = (e, visit) => {};
/**
 * 后序遍历迭代版
 * @param {*} x
 * @param {*} visit
 */
export const trav_post = (x, visit) => {
  const s = [];
  if (x) {
    s.push(x);
  }
  while (s.length !== 0) {
    //若栈顶非当前节点之父(则必为其右兄)
    if (s[s.length - 1] !== x.parent) {
      goto_hlvfl(s); //在以其右兄为根子树中，找到HLVFL
    }
    x = s.pop();
    visit(x.data);
  }
};
/**
 * 先序遍历递归版
 * @param {*} x
 * @param {*} visit
 */
export const trav_pre_r = (x, visit) => {
  if (!x) {
    return;
  }
  visit(x.data);
  trav_pre_r(x.lc, visit);
  trav_pre_r(x.rc, visit);
};
/**
 * 后序遍历递归版
 * @param {*} x
 * @param {*} visit
 */
export const trav_post_r = (x, visit) => {
  if (!x) {
    return;
  }
  trav_post_r(x.lc, visit);
  trav_post_r(x.rc, visit);
  visit(x.data);
};
/**
 * 中序遍历递归版
 * @param {*} x
 * @param {*} visit
 */
export const trav_in_r = (x, visit) => {
  if (!x) {
    return;
  }
  trav_post_r(x.lc, visit);
  visit(x.data);
  trav_post_r(x.rc, visit);
};
/**
 * 从当前节点出发，沿左分支不断深入，直至没有左分之的节点，沿途节点遇到后立即访问
 * @param {*} x
 * @param {*} visit
 * @param {*} s
 */
const visit_along_left_branch = (x, visit, s) => {
  while (x) {
    visit(x.data);
    s.push(x.rc);
    x = x.lc;
  }
};
const go_along_left_branch = (x, s) => {
  while (x) {
    s.push(x);
    x = x.lc;
  }
};
/**
 * 以s栈顶节点为根的子树中，找到最高左侧可见业节点
 * @param {*} s
 */
const goto_hlvfl = (s) => {
  let x = s[s.length - 1];
  while (x) {
    if (has_left_child(x)) {
      if (has_right_child(x)) {
        s.push(x.rc);
      }
      s.push(x.lc);
    } else {
      s.push(x.rc);
    }
    x = s[s.length - 1];
  }
  s.pop(); //删除栈顶的空节点
};
