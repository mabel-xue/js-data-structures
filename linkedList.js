/**
 * 单向链表节点
 * 包含两个值: 当前节点的值和一个指向下一个节点的链接
 */
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

/** 单向链表 */
class LinkedList {
  constructor() {
    this.head = null;
  }

  /** 在列表末尾添加一个元素 */
  push(element) {
    const node = new Node(element);
    let current; // 指针
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

  /** 在列表头部添加一个元素 */
  unshift(element) {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
  }

  /** 搜索元素是否存在于链表中 */
  search(element) {
    let current = this.head;
    while (current !== null && current.element !== element) {
      current = current.next;
    }
    return current !== null;
  }

  /** 删除 */
  remove(element) {
    if (this.head === null) {
      return false;
    }
    let current = this.head;
    if (current.element === element) { // 删除元素在头结点中
      this.head.next ? this.head = this.head.next : this.head = null;
      return true;
    }
    
    let prev; // 指针的上一节点
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

  /** 遍历 */ 
  * traverse() {
    let current = this.head;
    while(current !== null) {
      yield current.element;
      current = current.next;
    }
  }

  /** 反向遍历 */
  * reverse() {
    // step1: 调序重排
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
    // step2: 正序遍历
    current = this.head;
    while(current !== null) {
      yield current.element;
      current = current.next;
    }
  }
}

// 范例
const list = new LinkedList();

list.push('1');
list.push('2');
list.unshift('-1');
list.unshift('0');
list.remove('-1')

const traverse = list.traverse();
console.log(traverse.next());
console.log(traverse.next());

const reverse = list.reverse();
console.log(reverse.next());
console.log(reverse.next());
