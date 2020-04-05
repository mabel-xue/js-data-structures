/** 
 * 最小堆 - 根节点为最小值
 */ 
class MinHeap {
  constructor() {
    // index为0时赋值null,便于计算子节点index和父节点index的关系
    this.heap = [null]
  }

  insert(node) {
    this.heap.push(node);
    if (this.heap.length > 1) {
      let current = this.heap.length - 1;
      // ->> heapifyUp
      while (current > 1 &&
        this.heap[Math.floor(current / 2)] > this.heap[current]) {
        // 交换当前节点和父节点
        [this.heap[Math.floor(current / 2)], this.heap[current]] = [this.heap[current], this.heap[Math.floor(current / 2)]];
        current = Math.floor(current / 2);
      }
      // <<- heapifyUp
    }
  }

  /** 删除堆顶元素 */
  remove() {
    let smallest = this.heap[1];
    if (this.heap.length > 2) {
      this.heap[1] = this.heap[this.heap.length - 1];
      this.heap.splice(this.heap.length - 1);
      if (this.heap.length === 3) {
        if (this.heap[1] > this.heap[2]) {
          [this.heap[1], this.heap[2]] = [this.heap[2], this.heap[1]];
        }
        return smallest;
      }
      // ->> heapifyDown
      let current = 1;
      let leftChildIndex = current * 2;
      let rightChildIndex = current * 2 + 1;

      while (
        this.heap[leftChildIndex] &&
        this.heap[rightChildIndex] &&
        (this.heap[current] > this.heap[leftChildIndex] ||
          this.heap[current] > this.heap[rightChildIndex])) {
        if (this.heap[leftChildIndex] < this.heap[rightChildIndex]) {
          [this.heap[current], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[current]];
          current = leftChildIndex;
        } else {
          [this.heap[current], this.heap[rightChildIndex]] = [this.heap[rightChildIndex], this.heap[current]];
          current = rightChildIndex;
        }

        leftChildIndex = current * 2;
        rightChildIndex = current * 2 + 1;
        // <<- heapifyDown
      }
    } else if (this.heap.length === 2) {
      this.heap.splice(1, 1);
    } else {
      return null;
    }

    return smallest;
  }
}

// 示例
const minHeap = new MinHeap();
minHeap.insert(9);
minHeap.insert(1);
minHeap.insert(3);
minHeap.insert(5);
minHeap.insert(6);
minHeap.remove();
console.log('minHeap: ', minHeap);


/**
 * 最大堆 - 根节点为最大值
 */ 
class MaxHeap {
  constructor() {
    this.heap = [null]
  }

  insert(node) {
    this.heap.push(node);

    if (this.heap.length > 1) {
      let current = this.heap.length - 1;
      // ->> heapifyUp
      while (current > 1 &&
        this.heap[Math.floor(current / 2)] < this.heap[current]) {
        // 交换当前节点和父节点
        [this.heap[Math.floor(current / 2)], this.heap[current]] = [this.heap[current], this.heap[Math.floor(current / 2)]];
        current = Math.floor(current / 2);
      }
      // <<- heapifyUp
    }
  }

  remove() {
    let smallest = this.heap[1];
    if (this.heap.length > 2) {
      this.heap[1] = this.heap[this.heap.length - 1];
      this.heap.splice(this.heap.length - 1);
      if (this.heap.length === 3) {
        if (this.heap[1] < this.heap[2]) {
          [this.heap[1], this.heap[2]] = [this.heap[2], this.heap[1]];
        }
        return smallest;
      }
      // ->> heapifyDown
      let current = 1;
      let leftChildIndex = current * 2;
      let rightChildIndex = current * 2 + 1;

      while (
        this.heap[leftChildIndex] &&
        this.heap[rightChildIndex] &&
        (this.heap[current] < this.heap[leftChildIndex] ||
          this.heap[current] < this.heap[rightChildIndex])) {
        if (this.heap[leftChildIndex] > this.heap[rightChildIndex]) {
          [this.heap[current], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[current]];
          current = leftChildIndex;
        } else {
          [this.heap[current], this.heap[rightChildIndex]] = [this.heap[rightChildIndex], this.heap[current]];
          current = rightChildIndex;
        }

        leftChildIndex = current * 2;
        rightChildIndex = current * 2 + 1;
        // <<- heapifyDown
      }
    } else if (this.heap.length === 2) {
      this.heap.splice(1, 1);
    } else {
      return null;
    }

    return smallest;
  }
}

// 示例
const maxHeap = new MaxHeap();
maxHeap.insert(9);
maxHeap.insert(1);
maxHeap.insert(3);
maxHeap.insert(5);
maxHeap.insert(6);
maxHeap.remove();
console.log('maxHeap: ', maxHeap);
