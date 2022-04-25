import b_tree from '../src/tree/b_tree.js';
const tree = new b_tree(4);
tree.insert(37);
tree.insert(41);
tree.insert(40);
tree.insert(22);
tree.insert(7);
tree.insert(19);
tree.insert(13);
tree.insert(25);

tree.insert(28);
tree.insert(46);
tree.insert(52);
tree.insert(34);
tree.insert(49);
tree.insert(43);
tree.remove(34);
console.log(tree.search(22).child.get_item(1));
