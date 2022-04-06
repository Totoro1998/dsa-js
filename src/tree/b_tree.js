import { bt_node } from './tree_node.js';

export default class b_tree {
  size; //存放的关键码总数
  order; //B-树的阶次，至少为3，创建时指定，一般不能修改
  root; //根节点
  hot; // search()最后访问非空的节点位置
  constructor(order = 3) {
    this.size = 0;
    this.order = order;
    this.root = new bt_node();
  }
  /**
   * 因插入而上溢之后的分裂处理
   * @param {*} v
   */
  solve_overflow(v) {
    //递归基：当前节点并未发生上溢
    if (this.order >= v.child.len()) {
      return;
    }
    let s = this.order >> 1; //轴点
    let u = new bt_node(); //新节点已有一个空孩子
    //v右侧order-s-1个孩子及关键码分裂为右侧节点u
    for (let j = 0; j < this.order - s - 1; j++) {
      u.child.insert_at(j, v.child.remove(s + 1));
      u.key.insert_at(j, v.key.remove(s + 1));
    }
    //移动v最靠右的孩子
    u.child[this.order - s - 1] = v.child.remove(s + 1);
    //若u的孩子们非空
    if (u.child[0]) {
      //令他们的父节点统一
      for (let j = 0; j < this.order - s; j++) {
        u.child[j].parent = u;
      }
    }
    let p = v.parent;
    if (!p) {
      const node = new bt_node();
      p = node;
      this.root = node;
      p.child[0] = v;
      v.parent = p;
    }
    //p中指向u的指针的秩
    let r = 1 + p.key.search(v.key[0]);
    //轴点关键码上升
    p.key.insert_at(r, v.key.remove(s));
    //新节点u与父节点p互联
    p.child.insert_at(r + 1, u);
    u.parent = p;
    //上升一层，如有必要则继续分裂
    this.solve_overflow(p);
  }
  /**
   * 因删除而下溢之后的合并处理
   * @param {*} v
   */
  solve_underflow(v) {
    if (v.child.len() >= (this.order + 1) >> 1) {
      return;
    }
    let p = v.parent;
    //递归基，已到根节点，没有孩子的下限
    if (!p) {
      //但倘若作为树根的v已不含关键码，却有唯一的非空孩子，则这个节点可被跳过，并因不再有用而被销毁
      if (!v.key.len() && v.child[0]) {
        this.root = v.child[0];
        this.root.parent = null;
        v.child[0] = null;
        v = null;
      } //整层高度降低一层
      return;
    }
    let r = 0;
    //确定v是p的第r个孩子——此时v可能不含关键码，故不能通过关键码查找
    while (p.child[r] !== v) {
      r++;
    }
    //向左兄弟借关键码
    if (0 < r) {
      let ls = p.child[r - 1];
      if ((this.order + 1) >> 1 < ls.child.len()) {
        v.key.insert_at(0, p.key[r - 1]);
        p.key[r - 1] = ls.key.remove(ls.key.len() - 1);
        v.child.insert_at(0, ls.child.remove(ls.child.len() - 1));
        if (v.child[0]) {
          v.child[0].parent = v;
        }
        return;
      }
    }
    //向右兄弟借关键码
    //若v不是p的最后一个孩子，则右兄弟必存在
    if (p.child.len() - 1 > r) {
      let rs = p.child[r + 1];
      if ((this.order + 1) >> 1 < rs.child.len()) {
        v.key.insert_at(v.key.len(), p.key[r]);
        p.key[r] = rs.key.remove(0);
        v.child.insert_at(v.child.len(), rs.child.remove(0));
        if (v.child[v.child.len() - 1]) {
          v.child[v.child.len() - 1].parent = v;
        }
        return;
      }
    } //至此，右兄弟要么为空，要么太瘦
    //左右兄弟要么为空（但不可能同时），要么都太瘦-------合并
    //与左兄弟合并
    if (0 < r) {
      let ls = p.child[r - 1];
      ls.key.insert_at(ls.key.len(), p.key.remove(r - 1));
      p.child.remove(r);
      ls.child.insert_at(ls.child.len(), v.child.remove(0));
      if (ls.child[ls.child.len() - 1]) {
        ls.child[ls.child.len() - 1].parent = ls;
      }
      while (!v.key.empty()) {
        ls.key.insert_at(ls.key.len(), v.key.remove(0));
        ls.child.insert_at(ls.child.len(), v.child.remove(0));
        if (ls.child[ls.child.len() - 1]) {
          ls.child[ls.child.len() - 1].parent = ls;
        }
      }
      v = null;
    } else {
      //与右兄弟合并
      let rs = p.child[r + 1];
      rs.key.insert_at(0, p.key.remove(r));
      p.child.remove(r);
      rs.child.insert_at(0, v.child.remove(v.child.len() - 1));
      if (rs.child[0]) {
        rs.child[0].parent = rs;
      }
      while (!v.key.empty()) {
        rs.key.insert_at(0, v.key.remove(v.key.len() - 1));
        rs.child.insert_at(0, v.child.remove(v.child.len() - 1));
        if (rs.child[0]) {
          rs.child[0].parent = rs;
        }
      }
      v = null;
    }
    solve_underflow(p);
    return;
  }
  /**
   * 阶次
   */
  get_order() {
    return this.order;
  }
  /**
   * 规模
   */
  get_size() {
    return this.size;
  }
  /**
   * 树根
   */
  get_root() {
    return this.root;
  }
  /**
   * 判空
   */
  empty() {
    return !this.root;
  }
  search(e) {
    let v = this.root;
    this.hot = null;
    //从根节点出发逐层查找
    while (v) {
      let r = v.key.search(e); //在当前节点，找到不大于e的最大关键码
      if (0 <= r && e === v.key[r]) {
        return v; //成功：在当前节点中命中目标关键码
      }
      //否则转入对应子树，hot指向其父
      //如果查找失败，hot应该终止于一个真实节点，即叶节点
      this.hot = v;
      v = v.child[r + 1];
    }
    return null;
  }
  insert(e) {
    const v = this.search(e);
    if (v) {
      return false;
    }
    //在节点hot的有序关键码向量中查找合适的插入位置
    let r = this.hot.key.search(e);
    this.hot.key.insert_at(r + 1, e);
    this.hot.child.insert_at(r + 2, null); //创建一个空子树指针
    this.size++;
    this.solve_overflow(this.hot); //如有必要，需做分裂
    return true;
  }
  remove(e) {
    const v = this.search(e);
    if (!v) {
      return false;
    }
    //确定目标关键码在节点v中秩
    let r = v.key.search(e);
    //若v非叶子，则e的后继必属于某叶节点
    if (v.child[0]) {
      let u = v.child[r + 1]; //在右子树一直向左，即可
      while (u.child[0]) {
        //找出e的后继
        u = u.child[0];
      }
      v.key[r] = u.key[0]; //并与之交换即可
      v = u;
      r = 0;
    } //至此，v必然位于最底层，且其中第r个关键码就是待删除者
    v.key.remove(r);
    v.child.remove(r + 1);
    this.size--;
    solve_underflow(v); //如有需要，需做选择或合并
    return true;
  }
}
