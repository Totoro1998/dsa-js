import vector from '../vector/vector.js';

/**
 * 自底而上，依次下滤各内部节点
 * @param {*} a
 * @param {*} n
 */
const heapify = (a, n) => {
  for (let i = last_internal(n); in_heap(n, i); i--) {
    percolate_down(n, i);
  }
};
/**
 * 对向量前n个词条中的第i个实施下滤
 * @param {*} a
 * @param {*} n
 * @param {*} i
 */
const percolate_down = (a, n, i) => {
  let j;
  while (true) {
    j = proper_parent(a, n, j);
    if (i === j) {
      break;
    }
    [a[i], a[j]] = [a[j], a[i]];
    i = j;
  }
  return i;
};
const percolate_up = (a, i) => {
  while (0 < i) {
    const j = parent(i);
    if (a[i] < a[j]) {
      break;
    }
    [a[i], a[j]] = [a[j], a[i]];
    i = j;
  }
  return i;
};
const in_heap = (n, i) => {
  -1 < i && i < n;
};
/**
 * PQ[i]的父节点
 * @param {*} i
 */
const parent = (i) => (i - 1) >> 1;
//最后一个内部节点，（即末节点的父亲）
const last_internal = (n) => {
  return parent(n - 1);
};
const left_child = (i) => {
  return i * 2 + 1;
};
const right_child = (i) => {
  return 1 << (i + 1);
};
const parent_valid = (i) => 0 < i;
//判断是否有左孩子
const left_child_valid = (n, i) => {
  return in_heap(n, left_child(i));
};
//判断是否有两个孩子，如果有右孩子，必有左孩子。向量的插入
const right_child_valid = (n, i) => {
  return in_heap(n, right_child(i));
};
//取大者
const bigger = (pq, i, j) => {
  pq[i] < pq[j] ? j : i;
};
//父子（至多）三者中的最大者
const proper_parent = (pq, n, i) => {
  return right_child_valid(n, i)
    ? bigger(pq, bigger(pq, i, left_child(i)), right_child(i))
    : left_child_valid(n, i)
    ? bigger(pq, i, left_child(i))
    : i; //相等时父节点优先，如此可避免不必要的交换
};
export default class pq_compl_heap extends vector {
  constructor(a, lo, hi) {
    super();
    if (a) {
      this.copy_from(a, lo, hi);
      heapify(this.elem, n);
    }
  }
  add(e) {
    this.insert(e);
    percolate_up(this.elem, this.size - 1);
  }
  get_max() {
    return this.elem[0];
  }
  del_max() {
    const max_elem = this.elem[0];
    //摘除堆顶，代之以末词条
    this.elem[0] = this.elem[--this.size];
    percolate_down(this.elem, this.size, 0);
    return max_elem;
  }
}
