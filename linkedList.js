// 链表节点
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

// 链表
class LinkedList {
  constructor() {
    this.head = null;
  }

  // 在列表末尾添加一个元素
  add(element) {
    const node = new Node(element);
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
  }

  // 在列表头部添加一个元素
  prepend(element) {
    const node = new Node(element);
    let n;
    if (this.head === null) {
      this.head = node;
    } else {
      n = this.head;
      this.head = node;
      this.head.next = n;
    }
  }

  // 搜索
  contains(element) {
    let current = this.head;
    while (current !== null && current.element !== element) {
      current = current.next;
    }
    return current === null ? false : true;
  }

  // 删除
  remove(element) {
    if (this.head === null) {
      return false;
    }
    let current = this.head;
    if (current.element === element) {
      this.head.next ? this.head = this.head.next : this.head = null;
      return true;
    }
    
    let prev;
    while (current !== null && current.element !== element) {
      prev = current;
      current = current.next;
    }
    if (current) {
      prev.next = current.next || null;
      return true;
    }
    return false;
  }

  // 遍历
  * traverse() {
    let current = this.head;
    while(current !== null) {
      yield current.element;
      current = current.next;
    }
  }

  // 反向遍历
  * reverse() {
    let current = this.head;
    let prev = null;
    let next;
    while(current !== null) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
    // 遍历
    current = this.head;
    while(current !== null) {
      yield current.element;
      current = current.next;
    }
  }
}
