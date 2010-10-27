var
  repl = require('repl'),
  winked = require('./lib/winked');

repl.start("winked> ").context = {
  LinkedList: winked.LinkedList,
  Node: winked.Node
};
