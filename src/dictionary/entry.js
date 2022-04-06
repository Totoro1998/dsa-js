import { Compare } from '../utils/compare.js';
export default class entry {
  key;
  value;
  constructor(k, v, e) {
    if (e) {
      this.key = e.key;
      this.value = e.value;
    } else {
      this.key = k;
      this.value = v;
    }
  }
  compareTo(e) {
    if (this.key < e.key) {
      return Compare.LESS_THAN;
    } else if (this.key > e.key) {
      return Compare.BIGGER_THAN;
    } else {
      return Compare.EQUALS;
    }
  }
}
