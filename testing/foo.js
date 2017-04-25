var foo = (function(){
	function Greet(){
		console.log("Hello world! This is foo");
	}

	function Exports(){
		this.Greet = Greet;
	}

	return new Exports;
})();

var bar = (function(){
	function Greet(){
		console.log("Hello world! This is bar");
	}

	function Exports(){
		this.Greet = Greet;
	}

	return new Exports;
})();

// Note: Populating the map object is only required if you want automatic mapping of the file's modules
var __map = __map || {};
__map["foo.js"] = ["foo","bar"];