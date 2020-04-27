class Node {
  constructor(key) {
    this.key = key;
    this.balanceFactor = 0;
    this.left = null;
    this.right = null;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  /** 查找 */
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

  insert(key) {
    const node = new Node(key);
    if (!this.root) {
      this.root = node;
    } else {
      let current = this.root;
      while (current) {
        if (key < current.key) { // 进入左子树
          current.balanceFactor++;
          if (current.left) {
            current = current.left;
          } else {
            current.left = node;
            if (!current.right &&
              current.balanceFactor === 1 &&
              this.findParent(current.key)) {
                const unBanlanceParent = this.getParents(key).find(node => Math.abs(node.balanceFactor) === 2);
                this._balance(unBanlanceParent);
            }
            break;
          }
        } else { // 进入右子树
          current.balanceFactor--;
          if (current.right) {
            current = current.right;
          } else {
            current.right = node;
            if (!current.left &&
              current.balanceFactor === -1 &&
              this.findParent(current.key)) {
                const unBanlanceParent = this.getParents(key).find(node => Math.abs(node.balanceFactor) === 2);
                this._balance(unBanlanceParent);
            }
            break;
          }
        }
      }
    }
  }

  /** 查找父结点 */
  findParent(key) {
    if (!this.findNode(key) || (this.root && key === this.root.key)) {
      return null;
    }
    return this._findParent(key, this.root);
  }

  getParents(key) {
    const parents = [];
    let current = key;
    while(this.findParent(current)) {
      parents.push(this.findParent(current));
      current = this.findParent(current).key; 
    }
    return parents;
  }

  /** LL旋平衡处理：每个节点向左移一位 */
  _LLRotation(node) {
    const rootLeft = node.right.left;
    node.right.left = node;
    if (node.key === this.root.key) {
      this.root = node.right;
    } else {
      const parent = this.findParent(node.key);
      if (node.key < parent.key) {
        parent.left = node.right;
      } else {
        parent.right = node.right;
      }
    }
    node.right = rootLeft;
    this._resetBalanceFactor(this.findParent(node.key));
    this._calcParentBalanceFactor(node);
  }

  /** RR旋平衡处理：每个节点向右移一位 */
  _RRRotation(node) {
    const rootRight = node.left.right;
    node.left.right = node;
    if (node.key === this.root.key) {
      this.root = node.left;
    } else {
      const parent = this.findParent(node.key);
      if (node.key < parent.key) {
        parent.left = node.left;
      } else {
        parent.right = node.left;
      }
    }
    node.left = rootRight;
    this._resetBalanceFactor(this.findParent(node.key));
    this._calcParentBalanceFactor(node);
  }

  /** LR旋平衡处理：先LL旋后RR旋 */
  _LRRotation(node) {
    this._LLRotation(node.left);
    this._RRRotation(node);
  }

  /** RL旋平衡处理：先RR旋后LL旋 */
  _RLRotation(node) {
    this._RRRotation(node.right);
    this._LLRotation(node);
  }

  _balance(node) {
    if (!node) {
      return null;
    }
    switch (node.balanceFactor) {
      case 2:
        switch (node.left.balanceFactor) {
          case 1:
            this._RRRotation(node);
            break;
          case -1:
            this._LRRotation(node);
            break;
          default:
            break;
        }
        break;
      case -2:
        switch (node.right.balanceFactor) {
          case 1:
            this._RLRotation(node);
            break;
          case -1:
            this._LLRotation(node);
            break;
          default:
            break;
        }
        break;
      default:
        break;
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

  /** 平衡因子重置为0 */
  _resetBalanceFactor(node) {
    node.balanceFactor = this.getHeight(node.left) - this.getHeight(node.right);
    if (node.left) {
      this._resetBalanceFactor(node.left);
    }
    if (node.right) {
      this._resetBalanceFactor(node.right);
    }
  }

  _calcParentBalanceFactor(node) {
    let current = node;
    while (this.findParent(current.key)) {
      const parent = this.findParent(current.key);
      parent.balanceFactor = this.getHeight(parent.left) - this.getHeight(parent.right);
      current = parent;
    }
  }

  getHeight(node) {
    if (!node) {
      return 0;
    }
    return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }
}

// 示例
const tree = new AVLTree();
tree.insert(30);
tree.insert(40);
tree.insert(50); // LL
tree.insert(20);
tree.insert(10); // RR
tree.insert(60);
tree.insert(70); // LL

tree.insert(25);
tree.insert(26); // LR
tree.insert(80);
tree.insert(75); // RL
tree.insert(90); // RR

console.log('tree: ', tree.root);