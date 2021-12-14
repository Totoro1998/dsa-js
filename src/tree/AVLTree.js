import BinarySearchTree from './BinarySearchTree.js';
// 自平衡树
class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompareFn) {
        super(compareFn)
        this.compareFn = compareFn
        this.root = null
    }
    // 获取节点的高度
    getNodeHeight(node) { 
        if (node === null) {
            return -1
        }
        return Math.max(getNodeHeight(node.left),getNodeHeight(node.right)) + 1
    }
}