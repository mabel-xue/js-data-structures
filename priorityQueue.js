/** 优先队列节点 */
class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
  }
}

/** 优先队列 */
class PriorityQueue {
  constructor() {
    this.quene = [];
  }

  /** 入队 */
  enqueue(data, priority) {
    const node = new Node(data, priority);
    if (!this.quene.length) {
      this.quene.push(node);
    } else {
      var isEnqueue = false; // 是否已入队
      for (let i = 0; i < this.quene.length; i++) {
        if (this.quene[i].priority < node.priority) {
          this.quene.splice(i, 0, node);
          isEnqueue = true;
          break;
        }
      }
      // 循环后未入队，即优先级最小，插入队尾
      if (!isEnqueue) {
        this.quene.push(node);
      }
    }
  }

  /** 出队 */
  dequeue() {
    if (this.quene.length) {
      this.quene.shift();
    }
  }
}

// 示例
const queue = new PriorityQueue();
queue.enqueue('a', 0);
queue.enqueue('b', 1);
queue.enqueue('c', 2);
queue.enqueue('d', 3); 
console.log(queue); // dcba

queue.enqueue('e', 0);
console.log(queue); // dcbae

queue.dequeue();
console.log(queue); // cbae