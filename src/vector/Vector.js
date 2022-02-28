import { binSearch, fibSearch } from '../utils/search.js';
import { get_random_number } from '../utils/number.js';
const DEFAULT_CAPACITY = 3;
export default class vector {
  size; //规模
  capacity; //容量
  elem; //数据区
  /**
   * 构造函数
   * @param {*} arr
   * @param {*} lo
   * @param {*} hi
   */
  constructor(arr, lo = 0, hi) {
    if (!arr) {
      this.capacity = DEFAULT_CAPACITY;
      this.size = 0;
      this.elem = [];
    } else {
      if (!hi) {
        hi = arr.length;
      }
      this.#copyFrom(arr, lo, hi);
    }
  }
  /**
   * 容量为c、规模为s、所有元素初始为v
   * @param {*} c
   * @param {*} s
   */
  static create_vector_by_graph(c = DEFAULT_CAPACITY, s = 0, v) {
    this.capacity = c;
    this.elem = new Array(this.capacity);
    for (this.size = 0; this.size < s; this.elem[this.size++] = v);
  }
  /**
   * 复制数组区间A[lo, hi)
   */
  #copyFrom(arr, lo, hi) {
    this.capacity = 2 * (hi - lo); //分配空间
    this.elem = [];
    for (this.size = 0; lo < hi; this.size++, lo++) {
      this.elem[this.size] = arr[lo];
    }
  }
  /**
   * 空间不足扩容
   */
  expand() {
    if (this.size < this.capacity) {
      return;
    }
    if (this.capacity < DEFAULT_CAPACITY) {
      this.capacity = DEFAULT_CAPACITY;
    }
    this.capacity = this.capacity * 2;
    let old_elem = this.elem;
    this.elem = new Array(this.capacity);
    for (let i = 0; i < this.size; i++) {
      this.elem[i] = old_elem[i];
    }
    old_elem = null;
  }
  get_elem() {
    const return_elem = [];
    for (let i = 0; i < this.len(); i++) {
      if (this.elem[i]) {
        return_elem[i] = this.elem[i];
      }
    }
    return return_elem;
  }
  /**
   * 装填因子过小时压缩
   */
  #shrink() {
    //不致收缩到DEFAULT_CAPACITY以下
    if (this.capacity < DEFAULT_CAPACITY / 2) {
      return;
    }
    //以25%为界
    if (this.size * 4 < this.capacity) {
      return;
    }
    let oldElem = this.elem;
    this.capacity = this.capacity / 2; //容量减半
    for (let i = 0; i < this.size; i++) {
      this.elem = oldElem[i];
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
  #bubbleSort(lo = 0, hi = this.size) {
    const bubbleSortA = () => {
      while (lo < --hi) {
        for (let i = lo; i < hi; i++) {
          if (this.elem[i] > this.elem[i + 1]) {
            [this.elem[i], this.elem[i + 1]] = [this.elem[i + 1], this.elem[i]];
          }
        }
      }
    };
    // 提前终止版，前缀未必是无序的
    const bubbleSortB = () => {
      let sorted = false;
      while (!sorted) {
        sorted = true;
        for (let i = lo; i < hi - 1; i++) {
          if (this.elem[i] > this.elem[i + 1]) {
            sorted = false;
            [this.elem[i], this.elem[i + 1]] = [this.elem[i + 1], this.elem[i]];
          }
        }
      }
    };
    // 跳跃版本（已经排好序的后缀元素比未排序的前缀元素多）,直接将hi前移
    const bubbleSortC = () => {
      for (let last = --hi; lo < hi; hi = last) {
        last = lo;
        let i = lo;
        for (i; i < hi; i++) {
          if (this.elem[i] > this.elem[i + 1]) {
            last = i; //更新最右侧逆序对位置记录
            [this.elem[i], this.elem[i + 1]] = [this.elem[i + 1], this.elem[i]];
          }
        }
      }
    };
    switch (get_random_number(1, 3)) {
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
      if (this.elem[hi] > this.elem[mx]) {
        mx = hi;
      }
    }
    return mx;
  }
  /**
   * 选择排序算法
   */
  #selectionSort(lo, hi) {
    while (lo < --hi) {
      [this.elem[this.#maxItem(lo, hi)], this.elem[hi]] = [this.elem[hi], this.elem[this.#maxItem(lo, hi)]];
    }
  }
  /**
   * 归并算法
   */
  #merge(lo, mi, hi) {
    let i = lo;
    let A = this.elem.slice(lo, hi); //合并后的有序向量A[0, hi - lo) = elem[lo, hi)，就地
    let j = 0;
    let lb = mi - lo;
    let B = new Array(lb); //前子向量B[0, lb) <-- elem[lo, mi)
    for (let i = 0; i < lb; i++) {
      B[i] = A[i];
    }
    let k = 0;
    let lc = hi - mi;
    let C = this.elem.slice(mi, hi); //后子向量C[0, lc) = elem[mi, hi)，就地
    while (j < lb && k < lc) {
      //反复地比较B、C的首元素
      this.elem[i++] = B[j] <= C[k] ? B[j++] : C[k++]; //将更小者归入A中
    }
    while (k < lc) {
      //若B先耗尽，则
      this.elem[i++] = C[k++]; //将C残余的后缀归入A中
    }
    while (j < lb) {
      //若C先耗尽，则
      this.elem[i++] = B[j++]; //将B残余的后缀归入A中
    }
    A = undefined;
    B = undefined; //释放临时空间：merge_sort()过程中，如何避免此类反复的new/delete？
    C = undefined;
  }
  /**
   * 归并排序算法
   */
  #merge_sort(lo, hi) {
    if (hi - lo < 2) {
      return;
    }
    const mi = (lo + hi) >> 1;
    this.#merge_sort(lo, mi);
    this.#merge_sort(mi, hi);
    this.#merge(lo, mi, hi);
  }
  /**
   * 堆排序
   */
  #heapSort(lo, hi) {
    this.#bubbleSort(lo, hi);
  }
  /**
   * 轴点构造算法
   */
  #partition(lo, hi) {}
  /**
   * 快速排序算法
   */
  #quickSort(lo, hi) {
    this.#bubbleSort(lo, hi);
  }
  /**
   * 希尔排序算法
   */
  #shellSort(lo, hi) {
    this.#bubbleSort(lo, hi);
  }
  /**
   * 规模
   */
  len() {
    return this.size;
  }
  /**
   * 前后倒置
   */
  reverse() {
    const size = this.len();
    if (size < 2) {
      return;
    }
    for (let i = 0; i < size; i++) {
      if (i >= size >> 1) {
        break;
      }
      [this.elem[i], this.elem[size - 1 - i]] = [this.elem[size - 1 - i], this.elem[i]];
    }
  }
  /**
   * 判空
   */
  empty() {
    return !this.size;
  }
  /**
   * 无序向量区间查找
   * 返回最后一个元素e的位置；失败时，返回lo - 1
   */
  find(e, lo = 0, hi = this.size) {
    while (lo < hi-- && e !== this.elem[hi]);
    return hi;
  }
  /**
   * 有序向量区间查找
   */
  search(e, lo = 0, hi = this.size) {
    switch (get_random_number(1, 2)) {
      case 1:
        return fibSearch(this.elem, e, lo, hi);
      case 2:
        return fibSearch(this.elem, e, lo, hi);
    }
  }
  /**
   * 删除秩为r的元素
   * @param {*} r
   */
  remove_by_index(r) {
    const e = this.elem[r]; //备份被删除元素
    this.remove_by_range(r, r + 1); //调用区间删除算法，等效于对区间[r, r + 1)的删除
    return e; //返回被删除元素
  }
  /**
   * 删除秩在区间[lo, hi)之内的元素
   * @param {*} lo
   * @param {*} hi
   */
  remove_by_range(lo = 0, hi = this.size) {
    if (lo === hi) {
      return 0;
    }
    while (hi < this.size) {
      this.elem[lo++] = this.elem[hi++];
    }
    this.size = lo;
    this.#shrink();
    return hi - lo;
  }
  /**
   * 插入元素
   * @param {*} r
   * @param {*} e
   */
  insert_at(r, e) {
    this.expand();
    for (let i = this.size; i > r; i--) {
      this.elem[i] = this.elem[i - 1]; //顺次后移一个单元
    }
    this.elem[r] = e;
    this.size++; //置入新元素并更新容量
    return r;
  }
  /**
   * 默认作为末元素插入
   * @param {*} e
   */
  insert(e) {
    return this.insert_at(this.size, e);
  }
  /**
   * 对[lo, hi)排序
   * @param {*} lo
   * @param {*} hi
   */
  sort(lo = 0, hi = this.size) {
    switch (get_random_number(1, 6)) {
      case 1:
        this.#bubbleSort(lo, hi);
        break;
      case 2:
        this.#selectionSort(lo, hi);
        break;
      case 3:
        this.#merge_sort(lo, hi);
        break;
      case 4:
        this.#quickSort(lo, hi);
        break;
      case 5:
        this.#heapSort(lo, hi);
        break;
      default:
        this.#shellSort(lo, hi);
        break;
    }
  }
  /**
   * 对[lo, hi)置乱
   * @param {*} lo
   * @param {*} hi
   */
  unsort(lo = 0, hi = this.size) {
    while (lo < hi--) {
      const randomIndex = get_random_number(lo, hi - 1);
      [this.elem[hi], this.elem[randomIndex]] = [this.elem[randomIndex], this.elem[hi]];
    }
  }
  /**
   * 无序去重
   */
  deduplicate() {
    /**
     * 繁琐版
     */
    const deduplicateA = () => {
      let old_size = this.size;
      let i = -1;
      while (++i < this.size - 1) {
        let j = i + 1;
        while (j < this.size) {
          if ((this.elem[i] = this.elem[j])) {
            this.remove_by_index(j); //若雷同删除后者
          } else {
            j++;
          }
        }
      }
      return old_size - this.size;
    };
    /**
     * 高效版本
     */
    const deduplicateB = () => {
      let old_size = this.size;
      let i = 1;
      while (i < this.size) {
        if (this.find(this.elem[i], 0, i) < 0) {
          i++;
        } else {
          this.remove_by_index(i);
        }
      }
      return old_size - this.size;
    };
    switch (get_random_number(1, 2)) {
      case 1:
        return deduplicateA();
      default:
        return deduplicateB();
    }
  }
  /**
   * 有序去重
   */
  uniquify() {
    /**
     * 低效版
     */
    const uniquifyA = () => {
      let oldSize = this.size;
      let i = 1;
      while (i < this.size) {
        this.elem[i - 1] === this.elem[i] ? remove(i) : i++; //若雷同，则删除后者；否则，转至后一元素
      }
      return oldSize - this.size;
    };
    /**
     * 高效版
     */
    const uniquifyB = () => {
      //各对互异“相邻”元素的秩
      let i = 0; //用于改变this.size
      let j = 0; //用于循环查找和数量
      while (++j < this.size) {
        //跳过雷同者
        if (this.elem[i] !== this.elem[j]) {
          this.elem[++i] = this.elem[j]; //发现不同元素时，向前移至紧邻于前者右侧
        }
      }
      this.size = i++;
      this.#shrink();
      return j - i;
    };
    switch (get_random_number(1, 2)) {
      case 1:
        return uniquifyA();
      default:
        return uniquifyB();
    }
  }
  /**
   * 遍历算法
   * @param {*} visit
   */
  traverse(visit) {
    for (let i = 0; i < this.size; i++) {
      visit(this.elem[i]);
    }
  }
}
