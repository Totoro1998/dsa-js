import list_node from './list_node.js';
import { get_random_number } from '../utils/number.js';
export default class list {
  size; //规模
  header; //头哨兵
  trailer; //尾哨兵
  /**
   * 列表创建时的初始化
   */
  constructor() {
    this.init();
  }
  init() {
    this.header = new list_node();
    this.trailer = new list_node();
    this.header.succ = this.trailer;
    this.trailer.pred = this.header;
    this.size = 0;
  }
  /**
   * 清除所有节点
   */
  clear() {
    const old_size = this.size;
    while (0 < this.size) {
      this.remove(this.header.succ);
    }
    return old_size;
  }
  /**
   * 复制列表中自位置p起的n项
   * @param {*} p
   * @param {*} n
   */
  copy_ndes(p, n) {
    this.init();
    while (n--) {
      this.insert_as_last(p.data);
      p = p.succ;
    }
  }
  /**
   * 规模
   */
  size() {
    return this.size;
  }
  /**
   * 判空
   */
  empty() {
    return this.size <= 0;
  }
  /**
   * 首节点位置
   */
  first() {
    return this.header.succ;
  }
  /**
   * 末节点位置
   */
  last() {
    return this.trailer.pred;
  }
  /**
   * 判断位置p是否对外合法
   * @param {*} p
   */
  valid(p) {
    return p && p.pred && p.succ;
  }
  /**
   * 无序区间查找，在无序列表内节点p（可能是trailer）的n个（真）前驱中，找到等于e的最后者
   * @param {*} e
   * @param {*} n
   * @param {*} p
   */
  find(e, n = this.size, p = this.trailer) {
    while (0 < n--) {
      p = p.pred;
      if (e === p.data) {
        return p;
      }
    }
    return undefined;
  }
  /**
   * 有序区间查找,在有序列表内节点p（可能是trailer）的n个（真）前驱中，找到不大于e的最后者
   * @param {*} e
   * @param {*} n
   * @param {*} p
   */
  search(e, n = this.size, p = this.trailer) {
    while (true) {
      p = p.pred;
      n--;
      if (!(-1 < n && e < p.data)) {
        break;
      }
    }
    return p;
  }
  /**
   * 在p及其n-1个后继中选出最大者
   * @param {*} p
   * @param {*} n
   */
  select_max(p = this.header.succ, n = this.size) {
    let max = p;
    for (let cur = p; 1 < n; n--) {
      cur = cur.succ;
      if (cur.data > max.data) {
        max = cur;
      }
    }
    return max;
  }
  /**
   * 将e当作首节点插入
   * @param {*} e
   */
  insert_as_fisrt(e) {
    this.size++;
    return this.header.insert_as_succ(e);
  }
  /**
   * 将e当作末尾节点插入
   * @param {*} e
   */
  insert_as_last(e) {
    this.size++;
    return this.trailer.insert_as_pred(e);
  }
  /**
   * 将e当作p的后继插入
   * @param {*} p
   * @param {*} e
   */
  insert_as_succ(p, e) {
    this.size++;
    return p.insert_as_succ(e);
  }
  /**
   * 将e当作p的前驱插入
   * @param {*} e
   * @param {*} p
   */
  insert_as_pred(e, p) {
    this.size++;
    return p.insert_as_pred(e);
  }
  /**
   * 删除合法位置p处的节点,返回被删除节点
   * @param {*} p
   */
  remove(p) {
    const data = p.data;
    p.pred.succ = p.succ;
    p.succ.pred = p.pred;
    delete p;
    this.size--;
    return data;
  }
  /**
   * 列表区间排序
   * @param {*} p
   * @param {*} n
   */
  sort(p = this.first(), n = this.size) {}
  /**
   * 无序去重
   */
  deduplicate() {
    const old_size = this.size;
    let p = this.first();
    for (let r = 0; p.succ; p = p.succ) {
      let q = this.find(p.data, r, p);
      if (q) {
        this.remove(q);
      } else {
        r++;
      }
    }
    return old_size - this.size;
  }
  /**
   * 有序去重
   */
  uniquify() {
    if (this.size < 2) {
      return;
    }
    let ols_size = this.size;
    let p = this.first();
    let q;
    while (true) {
      q = p.succ;
      if (!q.succ) {
        break;
      }
      if (p.data !== q.data) {
        p = q;
      } else {
        this.remove(q);
      }
    }
    return old_size - this.size;
  }
  /**
   * 前后倒置
   */
  reverse() {
    const reverse1 = () => {
      let p = this.header;
      let q = this.trailer;
      for (let i = 1; i < this.size; i += 2) {
        p = p.succ;
        q = q.pred;
        [p.data, q.data] = [q.data, p.data];
      }
    };
    const reverse2 = () => {
      if (this.size < 2) {
        return;
      }
      for (let p = this.header; p; p = p.pred) {
        [p.pred, p.succ] = [p.succ, p.pred];
      }
      [this.header, this.trailer] = [this.trailer, this.header];
    };
    const reverse3 = () => {
      if (this.size < 2) {
        return;
      }
      let p;
      let q;
      for (p = this.header, q = p.succ; p.succ; p = q, q = p.succ) {
        p.pred = q;
      }
      this.trailer.pred = undefined;
      for (p = this.header, q = p.pred; p.succ; p = q, q = p.pred) {
        q.succ = p;
      }
      this.header.succ = undefined;
      [this.header, this.trailer] = [this.trailer, this.header];
    };
    switch (get_random_number(1, 3)) {
      case 1:
        reverse1();
        break;
      case 1:
        reverse2();
        break;
      default:
        reverse3();
        break;
    }
  }
  /**
   * 遍历
   * @param {*} visit
   */
  traverse(visit) {
    for (let p = this.header.succ; p.succ; p = p.succ) {
      visit(p.data);
    }
  }
  /**
   * 有序列表的归并：当前列表中自p起的n个元素，与列表L中自q起的m个元素归并
   * @param {*} L
   * @param {*} p
   * @param {*} n
   * @param {*} q
   * @param {*} m
   */
  merge(L, p = this.header.succ, n = this.size, q = L.header.succ, m = L.size) {
    let pp = p.pred;
    while (0 < m && q.data !== p.data) {
      if (0 < n && p.data <= q.data) {
        p = p.succ;
        n--;
      } else {
        q = q.succ;
        this.insert_as_pred(L.remove(q.pred), p);
        m--;
      }
    }
    return pp.succ; //更新的首节点
  }
  /**
   * 列表的归并排序算法：对起始于位置p的n个元素排序
   * @param {*} p
   * @param {*} n
   */
  merge_sort(p, n) {
    if (n < 2) {
      return;
    }
    let m = n >> 1;
    for (let i = 0; i < m; i++) {
      q = q.succ;
    }
    this.merge_sort(p, m);
    this.merge_sort(q, n - m);
    p = this.merge(p, m, this, q, n - m);
  }
  /**
   * 对列表中起始于位置p、宽度为n的区间做选择排序
   * @param {*} p
   * @param {*} n
   */
  selection_sort(p, n) {
    let head = p.head;
    let tail = p;
    for (let i = 0; i < n; i++) {
      tail = tail.succ;
    }
    while (1 < n) {
      let max = this.select_max(head.succ, n);
      this.insert_as_pred(this.remove(max), tail);
      tail = tail.pred;
      n--;
    }
  }
  /**
   * 对列表中起始于位置p、宽度为n的区间做插入排序
   * @param {*} p
   * @param {*} n
   */
  insertion_sort(p, n) {
    for (let r = 0; r < n; r++) {
      this.insert_as_succ(this.search(p.data, r, p), p.data);
      p = p.succ;
      this.remove(p.pred);
    }
  }
  /**
   * 对列表中起始于位置p、宽度为n的区间做基数排序
   * @param {*} p
   * @param {*} n
   */
  radix_sort(p, n) {
    let head = p.head;
    let tail = p;
    for (let i = 0; i < n; i++) {
      tail = tail.succ;
      for (let u = 1; u && p.data === head.data; u <<= 1) {
        for (let i = 0; i < n; i++) {
          u & p.succ.data ? this.insert_as_pred(this.remove(p.succ), tail) : (p = p.succ);
        }
      }
    }
  }
  sort(p = this.first(), n = this.size) {
    switch (get_random_number(1, 4)) {
      case 1:
        this.insertion_sort(p, n);
        break;
      case 2:
        this.selection_sort(p, n);
        break;
      case 3:
        this.merge_sort(p, n);
        break;
      default:
        this.radix_sort(p, n);
        break;
    }
  }
}
