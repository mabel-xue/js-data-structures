/** 
 * 双向链表节点
 * 包含三个值: 当前节点的值和分别指向前后节点的链接
 */
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.prev = null;
  }
}

/** 双向链表 */
class DoublyLinkedList {
  constructor() {
    this.head = null;
  }

  /** 在链表末尾添加一个元素 */
  add(element) {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
      return;
    }
    let current = this.head;
    while(current.next) {
      current = current.next;
    }
    current.next = node;
    node.prev = current;
  }

  /** 删除 */
  remove(element) {
    if (this.head === null) {
      return false;
    }
    let current = this.head;
    if (current.element === element) {
      if (this.head.next) {
        this.head = this.head.next;
        this.head.prev = null;
      } else {
        this.head = null;
      }
      return true;
    }
    let prev;
    while (current !== null && current.element !== element) {
      prev = current;
      current = current.next;
    }
    if (current) {
      prev.next = current.next || null;
      if (current.next) {
        current.next.prev = prev;
      }
      return true;
    }
    return false;
  }

  /** 反向遍历 */
  * reverse() {
    let current = this.head;
    let prev = null;
    let tail = null;
    // step1: 调序重排
    while(current !== null) {
      prev = current.prev;
      current.prev = current.next;
      current.next = prev;
      tail = current;
      current = current.prev;
    }
    this.head = tail;
   // step2: 正序遍历
    current = this.head;
    while(current !== null) {
      yield current.element;
      current = current.next;
    }
  }
}

// 示例
const list = new DoublyLinkedList();
list.add('1');
list.add('2');
list.add('5');
list.add('3');

list.remove('5');

const reverseList = list.reverse();

console.log(reverseList.next());
console.log(reverseList.next());
console.log(reverseList.next());