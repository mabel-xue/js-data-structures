// 队列节点
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
// 队列
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // 入队
  enqueue(element) {
    const node = new Node(element);
    if (this.tail !== null) {
      this.tail.next = node;
    }
    this.tail = node;
    if (this.head === null) {
      this.head = node;
    }
  }

  // 出队
  dequeue() {
    this.head = this.head.next;
    if (this.head === null) {
      this.tail = null;
    }
  }
}