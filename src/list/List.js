export default class List {
  #size; //规模
  #header; //头哨兵
  #trailer; //尾哨兵
  /**
   * 列表创建时的初始化
   */
  #init() {}
  /**
   * 清除所有节点
   */
  #clear() {}
  /**
   * 复制列表中自位置p起的n项
   * @param {*} p
   * @param {*} n
   */
  #copyNodes(p, n) {}
  /**
   * 归并
   * @param {*} p1
   * @param {*} n1
   * @param {*} list
   * @param {*} p2
   * @param {*} n2
   */
  #merge(p1 = this.#header.succ, n1 = this.#size, list, p2 = list.#header.succ, n2 = list.size()) {}
  /**
   * 对从p开始连续的n个节点归并排序
   * @param {*} p
   * @param {*} n
   */
  #mergeSort(p, n) {}
  /**
   * 对从p开始连续的n个节点选择排序
   * @param {*} p
   * @param {*} n
   */
  #selectionSort(p, n) {}
  /**
   * 对从p开始连续的n个节点插入排序
   * @param {*} p
   * @param {*} n
   */
  #insertionSort(p, n) {}
  /**
   * 对从p开始连续的n个节点基数排序
   * @param {*} p
   * @param {*} n
   */
  #radixSort(p, n) {}
  constructor() {
    this.#init();
  }
  /**
   * 规模
   */
  size() {
    return this.#size;
  }
  /**
   * 判空
   */
  isEmpty() {
    return this.#size <= 0;
  }
  /**
   * 首节点位置
   */
  first() {}
  /**
   * 末节点位置
   */
  last() {}
  /**
   * 判断位置p是否对外合法
   * @param {*} p
   */
  valid(p) {
    return p && this.#trailer !== p && this.#header !== p;
  }
  /**
   * 无序区间查找
   * @param {*} e
   * @param {*} n
   * @param {*} p
   */
  find(e, n = this.#size, p = this.#trailer) {}
  /**
   * 有序区间查找
   * @param {*} e
   * @param {*} n
   * @param {*} p
   */
  search(e, n = this.#size, p = this.#trailer) {}
  /**
   * 在p及其n-1个后继中选出最大者
   * @param {*} p
   * @param {*} n
   */
  selectMax(p = this.#header.succ, n = this.#size) {}
  /**
   * 将e当作首节点插入
   * @param {*} e
   */
  insertAsFirst(e) {}
  /**
   * 将e当作末节点插入
   * @param {*} e
   */
  insertAsLast(e) {}
  /**
   * 将e当作p的后继插入
   * @param {*} p
   * @param {*} e
   */
  insertAsSucc(p, e) {}
  /**
   * 将e当作p的前驱插入
   * @param {*} e
   * @param {*} p
   */
  insertAsPred(e, p) {}
  /**
   * 删除合法位置p处的节点,返回被删除节点
   * @param {*} p
   */
  remove(p) {}
  /**
   * 列表区间排序
   * @param {*} p
   * @param {*} n
   */
  sort(p = this.first(), n = this.#size) {}
  /**
   * 无序去重
   */
  deduplicate() {}
  /**
   * 有序去重
   */
  uniquify() {}
  /**
   * 前后倒置
   */
  reverse() {}
}
