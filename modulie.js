var modulie = (function () {
	var scripts = {},
		pkgs = {},
		head = document.getElementsByTagName("head")[0];

	var ErrReference = "Reference Error:",
		ErrNotDefined = "is not defined";

	// List will list the current scripts and packages
	function List() {
		console.log(scripts, pkgs);
	};

	// Import will import all the necessary scripts to match each provided entry
	function Import(entries, onLoad, onError) {
		"use strict";

		var bySrc = {},
			returnObj = {},
			loadedN = 0,
			done = false;

		entries.forEach(sortEntry);
		var srcN = Object.keys(bySrc).length;

		for (var src in bySrc) {
			importEntries(src, bySrc[src], handleLoad, handleError);
		}

		function sortEntry(entry) {
			var arr = bySrc[entry.src];
			if (!arr) {
				bySrc[entry.src] = arr = [];
			}

			arr.push(entry);
		}

		function handleLoad(src, obj) {
			if (done) {
				return;
			}

			for (var key in obj) {
				returnObj[key] = obj[key]
			}

			loadedN++;
			if (loadedN < srcN) {
				return;
			}

			onLoad(returnObj);
			done = true;
		}

		function handleError(src, err) {
			if (done) {
				return;
			}

			done = true;
			onError(err);
		}
	};

	// Script represents a javascript file to be downloaded and parsed
	function Script(src) {
		var ele = document.createElement('object'),
			queue = [],
			data = "",
			loaded = false,
			error = false;

		this.getSrc = getSrc;
		this.getVals = function (entries, onLoad, onError) {
			if (loaded) {
				try {
					// Script has already loaded, fast path to return values
					onLoad(getVals(entries));
				} catch (err) {
					// For some reason, the first argument is not passed to the callback
					onError(null, err);
				}
			} else if (error) {
				// Script has encountered an error, call onError
				onError(src);
			} else {
				// Script has not yet loaded, push function to queue
				queue.push(newClosure(entries, onLoad, onError));
			}
		};

		download();

		function download() {
			ele.data = src;
			ele.type = "application/javascript";
			ele.width = 0;
			ele.height = 0;

			ele.onload = onLoad;
			ele.onerror = onError;

			document.body.appendChild(ele);
		}

		function onLoad(evt) {
			if (loaded) {
				console.error("load attempted after script loaded");
				return;
			}

			// Set data as the javascript text within the contentDocument
			data = getInner(ele);
			// Remove data object from DOM
			document.body.removeChild(ele);
			// Set loaded boolean to true
			loaded = true;
			// Call each queued function
			queue.forEach(function (fn) {
				fn();
			});
			// Clear queue
			queue = [];
		}

		function onError(err) {
			console.error("Error downloading " + src + ": ", err);
			// Remove data object from DOM
			document.body.removeChild(ele);
			// Set error boolean to true
			error = true;
			// Call each queued function
			queue.forEach(function (fn) {
				fn();
			});
		}

		function handleError(err) {
			console.log(err.indexOf(ErrReference));
		}

		// newClosure will create a new closure for queued functions
		function newClosure(entries, onLoad, onError) {
			return (function (entries, onLoad, onError) {
				return function () {
					if (error) {
						onError(src);
						return;
					}

					try {
						onLoad(getVals(entries));
					} catch (err) {
						// For some reason, the first argument is not passed to the callback
						onError(null, err);
					}
				}
			})(entries, onLoad, onError)
		}

		// getSrc will get the source of a script
		function getSrc() {
			return src;
		}

		// getVals will get the values of the provided entries
		function getVals(entries) {
			var returnObj = {};
			// Parse javascript text
			eval(data);

			entries.forEach(function (entry) {
				// Set the return object key as the package with the provided name
				returnObj[entry.key] = eval(entry.name);
			});

			return returnObj;
		}

		// getInner will get the inner value of the contentDocument 
		function getInner(o) {
			return o.contentDocument.body.childNodes[0].innerHTML;
		}
	}

	// Entry is an import entry
	// src - Source of the javascript module
	// name - Name of the import module
	// key - Reference for name (if key needs to differ from the official name, commonly used for version control)
	function Entry(src, name, key) {
		"use strict";

		this.src = src;
		this.name = getName();
		this.key = getKey();

		function getName() {
			if (!!name) {
				return name;
			}

			var splt = src.split("/", -1),
				last = splt[splt.length - 1];

			return last.split(".", 1)[0];
		}

		function getKey() {
			if (!!key) {
				return key;
			}

			return getName();
		}
	}

	// Exports represents the exports fields for the module
	function Exports() {
		this.Import = Import;
		this.Entry = Entry;
	}

	// importEntries will import a list of entries for a given source
	function importEntries(src, entries, onLoad, onError) {
		var returnObj = {},
			s = scripts[src];

		if (!s) {
			// Script at this source does not yet exist, create it
			s = scripts[src] = new Script(src);
		}

		// Attempt to populate entries from cache
		entries.forEach(getFromCache);
		// Get values of the remaining entries which do not yet exist in cache
		s.getVals(entries.filter(packageDoesntExist), handleLoad, onError);

		function getFromCache(entry) {
			var pkg = pkgs[entry.key];
			if (!!pkg) {
				// Package exists in cache, set it within the return object
				returnObj[entry.key] = pkg;
			}
		}

		function packageDoesntExist(entry) {
			return !returnObj[entry.key];
		}

		function handleLoad(obj) {
			for (var key in obj) {
				var pkg = obj[key];
				// Set the package for the specified key within the return object
				returnObj[key] = pkg;
				// Ensure the package is still empty before setting
				if (!pkgs[key]) {
					pkgs[key] = pkg
				}
			}

			onLoad(src, returnObj);
		}
	}

	return new Exports;
})();