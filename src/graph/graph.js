import {vertex_status,edge_type} from './const.js'
export default class graph {
  n; //顶点总数
  e; //边总数
  /**
   * 所有顶点、边的辅助信息复位
   */
  reset() {
      for (let i = 0; i < n; i++) {
          status(i) = vertex_status.UNDISCOVERED;
          d_time(i) = -1;
          f_time(i) = -1;
          parent(i) = -1;
          priority(i) = Math.Infinity
          for (let j = 0; j < n; j++){
              if (exists(i, j)) {
                  type(i,j) = edge_type.UNDETERMINED
              }
          }
    }
  }
  /**
   * （连通域）广度优先搜索算法
   */
  bfc() {}
  /**
   * （连通域）深度优先搜索算法
   */
  dfc() {}
  /**
   *（连通域）基于DFS的双连通分量分解算法
   */
  bcc() {}
  /**
   *（连通域）基于DFS的拓扑排序算法
   */
  t_short() {}
  /**
   *（连通域）优先级搜索框架
   */
  pfs() {}
  /**
   * 最小支撑树Prim算法
   */
  prim() {}
  /**
   * 最短路径Dijkstra算法
   */
  dijkstra() {}
  /**
   * 插入顶点，返回编号
   * @param {*} e
   */
  insert(e) {}
  /**
   * 删除顶点及其关联边，返回该顶点信息
   */
  remove(i) {}
  /**
   * 顶点v的数据（该顶点的确存在）
   * @param {*} i
   */
  vertex(i) {}
  /**
   * 顶点v的入度（该顶点的确存在）
   */
  in_degree(i) {}
  /**
   * 顶点v的出度（该顶点的确存在）
   * @param {*} i
   */
  out_degree(i) {}
  /**
   * 顶点v的首个邻接顶点
   * @param {*} i
   */
  first_nbr(i) {}
  /**
   * 顶点v的（相对于顶点j的）下一邻接顶点
   * @param {*} i
   */
  next_nbr(i, j) {}
  /**
   * 顶点v的状态
   * @param {*} i
   */
  status(i) {}
  /**
   *顶点v的时间标签dTime
   * @param {*} i
   */
  d_time(i) {}
  /**
   *顶点v的时间标签fTime
   * @param {*} i
   */
  f_time(i) {}
  /**
   * 顶点v在遍历树中的父亲
   * @param {*} i
   */
  parent(i) {}
  /**
   * 顶点v在遍历树中的优先级数
   * @param {*} i
   */
  priority(i) {}
  /**
   * 边(v, u)是否存在
   * @param {*} v
   * @param {*} u
   */
  exists(v, u) {}
  /**
   * 在顶点v和u之间插入权重为w的边e
   * @param {*} i
   * @param {*} j
   * @param {*} v
   * @param {*} u
   */
  insert(i, j, v, u) {}
  /**
   * 删除顶点v和u之间的边e，返回该边信息
   * @param {*} v
   * @param {*} u
   */
  remove(v, u) {}
  /**
   * 边(v, u)的类型
   * @param {*} i
   */
  type(i, j) {}
  /**
   * 边(v, u)的数据（该边的确存在）
   * @param {*} v
   * @param {*} u
   */
  edge(v, u) {}
  /**
   * 边(v, u)的权重
   * @param {*} v
   * @param {*} u
   */
  weight(v, u) {}
}
