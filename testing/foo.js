var foo = (function(){
	function Bar(){
		console.log("bar!");
	}

	function Exports(){
		this.Bar = Bar;
	}

	return new Exports;
})();