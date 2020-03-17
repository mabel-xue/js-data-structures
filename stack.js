/** 栈节点 */ 
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

/** 栈 */ 
class Stack {
  constructor() {
    this.top = null;
  }

  /** 
   * 压栈
   * 将数据添加至栈顶端
   */ 
  push(element) {
    const node = new Node(element);
    node.next = this.top;
    this.top = node;
  }

  /**
   * 弹栈
   * 将栈顶端数据移除
   */ 
  pop() {
    this.top = this.top && this.top.next;
  }

  /** 访问栈顶端元素 */
  peek() {
    return this.top && this.top.element;
  }
}

// 示例
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);

stack.pop();

console.log(stack);
console.log(stack.peek());