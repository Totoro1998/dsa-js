import {vertex_status,edge_type} from './const.js'
export default class graph {
  n; //顶点总数
  e; //边总数
  /**
   * 所有顶点、边的辅助信息复位
   */
  reset() {
    for (let i = 0; i < this.n; i++) {
          const v_item = this.get_v_item(i);
          v_item.status = vertex_status.UNDISCOVERED;
          v_item.d_time = -1;  
          v_item.f_time = -1;
          v_item.parent = -1;
          v_item.priority = Math.Infinity;
          for (let j = 0; j < this.n; j++){
              if (this.exists(i, j)) {
                const e_item = this.get_e_item(i, j);
                e_item.type = edge_type.UNDETERMINED
              }
          }
    }
  }
  /**
   * （连通域）广度优先搜索算法（全图）
   */
  bfs(s) {
    this.reset();
    let clock = 0;
    let v = s;
    //逐一检查所有顶点
    while (true) {
      //一旦遇到尚未发现的顶点
      if (vertex_status.UNDISCOVERED === this.status(v)) {
        //即从该顶点出发启动一次BFS
        this.BFS(v,clock);
      }
      //按序号检查，先自增然后取余。
      v = (++v % this.n);
      if (s === v) {
        break;
      }
    }
  }
  /**
   * （连通域）深度优先搜索算法（全图）
   */
  dfs(s) {
    this.reset();
    let clock = 0;
    let v = s;
    while (true) {
      if (vertex_status.UNDISCOVERED === this.status(v)) {
        this.DFS(v, clock);
      }
      v = (++v % this.n);
      if (s === v) {
        break;
      }
    }
  }
  /**
   *（连通域）基于DFS的双连通分量分解算法
   */
  bcc(s) {
    this.reset();
    let clock = 0;
    let v = s;
    const S = [];
    while (true) {
      if (vertex_status.UNDISCOVERED === this.status(v)) {
        this.BCC(v, clock, S);
        S.pop();
      }
      v = (++v % n);
      if (s === v) {
        break;
      }
    }
  }
  /**
   *（连通域）基于DFS的拓扑排序算法
   */
  t_sort(s) {
    this.reset();
    let clock = 0;
    let v = s;
    const S = [];//用栈记录排序顶点
    while (true) {
      if (vertex_status.UNDISCOVERED === this.status(v)) {
        if (!this.TSort(v, clock, S)) {
          //任一连通域（亦即整图）非DAG
          while (S.length !== 0) {
            S.pop();
          }
          break;
        }
      }
      v = (++v % n);
      if (s === v) {
        break;
      }
    }
    return S
  }
  /**
   *（连通域）优先级搜索框架(全图)
   */
  pfs(s,prioUpdater) {
    this.reset();
    let clock = 0;
    let v = s;
    while (true) {
      if (vertex_status.UNDISCOVERED === this.status(v)) {
        this.PFS(v,prioUpdater)
      }
      v = (++v % n);
      if (s === v) {
        break;
      }
    }
  }
  /**
   * 最小支撑树Prim算法
   */
  prim(s) {
    this.reset();
    this.priority(s) = 0;
    // 共需引入n个顶点和n-1条边
    for (let i = 0; i < this.n; i++){
      this.status(s) = vertex_status.VISITED;
      if (-1 !== this.parent(s)) {
        this.type(this.parent(s), s) = edge_type.TREE;//引入当前的s
      }
      for (let j = this.first_nbr(s); -1 < j; j = this.next_nbr(s, j)){
        //对邻接节点j做松弛
        if (this.status(j) === vertex_status.UNDISCOVERED && this.priority(j) > this.weight(s, j)) {
          this.priority(j) = this.weight(s, j);
          this.parent(j) = s;
        }
      }
      for (let shortest = Math.Infinity, j = 0; j < this.n; j++){
        if (this.status(j) === vertex_status.UNDISCOVERED && shortest > this.priority(j)) {
          shortest = this.priority(j);
          s = j
        }
      }
    }
  }
  /**
   * 最短路径Dijkstra算法,适用于一般的有向图
   */
  dijkstra() {
    this.reset();
    this.priority(s) = 0;
    for (let i = 0; i < this.n; i++){
      this.status(s) = vertex_status.VISITED;
      if (-1 !== this.parent(s)) {
        this.type(this.parent(s), s) = edge_type.TREE;
      }
      for (let j = this.first_nbr(s); -1 < j; j = this.next_nbr(s, j)){
        if (this.status(j) === vertex_status.UNDISCOVERED && this.priority(j) > this.priority(s) + this.weight(s, j)) {
          this.priority(j) = this.priority(s) + this.weight(s, j);
          this.parent(j) = s
        }
      }
      for (let shortest = Math.Infinity, j = 0; j < this.n; j++){
        if (this.status(j) === vertex_status.UNDISCOVERED && shortest > this.priority(j)) {
          shortest = this.priority(j);
          s = j;
        }
      }
    }
  }
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
  get_v_item(i) {
    
  }
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
  remove(v, u) { }
  /**
   * 获取i和j的边
   * @param {*} i 
   * @param {*} j 
   */
  get_e_item(i,j){}
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
  /**
   * 广度优先搜索BFS算法（单个连通域），仿照树的层次遍历
   * 遍历结束后，所有访问过的顶点通过parent指针依次联接，从整体上给出了原图某一连通或可达域的一棵遍历树，称作广度优先搜索树
   * @param {*} v 
   * @param {*} clock 
   */
  BFS(v, clock) {
    const Q = [];//引入辅助队列
    const v_item = this.get_v_item(v)
    v_item.status = vertex_status.DISCOVERED;// 节点被发现
    Q.push(v);
    while (Q.length !== 0) {
      let v = Q.unshift(); // 取出队首顶点v
      const v_item = this.get_v_item(v)
      v_item.d_time = ++clock;
      //枚举v的所有邻居u
      for (let u = this.first_nbr(v); -1 < u; u = this.next_nbr(v, u)){
        // 若u尚未被发现
        if (vertex_status.UNDISCOVERED === this.status(u)) {
          const u_v_item = this.get_v_item(u)
          u_v_item.status = vertex_status.DISCOVERED;//则u被发现
          Q.push(u);
          const v_u_e_item = this.get_e_item(v,u)
          v_u_e_item.type = edge_type.TREE; // 每次发现这样的一个顶点u，都意味着遍历树可从v到u扩展一条边
          u_v_item.parent = v; // 引入树边扩展支撑树。按照遍历树中的承袭关系，将v记作为u的父节点。
        } else {
          // 若顶点u已处于DISCOVERED状态（无向图），或者甚至处于VISITED状态（有向图） ，则意味着边(v, u)不属于遍历树，于是将该边归类为跨边（cross edge）
          const v_u_e_item = this.get_e_item(v,u)
          v_u_e_item.type = edge_type.CROSS
        }
      }
      // 至此，当前节点访问完毕
      v_item.status = vertex_status.VISITED
    }
  }
  /**
   * 深度优先搜索DFS算法（单个连通域）
   * @param {*} v 
   * @param {*} clock 
   */
  DFS(v, clock) {
    const v_item = this.get_v_item(v)
    v_item.d_time = ++clock;
    v_item.status = vertex_status.DISCOVERED;
    // 枚举v的所有邻居
    for (let u = this.first_nbr(v); -1 < u; u = this.next_nbr(v, u)){
      const v_u_e_item = this.get_e_item(v, u)
      const u_item = this.get_v_item(u)
      const v_item = this.get_v_item(v)
      switch (this.status(u)) {
        //u尚未发现，意味着支撑树可以在此扩展
        case vertex_status.UNDISCOVERED:
          v_u_e_item.type = edge_type.TREE
          u_item.parent = v;
          this.DFS(u, clock);
          break;
        //若顶点u处于DISCOVERED状态，则意味着在此处发现一个有向环路。此时在DFS遍历树中u必为v的祖先，故应将边(v,u)归类为后向边
        case vertex_status.DISCOVERED:
          v_u_e_item.type = edge_type.BACKWARD;
          break;
        //u已访问完毕(VISITED，有向图)，则视承袭关系分为前向边或跨边
        default:
          // 用于判定DFS树中v是否u的祖先
          v_u_e_item.type= v_item.d_time < u_item.d_time ? edge_type.FORWARD : edge_type.CROSS;
          break;
      }
    }
    v_item.status = vertex_status.VISITED;
    /**
     * 这里为每个顶点v都记录了被发现的和访问完成的时刻， 对应的时间区间[d_time(v),f_time(v)]均称作v的活跃期（active duration）。
     * 实际上，任意顶点v和u之间是否存在祖先/后代的“血缘” 关系，完全取决于二者的活跃期是否相互包含。
     */
    v_item.f_time = ++clock;
  }
  /**
   * 基于DFS的拓扑排序算法(单趟)
   * @param {*} v 
   * @param {*} clock 
   * @param {*} S 
   */
  TSort(v, clock, S) {
    const v_item = this.get_v_item(v)
    v_item.d_time = ++clock;
    v_item.status = vertex_status.DISCOVERED;
    for (let u = this.first_nbr(v); -1 < u; u = this.next_nbr(v, u)){
      const u_item = this.get_v_item(u);
      const v_u_e_item = this.get_e_item(v, u)
      const v_item = this.get_v_item(v)
      switch (this.status(u)) {
        case vertex_status.UNDISCOVERED:
          u_item.parent = v;
          v_u_e_item.type = edge_type.TREE;
          //若u及其后代都不能进行拓扑排序（则全图亦必如此）
          if (!TSort(u, clock, S)) {
            return false;
          }
          break;
        case vertex_status.DISCOVERED:
          //一旦収现后向边（非DAG），则不必深入，故返回并报告
          v_u_e_item.type = edge_type.BACKWARD;
          return false;
        default:
          v_u_e_item.type = v_item.d_time < u_item.d_time ? edge_type.FORWARD : edge_type.CROSS;
          break;
      }
    }
    v_item.status = vertex_status.VISITED;
    S.push(new vertex(v));
    return true;
  }
  /**
   * 拓扑排序（单个）
   * @param {*} v 
   * @param {*} clock 
   * @param {*} S 
   */
  BCC(v,clock,S) {
    this.d_time(v) = this.f_time(v) = ++clock;
    this.status(v) = vertex_status.DISCOVERED;
    S.push(v);
    for (let u = this.first_nbr(v); -1 < u; u = this.next_nbr(v, u)){
      switch (this.status(u)) {
        case vertex_status.UNDISCOVERED:
          this.parent(u) = v;
          this.type(v, u) = edge_type.TREE;
          BCC(u, clock, S);//从顶点u处深入 
          if (this.f_time(u) < this.d_time(v)) { //遍历返回后，若发现u（通过后向边）可指向v的真祖先
            this.f_time(v) = Math.min(this.f_time(v),this.f_time(u)) //则v亦必如此
          } else {//否则，以v为关节点（u以下即是一个BCC，且其中顶点此时正集中于栈S的顶部）
            const temp = []
            while (true) {
              temp.push(S.pop());
              if (u === temp[temp.length - 1]) {
                break;
              }
            }
            while (temp.length !== 0) {
              S.push(temp.pop());
            }
            while (u !== S.pop()) {
              
            }
          }
      }
    }
    this.status(v) = vertex_status.VISITED
  }
  /**
   * 优先级搜索，单个连通域
   * @param {*} s 
   * @param {*} prioUpdater 
   */
  PFS(s, prioUpdater) {
    this.priority(s) = 0;
    this.status(s) = vertex_status.VISITED;
    this.parent(s) = -1; //初始化，起点s加至PFS树中
    while (true) {
      for (let w = this.first_nbr(s); -1 < w; w = this.next_nbr(s, w)){
        prioUpdater(this,s,w) //更新顶点w的优先级及其父顶点
      }
      for (let shortest = Math.Infinity, w = 0; w < this.n; w++){
        //从尚未加入遍历树的顶点中,选出下一个
        if (vertex_status.UNDISCOVERED === this.status(w)) {
          if (shortest > this.priority(w)) {
            shortest = this.priority(w);
            s = w;
          }//优先级最高的顶点s
        }
      }
      if (vertex_status.VISITED === this.status(s)) {
        break;
      }
      this.status(s) = vertex_status.VISITED;
      this.type(this.parent(s), s) = edge_type.TREE;//将s及与其父的联边加入遍历树
    }
  }
  /**
   * 针对Prim算法的顶点优先级更新器
   * @param {*} g 
   * @param {*} uk 
   * @param {*} v 
   */
  static prim_prio_updater(g,uk,v) {
    if (vertex_status.UNDISCOVERED === g.status(v)) {
      // 按Prim策略左松弛
      if (g.priority(v) > b.weight(uk, v)) {
        g.priority = g.weight(uk, v);
        g.parent(v) = uk; //
      }
    }
  }
  /**
   * 针对Dijkstra算法的顶点优先级更新器
   * @param {*} g 
   * @param {*} uk 
   * @param {*} v 
   */
  static dijkstra_prio_updater(g, uk, v) {
    if (vertex_status.UNDISCOVERED === g.status(v)) {
      if (g.priority(v) > g.priority(uk) + g.weight(uk, v)) {
        g.priority(v) = g.priority(uk) + g.weight(uk, v);
        g.parent(v) = uk;
      }
    }
  }
  /**
   * 针对BFS算法的顶点优先级更新器
   * @param {*} g 
   * @param {*} uk 
   * @param {*} v 
   */
  static bfs_prio_updater(g, uk, v) {
    if (g.status(v) === vertex_status.UNDISCOVERED) {
      if (g.priority(v) > g.priority(uk) + 1) {
        g.priority(v) = g.priority(uk) + 1;
        g.parent(v) = uk;
      }
    }
  }
  /**
   * 针对DFS算法的顶点优先级更新器
   * @param {*} g 
   * @param {*} uk 
   * @param {*} v 
   */
  static dfs_prio_updater(g, uk, v) {
    if (g.status(v) === vertex_status.UNDISCOVERED) {
      if (g.priority(v) > g.priority(uk) - 1) {
        g.priority(v) = g.priority(uk) - 1;
        g.parent(v) = uk;
        return;
      }
    }
  }
}
