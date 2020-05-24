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
    if (this._head()._active) {
      const prevHead = this._head();
      const newNode = new DLLNode({
        element,
        next: prevHead,
        prev: this._sentinel,
      });
      prevHead.prev = newNode;
      this._sentinel.next = newNode;
      return newNode;
    } else {
      const newNode = new DLLNode({
        element,
        next: this._sentinel,
        prev: this._sentinel,
      });
      this._sentinel.next = newNode;
      this._sentinel.prev = newNode;
      return newNode;
    }
  }

  insertTail(element) {
    if (this._tail()._active) {
      const prev = this._tail();
      const newNode = new DLLNode({ element, next: this._sentinel, prev });
      prev.next = newNode;
      this._sentinel.prev = newNode;
      return newNode;
    } else {
      const newNode = new DLLNode({
        element,
        next: this._sentinel,
        prev: this._sentinel,
      });
      this._sentinel.next = newNode;
      this._sentinel.prev = newNode;
      return newNode;
    }
  }

  removeHead() {
    if (this._head()._active) {
      let oldHead = this._head();
      this._sentinel.next = oldHead.next;
      oldHead.next.previous = this._sentinel;
      return oldHead.remove();
    }
  }

  removeTail() {
    if (this._tail()._active) {
      let oldTail = this._tail();
      this._sentinel.prev = oldTail.prev;
      oldTail.prev.next = this._sentinel;
      return oldTail.remove();
    }
  }

  remove(node) {
    if (node._active) {
      node.remove();
      return "removed";
    }
  }

  forEach(callback) {
    let node = this._head();
    let index = 0;
    while (node._active) {
      callback(node.element, index, this);
      node = node.next;
      index += 1;
    }
  }

  count() {
    let i = 0;
    let node = this._head();
    while (node._active) {
      i += 1;
      node = node.next;
    }
    return i;
  }
}

export default DoublyLinkedList;
