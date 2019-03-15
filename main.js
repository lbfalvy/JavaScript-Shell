/**
 * Example function for a command prompt.
 * This is unsuitable for 
 */
async function main() {
	// Setting time display style
	DateTime.display = d => d.toLocaleString("HU");
	// Setting history length.
	// Lower values use less memory
	write.bufferSize = 50;
	print( // Greeting message
		"JS shell v0.0.1", BR,
		"Made by: Lorinc Bethlenfalvy", BR,
		"Licensed under GNU GPLv3"
	);
	// setting the starting context
	_ = document;
	// Main loop
	while (true) {
		var cmd = await query(_, " << ");
		try {
			var ret = eval.call(window, cmd);
			if (ret !== undefined)
				print(" >> ",ret);
		} catch(e) {
			print(" !! ",e);
		}
	}
	return;
}
window.addEventListener("load", main);