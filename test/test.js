var
  assert = require('assert'),
  winked = require('../lib/winked'),
  LinkedList = winked.LinkedList,
  Node = winked.Node;

var
  list = new LinkedList(),
  node1 = list.append(new Node(1)),
  node3 = list.append(new Node(3)),
  node4 = list.append(new Node(5)),
  node2 = list.insertBefore(new Node(2), node3),
  node5 = list.insertAfter(new Node(5), node4);

assert.strictEqual(list.length, 5, "list.length !== 5");
assert.strictEqual(list.head, node1, "head !== node1");
assert.strictEqual(list.tail, node5, "tail !== node5");
assert.strictEqual(node1.prev, null, "node1.prev !== null");
assert.strictEqual(node5.next, null, "node5.next !== null");
assert.strictEqual(list.head.next, node2, "head.next !== node2");
assert.strictEqual(list.head.next.prev, node1, "head.next.prev !== node1");
assert.strictEqual(node2.next, node3, "node2.next !== node3");
assert.strictEqual(node5.prev, node4, "node5.prev !== node4");
assert.strictEqual(list.get(0), list.head, "list.get(0) !== list.head");
assert.strictEqual(list.get(4), list.tail, "list.get(4) !== list.tail");
assert.strictEqual(list.get(-1), list.tail, "list.get(-1) !== list.tail");
assert.strictEqual(list.get(-5), list.head, "list.get(-5) !== list.head");
assert.strictEqual(list.get(2), list.get(-3), "list.get(2) !== list.get(-3)");
assert.strictEqual(list.indexOf(node1), 0, "list.indexOf(node1) !== 0");
assert.strictEqual(list.lastIndexOf(node5), 4, "list.lastIndexOf(node5) !== 4");
assert.strictEqual(list.lastIndexOf(new Node(null)), -1, "list.lastIndexOf(new Node(null)) !== -1");

list.remove(node1);
assert.strictEqual(list.head, node2, "list.head !== node2");
assert.strictEqual(node2.prev, null, "node2.prev !== null");

list.remove(node5);
assert.strictEqual(list.tail, node4, "list.tail !== node4");
assert.strictEqual(node4.next, null, "node4.next !== null");

list.remove(node2);
list.remove(node4);
assert.strictEqual(list.length, 1, "list.length !== 1");
assert.strictEqual(list.head, node3, "list.head !== node3");
assert.strictEqual(list.tail, node3, "list.tail !== node3");
assert.strictEqual(node3.prev, null, "node3.prev !== null");
assert.strictEqual(node3.next, null, "node3.next !== null");

list.prependAll([new Node(1), new Node(2)]);
assert.strictEqual(node3.prev.data, 2, "node3.prev.data !== 2");
assert.strictEqual(node3.prev.prev.data, 1, "node3.next.data !== 1");
assert.strictEqual(node3.prev.prev, list.head, "node3.prev.prev !== list.head");

list.appendAll([new Node(4), new Node(5)]);
assert.strictEqual(node3.next.data, 4, "node3.next.data !== 4");
assert.strictEqual(node3.next.next.data, 5, "node3.next.next.data !== 5");
assert.strictEqual(node3.next.next, list.tail, "node3.next.next !== list.tail");

list.replace(node3, new Node(6));
assert.strictEqual(list.contains(node3), false, "list.contains(node3) !== false");
assert.strictEqual(list.contains(list.head), true, "list.contains(list.head) !== true");
assert.strictEqual(list.head.next.next.data, 6, "list.head.next.next.data !== 6");
assert.strictEqual(list.tail.prev.prev.data, 6, "list.tail.prev.prev.data !== 6");

assert.strictEqual(list.shift().data, 1, "list.shift().data !== 1");
assert.strictEqual(list.pop().data, 5, "list.pop().data !== 5");

list.unshift(new Node(1));
list.push(new Node(5));
var arr = list.toArray();
assert.strictEqual(arr[0].data, 1, "arr[0].data !== 1");
assert.strictEqual(arr[4].data, 5, "arr[4].data !== 5");
