/**
 * 顶点状态
 */
export const vertex_status = {
  UNDISCOVERED: 0, //未发现
  DISCOVERED: 1, //已发现
  VISITED: 2, //已访问
};
/**
 * 边在遍历树中所属的类型
 */
export const edge_type = {
  UNDETERMINED: 0,
  TREE: 1,
  CROSS: 2,
  FORWARD: 3,
  BACKWARD: 4,
};
export class vertex {
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
export class edge {
  data; //数据
  weight; //权重
  type; //类型
  constructor(data, weight) {
    this.data = data;
    this.weight = weight;
    this.type = edge_type.UNDETERMINED;
  }
}
