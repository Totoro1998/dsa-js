import { get_random_number } from '../utils/number.js';
import entry from './entry.js';
import quad_list from './quad_list.js';
import list from '../list/list.js';
export default class skip_list extends list {
  max_level = 12;
  constructor() {
    super();
  }
  /**
   * 入口：q_list_node为顶层列表，p为q_list_node的首节点。从指定层q_list_node的首节点p出发
   * 出口：若成功，p为命中关键码所属塔的顶部节点，q_list_node为p所属列表
   *      否则，p为所属塔的基座，该塔对应于不大于k的最大且最靠右关键码，q_list_node为空
   * 约定：多个词条命中时，沿四联表取最靠后者
   * @param {*} q_list
   * @param {*} p
   * @param {*} k
   */
  skip_search(q_list, p, k) {
    //在每一层向右，向下查找目标关键码k
    while (true) {
      //从前向后查找，直到出现更大的key或溢出至trailer，有多个命中时，靠后者优先。
      while (p.succ && (!p.entry.key || p.entry.key <= k)) {
        p = p.succ;
      }
      //此时倒回一步，即可判断是否
      p = p.pred;
      //判断p不为header
      if (p.pred && k === p.entry.key) {
        return {
          q_list,
          p,
          success: true,
        };
      }
      //否则转入下一层
      q_list = q_list.succ;
      if (!q_list.succ) {
        return {
          q_list,
          p,
          success: false,
        }; //若已到穿透底层，则意味着失败
      }
      //否则转至当前塔的下一节点
      p = p.pred ? p.below : q_list.data.first();
    }
  }
  /**
   * 底层quad_list的规模
   */
  len() {
    // 该data值是new quad_list()
    return this.empty() ? 0 : this.last().data.len();
  }
  /**
   * 层高
   */
  level() {
    return super.len();
  }
  put(k, v) {
    //将被随机的插入多个副本
    const e = new entry(k, v);
    if (this.empty()) {
      this.insert_as_first(new quad_list());
    }
    //从顶层四联表的首节点出发
    let q_list = this.first();
    let p;
    if (q_list.data.empty()) {
      p = q_list.data.first().pred;
    } else {
      p = q_list.data.first();
    }
    //查找适当的插入位置（不大于关键码k的最后一个节点p）
    const { q_list: result_q_list, p: result_p, success } = this.skip_search(q_list, p, k);
    q_list = result_q_list;
    p = result_p;
    if (success) {
      //如有雷同词条，则需强制转入塔底
      while (p.below) {
        p = p.below;
      }
    }
    //以下，紧邻于p的右侧，一座新塔将自底而上逐层生长
    q_list = this.last();
    const b = q_list.data.insert_after_above(e, p);
    //经投掷硬币，若确定新塔需要再长高一层
    let level = 1;
    while (get_random_number(0, 1) === 1 && level <= this.max_level) {
      level++;
      //找出不低于此高度的最近前驱
      while (q_list.data.valid(p) && !p.above) {
        p = p.pred;
      }
      //若该前驱是header
      if (!q_list.data.valid(p)) {
        //且当前已是最顶层，则意味着必须
        if (q_list.data.unique_id === this.first().data.unique_id) {
          //首先创建新的一层，然后
          this.insert_as_first(new quad_list());
        }
        //将p转至上一层skip_list的header
        p = q_list.pred.data.first().pred;
      } else {
        //将p提升至该高度
        p = p.above;
        //上升一层，并在该层
        q_list = q_list.pred;
        //将新节点插入p之后，b之上
        b = q_list.data.insert_after_above(e, p, b);
      }
    }
    return true;
  }
  get(k) {
    if (this.empty()) {
      return null;
    }
    const q_list = this.first();
    const p = q_list.data.first();
    const result = this.skip_search(q_list, p, k);
    return result.success ? result.p.entry.value : null;
  }
  remove(k) {
    if (this.empty()) {
      return false;
    }
    let q_list = this.first();
    let p = q_list.data.first();
    const result = this.skip_search(q_list, p, k);
    if (!result.success) {
      return false;
    } else {
      q_list = result.q_list;
      p = result.p;
    }
    //若目标词条存在，则逐层拆除与之对应的塔
    //记住下一层节点，并删除当前层节点，再转入下一层
    do {
      const lower = p.below;
      q_list.data.remove(p);
      p = lower;
      q_list = q_list.succ;
    } while (q_list.succ);
    while (!this.empty() && this.first().data.empty()) {
      super.remove(this.first());
    }
    return true;
  }
}
