export class BindNode {
  data = undefined; // 数值
  parent = undefined; // 父节点
  lc = undefined; // 左孩子
  rc = undefined; // 右孩子
  height = undefined; // 高度
  npl = undefined; // Null Path Length（左式堆，空节点通路长度）
  color = undefined; // 颜色（红黑树）
  /**
   * 构造函数
   * @param {*} data
   * @param {*} parent
   * @param {*} lc
   * @param {*} rc
   * @param {*} height
   * @param {*} npl
   * @param {*} color
   */
  constructor(data, parent, lc, rc, height, npl, color) {
    this.data = data;
    this.parent = parent;
    this.lc = lc;
    this.rc = rc;
    this.height = height;
    this.npl = npl;
    this.color = color;
  }
  /**
   * 统计当前节点的后代总数
   */
  size() {}
  /**
   * 作为当前节点的左孩子插入新节点
   * @param {*} e
   */
  insertAsLC(e) {}
  /**
   * 作为当前节点的右孩子插入新节点
   * @param {*} e
   */
  insertAsRC(e) {}
  /**
   * 取当前节点的直接后继
   */
  succ() {}
  /**
   * 子树层次遍历
   * @param {*} vst
   */
  travLevel(vst) {}
  /**
   * 子树先序遍历
   * @param {*} vst
   */
  travPre(vst) {}
  /**
   * 子树中序遍历
   * @param {*} vst
   */
  travIn(vst) {}
  /**
   * 子树后序遍历
   * @param {*} vst
   */
  travPost(vst) {}
  /**
   * 是否是根节点
   * @param {*} x
   */
}
