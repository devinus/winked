// Copyright (c) 2010, Devin Torres <devin@devintorres.com>

var LinkedList = function () {
  this.head = null;
  this.tail = null;
  this._size = 0;
  if (arguments.length > 1) {
    return this.fromArray(arguments);
  }
};

var Node = function (data) {
  this.prev = null;
  this.next = null;
  this.data = data || null;
};

LinkedList.prototype = {
  get: function (idx) {
    idx = idx || 0;

    var len = this._size;
    if (len < Math.abs(idx+1)) {
      throw new Error("list index out of range");
    }

    if (idx < 0) idx = len + idx;
    if (idx < len/2) {
      var node = this.head,
          nextNode = node.next;
      while (idx--) {
        node = nextNode;
        nextNode = node.next;
      }
      return node;
    } else {
      var node = this.tail,
          prevNode = node.prev,
      idx = len - idx - 1
      while (idx--) {
        node = prevNode;
        prevNode = node.prev;
      }
      return node;
    }
  },

  getFirst: function () {
    if (this.head) return this.head;
  },

  getLast: function () {
    if (this.tail) return this.tail;
  },

  set: function (idx, newNode) {
    var node = this.get(idx),
        nodePrev = node.prev,
        nodeNext = node.next;
    if (nodePrev) {
      nodePrev.next = newNode;
      newNode.prev = nodePrev;
    } else {
      this.head = newNode;
    }
    if (nodeNext) {
      nodeNext.prev = newNode;
      newNode.next = nodeNext;
    } else {
      this.tail = newNode;
    }
    return newNode;
  },

  append: function (node) {
    var prevTail = this.tail;
    if (prevTail) {
      node.prev = prevTail;
      prevTail.next = node;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }
    this._size++;
    return node;
  },

  prepend: function (node) {
    var prevHead = this.head;
    if (prevHead) {
      node.next = prevHead;
      prevHead.prev = node;
      this.head = node;
    } else {
      this.head = node;
      this.tail = node;
    }
    this._size++;
    return node;
  },

  appendAll: function (nodeList) {
    var len = nodeList.length;
    if (len < 1) return;

    var node = nodeList[0],
        prevTail = this.tail;
    if (prevTail) {
      node.prev = prevTail;
      prevTail.next = node;
    } else {
      this.head = node;
    }

    var idx = 1, nextNode;
    for (; idx < len; idx++) {
      nextNode = nodeList[idx];
      node.next = nextNode;
      nextNode.prev = node;
      node = nextNode;
    }

    this.tail = node;
    this._size += len;
    return this;
  },

  prependAll: function (nodeList) {
    var len = nodeList.length;
    if (len < 1) return;

    var node = nodeList[len-1],
        prevHead = this.head;
    if (prevHead) {
      node.next = prevHead;
      prevHead.prev = node;
    } else {
      this.tail = node;
    }

    var idx = len-2, prevNode;
    for (; idx >= 0; idx--) {
      prevNode = nodeList[idx];
      node.prev = prevNode;
      prevNode.next = node;
      node = prevNode;
    }

    this.head = node;
    this._size += len;
    return this;
  },

  insertBefore: function (node, beforeNode) {
    var beforePrev = beforeNode.prev;
    if (beforePrev) {
      beforePrev.next = node;
      node.prev = beforePrev;
      node.next = beforeNode;
      beforeNode.prev = node;
    } else {
      beforeNode.prev = node;
      node.next = beforeNode;
      this.head = node;
    }
    this._size++;
    return node;
  },

  insertAfter: function (node, afterNode) {
    var afterNext = afterNode.next;
    if (afterNext) {
      afterNode.next = node;
      node.next = afterNext;
      node.prev = afterNode;
      afterNext.prev = node;
    } else {
      afterNode.next = node;
      node.prev = afterNode;
      this.tail = node;
    }
    this._size++;
    return node;
  },

  pop: function () {
    var prevTail = this.tail;
    if (prevTail) {
      var newTail = prevTail.prev;
      newTail.next = null;
      this.tail = newTail;
      this._size--;
      return prevTail;
    }
  },

  push: function () {
    if (arguments.length < 1) {
      return this.append(arguments[0]);
    } else {
      return this.appendAll(arguments);
    }
  },

  shift: function () {
    var prevHead = this.head;
    if (prevHead) {
      var newHead = prevHead.next;
      newHead.prev = null;
      this.head = newHead;
      this._size--;
      return prevHead;
    }
  },

  unshift: function () {
    if (arguments.length < 1) {
      return this.prepend(arguments[0]);
    } else {
      return this.prependAll(arguments);
    }
  },

  contains: function (o) {
    var node = this.head;
    while (node) {
      if (o === node) return true;
      node = node.next;
    }
    return false;
  },

  remove: function (node) {
    var beforeNode = node.prev,
        afterNode = node.next;
    if (beforeNode && afterNode) {
      beforeNode.next = afterNode;
      afterNode.prev = beforeNode;
      this._size--;
    } else if (beforeNode) {
      beforeNode.next = null;
      this.tail = beforeNode;
      this._size--;
    } else if (afterNode) {
      afterNode.prev = null;
      this.head = afterNode;
      this._size--;
    }
  },

  removeAll: function (nodeList) {
    var len = nodeList.length;
    if (len < 1) return;

    var node = nodeList[0];
    for (var idx = 1; idx < len+1; idx++) {
      this.remove(node);
      node = nodeList[idx];
    }
    return this;
  },

  removeRange: function (from, to) {
    var fromNode = this.get(from),
        fromPrev = fromNode.prev,
        toNode = this.get(to);
    if (fromPrev) {
      fromPrev.next = toNode;
      toNode.prev = fromPrev;
    } else {
      toNode.prev = null;
      this.head = toNode;
    }
    this._size -= to - from;
    return this;
  },

  replace: function (node, newNode) {
    var nodePrev = node.prev,
        nodeNext = node.next;
    if (nodePrev) {
      newNode.prev = nodePrev;
      nodePrev.next = newNode;
    } else {
      this.head = newNode;
    }
    if (nodeNext) {
      newNode.next = nodeNext;
      nodeNext.prev = newNode;
    } else {
      this.tail = newNode;
    }
    return newNode;
  },

  indexOf: function (node) {
    var len = this._size,
        nextNode = this.head;
    for (var idx = 0; idx < len; idx++) {
      if (!nextNode) break;
      if (node === nextNode) return idx;
      nextNode = nextNode.next;
    }
    return -1;
  },

  lastIndexOf: function (node) {
    var len = this._size,
        prevNode = this.tail;
    for (var idx = len-1; idx >= 0; idx--) {
      if (!prevNode) break;
      if (node === prevNode) return idx;
      prevNode = prevNode.prev;
    }
    return -1;
  },

  toArray: function () {
    var arr = [],
        node = this.head;
    while (node) {
      arr.push(node);
      node = node.next;
    }
    return arr;
  },

  fromArray: function (arr) {
    var len = arr.length;
    if (len) {
      var node = new Node(arr[0]);
      this.head = node;

      var nextNode;
      for (var idx = 1; idx < len; idx++) {
        nextNode = new Node(arr[idx]);
        node.next = nextNode;
        nextNode.prev = node;
        node = nextNode;
      }

      this.tail = node;
      this._size = len;
    }
    return this;
  },

  clear: function () {
    this.head = null;
    this.tail = null;
    this._size = 0;
  },

  isEmpty: function () {
    return this._size > 0;
  },

  size: function () {
    return this._size;
  },

  get length () {
    return this._size;
  }
};

// Aliases
LinkedList.prototype.add = LinkedList.prototype.append;
LinkedList.prototype.addAll = LinkedList.prototype.appendAll;
LinkedList.prototype.addFirst = LinkedList.prototype.prepend;
LinkedList.prototype.addLast = LinkedList.prototype.append;
LinkedList.prototype.removeFirst = LinkedList.prototype.shift;
LinkedList.prototype.removeLast = LinkedList.prototype.pop;
LinkedList.prototype.swap = LinkedList.prototype.replace;
LinkedList.prototype.index = LinkedList.prototype.indexOf;
LinkedList.prototype.count = LinkedList.prototype.size;

var exports = exports || {};
exports.LinkedList = LinkedList;
exports.Node = Node;
