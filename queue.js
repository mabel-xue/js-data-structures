/** 队列节点 */
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

/** 队列 */
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  /** 
   * 入队
   * 只能从队尾添加元素
   */
  enqueue(element) {
    const node = new Node(element);
    if (this.tail) {
      this.tail.next = node;
    }
    this.tail = node;
    if (!this.head) {
      this.head = node;
    }
  }

  /** 
   * 出队
   * 只能从头部删除元素
   */ 
  dequeue() {
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
  }
}

// 示例
const quene = new Queue();

quene.enqueue(1);
quene.enqueue(2);
quene.enqueue(3);

quene.dequeue();

console.log(quene);