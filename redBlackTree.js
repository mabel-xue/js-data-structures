/**
 * 红黑树性质：
 * 1. 节点是红色或黑色。
 * 2. 根是黑色。
 * 3. 所有叶子都是黑色（叶子是NIL节点）。
 * 4. 每个红色节点必须有两个黑色的子节点。（从每个叶子到根的所有路径上不能有两个连续的红色节点。）
 * 5. 从任一节点到其每个叶子的所有简单路径都包含相同数目的黑色节点。
 */

/** 红黑树节点 */ 
class Node {
  constructor(key) {
    this.key = key;
    this.color = 'red';
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  /** 祖父节点 */
  getGrandParent() {
    const parent = this.parent;
    return parent && parent.parent;
  }

  /** 叔父节点 */
  getUncle() {
    const parent = this.parent;
    if (parent && parent.parent) {
      return parent.key < parent.parent.key ? parent.parent.right : parent.parent.left;
    }
  }
}

class RedBlackTree {
  constructor() {
    this.root = null;
  }

  /** 插入 */
  insert(key) {
    const node = new Node(key);
    if (!this.root) {
      this.root = node;
    } else {
      this.insertByNode(key, this.root);
    }
    this.root.color = 'black';
  }

  /**
   * 判断插入结点在左子树还是右子树
   * @param {number} key 
   * @param {Node} node 
   */
  insertByNode(key, node) {
    const insertNode = new Node(key);
    if (key < node.key) { // 进入左子树
      if (node.left) {
        this.insertByNode(key, node.left);
      } else {
        node.left = insertNode;
        insertNode.parent = node;
        this.insertCase1(insertNode);
      }
    } else { // 进入右子树
      if (node.right) {
        this.insertByNode(key, node.right);
      } else {
        node.right = insertNode;
        insertNode.parent = node;
        this.insertCase1(insertNode);
      }
    }
  }

  // 情形1:新节点N位于树的根上，没有父节点。在这种情形下，我们把它重绘为黑色以满足性质2。因为它在每个路径上对黑节点数目增加一，性质5符合。
  insertCase1(node) {
    if (!node.parent) {
      node.color = 'black';
    } else {
      this.insertCase2(node);
    }
  }

  // 情形2:新节点N的父节点P是黑色，所以性质4没有失效（新节点是红色的）。在这种情形下，树仍是有效的。性质5也未受到威胁，尽管新节点N有两个黑色叶子子节点；但由于新节点N是红色，通过它的每个子节点的路径就都有同通过它所取代的黑色的叶子的路径同样数目的黑色节点，所以依然满足这个性质。
  insertCase2(node) {
    if (node.parent.color === 'black') {
      return;
    } else { // node.parent.color === 'red'
      this.inserCase3(node);
    }
  }

  // 情形3:如果父节点P和叔父节点U二者都是红色，则将它们两个重绘为黑色并重绘祖父节点G为红色（用来保持性质5）。现在我们的新节点N有了一个黑色的父节点P。因为通过父节点P或叔父节点U的任何路径都必定通过祖父节点G，在这些路径上的黑节点数目没有改变。但是，红色的祖父节点G可能是根节点，这就违反了性质2，也有可能祖父节点G的父节点是红色的，这就违反了性质4。为了解决这个问题，我们在祖父节点G上递归地进行情形1的整个过程。（把G当成是新加入的节点进行各种情形的检查）
  inserCase3(node) {
    const uncle = node.getUncle();
    if (uncle && uncle.color === 'red') {
      node.parent.color = 'black';
      uncle.color = 'black';
      const grandParent = node.getGrandParent();
      grandParent.color = 'red';
      this.insertCase1(grandParent);
    } else {
      this.insertCase4(node);
    }
  }

  // 情形4: 父节点P是红色而叔父节点U是黑色或缺少，并且新节点N是其父节点P的右子节点而父节点P又是其父节点的左子节点。在这种情形下，我们进行一次左旋转调换新节点和其父节点的角色;接着，我们按情形5处理以前的父节点P以解决仍然失效的性质4。注意这个改变会导致某些路径通过它们以前不通过的新节点N（比如图中1号叶子节点）或不通过节点P（比如图中3号叶子节点），但由于这两个节点都是红色的，所以性质5仍有效。
  insertCase4(node) {
    if (node === node.parent.right && node.parent === node.getGrandParent().left) {
      this._LLRotation(node.parent);
      node = node.left;
    } else if (node === node.parent.left && node.parent === node.getGrandParent().right) {
      this._RRRotation(node.parent)
      node = node.right;
    }
    this.insertCase5(node);
  }

  // 情形5：父节点P是红色而叔父节点U是黑色或缺少，新节点N是其父节点的左子节点，而父节点P又是其父节点G的左子节点。在这种情形下，我们进行针对祖父节点G的一次右旋转；在旋转产生的树中，以前的父节点P现在是新节点N和以前的祖父节点G的父节点。我们知道以前的祖父节点G是黑色，否则父节点P就不可能是红色（如果P和G都是红色就违反了性质4，所以G必须是黑色）。我们切换以前的父节点P和祖父节点G的颜色，结果的树满足性质4。性质5也仍然保持满足，因为通过这三个节点中任何一个的所有路径以前都通过祖父节点G，现在它们都通过以前的父节点P。在各自的情形下，这都是三个节点中唯一的黑色节点。
  insertCase5(node) {
    node.parent.color = 'black';
    node.getGrandParent().color = 'red';
    if (node === node.parent.left && node.parent === node.getGrandParent().left) {
      this._RRRotation(node.getGrandParent());
    } else { // node === node.parent.right && node.parent === node.getGrandParent().right
      this._LLRotation(node.getGrandParent());
    }
  }

  /** LL旋平衡处理：每个节点向左移一位 */
  _LLRotation(node) {
    const rootLeft = node.right.left;
    node.right.left = node;
    if (node === this.root) {
      this.root = node.right;
      this.root.parent = null;
    } else {
      const parent = node.parent;
      if (node.key < parent.key) {
        parent.left = node.right;
        parent.left.parent = parent;
      } else {
        parent.right = node.right;
        parent.right.parent = parent;
      }
      node.parent = node.right;
    }
    node.right = rootLeft;
  }

  /** RR旋平衡处理：每个节点向右移一位 */
  _RRRotation(node) {
    const rootRight = node.left.right;
    node.left.right = node;
    if (node === this.root) {
      this.root = node.left;
      this.root.parent = null;
    } else {
      const parent = node.parent;
      if (node.key < parent.key) {
        parent.left = node.left;
        parent.left.parent = parent;
      } else {
        parent.right = node.left;
        parent.right.parent = parent;
      }
      node.parent = node.left;
    }
    node.left = rootRight;
  }
}

const rbTree = new RedBlackTree();
rbTree.insert(100);
rbTree.insert(200);
rbTree.insert(50);
rbTree.insert(40);
rbTree.insert(30);
rbTree.insert(20);
rbTree.insert(10);
// rbTree.insert(1);
rbTree.insert(60);
rbTree.insert(70);
rbTree.insert(80);

console.log('rbTree: ', rbTree.root);
