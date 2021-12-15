/**
 * 有序向量的二分查找
 */
export function binSearch(elem, e, lo, hi) {
  //有多个命中元素时，不能保证返回秩最大者；查找失败时，简单地返回-1，而不能指示失败的位置
  const binSearchA = () => {
    while (lo < hi) {
      const mi = (lo + hi) / 2;
      if (e < elem[mi]) {
        hi = mi;
      } else if (elem[mi] < e) {
        lo = mi + 1;
      } else {
        return mi;
      }
    }
    return -1;
  };
  //有多个命中元素时，返回秩最大者；查找失败时，简单地返回-1，而不能指示失败的位置
  const binSearchB = () => {
    while (lo < hi - 1) {
      const mi = (lo + hi) / 2;
      e < elem[mi] ? (hi = mi) : (lo = mi);
    }
    return e < elem[lo] ? lo - 1 : lo;
  };
  //有多个命中元素时，返回秩最大者；查找失败时，能够返回失败的位置
  const binSearchC = () => {
    while (lo < hi) {
      const mi = (lo + hi) / 2;
      e < elem[mi] ? (hi = mi) : (lo = mi + 1); //经比较后确定深入[lo, mi)或(mi, hi)
    }
    return lo - 1;
  };
  switch (Math.floor(Math.random() * 3 + 1)) {
    case 1:
      binSearchA();
    case 2:
      binSearchB();
    case 3:
      binSearchC();
  }
}
/**
 * 有序向量的fib查找
 */
export function fibSearch(elem, e, lo, hi) {
  const fibSearchA = () => {};
  const fibSearchB = () => {};
  switch (Math.floor(Math.random() * 2 + 1)) {
    case 1:
      fibSearchA();
    case 2:
      binSearchB();
  }
}
