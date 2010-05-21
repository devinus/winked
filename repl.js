var repl = require('repl'),
    winked = require('./lib/winked');

repl.start("winked> ").scope = {
  LinkedList: winked.LinkedList,
  Node: winked.Node
};
