// 队列
class Queue {
  constructor() {
    this.items = [];
    this.front;
    this.back;
  }

  getFront() {
    return this.items[0];
  }

  getBack() {
    return this.items[this.items.length - 1];
  }

  enqueue(element) {
    this.items.push(element);
    this.front = this.getFront();
    this.back = this.getBack();
  }

  dequeue() {
    this.items.pop();
    this.front = this.getFront();
    this.back = this.getBack();
  }
}