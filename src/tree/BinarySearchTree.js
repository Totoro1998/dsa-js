import { defaultCompareFn, Compare } from '../utils/compare.js'

export class Node{
    constructor(key) {
        this.key = key; //节点值，键（key）是树相关的术语中对节点的称呼
        this.left = null; //左侧子节点引用
        this.right = null; //右侧子节点引用
    }
}
export default class BinarySearchTree{
    constructor(compareFn = defaultCompareFn) {
        this.compareFn = compareFn; //用来比较节点值
        this.root = null; //根节点
    }
    // 插入
    insert(key) {
        if (this.root === null) {
            this.root = new Node(key);
        } else {
            this.insertNode(this.root, key)
        }
    }
    // 插入节点
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left === null) {
                node.left = new Node(key);
            } else {
                this.insertNode(node.left,key)
            }
        } else {
            if (node.right === null) {
                node.right = new Node(key);
            } else {
                this.insertNode(node.right,key)
            }
        }
    }
    // 中序遍历 callback用来定义我们对遍历到的每个节点进行的操作 
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root,callback);
    }
    inOrderTraverseNode(node, callback) {
        if (node !== null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key)
            this.inOrderTraverseNode(node.right,callback);
        }
    }
    // 先序遍历 callback用来定义我们对遍历到的每个节点进行的操作
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root,callback);
    }
    preOrderTraverseNode(node, callback) {
        if (node !== null) {
            callback(node.key)
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right,callback);
        }
    }
    // 后序遍历 callback用来定义我们对遍历到的每个节点进行的操作
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root,callback);
    }
    postOrderTraverseNode(node, callback) {
        if (node !== null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key)
        }
    }
    // 寻找最小值
    min() {
        return this.minNode(this.root)
    }
    // 寻找最大值
    max() {
        return this.maxNode(this.root)
    }
    minNode(node) {
        let current = node
        while (current !== null && current.left !== null) {
            current = current.left
        }
        return current
    }
    maxNode(node) {
        let current = node
        while (current !== null && current.right !== null) {
            current = current.right
        }
        return current
    }
    // 搜索特定的值
    search(key) {
        return this.searchNode(this.root,key)
    }
    searchNode(node, key) {
        if (node === null) {
            return false
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left,key)
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right,key)
        } else {
            return true
        }
    }
    remove(key) { 
        this.root = this.removeNode(this.root,key)
    }
    // 为什么需要返回值，因为需要修改父节点指向子节点的指针
    removeNode(node, key) {
        if (node === null) {
            return null
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key)
            return node
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key)
            return node
        } else {
            // 移除叶节点,需要返回null来将对应的父节点指针赋予null
            if (node.left === null && node.right === null) {
                node = null
                return node
            }
            // 移除有一个左侧或者右侧子节点的节点
            // 直接跳过该node
            if (node.left === null) {
                node = node.right
                return node
            } else if (node.right === null) {
                node = node.left
                return node
            }
            // 右侧子树的最小节点一定比左侧子树的最大节点大
            const aux = this.minNode(node.right) //右边子树的最小节点
            node.key = aux.key
            node.right = this.removeNode(node.right, aux.key)
            return node
        }
    } 
}