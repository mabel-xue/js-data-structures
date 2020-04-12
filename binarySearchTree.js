/** 二叉查找树节点 */ 
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  
}

/** 二叉查找树 */
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  /**
   * 判断目标结点为指定结点current的左子节点还是右子节点
   * @param {number} key 
   * @param {Node} current 
   */
  _insert(key, current) {
    const target = new Node(key);
    if (key < current.key) { // 进入左子树
      if (current.left) {
        this._insert(key, current.left);
      } else {
        current.left = target;
      }
    } else { // 进入右子树
      if (current.right) {
        this._insert(key, current.right);
      } else {
        current.right = target;
      }
    }
  }

  /** 插入 */
  insert(key) {
    const node = new Node(key);
    if (!this.root) {
      this.root = node;
    } else {
      this._insert(key, this.root);
    }
  }

  findNode(key) {
    if (!this.root) {
      return null;
    }
    let current = this.root;
    while (current.key !== key) {
      if (key < current.key) { // 进入左子树
        if (current.left) {
          current = current.left;
        } else {
          return null;
        }
      } else { // 进入右子树
        if (current.right) {
          current = current.right;
        } else {
          return null;
        }
      }
    }
    return current.key === key ? current : null;
  }

  remove(key) {
    if (!this.findNode(key)) {
      return;
    }
    const node = this.findNode(key);
    const parent = this.findParent(key);
    if (!node.left && !node.right) { // node为叶子结点
      if (parent) {
        if (parent.left && parent.left.key === key) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else {
        this.root = null;
      }
    } else if (!node.left || !node.right) { // node只有左子树或右子树
      if (parent) {
        if (parent.left && parent.left.key === key) {
          parent.left = node.left || node.right;
        } else {
          parent.right = node.left || node.right;
        }
      } else {
        this.root = null;
      }
    } else { // node左、右子树都有
      // 用删除结点的直接前驱或直接后继替代删除结点，从树中删去它的直接前驱或直接后继
      let predecessor = this.findPredecessor(node);
      const parentOfPredecessor = this.findParent(predecessor.key);
      if (parent) {
        if (node.key < parent.key) {
          parent.left = predecessor;
        } else {
          parent.right = predecessor;
        }
      } else {
        this.root = predecessor;
      }
      if (parentOfPredecessor.key !== node.key) {
        parentOfPredecessor.right = predecessor.left;
        predecessor.left = node.left;
      }
      predecessor.right = node.right;
    }
  }

  /**
   * 判断目标结点与指定结点current的父子关系
   * @param {number} key 
   * @param {Node} current 
   */
  _findParent(key, current) {
    if (key < current.key) { // 进入左子树
      if (current.left == null) {
        return null;
      } else if (current.left.key === key) {
        return current;
      } else {
        return this._findParent(key, current.left)
      }
    } else { // 进入右子树
      if (current.right == null) {
        return null;
      } else if (current.right.key === key) {
        return current;
      } else {
        return this._findParent(key, current.right)
      }
    }
  }

  /** 查找直接前驱 */
  findPredecessor(node) {
    if (!node.left) {
      return null
    }
    return this.findMax(node.left);
  }

  /** 查找直接后继 */
  findSuccessor(node) {
    if (!node.right) {
      return null
    }
    return this.findMin(node.right);
  }

  findMax(node) {
    if (!node.right) {
      return node;
    } else {
      return this.findMax(node.right);
    }
  }

  findMin(node) {
    if (!node.left) {
      return node;
    } else {
      return this.findMin(node.left);
    }
  }

  /** 查找父结点 */
  findParent(key) {
    if (!this.findNode(key) || (this.root && key === this.root.key)) {
      return null;
    }
    return this._findParent(key, this.root);
  }

  /** 前序遍历：根结点 -> 左子树 -> 右子树 */
  * preorder(node) {
    if (node) {
      yield node.key;
      yield* this.preorder(node.left);
      yield* this.preorder(node.right);
    }
  }

  /** 中序遍历：左子树 -> 根结点 -> 右子树 */
  * inorder(node) {
    if (node) {
      yield* this.inorder(node.left);
      yield node.key;
      yield* this.inorder(node.right);
    }
  }

  /** 后序遍历：左子树 -> 右子树 -> 根结点 */
  * postorder(node) {
    if (node) {
      yield* this.postorder(node.left);
      yield* this.postorder(node.right);
      yield node.key;
    }
  }
}

// 示例
const tree = new BinarySearchTree();
tree.insert(30);
tree.insert(20);
tree.insert(25);
tree.insert(22);
tree.insert(50);
tree.insert(60);
tree.insert(35);
tree.insert(34);
tree.insert(36);
tree.insert(70);

// 查找
console.log(tree.findNode(30));
console.log(tree.findNode(18)); // null

console.log(tree.findParent(35).key); // 50

// 删除
tree.remove(30);
console.log(tree.root.key); // 25

const treeSm = new BinarySearchTree();
treeSm.root = tree.findNode(35);
// 遍历
const preorder = treeSm.preorder(treeSm.root);
console.log(preorder.next()); // 35
console.log(preorder.next()); // 34
console.log(preorder.next()); // 36
const inorder = treeSm.inorder(treeSm.root);
console.log(inorder.next()); // 34
console.log(inorder.next()); // 35
console.log(inorder.next()); // 36
const postorder = treeSm.postorder(treeSm.root);
console.log(postorder.next()); // 34
console.log(postorder.next()); // 36
console.log(postorder.next()); // 35




