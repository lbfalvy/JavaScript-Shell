JavaScript shell

A small JS sandbox / console. I made it for my webtop, but with the right main script the possibilities are endless.

Components are for displaying various datatypes.
This is a common mistake I found in browser consoles. They differentiate between the basic datatypes, but nothing else. This one however, is designed to recognise many different objects. If you want anything custom, you can still assign the variable to a tmp and reference it from the command line.

Note: Memory usage may grow unexpectedly, because the output log keeps the logged objects alive. To save an overweight session, use `clear()`, or to prevent this, set `output.bufferSize` to a low value.