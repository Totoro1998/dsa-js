import { binSearch, fibSearch } from '../utils/search.js';
import { get_random_number } from '../utils/number.js';
const DEFAULT_CAPACITY = 3;
export default class vector {
  elem; //数据区
  /**
   * 构造函数
   * @param {*} arr
   * @param {*} lo
   * @param {*} hi
   */
  constructor(arr, lo = 0, hi) {
    if (!arr) {
      this.elem = [];
    } else {
      if (!hi) {
        hi = arr.length;
      }
      this.copy_from(arr, lo, hi);
    }
  }
  /**
   * 容量为c、规模为s、所有元素初始为v
   * @param {*} c
   * @param {*} s
   */
  static create_vector_by_graph(s = 0, v) {
    this.elem = [];
    for (i = 0; i < s; this.elem[i++] = v);
  }
  /**
   * 复制数组区间A[lo, hi)
   */
  copy_from(arr, lo, hi) {
    this.elem = [];
    for (let i = 0; lo < hi; i++, lo++) {
      this.elem[i] = arr[lo];
    }
  }
  get_elem() {
    // const return_elem = [];
    // for (let i = 0; i < this.len(); i++) {
    //   if (this.elem[i]) {
    //     return_elem[i] = this.elem[i];
    //   }
    // }
    // return return_elem;
    return this.elem;
  }
  get_item(index) {
    return this.elem[index];
  }
  /**
   * 扫描交换
   */
  #bubble(lo, hi) {}
  /**
   * 起泡排序算法
   */
  #bubbleSort(lo = 0, hi = this.len()) {
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
  heap_sort(lo, hi) {
    // const h = pq_compl_heap(elem, lo, hi);
    // while (!h.empty()) {
    //   this.elem[--hi] = h.del_max();
    // }
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
    return this.elem.length;
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
    return !this.len();
  }
  /**
   * 无序向量区间查找
   * 返回最后一个元素e的位置；失败时，返回lo - 1
   */
  find(e, lo = 0, hi = this.len()) {
    while (lo < hi-- && e !== this.elem[hi]);
    return hi;
  }
  /**
   * 有序向量区间查找
   */
  search(e, lo = 0, hi = this.len()) {
    switch (get_random_number(1, 2)) {
      case 1:
        return fibSearch(this.elem, e, lo, hi);
      case 2:
        return binSearch(this.elem, e, lo, hi);
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
  remove_by_range(lo = 0, hi = this.len()) {
    if (lo === hi) {
      return 0;
    }
    while (hi < this.len()) {
      this.elem[lo++] = this.elem[hi++];
    }
    this.elem.length = lo;
    return hi - lo;
  }
  /**
   * 插入元素
   * @param {*} r
   * @param {*} e
   */
  insert_at(r, e) {
    // this.expand();
    for (let i = this.len(); i > r; i--) {
      this.elem[i] = this.elem[i - 1]; //顺次后移一个单元
    }
    this.elem[r] = e;
    return r;
  }
  /**
   * 默认作为末元素插入
   * @param {*} e
   */
  insert(e) {
    return this.insert_at(this.len(), e);
  }
  /**
   * 对[lo, hi)排序
   * @param {*} lo
   * @param {*} hi
   */
  sort(lo = 0, hi = this.len()) {
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
        this.heap_sort(lo, hi);
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
  unsort(lo = 0, hi = this.len()) {
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
      let old_size = this.len();
      let i = -1;
      while (++i < this.len() - 1) {
        let j = i + 1;
        while (j < this.len()) {
          if ((this.elem[i] = this.elem[j])) {
            this.remove_by_index(j); //若雷同删除后者
          } else {
            j++;
          }
        }
      }
      return old_size - this.len();
    };
    /**
     * 高效版本
     */
    const deduplicateB = () => {
      let old_size = this.len();
      let i = 1;
      while (i < this.len()) {
        if (this.find(this.elem[i], 0, i) < 0) {
          i++;
        } else {
          this.remove_by_index(i);
        }
      }
      return old_size - this.len();
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
      let oldSize = this.len();
      let i = 1;
      while (i < this.len()) {
        this.elem[i - 1] === this.elem[i] ? remove(i) : i++; //若雷同，则删除后者；否则，转至后一元素
      }
      return oldSize - this.len();
    };
    /**
     * 高效版
     */
    const uniquifyB = () => {
      //各对互异“相邻”元素的秩
      let i = 0; //用于改变this.size
      let j = 0; //用于循环查找和数量
      while (++j < this.len()) {
        //跳过雷同者
        if (this.elem[i] !== this.elem[j]) {
          this.elem[++i] = this.elem[j]; //发现不同元素时，向前移至紧邻于前者右侧
        }
      }
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
    for (let i = 0; i < this.len(); i++) {
      visit(this.elem[i]);
    }
  }
}
