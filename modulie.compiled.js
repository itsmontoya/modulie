var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,e){if(e.get||e.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=e.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return $jscomp.SYMBOL_PREFIX+(a||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var e=0,d={next:function(){if(e<a.length){var f=e++;return{value:b(f,a[f]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};
$jscomp.polyfill=function(a,b,e,d){if(b){e=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var f=a[d];f in e||(e[f]={});e=e[f]}a=a[a.length-1];d=e[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(e,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6-impl","es3");
var modulie=function(){function a(){console.log(m,k)}function b(a,e,b){function r(a,c){if(!l){for(var b in c)g[b]=c[b];h++;h<u||(e(g),l=!0)}}function d(a,c){l||(l=!0,b(c))}var c={},g={},h=0,l=!1;a.forEach(function(a){var b=c[a.src];b||(c[a.src]=b=[]);b.push(a)});var u=Object.keys(c).length,q;for(q in c)f(q,c[q],r,d)}function e(a){function b(c,b,d){return function(c,b,d){return function(){if(h)d(a);else try{b(e(c))}catch(v){d(null,v)}}}(c,b,d)}function e(a){var c={};eval(f);a.forEach(function(a){null===
a.name||(c[a.key]=eval(a.name))});return c}var c=document.createElement("object"),d=[],f="",g=!1,h=!1;this.getSrc=function(){return a};this.getVals=function(c,f,n){if(g)try{f(e(c))}catch(t){n(null,t)}else h?n(a):d.push(b(c,f,n))};c.data=a;c.type="application/javascript";c.width=0;c.height=0;c.onload=function(a){g?console.error("load attempted after script loaded"):(f=c.contentDocument.body.childNodes[0].innerHTML,document.body.removeChild(c),g=!0,d.forEach(function(a){a()}),d=[])};c.onerror=function(b){console.error("Error downloading "+
a+": ",b);document.body.removeChild(c);h=!0;d.forEach(function(a){a()})};document.body.appendChild(c)}function d(a,b,d){function c(){if(void 0!==b)return b;var c=a.split("/",-1);return c[c.length-1].split(".",1)[0]}this.src=a;this.name=c();d=void 0!==d?d:c();this.key=d}function f(a,b,d,f){var c={},p=m[a];p||(p=m[a]=new e(a));b.forEach(function(a){var b=k[a.key];b&&(c[a.key]=b)});p.getVals(b.filter(function(a){return!c[a.key]}),function(b){for(var e in b){var f=b[e];c[e]=f;k[e]||(k[e]=f)}d(a,c)},f)}
var m={},k={};document.getElementsByTagName("head");return new function(){this.Import=b;this.List=a;this.Entry=d}}();
