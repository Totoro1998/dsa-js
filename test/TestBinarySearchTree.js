import binary_search_tree from '../src/tree/binary_search_tree.js';
const tree = new binary_search_tree();
tree.insert_as_root(11);
tree.insert(12);
tree.insert(14);
const print_node = (value) => console.log(value);
console.log(tree);
tree.trav_in(print_node);
// tree.insert(7);
// tree.insert(15);
// tree.insert(5);
// tree.insert(3);
// tree.insert(9);
// tree.insert(8);
// tree.insert(10);
// tree.insert(13);
// tree.insert(12);
// tree.insert(14);
// tree.insert(20);
// tree.insert(18);
// tree.insert(25);
// tree.insert(6);
// tree.inOrderTraverse(printNode); //中序遍历
// tree.preOrderTraverse(printNode); //后序遍历
// tree.postOrderTraverse(printNode); //后序遍历
// console.log('tree.min----', tree.min())
// console.log('tree.max----', tree.max())
// console.log('tree.search(25)----', tree.search(25))
// tree.inOrderTraverse(printNode);
