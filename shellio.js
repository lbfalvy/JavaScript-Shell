/**
 * Write a single row to stdout
 * @param {Node} row 
 */
function write(row) {
	if (!(row instanceof Node))
		throw new Error("Can only write nodes!");
	var out = document.getElementById("stdout");
	out.appendChild(row);
	while (out.childElementCount > write.bufferSize) {
		out.removeChild(out.firstChild);
	}
    if (write.scrollToBottom) 
        out.scroll(0, out.scrollHeight);
}
write.bufferSize = 100;
write.scrollToBottom = true;

/**
 * Print a set of values to the console
 */
function print() {
	var row = document.createElement("div");
	for(let i = 0; i < arguments.length; i++) {
		row.append(Auto(arguments[i]));
	}
	write(row);
}

/**
 * Prints a node, a set of nodes or a string in a row
 * @param {String | Array<Node> | Node} content Html content
 */
function printRaw(content) {
	var row = document.createElement("div");
	if (typeof content == "string")
		row.innerHTML = content;
	else if (content instanceof Array)
		row.append(...content);
	else row.append(content);
	write(row);
}

/**
 * loundener token for the query function
 */
var loudly = Symbol("Loud query flag");

/**
 * Query with a red marker to indicate that
 * execution is waiting for user input
 * @see query
 */
function queryLoud() {
	return query(loudly, ...arguments);
}

/**
 * Query for user input.
 * Note: Input fields can be hidden, so the prompt
 * should make it obvious that it's waiting for user
 * input.
 * @see queryLoud
 * @returns {Promise<any>}
 */
function query() {
	var row = document.createElement("div");
	row.classList.add("query");
	var query = document.createElement("span");
	query.classList.add("prompt", "item");
	for (let i = 0; i < arguments.length; i++) {
        // Loudener flag
        if (arguments[i] === loudly)
            row.classList.add("loud");
        else query.append(Auto(arguments[i]));
	}
	var input = document.createElement("input");
	input.classList.add("item");
	row.append(query);
	row.append(input);
	write(row);
	var out = document.getElementById("stdout");
	if (out.scrollTop+out.clientHeight >= out.scrollHeight) {
		input.focus();
	}
	return new Promise(resolve => 
		input.addEventListener("keyup", e => {
			if (e.key === "Enter") {
				input.readOnly = true;
				resolve(input.value);
			}
		})
	);
}

/**
 * Clears the console history
 */
function clear() {
    out = document.getElementById("stdout");
    while (out.firstChild) {
        out.removeChild(out.firstChild);
    }
}