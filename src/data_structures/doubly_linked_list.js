class DLLNode {
  constructor({
    element = undefined,
    next = this,
    prev = this,
    isSentinel = false,
  }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    const prevHead = this._head();
    const newNode = new DLLNode({
      element,
      next: prevHead,
      prev: this._sentinel,
    });
    prevHead.prev = newNode;
    this._sentinel.next = newNode;
    return newNode;
  }

  insertTail(element) {
    const prev = this._tail();
    const newNode = new DLLNode({ element, next: this._sentinel, prev });
    prev.next = newNode;
    this._sentinel.prev = newNode;
    return newNode;
  }

  removeHead() {
    const head = this._head();
    if (head._active) {
      return head.remove();
    }
  }

  removeTail() {
    const tail = this._tail();
    if (tail._active) {
      return tail.remove();
    }
  }

  remove(node) {
    if (node._active) {
      node.remove();
      return "removed";
    }
  }

  forEach(callback, selfReference = this) {
    let node = this._head();
    let index = 0;
    while (node._active) {
      callback(node.element, index, selfReference);
      node = node.next;
      index += 1;
    }
  }

  count() {
    let total = 0;
    const test = this.forEach(() => (total += 1));
    return total;
  }
}

export default DoublyLinkedList;
