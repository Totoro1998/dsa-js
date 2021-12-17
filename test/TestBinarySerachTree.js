import BinarySearchTree from '../src/tree/BinarySearchTree.js';
const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);
const printNode = (value) => console.log(value);
// tree.inOrderTraverse(printNode); //中序遍历
// tree.preOrderTraverse(printNode); //后序遍历
// tree.postOrderTraverse(printNode); //后序遍历
// console.log('tree.min----', tree.min())
// console.log('tree.max----', tree.max())
// console.log('tree.search(25)----', tree.search(25))
tree.remove(11);
tree.postOrderTraverse(printNode);
