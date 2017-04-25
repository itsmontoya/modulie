# Modulie
Modulie is a simple module import manager for Javascript in the browser. 

## But, why?
Although there are a few industry-standard solutions for Javascript module imports, nothing felt quite right to me. I wanted to be able to import modules while having the experience feel clean and simple. 

# Usage
```javascript
function main() {
	// Some notes on Entries:
	// - Calling an entry without a name will automatically assign the source filename
	//		with extension removed (foo.js -> foo)
	// - Calling an entry without a key will automatically assign the name value
	modulie.Import([
		// Imports the foo module as "foo"
		new modulie.Entry("foo.js"), 
		// Allows to import the foo module as "foo2"
		new modulie.Entry("foo.js", "foo", "foo2") 
	], onLoad, onError);

	function onLoad(obj) {
		console.log("Loaded", obj);
		obj.foo(); // Will call foo.js's function named "foo"
	};

	function onError(err) {
		console.error("Error?", err)
	};
}

// Wait for the document to populate before starting Javascript main function
setTimeout(main, 0);
```
