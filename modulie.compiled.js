var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,d,b){if(b.get||b.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[d]=b.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return $jscomp.SYMBOL_PREFIX+(a||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var d=0;return $jscomp.iteratorPrototype(function(){return d<a.length?{done:!1,value:a[d++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,d){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var b=0,e={next:function(){if(b<a.length){var f=b++;return{value:d(f,a[f]),done:!1}}e.next=function(){return{done:!0,value:void 0}};return e.next()}};e[Symbol.iterator]=function(){return e};return e};
$jscomp.polyfill=function(a,d,b,e){if(d){b=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var f=a[e];f in b||(b[f]={});b=b[f]}a=a[a.length-1];e=b[a];d=d(e);d!=e&&null!=d&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:d})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6-impl","es3");
var modulie=function(){function a(){console.log(h,k)}function d(a,b,d){function e(a,t){if(!l){for(var r in t)c[r]=t[r];m++;m<u||(b(c),l=!0)}}function p(a,c){l||(l=!0,d(c))}var g={},c={},m=0,l=!1;a.forEach(function(a){var c=g[a.src];c||(g[a.src]=c=[]);c.push(a)});var u=Object.keys(g).length,q;for(q in g)f(q,g[q],e,p)}function b(a){function b(){c.removeEventListener("load",d);c.removeEventListener("error",e);c.parentNode===document.body&&document.body.removeChild(c)}function d(a){f?console.error("load attempted after script loaded"):
(l=c.contentDocument.body.childNodes[0].innerHTML,b(),f=!0,m.forEach(function(a){a()}),m=[])}function e(c){console.error("Error downloading "+a+": ",c);b();h=!0;m.forEach(function(a){a()})}function p(c,b,d){return function(c,b,d){return function(){if(h)d(a);else try{b(g(c))}catch(w){d(null,w)}}}(c,b,d)}function g(a){var c={},d={},b=!1;eval(l);a.forEach(function(a){null===a.name?b=!0:c[a.key]=eval(a.name)});for(var e in d)(a=k[e])||(a=eval(e)),!c[e]&&b&&(c[e]=a),k[e]||(k[e]=a);return c}var c=document.createElement("object"),
m=[],l="",f=!1,h=!1;this.getSrc=function(){return a};this.getVals=function(c,b,d){if(f)try{b(g(c))}catch(v){d(null,v)}else h?d(a):m.push(p(c,b,d))};c.data=a;c.type="application/javascript";c.width=0;c.height=0;c.addEventListener("load",d);c.addEventListener("error",e);document.body.appendChild(c)}function e(a,d,b){function e(){if(void 0!==d)return d;var b=a.split("/",-1);return b[b.length-1].split(".",1)[0]}this.src=a;this.name=e();b=void 0!==b?b:e();this.key=b}function f(a,d,e,f){var n={},g=h[a];
g||(g=h[a]=new b(a));d.forEach(function(a){var c=k[a.key];c&&(n[a.key]=c)});g.getVals(d.filter(function(a){return!n[a.key]}),function(c){for(var b in c){var d=c[b];n[b]=d;k[b]||(k[b]=d)}e(a,n)},f)}var h={},k={};document.getElementsByTagName("head");return new function(){this.Import=d;this.List=a;this.Entry=e}}();
