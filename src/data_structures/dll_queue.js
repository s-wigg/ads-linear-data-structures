import DoublyLinkedList from "./doubly_linked_list";

/**
 * Implementation of the Queue interface using a doubly-linked list
 */
class DLLQueue {
  /**
   * Create an empty queue
   */
  constructor() {
    this.storage = new DoublyLinkedList();
  }

  /**
   * Add an element to the back of the queue
   *
   * @param {any} element Data to track
   * @returns {ticket} Cancellation ticket
   */
  enqueue(element) {
    return this.storage.insertTail(element);
  }

  /**
   * Remove an element from the queue
   *
   * @param {ticket} ticket Cancellation ticket, as returned by `enqueue`
   * @returns Stored element
   */
  cancel(ticket) {
    return this.storage.remove(ticket);
  }

  /**
   * Remove the element at the front of the queue
   *
   * @returns Stored element
   */
  dequeue() {
    return this.storage.removeHead();
  }

  /**
   * How many elements are currently in the queue?
   *
   * @returns {number} Current count
   */
  count() {
    return this.storage.count();
  }

  /**
   * @callback forEachCallback
   * @param element The element stored at this position
   * @param {number} index The index of this element
   * @param {DLLQueue} queue This queue
   */

  /**
   * Invoke a callback on each element in the queue, in insertion order
   *
   * @param {forEachCallback} callback Function to invoke
   */
  forEach(callback) {
    this.storage.forEach(callback, this);
  }
}

export default DLLQueue;
