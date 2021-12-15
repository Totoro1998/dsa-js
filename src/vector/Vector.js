import { binSearch, fibSearch } from '../utils/search.js';
import { getRandomNumber } from '../utils/number.js';
const DEFAULT_CAPACITY = 3;
export default class Vector {
  #size; //规模
  #capacity; //容量
  #elem; //数据区
  /**
   * 构造函数
   * @param {*} arr
   * @param {*} lo
   * @param {*} hi
   */
  constructor(arr, lo = 0, hi) {
    if (!hi) {
      hi = arr.length;
    }
    this.#copyFrom(arr, lo, hi);
  }
  /**
   * 复制数组区间A[lo, hi)
   */
  #copyFrom(arr, lo, hi) {
    this.#capacity = 2 * (hi - lo); //分配空间
    this.#elem = [];
    for (this.#size = 0; lo < hi; this.#size++, lo++) {
      this.#elem[this.#size] = arr[lo];
    }
  }
  /**
   * 空间不足扩容
   */
  #expand() {
    if (this.#size < this.#capacity) {
      return;
    }
    if (this.#capacity < DEFAULT_CAPACITY) {
      this.#capacity = DEFAULT_CAPACITY;
    }
    this.#capacity = this.#capacity * 2;
    let oldElem = this.#elem;
    this.#elem = new Array(this.#capacity);
    for (let i = 0; i < this.#size; i++) {
      this.#elem = oldElem[i];
    }
    oldElem = undefined;
  }
  /**
   * 装填因子过小时压缩
   */
  #shrink() {
    //不致收缩到DEFAULT_CAPACITY以下
    if (this.#capacity < DEFAULT_CAPACITY / 2) {
      return;
    }
    //以25%为界
    if (this.#size * 4 < this.#capacity) {
      return;
    }
    let oldElem = this.#elem;
    this.#capacity = this.#capacity / 2; //容量减半
    for (let i = 0; i < this.#size; i++) {
      this.#elem = oldElem[i];
    }
    oldElem = undefined;
  }
  /**
   * 扫描交换
   */
  #bubble(lo, hi) {}
  /**
   * 起泡排序算法
   */
  #bubbleSort(lo = 0, hi = this.#size) {
    const bubbleSortA = (lo, hi) => {
      while (lo < --hi) {
        for (let i = lo; i < hi; i++) {
          if (this.#elem[i] > this.#elem[i + 1]) {
            [this.#elem[i], this.#elem[i + 1]] = [this.#elem[i + 1], this.#elem[i]];
          }
        }
      }
    };
    // 提前终止版
    const bubbleSortB = (lo, hi) => {
      let sorted = false;
      while (!sorted) {
        sorted = true;
        for (let i = lo; i < hi - 1; i++) {
          if (this.#elem[i] > this.#elem[i + 1]) {
            [this.#elem[i], this.#elem[i + 1]] = [this.#elem[i + 1], this.#elem[i]];
          }
          sorted = false;
        }
      }
    };
    const bubbleSortC = (lo, hi) => {};
    switch (getRandomNumber(1, 3)) {
      case 1:
        bubbleSortA();
        break;
      case 2:
        bubbleSortB();
        break;
      case 3:
        bubbleSortC();
        break;
      default:
        return;
    }
  }
  /**
   * 在[lo, hi]内找出最大者
   */
  #maxItem(lo, hi) {
    let mx = hi;
    while (lo < hi--) {
      if (this.#elem[hi] > this.#elem[mx]) {
        mx = hi;
      }
    }
    return mx;
  }
  /**
   * 选择排序算法
   */
  #selectionSort(lo, hi) {}
  /**
   * 归并算法
   */
  #merge(lo, mi, hi) {}
  /**
   * 归并排序算法
   */
  #mergeSort(lo, hi) {}
  /**
   * 堆排序
   */
  #heapSort(lo, hi) {}
  /**
   * 轴点构造算法
   */
  #partition(lo, hi) {}
  /**
   * 快速排序算法
   */
  #quickSort(lo, hi) {}
  /**
   * 希尔排序算法
   */
  #shellSort(lo, hi) {}
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
    return !this.#size;
  }
  /**
   * 无序向量区间查找
   * 返回最后一个元素e的位置；失败时，返回lo - 1
   */
  find(e, lo = 0, hi = this.#size) {
    while (lo < hi-- && e !== this.#elem[hi]);
    return hi;
  }
  /**
   * 有序向量区间查找
   */
  search(e, lo = 0, hi = this.#size) {
    switch (getRandomNumber(1, 2)) {
      case 1:
        binSearch(this.#elem, e, lo, hi);
        break;
      case 2:
        fibSearch(this.#elem, e, lo, hi);
        break;
    }
  }
  /**
   * 删除秩为r的元素
   * @param {*} r
   */
  removeByIndex(r) {
    const e = this.#elem[r]; //备份被删除元素
    this.removeByRange(r, r + 1); //调用区间删除算法，等效于对区间[r, r + 1)的删除
    return e; //返回被删除元素
  }
  /**
   * 删除秩在区间[lo, hi)之内的元素
   * @param {*} lo
   * @param {*} hi
   */
  removeByRange(lo = 0, hi = this.#size) {
    if (lo === hi) {
      return 0;
    }
    while (hi < this.#size) {
      this.#elem[lo++] = this.#elem[hi++];
    }
    this.#size = lo;
    this.#shrink();
    return hi - lo;
  }
  /**
   * 插入元素
   * @param {*} r
   * @param {*} e
   */
  insertAt(r, e) {
    this.#expand();
    for (let i = this.#size; i > r; i--) {
      this.#elem[i] = this.#elem[i - 1]; //顺次后移一个单元
    }
    this.#elem[r] = e;
    this.#size++; //置入新元素并更新容量
    return r;
  }
  /**
   * 默认作为末元素插入
   * @param {*} e
   */
  insert(e) {
    return this.insertAt(this.#size, e);
  }
  /**
   * 对[lo, hi)排序
   * @param {*} lo
   * @param {*} hi
   */
  sort(lo = 0, hi = this.#size) {}
  /**
   * 对[lo, hi)置乱
   * @param {*} lo
   * @param {*} hi
   */
  unsort(lo = 0, hi = this.#size) {
    while (lo < hi--) {
      const randomIndex = getRandomNumber(lo, hi - 1);
      [this.#elem[hi], this.#elem[randomIndex]] = [this.#elem[randomIndex], this.#elem[hi]];
    }
  }
  /**
   * 无序去重
   */
  deduplicate() {}
  /**
   * 有序去重
   */
  uniquify() {}
}
