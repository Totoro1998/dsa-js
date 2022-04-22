import b_tree from '../src/tree/b_tree.js';
const tree = new b_tree();
tree.insert(1);
tree.insert(2);
tree.insert(3);
// tree.insert(4);
console.log(tree.search(1));
