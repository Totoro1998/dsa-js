import { vertex_status, edge_type, vertex } from './const.js';
export default class graph {
  n; //顶点总数
  e; //边总数
  clock; //用于节点查找时的时间
  /**
   * 所有顶点、边的辅助信息复位
   */
  reset() {
    this.clock = 0;
    for (let i = 0; i < this.n; i++) {
      const v_item = this.get_v_item(i);
      v_item.status = vertex_status.UNDISCOVERED;
      v_item.d_time = -1;
      v_item.f_time = -1;
      v_item.parent = -1;
      v_item.priority = Number.MAX_SAFE_INTEGER;
      for (let j = 0; j < this.n; j++) {
        if (this.exists(i, j)) {
          const e_item = this.get_e_item(i, j);
          e_item.type = edge_type.UNDETERMINED;
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
  get_v_item(i) {}
  /**
   * 获取i和j的边
   * @param {*} i
   * @param {*} j
   */
  get_e_item(i, j) {}
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
  /**
   * （连通域）广度优先搜索算法（全图）
   *  可用于解决最短路径问题
   */
  bfs(s) {
    this.reset();
    let v = s;
    //逐一检查所有顶点
    while (true) {
      //一旦遇到尚未发现的顶点
      if (vertex_status.UNDISCOVERED === this.status(v)) {
        //即从该顶点出发启动一次BFS
        this.BFS(v);
      }
      //按序号检查，先自增然后取余。
      v = ++v % this.n;
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
    let v = s;
    while (true) {
      if (vertex_status.UNDISCOVERED === this.status(v)) {
        this.DFS(v);
      }
      v = ++v % this.n;
      if (s === v) {
        break;
      }
    }
  }
  /**
   *（连通域）基于DFS的双连通分量分解算法
   * DFS树中的叶节点， 绝不可能是原图中的关节点此类顶点的删除既不致影响DFS树的连通性
   * DFS树的根节点若至少拥有两个分支，则必是一个关节点。反之，若根节点仅有一个分支，则与叶节点同理，它也不可能是关节点
   * 关键的问题是如何甄别一般的内部节点是否为关节点呢
   * 若节点C的移除导致其某一棵（比如以D为根的）真子树与其真祖先（比如A）之间无法连通， 则C必为关节点
   * 当然，在原无向图的DFS树中， C的真子树只可能通过后向边与C的真祖先连通
   * 因此，只要在DFS搜索过程记录并更新各顶点v所能（经由后向边）连通的最高祖先（highest connected ancestor, HCA） hca[v]，即可及时认定关节点，并报告对应的双连通域
   */
  bcc(s) {
    this.reset();
    let v = s;
    const S = []; //用于记录已访问的顶点
    while (true) {
      if (vertex_status.UNDISCOVERED === this.status(v)) {
        this.BCC(v, S);
        S.pop(); //遍历返回后，弹出栈中的最后一个顶点，当前连通域的起点
      }
      v = ++v % this.n;
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
    let v = s;
    const S = []; //用栈记录排序顶点
    while (true) {
      if (vertex_status.UNDISCOVERED === this.status(v)) {
        if (!this.TSort(v, S)) {
          //任一连通域（亦即整图）非DAG
          while (S.length !== 0) {
            S.pop();
            break;
          }
        }
      }
      v = ++v % this.n;
      if (s === v) {
        break;
      }
    }
    return S;
  }
  /**
   * 约定优先级数越大（小）顶点的优先级越低（高）。
   * 相应地，在算法的初始化阶段（如reset()）通常都将顶点的优先级数统一置为最大，优先级最低。
   *（连通域）优先级搜索框架(全图)
   */
  pfs(s, priority_updater) {
    this.reset();
    let v = s;
    while (true) {
      if (vertex_status.UNDISCOVERED === this.status(v)) {
        this.PFS(v, priority_updater);
      }
      v = ++v % this.n;
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
    const s_v_item = this.get_v_item(s);
    s_v_item.priority = 0;
    // 共需引入n个顶点和n-1条边
    for (let i = 0; i < this.n; i++) {
      s_v_item.status = vertex_status.VISITED;
      if (-1 !== this.parent(s)) {
        const s_parent_e_item = this.get_e_item(this.parent(s), s);
        s_parent_e_item.type = edge_type.TREE; //引入当前的s
      }
      for (let j = this.first_nbr(s); -1 < j; j = this.next_nbr(s, j)) {
        //对邻接节点j做松弛
        if (this.status(j) === vertex_status.UNDISCOVERED && this.priority(j) > this.weight(s, j)) {
          const j_v_item = this.get_v_item(j);
          j_v_item.priority = this.weight(s, j);
          j_v_item.paren = s;
        }
      }
      for (let shortest = Number.MAX_SAFE_INTEGER, j = 0; j < this.n; j++) {
        if (this.status(j) === vertex_status.UNDISCOVERED && shortest > this.priority(j)) {
          shortest = this.priority(j);
          s = j;
        }
      }
    }
  }
  /**
   * 最短路径Dijkstra算法,适用于一般的有向图
   */
  dijkstra() {
    this.reset();
    const s_v_item = this.get_v_item(s);
    s_v_item.priority = 0;
    for (let i = 0; i < this.n; i++) {
      s_v_item.status = vertex_status.VISITED;
      if (-1 !== this.parent(s)) {
        const s_parent_e_item = this.get_e_item(this.parent(s), s);
        s_parent_e_item.type = edge_type.TREE;
      }
      for (let j = this.first_nbr(s); -1 < j; j = this.next_nbr(s, j)) {
        if (this.status(j) === vertex_status.UNDISCOVERED && this.priority(j) > this.priority(s) + this.weight(s, j)) {
          const j_v_item = this.find_v_item(j);
          j_v_item.priority = this.priority(s) + this.weight(s, j);
          j_v_item.parent = s;
        }
      }
      for (let shortest = Number.MAX_SAFE_INTEGER, j = 0; j < this.n; j++) {
        if (this.status(j) === vertex_status.UNDISCOVERED && shortest > this.priority(j)) {
          shortest = this.priority(j);
          s = j;
        }
      }
    }
  }
  /**
   * 广度优先搜索BFS算法（单个连通域），仿照树的层次遍历
   * 遍历结束后，所有访问过的顶点通过parent指针依次联接，从整体上给出了原图某一连通或可达域的一棵遍历树，称作广度优先搜索树
   * @param {*} v
   * @param {*}
   */
  BFS(v) {
    const Q = []; //引入辅助队列
    const v_item = this.get_v_item(v);
    v_item.status = vertex_status.DISCOVERED; // 节点被发现
    Q.push(v);
    while (Q.length !== 0) {
      let v = Q.shift(); // 取出队首顶点v
      const v_item = this.get_v_item(v);
      v_item.d_time = ++this.clock;
      //枚举v的所有邻居u
      for (let u = this.first_nbr(v); -1 < u; u = this.next_nbr(v, u)) {
        // 若u尚未被发现
        const v_u_e_item = this.get_e_item(v, u);
        if (vertex_status.UNDISCOVERED === this.status(u)) {
          const u_v_item = this.get_v_item(u);
          u_v_item.status = vertex_status.DISCOVERED; //则u被发现
          Q.push(u);
          v_u_e_item.type = edge_type.TREE; // 每次发现这样的一个顶点u，都意味着遍历树可从v到u扩展一条边
          u_v_item.parent = v; // 引入树边扩展支撑树。按照遍历树中的承袭关系，将v记作为u的父节点。
        } else {
          // 若顶点u已处于DISCOVERED状态（无向图），或者甚至处于VISITED状态（有向图） ，则意味着边(v, u)不属于遍历树，于是将该边归类为跨边（cross edge）
          v_u_e_item.type = edge_type.CROSS;
        }
      }
      // 至此，当前节点访问完毕
      v_item.status = vertex_status.VISITED;
    }
  }
  /**
   * 深度优先搜索DFS算法（单个连通域）
   * @param {*} v
   */
  DFS(v) {
    const v_item = this.get_v_item(v);
    v_item.d_time = ++this.clock;
    v_item.status = vertex_status.DISCOVERED;
    // 枚举v的所有邻居
    for (let u = this.first_nbr(v); -1 < u; u = this.next_nbr(v, u)) {
      const v_u_e_item = this.get_e_item(v, u);
      const u_item = this.get_v_item(u);
      switch (this.status(u)) {
        //u尚未发现，意味着支撑树可以在此扩展
        case vertex_status.UNDISCOVERED:
          v_u_e_item.type = edge_type.TREE;
          u_item.parent = v;
          this.DFS(u);
          break;
        //u已被发现但尚未访问完毕，应属被后代指向的祖先。
        //若顶点u处于DISCOVERED状态，则意味着在此处发现一个有向环路。此时在DFS遍历树中u必为v的祖先，故应将边(v, u)归类为回向边
        case vertex_status.DISCOVERED:
          v_u_e_item.type = edge_type.BACKWARD;
          break;
        //u已访问完毕(VISITED，有向图)，则视承袭关系分为前向边或跨边
        default:
          // 用于判定DFS树中v是否u的祖先
          const v_item = this.get_v_item(v);
          v_u_e_item.type = v_item.d_time < u_item.d_time ? edge_type.FORWARD : edge_type.CROSS;
          break;
      }
    }
    v_item.status = vertex_status.VISITED;
    /**
     * 这里为每个顶点v都记录了被发现的和访问完成的时刻， 对应的时间区间[d_time(v),f_time(v)]均称作v的活跃期（active duration）。
     * 实际上，任意顶点v和u之间是否存在祖先/后代的“血缘” 关系，完全取决于二者的活跃期是否相互包含。
     */
    v_item.f_time = ++this.clock;
  }
  /**
   * 基于DFS的拓扑排序算法(单趟)
   * @param {*} v
   * @param {*} S
   */
  TSort(v, S) {
    const v_item = this.get_v_item(v);
    v_item.d_time = ++this.clock;
    v_item.status = vertex_status.DISCOVERED;
    for (let u = this.first_nbr(v); -1 < u; u = this.next_nbr(v, u)) {
      const u_item = this.get_v_item(u);
      const v_u_e_item = this.get_e_item(v, u);
      switch (this.status(u)) {
        case vertex_status.UNDISCOVERED:
          u_item.parent = v;
          v_u_e_item.type = edge_type.TREE;
          //若u及其后代都不能进行拓扑排序（则全图亦必如此）
          if (!this.TSort(u, S)) {
            return false;
          }
          break;
        case vertex_status.DISCOVERED:
          //一旦収现后向边（非DAG），则不必深入，故返回并报告
          v_u_e_item.type = edge_type.BACKWARD;
          return false;
        default:
          const v_item = this.get_v_item(v);
          v_u_e_item.type = v_item.d_time < u_item.d_time ? edge_type.FORWARD : edge_type.CROSS;
          break;
      }
    }
    v_item.status = vertex_status.VISITED;
    S.push(new vertex(v));
    return true;
  }
  /**
   * 双连通域分解（单个）
   * @param {*} v
   * @param {*} S
   */
  BCC(v, S) {
    const v_item = this.get_v_item(v);
    v_item.d_time = ++this.clock;
    v_item.f_time = v_item.d_time;
    v_item.status = vertex_status.DISCOVERED;
    S.push(v);
    for (let u = this.first_nbr(v); -1 < u; u = this.next_nbr(v, u)) {
      const u_v_item = this.get_v_item(u);
      const v_u_e_item = this.get_e_item(v, u);
      switch (this.status(u)) {
        case vertex_status.UNDISCOVERED:
          u_v_item.parent = v;
          v_u_e_item.type = edge_type.TREE;
          this.BCC(u, S); //从顶点u处深入
          if (this.f_time(u) < this.d_time(v)) {
            //遍历返回后，若发现u（通过后向边）可指向v的真祖先
            v_item.f_time = Math.min(this.f_time(v), this.f_time(u)); //则v亦必如此
          } else {
            //否则，以v为关节点（u以下即是一个BCC，且其中顶点此时正集中于栈S的顶部）
            while (v !== S.pop()); //依次弹出弼前BCC中癿节点，亦可根据实际需求转存至其它结极
            S.push(v); //最后一个顶点（兲节点）重新入栈——分摊丌足一次
          }
          break;
        case vertex_status.DISCOVERED:
          v_u_e_item.type = edge_type.BACKWARD;
          if (u !== this.parent(v)) {
            v_item.f_time = Math.min(this.f_time(v), this.d_time(u));
          }
          break;
        default:
          v_u_e_item.type = this.d_time(v) < this.d_time(u) ? edge_type.FORWARD : edge_type.CROSS;
          break;
      }
    }
    v_item.status = vertex_status.VISITED;
  }
  /**
   * 优先级搜索，单个连通域
   * @param {*} s
   * @param {*} prioUpdater
   */
  PFS(s, priority_updater) {
    const s_v_item = this.get_v_item(s);
    s_v_item.priority = 0;
    s_v_item.status = vertex_status.VISITED;
    s_v_item.parent = -1; //初始化，起点s加至PFS树中
    while (true) {
      for (let w = this.first_nbr(s); -1 < w; w = this.next_nbr(s, w)) {
        priority_updater(this, s, w); //更新顶点w的优先级及其父顶点
      }
      for (let shortest = Number.MAX_SAFE_INTEGER, w = 0; w < this.n; w++) {
        //从尚未加入遍历树的顶点中,选出下一个
        if (vertex_status.UNDISCOVERED === this.status(w)) {
          if (shortest > this.priority(w)) {
            shortest = this.priority(w);
            s = w;
          } //优先级最高的顶点s
        }
      }
      //直至所有顶点均已加入
      if (vertex_status.VISITED === this.status(s)) {
        break;
      }
      const s_parent_e_item = this.get_e_item(this.parent(s), s);
      s_v_item.status = vertex_status.VISITED;
      s_parent_e_item.type = edge_type.TREE; //将s及与其父的联边加入遍历树
    }
  }
  /**
   * 针对Prim算法的顶点优先级更新器
   * @param {*} g
   * @param {*} uk
   * @param {*} v
   */
  prim_priority_updater(g, uk, v) {
    if (vertex_status.UNDISCOVERED === g.status(v)) {
      // 按Prim策略左松弛
      if (g.priority(v) > b.weight(uk, v)) {
        const g_v_item = g.get_v_item(v);
        g_v_item.priority = g.weight(uk, v);
        g_v_item.parent = uk;
      }
    }
  }
  /**
   * 针对Dijkstra算法的顶点优先级更新器
   * @param {*} g
   * @param {*} uk
   * @param {*} v
   */
  dijkstra_priority_updater(g, uk, v) {
    if (vertex_status.UNDISCOVERED === g.status(v)) {
      if (g.priority(v) > g.priority(uk) + g.weight(uk, v)) {
        const g_v_item = g.get_v_item(v);
        g_v_item.priority = g.priority(uk) + g.weight(uk, v);
        g_v_item.parent = uk;
      }
    }
  }
  /**
   * 针对BFS算法的顶点优先级更新器
   * @param {*} g
   * @param {*} uk
   * @param {*} v
   */
  bfs_priority_updater(g, uk, v) {
    if (g.status(v) === vertex_status.UNDISCOVERED) {
      if (g.priority(v) > g.priority(uk) + 1) {
        const g_v_item = g.get_v_item(v);
        g_v_item.priority = g.priority(uk) + 1;
        g_v_item.parent = uk;
      }
    }
  }
  /**
   * 针对DFS算法的顶点优先级更新器
   * @param {*} g
   * @param {*} uk
   * @param {*} v
   */
  dfs_priority_updater(g, uk, v) {
    if (g.status(v) === vertex_status.UNDISCOVERED) {
      if (g.priority(v) > g.priority(uk) - 1) {
        const v_g_item = g.get_v_item(v);
        v_g_item.priority = g.priority(uk) - 1;
        v_g_item.parent = uk;
        return;
      }
    }
  }
}
