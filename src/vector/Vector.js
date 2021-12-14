const DEFAULT_CAPACITY = 3;
export default class Vector {
  #size; //规模
  #capacity; //容量
  #elem; //数据区
  /**
   * 复制数组区间A[lo, hi)
   */
  #copyFrom(arr, lo, hi) {}
  /**
   * 空间不足扩容
   */
  #expand() {}
  /**
   * 装填因子过小时压缩
   */
  #shrink() {}
  /**
   * 扫描交换
   */
  #bubble(lo, hi) {}
  /**
   * 起泡排序算法
   */
  #bubbleSort(lo, hi) {}
  /**
   * 选取最大元素
   */
  #maxItem(lo, hi) {}
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
   * 构造函数
   * @param {*} arr
   * @param {*} lo
   * @param {*} hi
   */
  constructor(arr, lo = 0, hi) {
    if (!hi) {
      hi = arr.length;
    }
    this.#capacity = 2 * (hi - lo); //分配空间
    this.#elem = [];
    for (this.#size = 0; lo < hi; this.#size++, lo++) {
      this.#elem[this.#size] = arr[lo];
    }
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
    return !this.#size;
  }
  /**
   * 无序向量区间查找
   */
  find(e, lo = 0, hi = this.#size) {}
  /**
   * 有序向量区间查找
   */
  search(e, lo = 0, hi = this.#size) {}
  /**
   * 删除秩为r的元素
   * @param {*} r
   */
  removeByIndex(r) {}
  /**
   * 删除秩在区间[lo, hi)之内的元素
   * @param {*} lo
   * @param {*} hi
   */
  removeByRange(lo = 0, hi = this.#size) {}
  /**
   * 插入元素
   * @param {*} r
   * @param {*} e
   */
  insertAt(r, e) {}
  /**
   * 默认作为末元素插入
   * @param {*} e
   */
  insert(e) {
    return insertAt(this.#size, e);
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
  unsort(lo = 0, hi = this.#size) {}
  /**
   * 无序去重
   */
  deduplicate() {}
  /**
   * 有序去重
   */
  uniquify() {}
}
