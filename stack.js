// 栈节点
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

// 栈
class Stack {
  constructor() {
    this.top = null;
  }

  // 入栈
  push(element) {
    const node = new Node(element);
    node.next = this.top;
    this.top = node;
  }

  // 出栈
  pop() {
    if (this.top === null) {
      return;
    }
    this.top = this.top.next;
  }

  // 访问栈当前顶端元素
  peek() {
    return this.top && this.top.element;
  }
}