function main() {
	modulie.Import([
		new modulie.Entry("foo.js"), // Imports the foo module as "foo"
		new modulie.Entry("foo.js", "foo", "foo2") // Allows to import the foo module as "foo2"
	], onLoad, onError);

	function onLoad(obj) {
		console.log("Loaded", obj);
	};

	function onError(err) {
		console.log("Error?", err)
	};
}

setTimeout(main, 0);