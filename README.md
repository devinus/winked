Winked - A suggestive CommonJS linked list implementation
=========================================================

I wrote this library not for anything useful, but just as
a learning experience. Method names were inspired by the
Java LinkedList implementation, the JavaScript Array
prototype, jQuery's DOM manipulation methods, and Python.

## Usage

    $ cd /path/to/winked
    $ node repl.js
    winked> var list = new LinkedList();
    winked> list.appendAll(new Node(1), new Node(2))
    winked> list.head.next.prev
    { prev: null
    , next: { prev: [Circular], next: null, data: 2 }
    , data: 1
    }
