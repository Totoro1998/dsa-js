import { bind } from 'lodash-es';
import { has_child, has_left_child } from '../src/tree/bin_node_util.js';
import bin_tree from '../src/tree/bin_tree.js';
import { get_random_number } from '../src/utils/number.js';

const tree = new bin_tree();
let h = 10;
let root_data = get_random_number(0, h * h * h);
tree.insert_as_root(root_data);
const arr = [];
arr.push(root_data);
const insert_data = (tree, x, h) => {
  if (h <= 0) {
    return false;
  }
  if (get_random_number(0, h) > 0) {
    const random_data = get_random_number(0, h * h * h);
    arr.push(random_data);
    insert_data(tree, tree.insert_as_lc(x, random_data), h - 1);
  }
  if (get_random_number(0, h) > 0) {
    const random_data = get_random_number(0, h * h * h);
    arr.push(random_data);
    insert_data(tree, tree.insert_as_rc(x, random_data), h - 1);
  }
};
// insert_data(tree, tree.get_root(), h);
const get_random_node = (root, h) => {
  if (!has_child(root) || h <= 0) {
    return root;
  } else {
    if (!has_left_child(root)) {
      return get_random_node(root.rc, h - 1);
    } else {
      return get_random_node(root.lc, h - 1);
    }
  }
};
// const trav_in = (v) => console.log(v);
// tree.trav_in(trav_in);

// const random_node = get_random_node(tree.get_root(), 6);
// const s = tree.secede(random_node);
// console.log(s.get_root().data);

const sub_tree = new bin_tree();
h = 3;
root_data = get_random_number(0, h * h * h);
sub_tree.insert_as_root(root_data);
console.log(root_data);
insert_data(sub_tree, sub_tree.get_root(), h);
tree.attach_as_lc(tree.get_root(), sub_tree);

console.log(tree.len());
console.log(tree.remove(tree.get_root()));
console.log(tree.get_root());
