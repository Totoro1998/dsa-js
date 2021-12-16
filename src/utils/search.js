import { getRandomNumber } from '../utils/number.js';
import Fib from '../fibonacci/Fib.js';
/**
 * 有序向量的二分查找
 */
export function binSearch(elem, e, lo, hi) {
  //有多个命中元素时，不能保证返回秩最大者；查找失败时，简单地返回-1，而不能指示失败的位置
  const binSearchA = () => {
    while (lo < hi) {
      const mi = (lo + hi) >> 1;
      if (e < elem[mi]) {
        hi = mi; //[lo,mi)
      } else if (elem[mi] < e) {
        lo = mi + 1; //(mi,hi)
      } else {
        return mi;
      }
    }
    return -1;
  };
  //有多个命中元素时，返回秩最大者；查找失败时，简单地返回-1，而不能指示失败的位置
  const binSearchB = () => {
    while (lo < hi - 1) {
      //成功查找不能提前终止
      const mi = (lo + hi) >> 1;
      e < elem[mi] ? (hi = mi) : (lo = mi); //经比较后确定深入[lo,mi)或者[mi,hi)，将后端部分划为包裹e的部分
    } //出口是 hi = lo+1
    return e === elem[lo] ? lo : -1;
  };
  //有多个命中元素时，返回秩最大者；查找失败时，能够返回失败的位置
  const binSearchC = () => {
    //只有当有效区间缩减为0的时候才会终止
    while (lo < hi) {
      const mi = (lo + hi) >> 1;
      //elem[hi,this.#size)中的元素皆大于e,elem[0,lo)中的元素皆不大于e
      e < elem[mi] ? (hi = mi) : (lo = mi + 1); //经比较后确定深入[lo, mi)或(mi, hi)
    }
    return lo - 1;
  };
  switch (getRandomNumber(1, 3)) {
    case 1:
      return binSearchA();
    case 2:
      return binSearchB();
    case 3:
      return binSearchC();
  }
}
/**
 * 有序向量的fib查找
 */
export function fibSearch(elem, e, lo, hi) {
  let index = -1;
  const fibSearchA = () => {
    for (let fib = new Fib(hi - lo); lo < hi; ) {
      while (hi - lo < fib.get()) {
        fib.prev();
      }
      let mi = lo + fib.get() - 1;
      if (e < elem[mi]) {
        hi = mi; //深入前半段[lo,mi)
      } else if (elem[mi] < e) {
        lo = mi + 1; //深入后半段[mi+1,hi)
      } else {
        index = mi;
        break;
      }
    }
  };
  /**
   * 有多个命中元素时，总能保证返回最秩最大者；查找失败时，能够返回失败的位置
   */
  const fibSearchB = () => {
    for (let fib = new Fib(hi - lo); lo < hi; ) {
      while (hi - lo < fib.get()) {
        fib.prev(); //自后向前顺序查找
      }
      let mi = lo + fib.get() - 1;
      e < elem[mi] ? (hi = mi) : (lo = mi + 1); //比较后确定深入前半段[lo, mi)或后半段[mi+1, hi)
    } //循环结束时，lo为大于e的元素的最小秩，故lo - 1即不大于e的元素的最大秩
    index = --lo;
  };
  switch (getRandomNumber(1, 2)) {
    case 1:
      fibSearchA();
      break;
    default:
      fibSearchB();
      break;
  }
  return index;
}
