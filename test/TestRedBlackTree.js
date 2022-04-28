import red_black_tree from '../src/tree/red_black_tree.js';
const rb_tree = new red_black_tree();
rb_tree.insert(4);
rb_tree.insert(2);
rb_tree.insert(1);
rb_tree.insert(3);
console.log(rb_tree.search(3));
