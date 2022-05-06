import vector from '../vector/vector.js';
import graph from './graph.js';
import { vertex_status, edge_type } from './const.js';
// 顶点对象
class vertex {
  data; //数据
  in_degree; //入度
  out_degree; //出度
  status; //状态
  d_time; //时间标签，顶点被发现的时刻
  f_time; //时间标签，顶点被访问完毕的时刻
  parent; //在遍历树中的父节点
  priority; //优先级数
  constructor(data) {
    this.data = data;
    this.in_degree = 0;
    this.out_degree = 0;
    this.status = vertex_status.UNDISCOVERED;
    this.d_time = -1;
    this.f_time = -1;
    this.parent = -1;
    this.priority = Number.MAX_SAFE_INTEGER;
  }
}
//边对象
class edge {
  data; //数据
  weight; //权重
  type; //类型
  constructor(data, weight) {
    this.data = data;
    this.weight = weight;
    this.type = edge_type.UNDETERMINED;
  }
}
/**
 * 基于向量，以邻接矩阵形式实现的图结
 */
export class graph_matrix extends graph {
  V = new vector(); //顶点集（向量）
  E = new vector(); //边集（邻接矩阵即二维数组）
  constructor() {
    super();
    this.n = 0;
    this.e = 0;
  }
  /**
   * 获取V第i个元素
   * @param {*} i
   */
  get_v_item(i) {
    return this.V.get_item(i);
  }
  /**
   * 查询第i个顶点的数据
   * @param {*} i
   */
  vertex(i) {
    return this.V.get_item(i).data;
  }
  /**
   * 查询第i个顶点的入度
   * @param {*} i
   */
  in_degree(i) {
    return this.V.get_item(i).in_degree;
  }
  /**
   * 查询第i个顶点的出度
   * @param {*} i
   */
  out_degree(i) {
    return this.V.get_item(i).out_degree;
  }
  /**
   * 首个邻接顶点
   * @param {*} i
   */
  first_nbr(i) {
    return this.next_nbr(i, this.n);
  }
  /**
   * 相对于顶点j的下一邻接顶点（改用邻接表可提高效率）
   * @param {*} i
   * @param {*} j
   */
  next_nbr(i, j) {
    while (-1 < j && !this.exists(i, --j)) {
      return j;
    }
  }
  /**
   * 状态
   * @param {*} i
   */
  status(i) {
    return this.V.get_item(i).status;
  }
  /**
   *时间标签d_time
   * @param {*} i
   */
  d_time(i) {
    return this.V.get_item(i).d_time;
  }
  /**
   * 时间变迁f_time
   * @param {*} i
   */
  f_time(i) {
    return this.V.get_item(i).f_time;
  }
  /**
   * 在遍历树中的父亲
   * @param {*} i
   */
  parent(i) {
    return this.V.get_item(i).parent;
  }
  /**
   * 在遍历树中优先级数
   * @param {*} i
   */
  priority(i) {
    return this.V.get_item(i).priority;
  }
  /**
   * 顶点的动态操作
   * 插入顶点，返回编号
   * @param {*} v
   */
  insert_vertex(v) {
    for (let j = 0; j < this.n; j++) {
      this.E.get_item(j).insert(null); //各顶点预留一条潜在的关联边
    }
    this.n++;
    const vec = new vector();
    vec.create_vector_by_graph(this.n, null);
    this.E.insert(vec); //创建新顶点对应的边变量
    return this.V.insert(new vertex(v));
  }
  /**
   * 删除第i个顶点及其连边
   * @param {*} i
   */
  remove_vertex(i) {
    for (let j = 0; j < this.n; j++) {
      if (this.exists(i, j)) {
        const j_elem = this.E.get_item(i).get_elem();
        j_elem[j] = null;
        this.V.get_item(j).in_degree--;
        this.e--;
      }
    }
    this.E.remove_by_index(i); //删除第i行
    this.n--;
    let v_bak_data = this.vertex(i);
    this.V.remove_by_index(i); //删除顶点i
    for (let j = 0; j < this.n; j++) {
      let e = this.E.get_item(j).remove_by_index(i); //删除列
      if (e) {
        e = null;
        this.V.get_item(j).out_degree--;
        this.e--;
      }
    }
    return v_bak_data;
  }
  /**
   * 边的确认操作
   * @param {*} i
   * @param {*} j
   */
  exists(i, j) {
    return 0 <= i && i < this.n && 0 <= j && j < this.n && this.E.get_item(i).get_item(j);
  }
  /**
   * 获取i和j的边
   * @param {*} i
   * @param {*} j
   */
  get_e_item(i, j) {
    return this.E.get_item(i).get_item(j);
  }
  /**
   * 边(i,j)的类型
   * @param {*} i
   * @param {*} j
   */
  type(i, j) {
    return this.E.get_item(i).get_item(j).type;
  }
  /**
   * 边(i,j)的数据
   * @param {*} i
   * @param {*} j
   */
  edge(i, j) {
    return this.E.get_item(i).get_item(j).data;
  }
  /**
   * 边(i,j)的权重
   * @param {*} i
   * @param {*} j
   */
  weight(i, j) {
    return this.E.get_item(i).get_item(j).weight;
  }
  /**
   * 边的动态操作，插入权重为w的边e=(i,j)
   * @param {*} e
   * @param {*} w
   * @param {*} i
   * @param {*} j
   */
  insert_edge(e, w, i, j) {
    if (this.exists(i, j)) {
      return;
    }
    const elem = this.E.get_item(i).get_elem();
    elem[j] = new edge(e, w);
    this.e++;
    this.V.get_item(i).out_degree++;
    this.V.get_item(j).in_degree++;
  }
  /**
   * 删除顶点(i,j)的连边
   * @param {*} i
   * @param {*} j
   */
  remove_edge(i, j) {
    let e_bak_data = this.edge(i, j);
    const elem = this.E.get_item(i).get_elem();
    elem[j] = null;
    this.e--;
    this.V.get_item(i).out_degree--;
    this.V.get_item(j).in_degree--;
    return e_bak_data;
  }
}
