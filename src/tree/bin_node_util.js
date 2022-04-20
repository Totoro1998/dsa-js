export const RB_RED = 1;
export const RB_BLACK = 0;
//空树高度为-1
export const get_height = (p) => {
  return p ? p.height : -1;
};
export const get_data = (x) => {
  return x ? x.data : null;
};
/**
 * 是否是根节点
 * @param {*} x
 */
export const is_root = (x) => {
  return !x.parent;
};
/**
 * 是否是黑节点，外部节点也视作黑节点
 * @param {*} p
 */
export const is_black = (p) => {
  return !p || RB_BLACK === p.color;
};
export const is_red = (p) => {
  return !is_black(p);
};
/**
 * 红黑树高度更新条件
 * @param {*} x
 */
export const black_height_updated = (x) => {
  if (get_height(x.lc) === get_height(x.rc)) {
    const height = is_red(x) ? get_height(x.lc) : get_height(x.lc) + 1;
    return x.height === height;
  }
  return false;
};
/**
 * 是否是父节点的左子节点
 * @param {*} x
 */
export const is_left_child = (x) => {
  return !is_root(x) && get_data(x) === get_data(x.parent.lc);
};
/**
 * 是否是父节点的右子节点
 * @param {*} x
 */
export const is_right_child = (x) => {
  return !is_root(x) && get_data(x) === get_data(x.parent.rc);
};
/**
 * 是否有父节点
 * @param {*} x
 */
export const has_parent = (x) => {
  return !is_root(x);
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
  if (is_root(x)) {
    return [x, ''];
  } else {
    if (is_left_child(x)) {
      return [x.parent, 'lc'];
    }
    return [x.parent, 'rc'];
  }
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
    visit(get_data(x));
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
    visit(get_data(x));
    x = x.rc;
  }
};
/**
 * 中序遍历迭代版2
 * @param {*} e
 * @param {*} visit
 */
export const trav_in2 = (x, visit) => {
  const s = [];
  while (true) {
    if (x) {
      s.push(x);
      x = x.lc;
    } else if (s.length !== 0) {
      x = s.pop(); //尚未访问的最低祖先节点退栈
      visit(get_data(x));
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
export const trav_in3 = (x, visit) => {
  let back_track = false; //前一步是否刚从右子树回溯
  while (true) {
    //若有左子树且不是刚刚回溯
    if (!back_track && has_left_child(x)) {
      x = x.lc;
    } else {
      visit(get_data(x));
      //若右子树非空，深入右子树继续遍历
      if (has_right_child(x)) {
        x = x.rc;
        back_track = false;
      } else {
        x = x.succ(); //中序遍历直接后继
        if (!x) {
          break;
        }
        back_track = true;
      }
    }
  }
};
/**
 * 后序遍历迭代版
 * @param {*} x
 * @param {*} visit
 */
export const trav_post1 = (x, visit) => {
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
    visit(get_data(x));
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
  visit(get_data(x));
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
  visit(get_data(x));
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
  trav_in_r(x.lc, visit);
  visit(get_data(x));
  trav_in_r(x.rc, visit);
};
/**
 * 从当前节点出发，沿左分支不断深入，直至没有左分之的节点，沿途节点遇到后立即访问
 * @param {*} x
 * @param {*} visit
 * @param {*} s
 */
const visit_along_left_branch = (x, visit, s) => {
  while (x) {
    visit(get_data(x));
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
 * 以s栈顶节点为根的子树中，找到最高左侧可见叶节点
 * @param {*} s
 */
const goto_hlvfl = (s) => {
  while (true) {
    let x = s[s.length - 1]; //自顶而下，反复检查当前节点（即栈顶）
    if (!x) {
      break;
    }
    //尽可能向左
    if (has_left_child(x)) {
      if (has_right_child(x)) {
        s.push(x.rc);
      }
      s.push(x.lc);
    } else {
      s.push(x.rc);
    }
  }
  s.pop(); //删除栈顶的空节点
};
/**
 * 更新节点x的高度
 */
export const update_height = (x) => {
  x.height = Math.max(get_height(x.lc), get_height(x.rc)) + 1;
  return x.height;
};
export const height_updated = (x) => {
  return x.height === Math.max(get_height(x.lc), get_height(x.rc)) + 1;
};
//理想平衡条件
export const balanced = (x) => {
  return get_height(x.lc) === get_height(x.rc);
};
//平衡因子
export const bal_fac = (x) => {
  return get_height(x.lc) - get_height(x.rc);
};
//avl平衡条件
export const avl_balanced = (x) => {
  const bal_diff = bal_fac(x);
  return -2 < bal_diff && bal_diff < 2;
};
