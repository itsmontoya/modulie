var modulie = (function () {
	//"use strict"

	var m = new Modulie(),
		scripts = {},
		pkgs = {},
		head = document.getElementsByTagName("head")[0];

	function Modulie() { }

	// List will list the current scripts and packages
	Modulie.prototype.List = function () {
		console.log(scripts, pkgs);
	};

	Modulie.prototype.Import = function (entries, onLoad, onError) {
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

			console.error(err);
			onError(err);
			done = true;
		}
	};

	function Script(src) {
		var ele = document.createElement('object'),
			queue = [],
			data = "",
			loaded = false,
			error = false;

		this.getSrc = getSrc;
		this.getVals = function (entries, onLoad, onError) {
			if (loaded) {
				console.log("Fast path bitches")
				onLoad(getVals(entries));
				return;
			} else if (error) {
				onError(src);
				return;
			}

			queue.push(newClosure(entries, onLoad, onError));
		};

		download();

		function download() {
			ele.data = src;
			ele.type = "application/javascript";
			ele.width = 0;
			ele.height = 0;

			ele.onload = onLoad;
			ele.onrror = onError;

			document.body.appendChild(ele);
		}

		function onLoad(evt) {
			if (loaded) {
				console.error("load attempted after script loaded");
				return;
			}

			data = getInner(ele);
			loaded = true;

			queue.forEach(function (fn) {
				fn();
			});

			queue = [];
			document.body.removeChild(ele);
		}

		function onError(err) {
			console.error("Error downloading " + src + ": ", err);
			document.body.removeChild(ele);

			queue.forEach(function (fn) {
				fn();
			});

			error = true;
		}

		function newClosure(entries, onLoad, onError) {
			return (function (entries, onLoad, onError) {
				return function () {
					if (error) {
						onError(src);
						return;
					}

					onLoad(getVals(entries));
				}
			})(entries, onLoad, onError)
		}


		function getSrc() {
			return src;
		}

		function getVals(entries) {
			var returnObj = {};
			eval(data);

			entries.forEach(function (entry) {
				returnObj[entry.key] = eval(entry.name);
			});

			return returnObj;
		}

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
		this.Import = m.Import;
		this.Entry = Entry;
	}

	// importEntries will import a list of entries for a given source
	function importEntries(src, entries, onLoad, onError) {
		var returnObj = {},
			s = scripts[src];

		if (!s) {
			s = scripts[src] = new Script(src);
		}

		entries.forEach(getFromCache);
		s.getVals(entries.filter(packageDoesntExist), handleLoad, onError);

		function getFromCache(entry) {
			var pkg = pkgs[entry.key];
			if (!!pkg) {
				returnObj[entry.key] = pkg;
			}
		}

		function packageDoesntExist(entry) {
			return !returnObj[entry.key];
		}

		function handleLoad(obj) {
			for (var key in obj) {
				// Ensure the package is still empty
				if (!pkgs[key]) {
					returnObj[key] = pkgs[key] = obj[key];
				}

			}

			onLoad(src, returnObj);
		}
	}

	return new Exports;
})();