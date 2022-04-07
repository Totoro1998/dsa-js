import bin_tree from '../src/tree/bin_tree.js';

const tree = new bin_tree();
tree.insert_as_root(1);
tree.insert_as_lc(5);
tree.insert_as_rc(6);
console.log(tree);
