// 优先队列节点
class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
  }
}

// 优先队列
class PriorityQueue {
  constructor() {
    this.quene = [];
  }

  // 入队
  enqueue(data, priority) {
    const node = new Node(data, priority);
    if (!this.quene.length) {
      this.quene.push(node);
    } else {
      var isEnqueue = false; // 判断是否入队
      for (let i = 0; i < this.quene.length; i++) {
        if (this.quene[i].priority < node.priority) {
          this.quene.splice(i, 0, node);
          isEnqueue = true;
          break;
        }
      }
      // 循环后未入队，优先级最小
      if (!isEnqueue) {
        this.quene.push(node);
      }
    }
  }

  // 出队
  dequeue() {
    if (this.quene.length) {
      this.quene.shift();
    }
  }
}