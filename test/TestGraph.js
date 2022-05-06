import { graph_matrix } from '../src/graph/graph_matrix.js';
import { get_random_number } from '../src/utils/number.js';
const random_graph = (g, n, e) => {
  while (g.n < n || g.e < e) {
    if (g.n < n) {
      if (get_random_number(0, 99) < 65) {
        const vertex = String.fromCharCode(65 + get_random_number(0, 25));
        g.insert_vertex(vertex);
      } else {
        if (1 > g.n) {
          continue;
        }
        const i = get_random_number(0, g.n - 1);
        g.remove_vertex(i);
      }
    }
    if (1 < g.n && g.e < e) {
      if (get_random_number(0, 99) < 65) {
        const i = get_random_number(0, g.n - 1);
        const j = get_random_number(0, g.n - 1);
        const e = get_random_number(0, 3 * n);
        if (!g.exists(i, j)) {
          g.insert_edge(e, e, i, j);
        }
      } else {
        const i = get_random_number(0, g.n - 1);
        const j = get_random_number(0, g.n - 1);
        if (g.exists(i, j)) {
          g.remove_edge(i, j);
        }
      }
    }
  }
  for (let i = 0; i < n; i++) {
    const g_i_item = g.get_v_item(i);
    g_i_item.vertex = String.fromCharCode(65 + i);
  }
};
const g = new graph_matrix();
random_graph(g, 13, 29);
// g.bfs(0);
// g.dfs(0);
// g.bcc(0);
// g.t_sort(0);
g.pfs(0, (a, b, c) => console.log(b, c));
// const traverse_v = (item) => {
//   console.log(item.f_time);
// };
// g.V.traverse(traverse_v);
