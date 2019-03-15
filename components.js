function Component() {
	var elem = document.createElement("span");
	elem.classList.add("item");
	return elem;
}
function getName() {
	if (window["tmp"] === undefined)
		return "tmp";
	let i = 0;
	if (window["tmp"+i] === undefined)
		return "tmp"+i;
}
function actionBtn(name) {
	var btn = document.createElement("button");
	btn.type = "button";
	btn.classList.add("actionbtn");
	btn.append(name);
	return btn;
}
function pubBtn(title, obj) {
	var btn = actionBtn(title);
	btn.addEventListener("click", e => {
		var idx = getName();
		window[idx] = obj;
		alert("Reference with "+idx);
	});
	return btn;
}
function Text(s) {
	s = ""+s;
	var elem = Component();
	elem.append(s);
	return elem;
}
function Raw(s) {
	var elem = Component();
	elem.innerHTML = s;
	return elem;
}
function Bool(b) {
	b = !!b;
	var elem = Component();
	elem.classList.add("bool");
	elem.append(b?"true":"false");
	return elem;
}
function Num(n) {
	n = +n;
	var elem = Component();
	elem.classList.add("number");
	elem.append(""+n);
	return elem;
}
function Obj(o) {
	var elem = Component();
	elem.classList.add("object");
	// Dropdown arrow
	var arrow = document.createElement("i");
	arrow.classList.add("arrow");
	// "Short content"
	var string = document.createElement("span");
	string.classList.add("string");
	if (o.toString) string.append(o.toString());
	else string.append("[Object]");
	// Full content
	var content = document.createElement("div");
	content.classList.add("content");
	// Opening content
	var dropdown = e => {
		if (!arrow.classList.contains("open")) {
			// Build body
			Object.keys(o).sort().forEach(k => {
				if (!o.hasOwnProperty(k)) return;
				var row = document.createElement("div");
				row.append(Auto(k), ": ", Auto(o[k]));
				content.append(row);
			});
			// Include prototype
			if (o.prototype !== undefined) {
				var row = document.createElement("div");
				row.classList.add("prototype");
				row.append(Auto("<prototype>"),": ", Auto(o.prototype));
				content.append(row);
			}
			// Change arrow style
			arrow.classList.add("open");
		} else {
			// Destroy body
			while (content.firstChild)
				content.removeChild(content.firstChild);
			// Change arrow style
			arrow.classList.remove("open");
		}
	};
	arrow.addEventListener("click", dropdown);
	var container = document.createElement("div");
	container.append(arrow, string, content);
	elem.append(container, pubBtn("expose", o));
	return elem;
}
/** @todo It would be nice if we could call it from here */
function Func(f) {
	var elem = Component();
	elem.classList.add("function");
	elem.append("function() {...}");
	elem.append(pubBtn("expose", f));
	return elem;
}
function Prom(p) {
	var elem = Component();
	elem.classList.add("promise");
	p.then(x => {
		elem.classList.add("resolved");
		elem.prepend(Auto(x));
	}).catch(x => {
		elem.classList.add("rejected");
		elem.prepend(Auto(x));
	});
	elem.append(pubBtn("expose", p));
	return elem;
}
function DateTime(d) {
	var elem = Component();
	elem.classList.add("time");
	elem.append(DateTime.display(d), pubBtn("expose", d));
	return elem;
}
DateTime.display = d => d.toLocaleString();
function Sym(s) {
	var elem = Component();
	elem.classList.add("symbol");
	elem.append(s.toString(), pubBtn("expose", s));
	return elem;
}
function Null() {
	var elem = Component();
	elem.classList.add("null");
	elem.append("null");
	return elem;
}
function Undefined() {
	var elem = Component();
	elem.classList.add("undefined");
	elem.append("undefined");
	return elem;
}

const BR = Symbol("line break");
function Auto(a) {
	// Custom symbols
	if (a === BR)
		return document.createElement("br");
	// Specific types
	if (a instanceof Promise)
		return Prom(a);
	if (a instanceof Date)
		return DateTime(a);
	// General types
	if (a === null)
		return Null();
	if (typeof a === "undefined")
		return Undefined();
	if (typeof a === "string")
		return Text(a);
	if (typeof a === "number" || typeof a === "bigint")
		return Num(a);
	if (typeof a === "boolean")
		return Bool(a);
	if (typeof a === "function")
		return Func(a);
	if (typeof a === "object")
		return Obj(a);
	if (typeof a === "symbol")
		return Sym(a);
	else {
		console.error("Couldn't do anything with this: ", a);
		throw new Error("Idk what the fuck you want to print");
	}
}