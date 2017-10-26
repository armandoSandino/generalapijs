/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
__webpack_require__(7);
__webpack_require__(9);
__webpack_require__(11);
__webpack_require__(13);
__webpack_require__(29);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./googlefontcss.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./googlefontcss.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Roboto Light'), local('Roboto-Light'), url(/0eC6fl06luXEYWpBSJvXCBJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+0460-052F, U+20B4, U+2DE0-2DFF, U+A640-A69F;\n}\n/* cyrillic */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Roboto Light'), local('Roboto-Light'), url(/Fl4y0QdOxyyTHEGMXX8kcRJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* greek-ext */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Roboto Light'), local('Roboto-Light'), url(/-L14Jk06m6pUHB-5mXQQnRJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+1F00-1FFF;\n}\n/* greek */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Roboto Light'), local('Roboto-Light'), url(/I3S1wsgSg9YCurV6PUkTORJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+0370-03FF;\n}\n/* vietnamese */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Roboto Light'), local('Roboto-Light'), url(/NYDWBdD4gIq26G5XYbHsFBJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Roboto Light'), local('Roboto-Light'), url(/Pru33qjShpZSmG3z6VYwnRJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Roboto Light'), local('Roboto-Light'), url(/Hgo13k-tfSpn0qi1SFdUfVtXRa8TVwTICgirnJhmVJw.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n/* cyrillic-ext */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(/ek4gzZ-GeXAPcSbHtCeQI_esZW2xOQ-xsNqO47m55DA.woff2) format('woff2');\n  unicode-range: U+0460-052F, U+20B4, U+2DE0-2DFF, U+A640-A69F;\n}\n/* cyrillic */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(/mErvLBYg_cXG3rLvUsKT_fesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* greek-ext */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(/-2n2p-_Y08sg57CNWQfKNvesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');\n  unicode-range: U+1F00-1FFF;\n}\n/* greek */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(/u0TOpm082MNkS5K0Q4rhqvesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');\n  unicode-range: U+0370-03FF;\n}\n/* vietnamese */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(/NdF9MtnOpLzo-noMoG0miPesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');\n  unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(/Fcx7Wwv8OzT71A3E1XOAjvesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(/CWB0XYA8bzo0kSThX0UTuA.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n/* cyrillic-ext */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Roboto Medium'), local('Roboto-Medium'), url(/ZLqKeelYbATG60EpZBSDyxJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+0460-052F, U+20B4, U+2DE0-2DFF, U+A640-A69F;\n}\n/* cyrillic */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Roboto Medium'), local('Roboto-Medium'), url(/oHi30kwQWvpCWqAhzHcCSBJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* greek-ext */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Roboto Medium'), local('Roboto-Medium'), url(/rGvHdJnr2l75qb0YND9NyBJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+1F00-1FFF;\n}\n/* greek */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Roboto Medium'), local('Roboto-Medium'), url(/mx9Uck6uB63VIKFYnEMXrRJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+0370-03FF;\n}\n/* vietnamese */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Roboto Medium'), local('Roboto-Medium'), url(/mbmhprMH69Zi6eEPBYVFhRJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Roboto Medium'), local('Roboto-Medium'), url(/oOeFwZNlrTefzLYmlVV1UBJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Roboto Medium'), local('Roboto-Medium'), url(/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n/* cyrillic-ext */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Roboto Bold'), local('Roboto-Bold'), url(/77FXFjRbGzN4aCrSFhlh3hJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+0460-052F, U+20B4, U+2DE0-2DFF, U+A640-A69F;\n}\n/* cyrillic */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Roboto Bold'), local('Roboto-Bold'), url(/isZ-wbCXNKAbnjo6_TwHThJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* greek-ext */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Roboto Bold'), local('Roboto-Bold'), url(/UX6i4JxQDm3fVTc1CPuwqhJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+1F00-1FFF;\n}\n/* greek */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Roboto Bold'), local('Roboto-Bold'), url(/jSN2CGVDbcVyCnfJfjSdfBJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+0370-03FF;\n}\n/* vietnamese */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Roboto Bold'), local('Roboto-Bold'), url(/PwZc-YbIL414wB9rB1IAPRJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Roboto Bold'), local('Roboto-Bold'), url(/97uahxiqZRoncBaCEI3aWxJtnKITppOI_IvcXXDNrsc.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face{\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Roboto Bold'), local('Roboto-Bold'), url(/d-6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n/* cyrillic-ext */\n@font-face{\n  font-family: 'Roboto';\n  font-style: italic;\n  font-weight: 400;\n  src: local('Roboto Italic'), local('Roboto-Italic'), url(/WxrXJa0C3KdtC7lMafG4dRTbgVql8nDJpwnrE27mub0.woff2) format('woff2');\n  unicode-range: U+0460-052F, U+20B4, U+2DE0-2DFF, U+A640-A69F;\n}\n/* cyrillic */\n@font-face{\n  font-family: 'Roboto';\n  font-style: italic;\n  font-weight: 400;\n  src: local('Roboto Italic'), local('Roboto-Italic'), url(/OpXUqTo0UgQQhGj_SFdLWBTbgVql8nDJpwnrE27mub0.woff2) format('woff2');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* greek-ext */\n@font-face{\n  font-family: 'Roboto';\n  font-style: italic;\n  font-weight: 400;\n  src: local('Roboto Italic'), local('Roboto-Italic'), url(/1hZf02POANh32k2VkgEoUBTbgVql8nDJpwnrE27mub0.woff2) format('woff2');\n  unicode-range: U+1F00-1FFF;\n}\n/* greek */\n@font-face{\n  font-family: 'Roboto';\n  font-style: italic;\n  font-weight: 400;\n  src: local('Roboto Italic'), local('Roboto-Italic'), url(/cDKhRaXnQTOVbaoxwdOr9xTbgVql8nDJpwnrE27mub0.woff2) format('woff2');\n  unicode-range: U+0370-03FF;\n}\n/* vietnamese */\n@font-face{\n  font-family: 'Roboto';\n  font-style: italic;\n  font-weight: 400;\n  src: local('Roboto Italic'), local('Roboto-Italic'), url(/K23cxWVTrIFD6DJsEVi07RTbgVql8nDJpwnrE27mub0.woff2) format('woff2');\n  unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face{\n  font-family: 'Roboto';\n  font-style: italic;\n  font-weight: 400;\n  src: local('Roboto Italic'), local('Roboto-Italic'), url(/vSzulfKSK0LLjjfeaxcREhTbgVql8nDJpwnrE27mub0.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face{\n  font-family: 'Roboto';\n  font-style: italic;\n  font-weight: 400;\n  src: local('Roboto Italic'), local('Roboto-Italic'), url(/vPcynSL0qHq_6dX7lKVByfesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./general.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./general.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".cycle{\n\tposition:relative;\n\tdisplay:block;\n\tfloat:none;\n}\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "html {\n\tscroll-behavior: smooth;\n}\n\nbody {\n\tmargin: 0 auto;\n\tmax-width: 500px;\n}\n\nli {\n\tpadding: 5px 0;\n}\n\n#css-support-msg {\n\ttext-align: center;\n\tcolor: green;\n\t\n\tdisplay: none;\n}\n\n#css-support-msg.supported {\n\tdisplay: block;\n}\n\nsection:focus {\n\toutline: none;\n}", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./main.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "#slider-wrapper-slide {\n\twidth:100%;\n\theight: 300px;\n\tposition: relative;\n\tfloat:none;\n\tdisplay:block;\n\ttransition: left 400ms linear;\n}", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright (C) 2016 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.

  La redistribución y uso en formatos fuente y binario están permitidas
  siempre que el aviso de copyright anterior y este párrafo son
  duplicado en todas esas formas y que cualquier documentación,
  materiales de publicidad y otros materiales relacionados con dicha
  distribución y uso reconocen que el software fue desarrollado
  por el Arturo Vasquez Soluciones Web. El nombre de
  Arturo Vasquez Soluciones Web No se puede utilizar para respaldar o promocionar productos derivados
  de este software sin el permiso previo por escrito.
  ESTE SOFTWARE SE PROPORCIONA '' tal cual '' Y SIN EXPRESA O
  Garantías implícitas, incluyendo, sin limitación, los implicados
  GARANTÍAS DE COMERCIALIZACIÓN Y APTITUD PARA UN PROPÓSITO PARTICULAR.
*/
__webpack_require__(14);
datab=__webpack_require__(15);
var is=__webpack_require__(16);
var TinyAnimate=__webpack_require__(17);
var move=__webpack_require__(18);
var watchjs = __webpack_require__(28);
var watch = watchjs.watch;
var unwatch = watchjs.unwatch;
var callWatchers = watchjs.callWatchers;
var hex_chr;
var isreadybit=0;
var cadena;
var idreal;
var objeto;
var scopeg;
var numapps=0;
var workers={};
var numworkers=0;
var sockets={};
var numsockets=0;
hex_chr="0123456789abcdef";
g=(function(){
	function easeInOutQuad(t, b, c, d){
	  t /= d / 2;
	  if (t < 1) return c / 2 * t * t + b;
	  t--;
	  return -c / 2 * (t * (t - 2) - 1) + b;
	};
	function wrap(el, wrapper) {
	    el.parentNode.insertBefore(wrapper, el);
	    wrapper.appendChild(el);
	};
	function createScope(){
		scopenom="generalapp";
		g.dom("html").addAttrb("id","appdata"+numapps);
		g.dom("html").addAttrb("name","appdata"+numapps);
		g.dom("html").addAttrb("data-scope",scopenom);
		var attrbdata=g.dom("html").getAttrb("data-scope");
		glog("SCOPE ATTRB ");
		glog(attrbdata[0]);
		var model = new datab.Model(scopenom);
		glog("databind******************");
		glog("nombre del scope******************");
		glog(model.scope + "********************");
		glog("nombre del scope******************");
		glog(model);
		numapps++;
	}
	function prop(element,proper){
		//busca dentro del objeto y devuelve solo la primera acepcion
		var obj;
		var val;
		obj=getelTag(element);
		if(is.isObject(obj)){
		  	result=obj[0].getAttribute(proper);
			return result;
		}
	}
	function propAll(proper){
		//busca dentro del objeto y devuelve solo la primera acepcion
		var val='';
		var array_tags=[];
		var array_final=[];
		var i=0;
		array_tags=getelTag(proper);
		if(array_tags.length>0){
			for(i=0;i<array_tags.length;i++){
				array_final[i]=array_tags[i];
			}
			return array_final;
		}
	}
	function getScreenCordinates(obj) {
        var p = {};
        p.x = obj.offsetLeft;
        p.y = obj.offsetTop;
        while (obj.offsetParent) {
            p.x = p.x + obj.offsetParent.offsetLeft;
            p.y = p.y + obj.offsetParent.offsetTop;
            if (obj == document.getElementsByTagName("body")[0]) {
                break;
            }
            else {
                obj = obj.offsetParent;
            }
        }
        return p;
	};
	function glog(msg){
		console.log(msg);
	};
	function getdisctId(id){
		var cadena;
		if(typeof id==='string'){
			cadena=id;
	      	if(cadena.search("#")==0){
	        	objeto=document.querySelector(id);
	      	}
	      	else if(cadena.search(".")==0){
				objeto=document.querySelector(id);
			}
			else{
				return -1;
			}
			return objeto;
		}
	};
	function getobjtype(id){
		var cadena;
		var typestr;
		if(typeof id==='string'){
			cadena=id;
	      	if(cadena.search("#")==0){
	        	typestr="id";
	      	}
	      	else if(cadena.search(".")==0){
				typestr="class";
			}
			else{
				typestr="element";
			}
			return typestr;
		}
	};
	function getnameid(id){
		var cadena;
          var idreal;
          var filareal;
          cadena=id;
          if(cadena.search("#")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              filareal=idreal;
          }
          else if(cadena.search(".")==0){
              idreal=id.replace("#","");
              idreal=idreal.replace(".","");
              filareal=idreal;
          }
          else{
              return -1;
          }
          return  filareal;
	};
	function getelTag(tag){
		var arrtags=[];
		if(tag!=undefined){
			arrtags=document.querySelectorAll(tag);
			return arrtags;
		}
		else{
			return -1;
		}
	};
	function valobj(objval){
        var valor;
        var obj;
        var args;
        var tovalue;
        obj=getdisctId(objval);
        if(obj.type!='select-one' && obj.type!="file"){
			valor=obj.value;
        }
        else{
        	if(obj.type=="file"){
        		valor=obj.files[0];
        	}
        	else{
        		valor=obj.options[obj.selectedIndex].value;
        	}
        }
        return valor;
   };
   function setval(objval,value){
        var valor;
        var obj;
        var args;
        var tovalue;
        obj=getdisctId(objval);
        if(obj.type!='select-one' && obj.type!="file"){
			obj.value=value;
        }
        return 0;
   };
    function version(){
    	return "0.0.1";
    };
	function intfadeIn(elem,tiempo){
			var op = 0.1;  // initial opacity
		    var intervalo=tiempo/80;
		    var element;
		    element=elem;
		    glog(element);
		    element.style.display = 'block';
		    var timer = setInterval(function(){
	        if (op >= 1){
	            clearInterval(timer);
	        }
	        element.style.opacity = op;
	        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
		        op += op * 0.1;
		    }, intervalo);
	  };
	  function intfadeOut(elem,tiempo){
	    var op = 1;  // initial opacity
		var intervalo=tiempo/80;
		var element;
		element=elem;
		var timer = setInterval(function(){
	    if (op <= 0.1){
	        clearInterval(timer);
	        element.style.display = 'none';
	    }
	    element.style.opacity = op;
	    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
	        op -= op * 0.1;
	    }, intervalo);
	 };
	return{
		//Describir funciones públicas
		init: function(){
			createScope();
		},
		getdisctId: function(id){
			var objeto;
			objeto=getdisctId(id);
			return objeto;
		},
		getnameid: function(id){
			var objeto;
			objeto=getnameid(id);
			return  objeto;
		},
		getelTag: function(id){
			var arrtags=[];
			arrtags=getelTag(id);
			return  arrtags;
		},
		log: function(msg){
			console.log(msg);
	    },
	    map: function(array,callbackmap){
	    	var val,index;
			if(array.isArray()){
				array.map(callbackmap);
			}
	    },
		propAll:function(prper){
	      	//busca dentro del objeto y devuelve solo la primera acepcion
			var obj;
			obj=propAll(prper);
			return obj;
		},
		create:function(domelement){
			document.createElement(domelement);
		},
	    slice: function(array,start,end,callbackslc){
			if(array.isArray()){
				callbackslc(array.slice(start, end));
			}
	    },
	    encb64: function(string){
			return atob(string)
	    },
	    decb64: function(string){
			return btoa(string);
	    },
		docready: function(fn){
			if(document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
				fn();
			}
			else{
		    	document.addEventListener('DOMContentLoaded', fn);
			}
		},
		each:function(objeto,callbackeach){
	      	var initial_array;
	      	var x,y,valor,indice;
	        if(is.isObject(objeto)){
	        	objeto.forEach(callbackeach);
	        }
	        else{
	        	glog("Is not an array!");
	        }
		},
		extend:function(out){
			out = out || {};
			for (var i = 1; i < arguments.length; i++) {
				if (!arguments[i]){
					continue;
				}
				for (var key in arguments[i]) {
					if (arguments[i].hasOwnProperty(key)){
						out[key] = arguments[i][key];
					}
				}
			}
			return out;
		},
	    preventDefault: function(e){
			if(e.preventDefault){
				e.preventDefault();
			}
	    },
	    stopPropagation: function(e){
			if(e.stopPropagation){
				e.stopPropagation();
			}
	    },
	    browser: function(){
			//Detect browser and write the corresponding name
			if (navigator.userAgent.search("MSIE") >= 0){
			    glog('"MS Internet Explorer ');
			    var position = navigator.userAgent.search("MSIE") + 5;
			    var end = navigator.userAgent.search("; Windows");
			    var version = navigator.userAgent.substring(position,end);
			    glog(version + '"');
			}
			else if (navigator.userAgent.search("Chrome") >= 0){
				glog('"Google Chrome ');// For some reason in the browser identification Chrome contains the word "Safari" so when detecting for Safari you need to include Not Chrome
			    var position = navigator.userAgent.search("Chrome") + 7;
			    var end = navigator.userAgent.search(" Safari");
			    var version = navigator.userAgent.substring(position,end);
			    glog(version + '"');
			}
			else if (navigator.userAgent.search("Firefox") >= 0){
			    glog('"Mozilla Firefox ');
			    var position = navigator.userAgent.search("Firefox") + 8;
			    var version = navigator.userAgent.substring(position);
			    glog(version + '"');
			}
			else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0){//<< Here
			    glog('"Apple Safari ');
			    var position = navigator.userAgent.search("Version") + 8;
			    var end = navigator.userAgent.search(" Safari");
			    var version = navigator.userAgent.substring(position,end);
			    glog(version + '"');
			}
			else if (navigator.userAgent.search("Opera") >= 0){
			    glog('"Opera ');
			    var position = navigator.userAgent.search("Version") + 8;
			    var version = navigator.userAgent.substring(position);
			    glog(version + '"');
			}
			else{
			    glog('"Other"');
			}
			return navigator.userAgent;
	    },
	    rReplace: function(direccion,variable,valor){
	        location.replace([direccion]+"?"+[variable]+"="+[valor]);
	    },
	    rHref: function(direccion,variable,valor){
	        location.href([direccion]+"?"+[variable]+"="+[valor]);
	    },
	    base64_encode: function(cadena){
	        return btoa(cadena);
	    },
	    base64_decode: function(cadena){
	        return atob(cadena);
	    },
	    getParam: function(name){
	            var regexS = "[\\?&]"+name+"=([^&#]*)";
	            var regex = new RegExp ( regexS );
	            var tmpURL = window.location.href;
	            var results = regex.exec( tmpURL );
	            if(results==null){
	                    return"";
	            }
	            else{
	                return results[1];
	            }
	    },
	    utf8_encode: function(argString){
	      //  discuss at: http://phpjs.org/functions/utf8_encode/
	      // original by: Webtoolkit.info (http://www.webtoolkit.info/)
	      // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	      // improved by: sowberry
	      // improved by: Jack
	      // improved by: Yves Sucaet
	      // improved by: kirilloid
	      // bugfixed by: Onno Marsman
	      // bugfixed by: Onno Marsman
	      // bugfixed by: Ulrich
	      // bugfixed by: Rafal Kukawski
	      // bugfixed by: kirilloid
	      //   example 1: utf8_encode('Kevin van Zonneveld');
	      //   returns 1: 'Kevin van Zonneveld'
	      if (argString === null || typeof argString === 'undefined'){
	        return '';
	      }
	      var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	      var utftext = '',
	        start, end, stringl = 0;

	      start = end = 0;
	      stringl = string.length;
	      for (var n = 0; n < stringl; n++){
	        var c1 = string.charCodeAt(n);
	        var enc = null;

	        if (c1 < 128){
	          end++;
	        } else if (c1 > 127 && c1 < 2048){
	          enc = String.fromCharCode(
	            (c1 >> 6) | 192, (c1 & 63) | 128
	          );
	        } else if ((c1 & 0xF800) != 0xD800){
	          enc = String.fromCharCode(
	            (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
	          );
	        } else { // surrogate pairs
	          if ((c1 & 0xFC00) != 0xD800){
	            throw new RangeError('Unmatched trail surrogate at ' + n);
	          }
	          var c2 = string.charCodeAt(++n);
	          if ((c2 & 0xFC00) != 0xDC00){
	            throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
	          }
	          c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
	          enc = String.fromCharCode(
	            (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
	          );
	        }
	        if (enc !== null){
	          if (end > start){
	            utftext += string.slice(start, end);
	          }
	          utftext += enc;
	          start = end = n + 1;
	        }
	      }

	      if (end > start){
	        utftext += string.slice(start, stringl);
	      }

	      return utftext;
	    },
	    utf8_decode: function(str_data){
	      //  discuss at: http://phpjs.org/functions/utf8_decode/
	      // original by: Webtoolkit.info (http://www.webtoolkit.info/)
	      //    input by: Aman Gupta
	      //    input by: Brett Zamir (http://brett-zamir.me)
	      // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	      // improved by: Norman "zEh" Fuchs
	      // bugfixed by: hitwork
	      // bugfixed by: Onno Marsman
	      // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	      // bugfixed by: kirilloid
	      //   example 1: utf8_decode('Kevin van Zonneveld');
	      //   returns 1: 'Kevin van Zonneveld'

	      var tmp_arr = [],
	        i = 0,
	        ac = 0,
	        c1 = 0,
	        c2 = 0,
	        c3 = 0,
	        c4 = 0;

	      str_data += '';

	      while (i < str_data.length){
	        c1 = str_data.charCodeAt(i);
	        if (c1 <= 191){
	          tmp_arr[ac++] = String.fromCharCode(c1);
	          i++;
	        } else if (c1 <= 223){
	          c2 = str_data.charCodeAt(i + 1);
	          tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
	          i += 2;
	        } else if (c1 <= 239){
	          // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
	          c2 = str_data.charCodeAt(i + 1);
	          c3 = str_data.charCodeAt(i + 2);
	          tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	          i += 3;
	        } else {
	          c2 = str_data.charCodeAt(i + 1);
	          c3 = str_data.charCodeAt(i + 2);
	          c4 = str_data.charCodeAt(i + 3);
	          c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
	          c1 -= 0x10000;
	          tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));
	          tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
	          i += 4;
	        }
	      }

	      return tmp_arr.join('');
	    },
	    getURLComplete: function(){
	        return window.location.href;
	    },
	    getDomain: function(){
	        return document.domain;
	    },
	    getURI: function(){
	        var request_uri;
	        request_uri=location.pathname + location.search;
	        return request_uri;
	    },
	    explode: function(variab, delimiter){
	      var arraystr;
	      return variab.split(delimiter);
	    },
	    gotolocal: function(valselect){
	      var URL;
	      URL=valselect;
	      location.href=URL;
	    },
	    gotoremote: function(valselect){
	      var URL;
	      URL="http://"+valselect;
	      location.href=URL;
	    },
		  parseHTML:function(str){
			  var tmp = document.implementation.createHTMLDocument();
			  tmp.body.innerHTML = str;
			  return tmp.body.children;
		  },
		  parseJSON:function(json){
			  return JSON.parse(json);
		  },
		dom: function(domel){
				return{
					hide: function(){
						var fila;
						if(!document.getElementById){
							return false;
						}
						fila=getdisctId(domel);
						fila.style.display="none";
					},
					show:function(){
						var domelement;
						if(!document.getElementById){
							return false;
						}
			          	domelement=getdisctId(domel);
						domelement.style.display="block";
					},
					css:function(estilo){
				        var domelement;
				          if(!document.getElementById){
				              return false;
				          }
				          if(estilo==''){
				              return false;
				          }
				          domelement=getdisctId(domel);
				          domelement.style=estilo;
					},
					find:function(selector,callbackfind){
						// Final found elements
						var found_elements = [];
						var i;
						// Find all the outer matched elements
						var outers = document.querySelectorAll(domel);
						for(i=0;i<outers.length;i++){
							var elements_in_outer=outers[i].querySelectorAll(selector);
							// document.querySelectorAll() returns an "array-like" collection of elements
						// convert this "array-like" collection to an array
							elements_in_outer=Array.prototype.slice.call(elements_in_outer);
							found_elements=found_elements.concat(elements_in_outer);
						}
						// The final 4 elements
						if(found_elements.length>0){
							glog(found_elements);
							callbackfind(found_elements);
						}
				      },
				      each:function(callbackeach){
				      	var objeto;
				      	var x,y,valor,indice;
				      	objeto=getelTag(domel);
				        if(is.isObject(objeto)){
				        	objeto.forEach(callbackeach);
				        }
				        else{
				        	glog("Is not an object!");
				        }
				      },
				      empty:function(){
				      	var objeto;
				      	objeto=getdisctId(domel);
				        objeto.innerHTML='';
				      },
				      wrap:function(){
				      	var objeto;
				      	objeto=getdisctId(domel);
						wrap(objeto, g.create('div'));
				      },
				      prop:function(prper){
				      	//busca dentro del objeto y devuelve solo la primera acepcion
						var obj;
						obj=prop(domel,prper);
						if(is.isObject(obj)){
							return obj;
						}
				      },
				      unwrap:function(docunw){
				      	var objeto;
				      	objeto=getdisctId(docunw);
						// get the element's parent node
						var parent = objeto.parentNode;
						// move all children out of the element
						while (objeto.firstChild) parent.insertBefore(objeto.firstChild, objeto);
						// remove the empty element
						parent.removeChild(objeto);
				      },
				      html:function(){
				      	var objeto;
				      	objeto=getdisctId(domel);
				      	const args = Array.from(arguments);
				      	if(args[0]!=undefined){
				      		string=args[0];
				      		objeto.innerHTML = string;
				      	}
				      	else{
				      		return objeto.innerHTML;
				      	}
				      },
				      text:function(){
				      	var objeto;
				      	objeto=getdisctId(domel);
				      	const args = Array.from(arguments);
				      	if(args[0]!=undefined){
				      		string=args[0];
				      		objeto.textContent = string;
				      	}
				      	else{
				      		return objeto.textContent;
				      	}
				      },
				      hasClass:function(classElem){
				      	var objeto;
				      	objeto=getdisctId(domel);
				      	if(objeto.classList.contains(classElem)){
				      		return;
				      	}
				      	else{
				        	return -1;
				      	}
				      },
				      prev:function(){
				      	var objeto;
				      	var nextsib;
				      	objeto=getdisctId(domel);
				      	prevsib=objeto.previousElementSibling;
				      },
				      next:function(){
				      	var objeto;
				      	var nextsib;
				      	objeto=getdisctId(domel);
				      	nextsib=objeto.nextElementSibling;
				      },
				      remove:function(){
				      	var objeto;
				      	objeto=getdisctId(domel);
				      	objeto.parentNode.removeChild(objeto);
				      },
				      replaceWith:function(string){
				      	var objeto;
				      	objeto=getdisctId(domel);
				      	objeto.outerHTML = string;
				      },
				      matches:function(selector){
				      	var objeto;
				      	objeto=getdisctId(domel);
				      	if(objeto.matches(selector)){
				      		return;
				      	}
				      	else{
				      		return -1;
				      	}
				      },
				      siblings:function(){
				      	var objeto;
				      	objeto=getdisctId(domel);
				      	Array.prototype.filter.call(objeto.parentNode.children, function(child){
						  return child !== objeto;
						});
				      },
				      offset:function(){
				      	var objeto;
				      	var par;
				      	var rect;
				      	var result;
				      	objeto=getdisctId(domel);
				      	rect = objeto.getBoundingClientRect();
						result={
						  top: rect.top + document.body.scrollTop,
						  left: rect.left + document.body.scrollLeft
						}
						return{

						}
				      },
				      offsetParent:function(){
				      	var objeto;
				      	var par;
				      	var rect;
				      	var result;
				      	objeto=getdisctId(domel);
				      	result=objeto.offsetParent || objeto;
						return{

						}
				      },
				      parent:function(){
				      	var objeto;
				      	objeto=getdisctId(domel);
						return objeto.parentNode;
				      },
				      position:function(){
				      	var objeto;
				      	var result;
				      	objeto=getdisctId(domel);
				      	result={left: objeto.offsetLeft, top: objeto.offsetTop};
						return result;
				      },
				      outerHeight:function(){
				      	var objeto;
				      	var result;
				      	var objeto=getdisctId(domel);
						    var height=objeto.offsetHeight;
					    	var style=getComputedStyle(objeto);
				      	const args = Array.from(arguments);
				      	if(args[0]!=undefined){
				      		if(args[0]==true){
							  		height+=parseInt(style.marginTop) + parseInt(style.marginBottom);
							  		return height;
				      		}
				      		else{
				      			return objeto.offsetHeight;
				      		}
				      	}
				      	else{
				      		return objeto.offsetHeight;
				      	}
						return{

						}
				      },
					  outerWidth:function(){
				      	var objeto;
				      	var result;
				      	var objeto=getdisctId(domel);
					    var height=objeto.offsetWidth;
					    var style=getComputedStyle(objeto);
				      	const args = Array.from(arguments);
				      	if(args[0]!=undefined){
				      		if(args[0]==true){
							  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
							  return width;
				      		}
				      		else{
				      			return objeto.offsetWidth;
				      		}
				      	}
				      	else{
				      		return objeto.offsetHeight;
				      	}
						return{

						}
				      },
				      tanimate: function(from, to, duration, update, easing, done){
				      	var objeto=getdisctId(domel);
				      	TinyAnimate.animate(from, to, duration, update, easing, done);
				      },
				      tanimatecss: function(property, unit, from, to, duration, easing, done){
				      	var objeto=getdisctId(domel);
				      	TinyAnimate.animateCSS(objeto, property, unit, from, to, duration, easing, done);
				      },
				      animate: function(callbackanim){
						return {
							x:function(x,options){
								if(options.delay!=undefined){
									move(domel).delay(options.delay).x(x).end(callbackanim);
								}
								else{
									move(domel).x(x).end(callbackanim);
								}
								return{

								}
							},
							y:function(y){
								move(domel).y(y).end(callbackanim);
								return{

								}
							},
							add:function(attrib,value){
								move(domel).add(attrib,value).end(callbackanim);
								return{

								}
							},
							to:function(x,y){
								move(domel).to(x,y).end(callbackanim);
								return{

								}
							},
							rotate:function(deg){
								move(domel).rotate(deg).end(callbackanim);
								return{

								}
							},
							translate:function(x,y){
								move(domel).translate(x,y).end(callbackanim);
								return{

								}
							},
							scale:function(deg){
								move(domel).scale(deg).end(callbackanim);
								return{

								}
							},
							set:function(x,y){
								move(domel).set(x,y).end(callbackanim);
								return{

								}
							},
							duration:function(deg){
								move(domel).duration(deg).end(callbackanim);
								return{

								}
							},
							skew:function(x,y){
								move(domel).skew(x,y).end(callbackanim);
								return{

								}
							},
							then:function(){
								return{
									set:function(x,y){
										move(domel).then().set(x,y).end(callbackanim);
									},
									duration:function(deg){
										move(domel).then().duration(deg).end(callbackanim);
									},
									scale:function(deg){
										move(domel).then().scale(deg).end(callbackanim);
									},
									pop:function(){
										move(domel).then().pop().end(callbackanim);
									},
								}
							},
							end:function(callbackcall){
								move(target).end(callbackcall);
							}
						}
					  },
						cycle:function(options){
							var crusel;
					  	var optfinal;
					  	var findelem;
					  	var numelems=0;
					  	var elemindex=0;
					  	var domelems;
					  	var bitvisible=0;
					  	if(!options){
					  		glog("Faltan argumentos, no se puede iniciar cycle");
					  	}
					  	else{
					  		if(!options.search){
					  			glog("Faltan argumento 'Find', no se puede iniciar cycle");
					  		}
					  		else{
						      	optfinal={
								    elem: getnameid(domel),    // id of the carousel container
								    fx: options.fx,                  // starts the rotation automatically
								    search: options.search,      // enables the infinite mode
								    infinite: options.infinite || false,      // enables the infinite mode
								    interval: options.interval || 1000,      // interval between slide changes
						      	}
						      	glog("-- INIT --");
						      	findelem=domel + " > " + optfinal.search;
						      	glog("ELEMENTS INSIDE");
						      	children=g.dom(domel).children();
						      	numelems=children.length;
						      	glog("children**********************");
						      	for(i=0;i<numelems;i++){
						      		if(i>0){
						      			glog("hijo " + i);
										children[i].style.display="none";
										children[i].style.position="absolute";
										children[i].style.left="0";
										children[i].style.top="0";
						      		}
						      	}
						      	glog("---ELEMENTS INSIDE---");
						      	glog("---NUM ELEMENTS" + numelems);
						      	if(numelems>1){
						      		domelems=getelTag(findelem);
						      		domcycle=setInterval(fadingfunc,optfinal.interval);
						      		function fadingfunc(){
						      			intfadeOut(children[elemindex],optfinal.interval);
						      			if(elemindex==(numelems-1)){
						      				elemindex=0;
						      			}
						      			else{
						      				elemindex++;
						      			}
						      			intfadeIn(children[elemindex],optfinal.interval);
						      			glog("SLIDES");
						      			glog("**************************");
						      			glog("children " + elemindex);
						      			glog(children[elemindex]);
						      			glog(children);
						      			glog("**************************");
						      		}
						      	}
						      	else{
						      		glog("Número de slides insuficiente para crear slider.");
						      		glog("ABORTING...");
						      	}
						      	glog("---ELEMENTS INSIDE");
					  		}
					  	}
						return;
				      },
				      after:function(htmlstr){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
						obj.insertAdjacentHTML('afterend', htmlstr);
				      },
				      before:function(htmlstr){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
						obj.insertAdjacentHTML('beforebegin', htmlstr);
				      },
				      append:function(elem){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
						parent.insertBefore(elem, obj.firstChild);
				      },
				      prepend:function(html){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
						obj.insertAdjacentHTML('afterend', html);
				      },
				      clone:function(){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
				      	obj.cloneNode(true);
				      },
				      children:function(){
				      	//write code below...
				      	var obj;
				      	var childf;
				      	obj=getdisctId(domel);
						childf=obj.children;
						return childf;
				      },
				      addClass:function(classele){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
				      	obj.classList.add(classele);
				      },
				      removeClass:function(classele){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
				      	obj.classList.remove(classele);
				      },
				      addAttrb:function(attr,value){
				      	//write code below...
				      	var obj;
				      	var type;
				      	var i;
				      	type=getobjtype(domel);
				      	switch(type){
				      		case 'element':
				      			obj=getelTag(domel);
				      			for(i=0;i<obj.length;i++){
				      				obj[i].setAttribute(attr,value);
				      			}
				      			break;
				      		case 'class':
				      			obj=getelTag(domel);
				      			for(i=0;i<obj.length;i++){
				      				obj[i].setAttribute(attr,value);
				      			}
				      			break;
				      		case 'id':
								obj=getdisctId(domel);
								obj.setAttribute(attr,value);
								break;
				      	}
				      },
				      getAttrb:function(attr){
						//write code below...
				      	var obj;
				      	var type;
				      	var i;
				      	var result;
				      	result=Array;
				      	type=getobjtype(domel);
				      	switch(type){
				      		case 'element':
				      			obj=getelTag(domel);
				      			for(i=0;i<obj.length;i++){
				      				result[i]=obj[i].getAttribute(attr);
				      			}
				      			return result;
				      			break;
				      		case 'class':
				      			obj=getelTag(domel);
				      			for(i=0;i<obj.length;i++){
				      				result[i]=obj[i].getAttribute(attr);
				      			}
				      			return result;
				      			break;
				      		case 'id':
								obj=getdisctId(domel);
								result[i]=obj.getAttribute(attr);
								return result;
								break;
				      	}
				      },
				      rmAttrb:function(attr){
				      	//write code below...
				      	var obj;
				      	var type;
				      	var i;
				      	type=getobjtype(domel);
				      	switch(type){
				      		case 'element':
				      			obj=getelTag(domel);
				      			for(i=0;i<obj.length;i++){
				      				obj[i].removeAttribute(attr);
				      			}
				      			break;
				      		case 'class':
				      			obj=getelTag(domel);
				      			for(i=0;i<obj.length;i++){
				      				obj[i].removeAttribute(attr);
				      			}
				      			break;
				      		case 'id':
								obj=getdisctId(domel);
								obj.removeAttribute(attr);
								break;
				      	}
				      },
					  toggleClass:function(classele){
				      	//write code below...
				      	var obj;
				      	obj=getdisctId(domel);
				      	obj.classList.toggle(classele);
				      },
				      cursor:function(estilo){
				        var fila;
				      	switch(estilo){
				      		case 'auto':
								fila=getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'pointer':
								fila=getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'wait':
								fila=getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'text':
								fila=getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'initial':
								fila=getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'inherit':
								fila=getdisctId(domel);
								fila.style.cursor=estilo;
								break;
							case 'none':
								fila=getdisctId(domel);
								fila.style.cursor=estilo;
								break;
				      	}
				      },
				      toggleDisplay: function(){
				        var fila;
				            if (!document.getElementById){
				                return false;
				            }
				            fila=getdisctId(domel);
				            if(fila.style.display != "none"){
				              fila.style.display = "none";
				            }
				            else{
				              fila.style.display = "";
				            }
				        },
				        resetText: function(){
				          var textcontent;
				          textcontent=getdisctId(domel);
				          textcontent.value='';
				        },
			            val: function(){
			                var valor;
			                var args;
			                args=arguments;
			                if(args[0]==undefined){
				                valor=valobj(domel);
				                return valor;
			                }
			                else{
			                	setval(domel,args[0]);
			                }
			            },
			            version: function(){
			                glog(version());
			            },
				        intval: function(){
							var number;
							valor=valobj(domel);
							return parseInt(valor);
				        },
				        floatval: function(){
				        	var number;
							valor=valobj(domel);
							return parseFloat(valor);
				        },
						fadeIn:function(tiempo){
						    var op = 0.1;  // initial opacity
						    var intervalo=tiempo/80;
						    var element;
						    element=getdisctId(domel);
						    element.style.display = 'block';
						    var timer = setInterval(function(){
						        if (op >= 1){
						            clearInterval(timer);
						        }
						        element.style.opacity = op;
						        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
						        op += op * 0.1;
						    }, intervalo);
				      },
				      fadeOut:function(tiempo){
					    var op = 1;  // initial opacity
					    var intervalo=tiempo/80;
					    var element;
					    element=getdisctId(domel);
					    var timer = setInterval(function(){
					        if (op <= 0.1){
					            clearInterval(timer);
					            element.style.display = 'none';
					        }
					        element.style.opacity = op;
					        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
					        op -= op * 0.1;
					    }, intervalo);
				      },
				    gotodiv: function(){
				        var objeto;
				        objeto=getdisctId(domel);
				        objeto.scrollIntoView();
				    },
					smooth: function(target, options){
					    var start = window.pageYOffset,
					        opt = {
					            duration: options.duration,
					            offset: options.offset || 0,
					            callback: options.callback,
					            easing: easeInOutQuad
					        },
					        distance = typeof target === 'string'
					            ? opt.offset + document.querySelector(target).getBoundingClientRect().top
					            : target,
					        duration = typeof opt.duration === 'function'
					            ? opt.duration(distance)
					            : opt.duration,
					        timeStart, timeElapsed;
					    requestAnimationFrame(function(time){ timeStart = time; loop(time); });
					    function loop(time){
					        timeElapsed = time - timeStart;
					        window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));
					        if (timeElapsed < duration){
					        	requestAnimationFrame(loop)
					        }
					        else{
					        	end();
					        }
					    }
					    function end(){
					        window.scrollTo(0, start + distance);

					        if (typeof opt.callback==='function'){
					        	opt.callback();
					        }
					    }
					    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
					    function easeInOutQuad(t, b, c, d)  {
					        t /= d / 2
					        if(t < 1) return c / 2 * t * t + b
					        t--
					        return -c / 2 * (t * (t - 2) - 1) + b
					    }
					},
				    blink: function(status){
				        var fila;
				        switch(status){
				        	case 'on':
					        	fila=getdisctId(domel);
					        	fila.className="blink_div";
					        	break;
					        case 'off':
					        	fila=getdisctId(domel);
					        	fila.className="";
					        	break;

				        }
				    },
					submit:function(callbackfunc){
			        	var control;
			        	control=getdisctId(domel);
				        control.onsubmit=function(){
				        	callbackfunc();
				        }
			      	},
			        click:function(callbackfunc){
			        	var control;
			        	control=getdisctId(domel);
				        control.onclick=function(){
				        	callbackfunc();
				        }
			      	},
			      	change:function(callbackfunc){
				        var control;
			        	control=getdisctId(domel);
				        control.onchange=function(){
				        	callbackfunc();
				        }
			      	},
			      	blur:function(callbackfunc){
				        var control;
			        	control=getdisctId(domel);
				        control.onblur=function(){
				        	callbackfunc();
				        }
			      	},
			      	bindData:function(e){

			      	},
			        on:function(e){
						var control;
						var idcontrol;
						var event;
						var idcontrol;
						idcontrol=domel;
						event=arguments[0];
						callback=arguments[1];;
						control=getdisctId(idcontrol);
			        	switch(event){
			        		case 'error':
			        			control.addEventListener('error',callback);
			        			break;
			        		case 'load':
								control.addEventListener('load',callback);
			        			break;
			        		case 'submit':
								control.addEventListener('submit',callback);
			        			break;
			        		case 'click':
								control.addEventListener('click',callback);
			        			break;
			        		case 'dblclick':
								control.addEventListener('dblclick',callback);
			        			break;
							case 'mouseup':
								control.addEventListener('mouseup',callback);
			        			break;
			        		case 'mousedown':
								control.addEventListener('mousedown',callback);
			        			break;
			        		case 'mouseenter':
								control.addEventListener('mouseenter',callback);
			        			break;
			        		case 'mouseleave':
								control.addEventListener('mouseleave',callback);
			        			break;
			        		case 'mousemove':
								control.addEventListener('mousemove',callback);
			        			break;
			        		case 'mouseover':
								control.addEventListener('mouseover',callback);
			        			break;
			        		case 'mouseout':
								control.addEventListener('mouseout',callback);
			        			break;
			        		case 'blur':
								control.addEventListener('blur',callback);
			        			break;
			        		case 'change':
								control.addEventListener('change',callback);
						        break;
							case 'resize':
								control.addEventListener('resize',callback);
			        			break;
							case 'unload':
								control.addEventListener('unload',callback);
			        			break;
							case 'pageshow':
								control.addEventListener('pageshow',callback);
			        			break;
							case 'popstate':
								control.addEventListener('popstate',callback);
			        			break;
			        		case 'keyup':
								control.addEventListener('keyup',callback);
			        			break;
			        		case 'keydown':
								control.addEventListener('keyup',callback);
			        			break;
			        		case 'keypress':
								control.addEventListener('keypress',callback);
			        			break;
			        	}
			    	},
					load:function(modulourl){
				        var xmlhttp=false;
				        var filecont;
				        var contentdiv;
				        var n;
				        var allScripts;
				        var callback;
				        callback=arguments[1];
				        contentdiv=getdisctId(domel);
				        xmlhttp=g.getxhr();
				        if (typeof callback==='function'){
							callback();
				        }
					    xmlhttp.onreadystatechange = function(){
					        if(xmlhttp.readyState==XMLHttpRequest.DONE){
					           if(xmlhttp.status == 200){
					               contentdiv.innerHTML = xmlhttp.responseText;
					               allScripts=contentdiv.getElementsByTagName('script');
					               for (n=0;n<allScripts.length;n++){
										//run script inside rendered div
										eval(allScripts[n].innerHTML);
					               }
					               if(callback!=undefined){
								        if(typeof callback==='function'){
											callback();
								        }
								        else{
								        	glog("No se puede ejecutar la llamada, no es tipo funcion");
								        }
					               }
					           }
					           else {
					               glog('Error');
					           }
					        }
					    }

					    xmlhttp.open("GET", modulourl, true);
					    xmlhttp.send();
				    },
				}
            },
            /**
             * Objeto class
             * Se encarga de registrar eventos
             *
             * */
            inArray: function(item, elem){
	          return elem.indexOf(item);
	        },
	        indexOf: function(item, elem){
	          return elem.indexOf(item);
	        },
	        getKey: function(e){
				var KeyCode;
				if(e){
					if(e.keyCode>0){
						KeyCode=e.keyCode;
					}
					else{
						KeyCode=e.charCode;
					}
				}
				return KeyCode;
	        },
	        getChar: function(event){
	        	var cadena;
						//bloquear teclado a solo numeros
						teclan=g.getKey(event);
						cadena=String.fromCharCode(teclan);
						return String.fromCharCode(cadena);
	        },
	        blockChar: function(e){
	          //bloquear teclado a solo letras
	          teclap=g.getKey(e);
	          teclan=String.fromCharCode(teclap);
	          if(IsNumeric(teclan)==true){
	            return "Solo está peritido escribir letras";
	          }
	        },
	        bloqNum: function(e){
	          teclap=g.getKey(e);
	          teclan=String.fromCharCode(teclap);
	          if(IsNumeric(teclan)==false){
	            return "Solo esta permitido escribir numeros";
	          }
	        },
			getTrim: function(cadena){
			    return cadena.trim();
			},
			setLocal: function(varname,valor){
			    //localstorage programming
				if (typeof(Storage) !== "undefined"){
					//Code for localStorage/sessionStorage
			        localStorage.setItem(varname,valor);
			    }
			},
			getLocal: function(varname){
			    if (typeof(Storage)!=="undefined"){
			        localStorage.getItem(varname);
			    }
			},
			type: function(objname){
				var obj;
			    obj=getdisctId(objname);
			    return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
			},
			/**
			 * Ajax Clase
			 * Funciones XHR para trabajar con AJAX
			 * */
		  getxhr:function(){
		  	var xhr;
			xhr=window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			return xhr;
	      },
	      upload: function(fileid,callbackup){
	      	var filectrl;
	      	var file;
	      	var reader;
	      	var finalfile;
	      	var fileapi;
	      	var formData;
	      	var objnombrefile;
	      	var resp;
	      	objnombrefile={};
	      	//Validación si hay los elementos para realizar la carga asíncrona de archivos
	      	if(window.File && window.FileList && window.Blob && window.FileReader && window.FormData){
			    reader=new FileReader();
				filectrl=getdisctId(fileid); //Files[0] = 1st file
				file=filectrl.files[0];
				reader.readAsBinaryString(file);
				reader.onload=function(event){
				    var result=event.target.result;
				    var fileName=filectrl.files[0].name;
				    var objres;
				    objres={};
					objres.__proto__={
						data:'',
						file:'',
						status:'',
						error:'',
					};
				    g.post(
						{
							data:btoa(result),
							name:fileName
						},
						"upload.php",
						function(data){
							resp=JSON.parse(data);
							objres.file=resp[0].file;
							objres.status="200 OK";
							objres.error="0";
							callbackup(objres);
						}
					);
				};
				reader.onerror=function(event){
					glog("Hubo un error de lectura de disco.");
				}
			}
			else{
			    // browser doesn't supports File API
			    glog("browser doesn't supports File API");
			}
	      },
	      post: function(){
	      	/*
	      	 * Parámetros:
	      	 * 0 objvariables
	      	 * 1 dirsocket
	      	 * 2 [callback] optional
	      	 */
	      	var i;
	        var arrayvar;
	        var ajxProtocol;
	        var dirsocket;
	        var variablesobj;
	        var variablesaux;
	        var sock;
	        var callback;
	        var data;
	        var responset;
	        var contenedor;
	        var headers;
	        arrayvar=new Array();
	        variablesobj={};
	        variablesaux={};
	        //almacenar argumentos en el array 'arrayvar'
	        for(i=0;i<arguments.length;i++){
	          arrayvar[i]=arguments[i];
	        }
			if(arguments.length<2){
	      		glog("Faltan Argumentos " + arguments.length);
	      	}
	      	else{
	      		// Obtener objeto AJAX;
	      		sock=g.getxhr();
	      		sock.addEventListener("load", transferComplete);
				sock.addEventListener("error", transferFailed);
	      		// Obtener objeto de variables;
	      		variablesaux=JSON.stringify(arrayvar[0]);
	      		variablesobj=JSON.parse(variablesaux);
	      		glog(variablesobj);
	      		// Obtener string de protocolo
	      		ajxProtocol="POST";
	      		// Obtener string de dir archivo socket
	      		dirsocket=arrayvar[1];
	      		// Obtener string de enctype
	      		headers="application/x-www-form-urlencoded";
	      		// VALIDACIONES
	      		if(arguments[2]!=undefined){
		      		if(typeof arguments[2]==="function"){
						callback=arguments[2];
					}
					else{
						glog("El argumento Callback debe ser de tipo función");
					}
	      		}
	      		////////////////////////////////////////////////////
	      		// EJECUTAR FUNCION Y CALLBACK//////////////////////
		        sock.open(ajxProtocol,dirsocket,true);
				function transferComplete(event){
	                data=event.target.responseText;
	                glog("STATUS: " + event.target.readyState + " " + event.target.status + " " + event.target.statusText);
	                if(callback!=undefined){
	                	if(typeof callback==="function"){
							callback(data);
						}
						else{
							glog("El parámetro Callback no es función o no existe!");
						}
	                }
	                else{
						glog("El parámetro Callback no existe!");
					}
				}

				function transferFailed(event){
					glog(event.target.error);
				}
	      		sock.setRequestHeader("Content-Type",headers);
				sock.send(JSON.stringify(variablesobj));
		        ////////////////////////////////////////////////////
			}
	      },
		  get: function(){
	      	/*
	      	 * Parámetros:
	      	 * 0 objvariables
	      	 * 1 dirsocket
	      	 * 2 [callback] optional
	      	 */
	      	var i;
	        var arrayvar;
	        var ajxProtocol;
	        var dirsocket;
	        var variablesobj;
	        var variablesaux;
	        var sock;
	        var callback;
	        var data;
	        var responset;
	        var enctype;
	        var contenedor;
	        arrayvar=new Array();
	        variablesobj={};
	        variablesaux={};
	        //almacenar argumentos en el array 'arrayvar'
	        for(i=0;i<arguments.length;i++){
	          arrayvar[i]=arguments[i];
	        }
			if(arguments.length<2){
	      		glog("Faltan Argumentos " + arguments.length);
	      	}
	      	else{
	      		// Obtener objeto AJAX;
	      		sock=g.getxhr();
	      		sock.addEventListener("load", transferComplete);
				sock.addEventListener("error", transferFailed);
	      		// Obtener string de protocolo
	      		ajxProtocol="GET";
	      		// Obtener string de dir archivo socket
	      		dirsocket=arrayvar[1];
	      		// VALIDACIONES
	      		if(arguments[2]!=undefined){
		      		if(typeof arguments[2]==="function"){
						callback=arguments[2];
					}
					else{
						glog("El argumento Callback debe ser de tipo función");
					}
	      		}
	      		////////////////////////////////////////////////////
	      		// EJECUTAR FUNCION Y CALLBACK//////////////////////
		        sock.open(ajxProtocol,dirsocket,true);
		        function transferComplete(event){
	                data=event.target.responseText;
	                glog("STATUS: " + event.target.readyState + " " + event.target.status + " " + event.target.statusText);
	                if(callback!=undefined){
	                	if(typeof callback==="function"){
							callback(data);
						}
						else{
							glog("El parámetro Callback no es función o no existe!");
						}
	                }
	                else{
						glog("El parámetro Callback no existe!");
					}
				}

				function transferFailed(event){
					glog(event.target.error);
				}
				sock.send(null);
		        ////////////////////////////////////////////////////
			}
	      },
		webwork:function(nombreid){
			//Submodulo WebWorkers
			return{
				set:function(filename){
	        var workerSck;
	        var workerName;
					if(workerSck==undefined){
						if(filename!=''){
		            // Code Below.....
								workers[numworkers]={'nombre':nombreid,'inst':(workerSck = new Worker(filename))};
								numworkers++;
						}
					}
					else{
						glog("El WebWorker API no está soportado por el navegador.");
					}
				},
				get:function(){
					var retobject;
					var objectfinal;
					retobject={};
					objectfinal={};
					for(w in workers){
						if(workers[w].inst!=undefined){
							if(workers[w].nombre==nombreid){
								retobject.worker=workers[w].inst;
								retobject.id=workers[w].nombre;
								break;
							}
						}
					}
					return retobject;
				},
				terminate:function(){
					var workeri;
					for(w in workers){
						if(workers[w].inst!=undefined){
							if(workers[w].nombre==nombreid){
								workeri=workers[w].inst;
								break;
							}
						}
					}
					workeri.terminate();
					return 0;
				},
				close:function(){
					var workeri;
					for(w in workers){
						if(workers[w].inst!=undefined){
							if(workers[w].nombre==nombreid){
								workeri=workers[w].inst;
								break;
							}
						}
					}
					workeri.close();
					return 0;
				},
				send:function(message){
					var w=g.webwork(nombreid).get();
					w.worker.postMessage(message);
				}
			}
		},
		websock:function(nombreid){
			function printonerror(event){
				glog("ERROR...");
				glog(event.data);
			};
			function printonopen(event){
				glog("Conexion abierta...");
				glog(event.data);
			};
			function printonmsg(event){
				glog("Enviando mensaje...");
				glog(event.data);
			};
			//Submodulo WebSockets
			return{
				set:function(urldir){
	        var socketUnt;
	        var workerName;
					if(socketUnt==undefined){
						if(urldir!=''){
		            // Code Below.....
								socketUnt=new WebSocket(urldir);
								socketUnt.addEventListener('error',printonerror);
								socketUnt.addEventListener('open',printonopen);
								socketUnt.addEventListener('message',printonmsg);
								sockets[numsockets]={'nombre':nombreid,'inst':socketUnt};
								numsockets++;
						}
					}
					else{
						glog("El WebSocket API no está soportado por el navegador.");
					}
				},
				get:function(){
					var retobject;
					var objectfinal;
					retobject={};
					objectfinal={};
					for(w in sockets){
						if(sockets[w].inst!=undefined){
							if(sockets[w].nombre==nombreid){
								glog(sockets[w]);
								retobject.socket=sockets[w].inst;
								retobject.id=sockets[w].nombre;
								break;
							}
						}
					}
					return retobject;
				},
				close:function(){
					var socketi;
					for(w in sockets){
						if(sockets[w].inst!=undefined){
							if(sockets[w].nombre==nombreid){
								socketi=sockets[w].inst;
								break;
							}
						}
					}
					socketi.close();
					return 0;
				},
				send:function(message){
					var w=g.websock(nombreid).get();
					w.socket.send(message);
					glog("************SOCKET RESPONSE*************");
					glog(message);
					glog("************SOCKET RESPONSE*************");
				}
			}
		},
		watch:function(objeto,attrib,callback){
			//Función Watch
			watch(objeto,attrib,callback);
		},
		unwatch:function(objeto,name,callback){
		 	//Función Unwatch
			unwatch(objeto,name,callback);
		},
	}
}());
g.path=(function(){
	//Submodulo g.path / Rewrite g.pathJS
	function version(){
		return "0.8.4";
	};
	return{
		//Write code below..
		getVersion:function(){
	        return version();
	    },
	    map:function(path){
	        if(g.path.routes.defined.hasOwnProperty(path)){
	            return g.path.routes.defined[path];
	        }
	        else{
				return new g.path.core.route(path);
	        }
	    },
	    root: function(path){
	        g.path.routes.root = path;
	    },
	    rescue: function(fn){
	        g.path.routes.rescue = fn;
	    },
	    history: {
	        initial:{}, // Empty container for "Initial Popstate" checking variables.
	        pushState: function(state, title, path){
	            if(g.path.history.supported){
	                if(g.path.dispatch(path)){
	                    history.pushState(state, title, path);
	                }
	            } else {
	                if(g.path.history.fallback){
	                    window.location.hash = "#" + path;
	                }
	            }
	        },
	        popState: function(event){
	            var initialPop = !g.path.history.initial.popped && location.href == g.path.history.initial.URL;
	            g.path.history.initial.popped = true;
	            if(initialPop) return;
	            g.path.dispatch(document.location.pathname);
	        },
	        listen: function(fallback){
	            g.path.history.supported = !!(window.history && window.history.pushState);
	            g.path.history.fallback  = fallback;

	            if(g.path.history.supported){
	                g.path.history.initial.popped = ('state' in window.history), g.path.history.initial.URL = location.href;
	                window.onpopstate = g.path.history.popState;
	            }
	            else{
	                if(g.path.history.fallback){
	                    for(route in g.path.routes.defined){
	                        if(route.charAt(0) != "#"){
	                          g.path.routes.defined["#"+route] = g.path.routes.defined[route];
	                          g.path.routes.defined["#"+route].path = "#"+route;
	                        }
	                    }
	                    g.path.listen();
	                }
	            }
	        }
	    },
	    match:function(path, parameterize){
	        var params = {}, route = null, possible_routes, slice, i, j, compare;
	        for (route in g.path.routes.defined){
	            if (route !== null && route !== undefined){
	                route = g.path.routes.defined[route];
	                possible_routes = route.partition();
	                for (j = 0; j < possible_routes.length; j++){
	                    slice = possible_routes[j];
	                    compare = path;
	                    if (slice.search(/:/) > 0){
	                        for (i = 0; i < slice.split("/").length; i++){
	                            if ((i < compare.split("/").length) && (slice.split("/")[i].charAt(0) === ":")){
	                                params[slice.split('/')[i].replace(/:/, '')] = compare.split("/")[i];
	                                compare = compare.replace(compare.split("/")[i], slice.split("/")[i]);
	                            }
	                        }
	                    }
	                    if (slice === compare){
	                        if (parameterize){
	                            route.params = params;
	                        }
	                        return route;
	                    }
	                }
	            }
	        }
	        return null;
	    },
	    dispatch:function(passed_route){
	        var previous_route, matched_route;
	        if (g.path.routes.current !== passed_route){
	            g.path.routes.previous = g.path.routes.current;
	            g.path.routes.current = passed_route;
	            matched_route = g.path.match(passed_route, true);

	            if (g.path.routes.previous){
	                previous_route = g.path.match(g.path.routes.previous);
	                if (previous_route !== null && previous_route.do_exit !== null){
	                    previous_route.do_exit();
	                }
	            }

	            if (matched_route !== null){
	                matched_route.run();
	                return true;
	            } else {
	                if (g.path.routes.rescue !== null){
	                    g.path.routes.rescue();
	                }
	            }
	        }
	    },
	    listen:function(){
	        var fn = function(){ g.path.dispatch(location.hash); }

	        if (location.hash === ""){
	            if (g.path.routes.root !== null){
	                location.hash = g.path.routes.root;
	            }
	        }

	        // The 'document.documentMode' checks below ensure that g.pathJS fires the right events
	        // even in IE "Quirks Mode".
	        if ("onhashchange" in window && (!document.documentMode || document.documentMode >= 8)){
	            window.onhashchange = fn;
	        } else {
	            setInterval(fn, 50);
	        }

	        if(location.hash !== ""){
	            g.path.dispatch(location.hash);
	        }
	    },
	    core:{
	        route:function(path){
	            this.path = path;
	            this.action = null;
	            this.do_enter = [];
	            this.do_exit = null;
	            this.params = {};
	            g.path.routes.defined[path] = this;
	        }
	    },
	    routes:{
	        'current': null,
	        'root': null,
	        'rescue': null,
	        'previous': null,
	        'defined': {}
	    }
	}
}());
g.md5=(function(){
			//Submodulo MD5
		   function RotateLeft(lValue, iShiftBits){
		           return(lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
		   };
		   function AddUnsigned(lX,lY){
		           var lX4,lY4,lX8,lY8,lResult;
		           lX8 = (lX & 0x80000000);
		           lY8 = (lY & 0x80000000);
		           lX4 = (lX & 0x40000000);
		           lY4 = (lY & 0x40000000);
		           lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		           if (lX4 & lY4){
		                   return(lResult ^ 0x80000000 ^ lX8 ^ lY8);
		           }
		           if (lX4 | lY4){
		                   if (lResult & 0x40000000){
		                           return(lResult ^ 0xC0000000 ^ lX8 ^ lY8);
		                   } else {
		                           return(lResult ^ 0x40000000 ^ lX8 ^ lY8);
		                   }
		           } else {
		                   return(lResult ^ lX8 ^ lY8);
		           }
		   };
		   function F(x,y,z){ return(x & y) | ((~x) & z); }
		   function G(x,y,z){ return(x & z) | (y & (~z)); }
		   function H(x,y,z){ return(x ^ y ^ z); }
		   function I(x,y,z){ return(y ^ (x | (~z))); }
		   function FF(a,b,c,d,x,s,ac){
		           a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		           return AddUnsigned(RotateLeft(a, s), b);
		   };

		   function GG(a,b,c,d,x,s,ac){
		           a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		           return AddUnsigned(RotateLeft(a, s), b);
		   };
		   function HH(a,b,c,d,x,s,ac){
		           a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		           return AddUnsigned(RotateLeft(a, s), b);
		   };
		   function II(a,b,c,d,x,s,ac){
		           a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		           return AddUnsigned(RotateLeft(a, s), b);
		   };
		   function ConvertToWordArray(string){
		           var lWordCount;
		           var lMessageLength = string.length;
		           var lNumberOfWords_temp1=lMessageLength + 8;
		           var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		           var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		           var lWordArray=Array(lNumberOfWords-1);
		           var lBytePosition = 0;
		           var lByteCount = 0;
		           while ( lByteCount < lMessageLength ){
		                   lWordCount = (lByteCount-(lByteCount % 4))/4;
		                   lBytePosition = (lByteCount % 4)*8;
		                   lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
		                   lByteCount++;
		           }
		           lWordCount = (lByteCount-(lByteCount % 4))/4;
		           lBytePosition = (lByteCount % 4)*8;
		           lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		           lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		           lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		           return lWordArray;
		   };
		   function WordToHex(lValue){
		           var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		           for (lCount = 0;lCount<=3;lCount++){
		                   lByte = (lValue>>>(lCount*8)) & 255;
		                   WordToHexValue_temp = "0" + lByte.toString(16);
		                   WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		           }
		           return WordToHexValue;
		   };
		   function Utf8Encode(string){
		           string = string.replace(/\r\n/g,"\n");
		           var utftext = "";

		           for (var n = 0; n < string.length; n++){

		                   var c = string.charCodeAt(n);

		                   if (c < 128){
		                           utftext += String.fromCharCode(c);
		                   }
		                   else if((c > 127) && (c < 2048)){
		                           utftext += String.fromCharCode((c >> 6) | 192);
		                           utftext += String.fromCharCode((c & 63) | 128);
		                   }
		                   else {
		                           utftext += String.fromCharCode((c >> 12) | 224);
		                           utftext += String.fromCharCode(((c >> 6) & 63) | 128);
		                           utftext += String.fromCharCode((c & 63) | 128);
		                   }

		           }

		           return utftext;
			};
			return{
				//Write code below..
				calc:function(cadena){
				   var x=Array();
				   var k,AA,BB,CC,DD,a,b,c,d;
				   var S11=7, S12=12, S13=17, S14=22;
				   var S21=5, S22=9 , S23=14, S24=20;
				   var S31=4, S32=11, S33=16, S34=23;
				   var S41=6, S42=10, S43=15, S44=21;
				   string = Utf8Encode(cadena);
				   x = ConvertToWordArray(string);
				   a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
				   for(k=0;k<x.length;k+=16){
				           AA=a; BB=b; CC=c; DD=d;
				           a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
				           d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
				           c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
				           b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
				           a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
				           d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
				           c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
				           b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
				           a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
				           d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
				           c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
				           b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
				           a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
				           d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
				           c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
				           b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
				           a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
				           d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
				           c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
				           b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
				           a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
				           d=GG(d,a,b,c,x[k+10],S22,0x2441453);
				           c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
				           b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
				           a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
				           d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
				           c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
				           b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
				           a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
				           d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
				           c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
				           b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
				           a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
				           d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
				           c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
				           b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
				           a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
				           d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
				           c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
				           b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
				           a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
				           d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
				           c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
				           b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
				           a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
				           d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
				           c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
				           b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
				           a=II(a,b,c,d,x[k+0], S41,0xF4292244);
				           d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
				           c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
				           b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
				           a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
				           d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
				           c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
				           b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
				           a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
				           d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
				           c=II(c,d,a,b,x[k+6], S43,0xA3014314);
				           b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
				           a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
				           d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
				           c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
				           b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
				           a=AddUnsigned(a,AA);
				           b=AddUnsigned(b,BB);
				           c=AddUnsigned(c,CC);
				           d=AddUnsigned(d,DD);
				   	}
					var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
					return temp.toLowerCase();
				}
			}
}());
g.path.core.route.prototype = {
    'to': function (fn) {
        this.action = fn;
        return this;
    },
    'enter': function (fns) {
        if (fns instanceof Array) {
            this.do_enter = this.do_enter.concat(fns);
        } else {
            this.do_enter.push(fns);
        }
        return this;
    },
    'exit': function (fn) {
        this.do_exit = fn;
        return this;
    },
    'partition': function () {
        var parts = [], options = [], re = /\(([^}]+?)\)/g, text, i;
        while (text = re.exec(this.path)) {
            parts.push(text[1]);
        }
        options.push(this.path.split("(")[0]);
        for (i = 0; i < parts.length; i++) {
            options.push(options[options.length - 1] + parts[i]);
        }
        return options;
    },
    'run': function () {
        var halt_execution = false, i, result, previous;

        if (g.path.routes.defined[this.path].hasOwnProperty("do_enter")) {
            if (g.path.routes.defined[this.path].do_enter.length > 0) {
                for (i = 0; i < g.path.routes.defined[this.path].do_enter.length; i++) {
                    result = g.path.routes.defined[this.path].do_enter[i].apply(this, null);
                    if (result === false) {
                        halt_execution = true;
                        break;
                    }
                }
            }
        }
        if (!halt_execution) {
            g.path.routes.defined[this.path].action();
        }
    }
};
g.__proto__.ajax=function(){
	var sock;
	sock=g.getxhr();
	return sock;
};
g.__proto__.data=function(iddataset){
  	var obj;
  	var idfinal;
  	obj=g.getelTag(iddataset);
  	return{
  		get:function(nomvar){
  			var result;
				idfinal="data-" + nomvar;
				result=g.dom(iddataset).prop(idfinal);
				return result;
  		},
  		set:function(nomvar,val){
				if(obj.dataset==undefined){
	  			idfinal="data-" + nomvar;
	  			g.dom(iddataset).addAttrb(idfinal,val);
				}
				else{
					Object.defineProperty(obj.dataset, nomvar, "data-variable");
				}
  		},
  		remove:function(nomvar){
  			idfinal="data-" + nomvar;
  			g.dom(iddataset).rmAttrb(idfinal);
  		},
	}
}
g.__proto__.isReady=function(){
	if(document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		return 1;
	}
	else{
		return 0;
	}
}
g.__proto__.isEmpty=function(string){
	if(typeof string==='string'){
		if(string.replace(/\s/g,"")==""){
			return;
		}
		else{
			return -2;
		}
	}
	else{
		return -1;
	}
}
g.init();
module.exports = g;


/*** EXPORTS FROM exports-loader ***/
module.exports = g;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

!function(){for(var n=0,i=["webkit","moz"],e=0;e<i.length&&!window.requestAnimationFrame;++e)window.requestAnimationFrame=window[i[e]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i[e]+"CancelAnimationFrame"]||window[i[e]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(i){var e=(new Date).getTime(),a=Math.max(0,16-(e-n)),o=window.setTimeout(function(){i(e+a)},a);return n=e+a,o}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(n){clearTimeout(n)})}();
//# sourceMappingURL=requestAnimationFrame.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports) {

var DataBind=(function(dataBind){
    "use strict";
    dataBind.Binder = function (model, document) {
        var doc = document || window.document;  //inject mock for testing
        var scopeElement = doc.querySelector('[data-scope=' + model.scope + ']');
        var currentValue = {};
        var foreach = {};

        model.addValueChangedListener(valueChangedHandler);

        function valueChangedHandler(name) {
            var foreachElements = scopeElement.querySelectorAll('[data-foreach$="in ' + name + '"]');
            bindForeach(foreachElements, name);

            bindElementsInForeach(foreachElements);

            var valueElements = scopeElement.querySelectorAll('[data-bind="' + name + '"]');
            bindValues(valueElements);

            var classElements = scopeElement.querySelectorAll('[data-class="' + name + '"]');
            bindClasses(classElements);

            var computedClassElements = scopeElement.querySelectorAll('[data-class^="' + name + '("]');
            bindClasses(computedClassElements);
        }

        var bindElementsInForeach = function (elements) {
            for (var i = 0; i < elements.length; i++) {

                var valueElements = elements[i].querySelectorAll('[data-bind]');
                bindValues(valueElements);

                var classElements = elements[i].querySelectorAll('[data-class]');
                bindClasses(classElements);

                var clickElements = elements[i].querySelectorAll('[data-click]');
                bindClicks(clickElements);

                var enterElements = scopeElement.querySelectorAll('[data-enter]');
                bindEnters(enterElements);
            }
        };

        var bindClasses = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                bindClass(elements[i]);
            }
        };

        var bindClass = function (element) {
            var attrValue = element.getAttribute('data-class');

            var oldValue = currentValue[attrValue];
            if (oldValue) {
                element.classList.remove(oldValue);
            }

            var newClass = model.get(attrValue);
            currentValue[attrValue] = newClass;

            if (newClass) {
                element.classList.add(newClass);
            }
        };

        function excludeNested(all, nested) {
            var arr = [].slice.call(all);
            for(var i = 0; i < arr.length; i++) {
                for (var j = 0; j < nested.length; j++) {
                    if (arr[i] === nested[j]) {
                        arr.splice(i, 1);
                    }
                }
            }

            return arr;
        }

        var bind = function () {
            var foreachElements = scopeElement.querySelectorAll('[data-foreach]');
            var nestedForeachElements = scopeElement.querySelectorAll('[data-foreach] [data-foreach]');

            var outerForeachElements = excludeNested(foreachElements, nestedForeachElements);

            captureForeach(outerForeachElements);
            bindForeach(outerForeachElements);

            var valueElements = scopeElement.querySelectorAll('[data-bind]');
            bindValues(valueElements);

            var classElements = scopeElement.querySelectorAll('[data-class]');
            bindClasses(classElements);

            var clickElements = scopeElement.querySelectorAll('[data-click]');
            bindClicks(clickElements);

            var enterElements = scopeElement.querySelectorAll('[data-enter]');
            bindEnters(enterElements);
        };

        var bindEnters = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                bindEnter(elements[i]);
            }
        };

        var bindEnter = function (element) {
            var expression = element.getAttribute('data-enter');

            element.onkeydown = function (event) {
                if (event.which === 13) {
                    model.invoke(expression);
                }
            };
        };

        var bindClicks = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                bindClick(elements[i]);
            }
        };

        var captureForeach = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                var templateChildren = [];
                for (var j = 0; j < elements[i].children.length; j++) {
                    templateChildren.push(elements[i].children[j].cloneNode(true));
                }

                var forIn = elements[i].getAttribute('data-foreach');
                var pieces = forIn.split(' in ');

                foreach[forIn] = { template: templateChildren, items: pieces[1].trim(), item: pieces[0].trim() };
            }
        };

        var bindForeach = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                clearChildren(elements[i]);

                var forIn = elements[i].getAttribute('data-foreach');
                var foreachTemplate = foreach[forIn];

                var value = model.get(foreachTemplate.items);

                for (var j = 0; j < value.length(); j++) {
                    for (var k = 0; k < foreachTemplate.template.length; k++) {
                        var clone = foreachTemplate.template[k].cloneNode(true);
                        elements[i].appendChild(clone);

                        convertBinding(clone, 'data-bind', foreachTemplate, j);
                        convertBinding(clone, 'data-class', foreachTemplate, j);
                        convertBinding(clone, 'data-click', foreachTemplate, j);
                        convertBinding(clone, 'data-foreach', foreachTemplate, j);
                    }
                }
            }
        };

        var clearChildren = function (element) {
            while (element.lastChild) {
                element.removeChild(element.lastChild);
            }
        };

        var convertBinding = function (element, attribute, template, index) {
            var replace = function (match) {
                return match.replace(template.item, template.items + '[' + index + ']')
            };

            if (element.hasAttribute(attribute)) {
                var oldAttribute = element.getAttribute(attribute);
                var newAttribute = oldAttribute
                    .replace(new RegExp('^' + template.item + '(?=[.]|$)'), template.items + '[' + index + ']')     //lone identifiers
                    .replace(new RegExp('[(,] *' + template.item + ' *(?=[,)])', 'g'), replace)    //method parameters
                    .replace(new RegExp(' in ' + template.item + '$'), ' in ' + template.items + '[' + index + ']');

                element.setAttribute(attribute, newAttribute);

                if (attribute === 'data-foreach') {
                    captureForeach([element]);
                    bindForeach([element]);
                }
            }

            for (var i = 0; i < element.children.length; i++) {
                convertBinding(element.children[i], attribute, template, index);
            }
        };

        var bindClick = function (element) {
            var expression = element.getAttribute('data-click');

            element.onclick = function () {
                model.invoke(expression);
            };
        };

        var bindValues = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                bindValue(elements[i]);
            }
        };

        var bindValue = function (element) {
            var name = element.getAttribute('data-bind');

            var modelValue = model.get(name);

            if (modelValue === undefined) {
                model.attr(name, "");
            } else if (element.type === 'checkbox') {
                element.checked = modelValue;
                element.onclick = function () {
                    model.attr(name, element.checked);
                };
            }
            else if (element.type === 'radio') {
                element.checked = modelValue === element.value;
                element.onclick = function () {
                    model.attr(name, element.value);
                };
            }
            else if (element.tagName.toLowerCase() === 'select') {
                element.value = modelValue;
                element.onchange = function () {
                    model.attr(name, element.value);
                };
            }
            else if (element.type === 'text' || element.type === 'textarea') {
                if (element.value !== modelValue) {
                    element.value = modelValue;
                }
                element.oninput = function () {
                    model.attr(name, element.value);
                };
            } else {
                element.innerHTML = modelValue;
            }
        };

        return {
            bind: bind
        };
    };

    return dataBind;
}(DataBind || {}));

var DataBind = (function (dataBind) {
    "use strict";

    dataBind.Model = function (scope) {
        var attrs = {};
        var dependsOn = {};
        var valueChangedListeners = [];
        var parser = new DataBind.Parser(fireValueChangedForAllDependencies, doLookup, updateValue);

        function doLookup(name) {
            return attrs[name];
        }

        function updateValue(name, value) {
            attrs[name] = value;
        }

        var attr = function (name, value) {
            parser.attr(name, value);
        };

        var get = function (expr) {
            return parser.get(expr);
        };

        function fireValueChangedForAllDependencies(name) {
            valueChangedListeners.forEach(function(listener) {
                listener(name);
            });

            if (dependsOn.hasOwnProperty(name)) {
                dependsOn[name].forEach(function (dependency) {
                    fireValueChangedForAllDependencies(dependency);
                });
            }
        }

        var computed = function (name, func, explicitDependencies) {
            if (explicitDependencies) {
                explicitDependencies.forEach(function (dependency) {
                    addDependency(name, dependency);
                });
            }

            var regEx = /this\.get\(['"]([^'"]+)['"]\)/g;

            var match = regEx.exec(func.toString());
            while (match != null) {
                addDependency(name, match[1]);
                match = regEx.exec(func.toString());
            }

            attrs[name] = func;
        };

        var action = function (name, func) {
            attrs[name] = func;
        };

        var addDependency = function (name, dependency) {
            dependsOn[dependency] = dependsOn[dependency] || [];
            dependsOn[dependency].push(name);
        };

        var addValueChangedListener = function(callback) {
            valueChangedListeners.push(callback);
        };

        return {
            attr: attr,
            get: get,
            computed: computed,
            action: action,
            scope: scope,
            addValueChangedListener: addValueChangedListener,
            invoke: function(actionExpr) { get(actionExpr); }
        };
    };

    return dataBind;
}(DataBind || {}));
var DataBind = (function (dataBind) {
    "use strict";

    dataBind.Collection = function(name, arr, valueChangedCallback) {
        var push = function(value) {
            arr.push(value);
            valueChangedCallback(name);
        };

        var pop = function() {
            arr.pop();
            valueChangedCallback(name);
        };

        var forEach = function(callback) {
            arr.forEach(function(item) {
                callback(item);
            });
            valueChangedCallback(name);
        };

        var remove = function(item) {
            var index = arr.indexOf(item);

            if (index >= 0) {
                arr.splice(index, 1);
                valueChangedCallback(name);

                return true;
            }

            return false;
        };

        var clear = function() {
            arr.length = 0;
            valueChangedCallback(name);
        };

        return {
            push: push,
            pop: pop,
            remove: remove,
            value: arr,
            length: function() { return arr.length; },
            forEach: forEach,
            clear: clear
        };
    };

    return dataBind;
}(DataBind || {}));


var DataBind = (function (dataBind) {
    "use strict";

    dataBind.Parser = function(fireValueChangedForAllDependencies, lookupFunc, updateValueFunc) {

        var checkWrapArray = function (name, object) {
            return Array.isArray(object)
                ? new DataBind.Collection(name, object, fireValueChangedForAllDependencies)
                : object;
        };

        var getFunctionArgs = function(lexer) {
            var args = [];

            if (lexer.currentToken().token === 'LPAREN') {
                lexer.consume();

                var argList = '';
                while(lexer.currentToken().token !== 'RPAREN') {
                    argList += lexer.currentToken().text;
                    lexer.consume();
                }

                if (argList) {
                    argList.split(',').forEach(function(argText) {
                        args.push(get(argText));
                    });
                }
            }

            return args;
        };

        var parseFunction = function(lexer) {
            var functionName = lexer.currentToken().text;
            lexer.consume();

            var args = getFunctionArgs(lexer);

            return lookupFunc(functionName).apply(this, args);
        };

        var parseProperty = function(lexer, id, object) {
            lexer.consume('ID');

            if (object) {
                return object[lookupFunc(id)[lexer.currentToken().text]];
            }

            return lookupFunc(id)[lexer.currentToken().text];
        };

        var parseId = function(lexer, object) {
            var id = lexer.currentToken().text;

            lexer.consume();

            if (lexer.currentToken().token === 'DOT') {
                return parseProperty(lexer, id, object);
            } else if (lexer.currentToken().token === 'LBRACK') {
                lexer.consume();

                var index = get(lexer.currentToken().text);

                return lookupFunc(id)[index];
            } else {
                return checkWrapArray(id, lookupFunc(id));
            }
        };

        var get = function(name) {
            var lexer = new DataBind.Lexer(name);

            var object = null;

            do {
                if (lexer.currentToken().token === 'NUMBER') {
                    return parseInt(lexer.currentToken().text);
                }
                if (lexer.currentToken().token === 'LITERAL') {
                    return lexer.currentToken().text.slice(1, -1);
                }

                if (lexer.currentToken().token === 'ID') {
                    if (typeof lookupFunc(lexer.currentToken().text) === 'function') {
                        object = parseFunction.call(this, lexer);
                    } else {
                        object = parseId(lexer, object);
                    }
                }

                if (lexer.currentToken().token === 'DOT') {
                    lexer.consume('ID');

                    object = object[lexer.currentToken().text];
                } else if (lexer.currentToken().token === 'LBRACK') {
                    lexer.consume();

                    object = object[get(lexer.currentToken().text)];
                }

                lexer.consume();
            } while (lexer.hasNextToken());

            return checkWrapArray(name, object);
        };

        var attr = function (name, value) {
            var changedCollections = [];
            var object = null;

            var lexer = new DataBind.Lexer(name);

            do {
                var id;
                if (lexer.currentToken().token === 'ID') {
                    id = lexer.currentToken().text;

                    if (!object)
                        object = lookupFunc(id);

                    if (object === undefined) {
                        object = {};
                        updateValueFunc(id, object);
                    }

                    if (!lexer.hasNextToken()) {
                        updateValueFunc(id, value);
                        fireValueChangedForAllDependencies(id);
                    }

                    lexer.consume();
                }

                if (lexer.currentToken().token === 'LBRACK') {
                    changedCollections.push(id);
                    lexer.consume();

                    var index = get(lexer.currentToken().text);

                    lexer.consume('RBRACK');

                    if (lexer.hasNextToken()) {
                        object = object[index];
                    } else {
                        object[index] = value;

                        fireValueChangedForAllDependencies(name);
                        fireValueChangedForAll(changedCollections);
                    }
                } else if (lexer.currentToken().token === 'DOT') {
                    lexer.consume('ID');

                    if (lexer.hasNextToken()) {
                        object[lexer.currentToken().text] = object[lexer.currentToken().text] || {};
                        object = object[lexer.currentToken().text];
                    } else {
                        object[lexer.currentToken().text] = value;
                        fireValueChangedForAllDependencies(name);
                        fireValueChangedForAll(changedCollections);
                    }
                }

                lexer.consume();
            } while (lexer.hasNextToken())
        };

        var fireValueChangedForAll = function (items) {
            items.forEach(function (item) {
                fireValueChangedForAllDependencies(item);
            });
        };

        return {
            get: get,
            attr: attr
        };
    };

    return dataBind;
}(DataBind || {}));

var DataBind = (function (dataBind) {
    "use strict";

    dataBind.Lexer = function(expr) {
        var rules = {root: [
            [/\[/, 'LBRACK'],
            [/\]/, 'RBRACK'],
            [/[(]/, 'LPAREN'],
            [/[)]/, 'RPAREN'],
            [/,/, 'COMMA'],
            [/['][^']*[']/, 'LITERAL'],
            [/["][^"]*["]/, 'LITERAL'],
            [/[a-zA-Z][a-zA-Z0-9]*/, 'ID'],    //todo: allow more id characters
            [/[0-9]+/, 'NUMBER'],
            [/[.]/, 'DOT'],
            [/\s+/, TokenJS.Ignore],  //ignore whitespace
        ]};

        var lexer = new TokenJS.Lexer(expr, rules, false);

        var tokens = lexer.tokenize();

        var i = 0;

        var hasNextToken = function() {
            return i < tokens.length - 1;
        };

        var currentToken = function() {
            if (i < tokens.length)
                return tokens[i];
            else
                return TokenJS.EndOfStream;
        };

        var consume = function(expected) {
            i++;

            if (expected && currentToken().token !== expected)
                throw {
                    toString: function() { return 'Syntax error: Expected token: ' + expected + ', actual: ' + currentToken().token }
                };
        };

        return {
            currentToken: currentToken,
            consume: consume,
            hasNextToken: hasNextToken
        };
    };

    return dataBind;
}(DataBind || {}));

var TokenJS = TokenJS || {};

TokenJS.Ignore = {
    toString: function() {
        return 'Ignored rule';
    }
};

TokenJS.EndOfStream = {
    toString: function() {
        return "End of token stream";
    }
};

TokenJS.SyntaxError = function(message) {
    this.name = "SyntaxError";
    this.message = message;
};

TokenJS.StateError = function(message) {
    this.name = "StateError";
    this.message = message;
};

/**
 * @param input: text to lex
 * @param rules: dictionary of lexing rules. Must contain a 'root' state.
 * @param ignoreAllUnrecognized: if true, ignores unrecognized characters instead of throwing an error
 */
 TokenJS.Lexer = function(input, rules, ignoreUnrecognized){
    var _rules = rules;
    var _currentState;
    var _input = input;
    var _index = 0;
    var _ignoreUnrecognized = ignoreUnrecognized;

    var state = function(newState) {
        if (!_rules.hasOwnProperty(newState)) {
            throw new TokenJS.StateError("Missing state: '" + newState + "'.");
        }
        _currentState = newState;
    };

    state('root');

    var getNextToken = function() {
        if (_index >= _input.length) {
            return TokenJS.EndOfStream;
        }

        var oldState = _currentState;

        var allMatches = getAllMatches();

        for (var i = 0; i < allMatches.length; i++) {
            var bestMatch = allMatches[i];
            if (typeof bestMatch.value === 'function') {
                var returnValue = bestMatch.value.call(callbackContext, bestMatch.matchText);
                if (returnValue === TokenJS.Ignore) {
                    consume(bestMatch.matchText);
                    return getNextToken();
                } else if (hasValue(returnValue)) {
                    consume(bestMatch.matchText);
                    return {text: bestMatch.matchText, token: returnValue, index: bestMatch.index};
                } else if (changedStateWithoutReturningToken(oldState)) {
                    throwSyntaxError();
                }
            } else {
                consume(bestMatch.matchText);
                if (bestMatch.value === TokenJS.Ignore) {
                    return getNextToken();
                } else {
                    return {text: bestMatch.matchText, token: bestMatch.value, index: bestMatch.index};
                }
            }
        }

        if (_ignoreUnrecognized) {
            _index += 1;
            return getNextToken();
        } else {
            throwSyntaxError();
        }
    };

    var getAllMatches = function () {
        var allMatches = [];

        var currentRules = _rules[_currentState];
        for (var i = 0; i < currentRules.length; i++) {
            var regex = currentRules[i][0];

            var match = regex.exec(_input.substring(_index));

            if (match && match.index === 0) {
                allMatches.push({matchText: match[0], value: currentRules[i][1], index: _index});
            }
        }
        sortByLongestMatchDescending(allMatches);

        return allMatches;
    };

    var sortByLongestMatchDescending = function(allMatches) {
        allMatches.sort(function (a, b) {
            if (a.matchText.length < b.matchText.length) {
                return 1;
            } else if (a.matchText.length > b.matchText.length) {
                return -1;
            }
            return 0;
        });
    };

    var changedStateWithoutReturningToken = function(oldState) {
        return _currentState !== oldState;
    };

    var throwSyntaxError = function() {
        throw new TokenJS.SyntaxError("Invalid character '" + _input[_index] + "' at index " + (_index + 1));
    };

    var consume = function(match) {
        _index += match.length;
    };

    var reset = function() {
        _index = 0;
        _currentState = 'root';
    };

    var tokenize = function() {
        reset();
        var allTokens = [];
        var token = getNextToken();
        while (token !== TokenJS.EndOfStream) {
            allTokens.push(token);
            token = getNextToken();
        }

        return allTokens;
    };

    var hasValue = function(variable) {
        return typeof variable !== 'undefined' && variable !== null;
    };

    var callbackContext = {
        state: state
    };

    return {
        getNextToken: getNextToken,
        tokenize: tokenize,
        state: state,
        reset: reset
    };
};
module.exports=DataBind;

/***/ }),
/* 16 */
/***/ (function(module, exports) {


/* 
is.js 1.4 ~ Copyright (c) 2012-2014 Cedrik Boudreau
https://github.com/Cedriking/is.js
http://isjs.quipoapps.com
is.js may be freely distributed under the MIT Licence.
 */


/* Fixing ECMA262-5 array method if not supported natively ( old IE versions ) */

(function() {
  var exports;

  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(func, option) {
      var i;
      if (typeof func !== 'function') {
        throw new TypeError();
      }
      for (i = 0; i < this.length; i++) {
        func.call(option, this[i], i, this);
      }
    };
  }

  exports = this;

  exports.is = (function() {
    var av, dateP, each, extend, isClass, methods, object, proto, stringP, ua;
    object = Object;
    proto = object.prototype;
    ua = (window.navigator && navigator.userAgent) || "";
    av = (window.navigator && navigator.appVersion) || "";
    dateP = Date.prototype;
    stringP = String.prototype;
    isClass = function(obj, klass) {
      return proto.toString.call(obj) === ("[object " + klass + "]");
    };
    extend = function(target, source) {
      return Array.prototype.slice.call(arguments, 1).forEach(function(source) {
        var key;
        for (key in source) {
          target[key] = source[key];
        }
        return target;
      });
    };
    each = function(elements, callback) {
      var element, key, _i, _len;
      if (typeof elements === 'array') {
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          element = elements[_i];
          if (!callback.call(element, _i, element)) {
            return elements;
          }
        }
      } else {
        for (key in elements) {
          if (!callback.call(elements[key], key, elements[key])) {
            return elements;
          }
        }
      }
      return elements;
    };
    methods = {};
    each(['Object', 'Array', 'Boolean', 'Date', 'Function', 'Number', 'String', 'RegExp'], function(i, type) {
      return methods["is" + type] = function() {
        return isClass(this, type);
      };
    });
    extend(methods, {
      isInteger: function() {
        return this % 1 === 0;
      },
      isFloat: function() {
        return !this.isInteger();
      },
      isOdd: function() {
        return !this.isEven();
      },
      isEven: function() {
        return this.isMultipleOf(2);
      },
      isMultipleOf: function(multiple) {
        return this % multiple === 0;
      },
      isNaN: function() {
        return !this.isNumber();
      },
      isEmpty: function() {
        if (this === null || typeof this !== 'object') {
          return !(this && this.length > 0);
        }
        return object.keys(this).length === 0;
      },
      isSameType: function(obj) {
        return proto.toString.call(this) === proto.toString.call(obj);
      },
      isOwnProperty: function(prop) {
        return proto.hasOwnProperty.call(this, prop);
      },
      isType: function(type) {
        return isClass(this, type);
      },
      isBlank: function() {
        return this.trim().length === 0;
      }
    });

    /* d = new Date() */
    extend(dateP, {
      isPast: function(d) {
        if (d == null) {
          d = this;
        }
        return this.getTime() < d.getTime();
      },
      isFuture: function(d) {
        if (d == null) {
          d = this;
        }
        return this.getTime() > d.getTime();
      },
      isWeekday: function() {
        return this.getUTCDay() > 0 && this.getUTCDay() < 6;
      },
      isWeekend: function() {
        return this.getUTCDay() === 0 || this.getUTCDay() === 6;
      },
      isBefore: function(d) {
        if (d == null) {
          d = this;
        }
        return this.isPast(d);
      },
      isAfter: function(d) {
        if (d == null) {
          d = this;
        }
        return this.isFuture(d);
      },
      isLeapYear: function() {
        var year;
        year = this.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
      },
      isValid: function() {
        return !this.getTime().isNaN();
      }
    });
    extend(stringP, {

      /* Added in version 1.3 */
      isCC: function(type) {
        var regex;
        if (type == null) {
          type = 'any';
        }
        regex = (function() {
          switch (type) {
            case 'any':
              return /^[0-9]{15,16}$/;
            case 'ae' || 'AmericanExpress':
              return /^(34)|(37)\d{14}$/;
            case 'Discover':
              return /^6011\d{12}$/;
            case 'mc' || 'MasterCard':
              return /^5[1-5]\d{14}$/;
            case 'Visa':
              return /^4\d{15}$/;
          }
        })();
        return regex.test(this);
      },
      isCreditCard: function(type) {
        if (type == null) {
          type = 'any';
        }
        return this.isCC(type);
      },
      isEmail: function() {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this);
      },
      isLatLng: function() {
        return /-?\d{1,3}\.\d+/.test(this);
      },
      isLatLong: function() {
        return this.isLatLng();
      },
      isPhone: function(country) {
        var regex;
        if (country == null) {
          country = 'us';
        }
        regex = (function() {
          switch (country) {
            case 'ar':
              return /^(?:\+|[0]{2})?(54)?(:?[\s-])*\d{4}(:?[\s-])*\d{4}$/;
            case 'au':
              return /^(?:\+|0)?(?:61)?\s?[2-478](?:[ -]?[0-9]){8}$/;
            case 'ca':
              return /^(1-?)?(([2-9]\d{2})|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/;
            case 'fr':
              return /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/;
            case 'is':
              return /^(?:\+|[0]{2})?(354)?(:?[\s-])*\d{3}(:?[\s-])*\d{4}$/;
            case 'uk':
              return /^(?:\+|044)?(?:\s+)?\(?(\d{1,5}|\d{4}\s*\d{1,2})\)?\s+|-(\d{1,4}(\s+|-)?\d{1,4}|(\d{6}))\d{6}$/;
            case 'us':
              return /^(1-?)?(\d{3})(:?[\s\-])*(\d{3})(:?[\s\-])*(\d{4})$/;
          }
        })();
        return regex.test(this);
      },
      isZip: function(country) {
        var regex;
        if (country == null) {
          country = 'us';
        }
        regex = (function() {
          switch (country) {
            case 'ar':
              return /^\d{4}$/;
            case 'au':
              return /^\d{4}$/;
            case 'at':
              return /^\d{4}$/;
            case 'be':
              return /^\d{4}$/;
            case 'br':
              return /^\d{5}[\-]?\d{3}$/;
            case 'ca':
              return /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
            case 'dk':
              return /^\d{3,4}$/;
            case 'de':
              return /^\d{5}$/;
            case 'es':
              return /^((0[1-9]|5[0-2])|[1-4]\d)\d{3}$/;
            case 'gb':
              return /^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? \d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/;
            case 'hu':
              return /^\d{4}$/;
            case 'is':
              return /^\d{3}$/;
            case 'it':
              return /^\d{5}$/;
            case 'jp':
              return /^\d{3}-\d{4}$/;
            case 'nl':
              return /^\d{4}$/;
            case 'pl':
              return /^\d{2}\-\d{3}$/;
            case 'se':
              return /^\d{3}\s?\d{2}$/;
            case 'us':
              return /^(\d{5}([\-]\d{4})?)$/;
          }
        })();
        return regex.test(this);
      }
    });
    extend(proto, methods);
    return {
      ie: function() {
        return /msie/i.test(ua);
      },
      ie6: function() {
        return /msie 6/i.test(ua);
      },
      ie7: function() {
        return /msie 7/i.test(ua);
      },
      ie8: function() {
        return /msie 8/i.test(ua);
      },
      ie9: function() {
        return /msie 9/i.test(ua);
      },
      ie10: function() {
        return /msie 10/i.test(ua);
      },
      ie11: function() {
        return /Trident.*rv[ :]*11\./.test(ua);
      },
      firefox: function() {
        return /firefox/i.test(ua);
      },
      gecko: function() {
        return /gecko/i.test(ua);
      },
      opera: function() {
        return /opera/i.test(ua);
      },
      safari: function() {
        return /webkit\W(?!.*chrome).*safari\W/i.test(ua);
      },
      chrome: function() {
        return /webkit\W.*(chrome|chromium)\W/i.test(ua);
      },
      webkit: function() {
        return /webkit\W/i.test(ua);
      },
      mobile: function() {
        return /iphone|ipod|(android.*?mobile)|blackberry|nokia/i.test(ua);
      },
      tablet: function() {
        return /ipad|android(?!.*mobile)/i.test(ua);
      },
      desktop: function() {
        return !this.mobile() && !this.tablet();
      },
      kindle: function() {
        return /kindle|silk/i.test(ua);
      },
      tv: function() {
        return /googletv|sonydtv|appletv|roku|smarttv/i.test(ua);
      },
      online: function() {
        return navigator.onLine;
      },
      offline: function() {
        return !this.online();
      },
      windows: function() {
        return /win/i.test(av);
      },
      mac: function() {
        return /mac/i.test(av);
      },
      unix: function() {
        return /x11/i.test(av);
      },
      linux: function() {
        return /linux/i.test(av);
      }
    };
  })();

}).call(this);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(n,t){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_RESULT__ = function(e){t(n.TinyAnimate=e)}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):t("object"==typeof exports?exports:n.TinyAnimate={})}(this,function(n){n.animate=function(n,e,u,a,r,i){function o(t){if(!f){var M=(t||+new Date)-h;M>=0&&a(r(M,n,s,u)),M>=0&&M>=u?(a(e),i()):c(o)}}if("number"==typeof n&&"number"==typeof e&&"number"==typeof u&&"function"==typeof a){"string"==typeof r&&t[r]&&(r=t[r]),"function"!=typeof r&&(r=t.linear),"function"!=typeof i&&(i=function(){});var c=window.requestAnimationFrame||function(n){window.setTimeout(n,1e3/60)},f=!1,s=e-n;a(n);var h=window.performance&&window.performance.now?window.performance.now():+new Date;return c(o),{cancel:function(){f=!0}}}},n.animateCSS=function(t,e,u,a,r,i,o,c){var f=function(n){t.style[e]=n+u};return n.animate(a,r,i,f,o,c)},n.cancel=function(n){n&&n.cancel()};var t=n.easings={};t.linear=function(n,t,e,u){return e*n/u+t},t.easeInQuad=function(n,t,e,u){return e*(n/=u)*n+t},t.easeOutQuad=function(n,t,e,u){return-e*(n/=u)*(n-2)+t},t.easeInOutQuad=function(n,t,e,u){return(n/=u/2)<1?e/2*n*n+t:-e/2*(--n*(n-2)-1)+t},t.easeInCubic=function(n,t,e,u){return e*(n/=u)*n*n+t},t.easeOutCubic=function(n,t,e,u){return e*((n=n/u-1)*n*n+1)+t},t.easeInOutCubic=function(n,t,e,u){return(n/=u/2)<1?e/2*n*n*n+t:e/2*((n-=2)*n*n+2)+t},t.easeInQuart=function(n,t,e,u){return e*(n/=u)*n*n*n+t},t.easeOutQuart=function(n,t,e,u){return-e*((n=n/u-1)*n*n*n-1)+t},t.easeInOutQuart=function(n,t,e,u){return(n/=u/2)<1?e/2*n*n*n*n+t:-e/2*((n-=2)*n*n*n-2)+t},t.easeInQuint=function(n,t,e,u){return e*(n/=u)*n*n*n*n+t},t.easeOutQuint=function(n,t,e,u){return e*((n=n/u-1)*n*n*n*n+1)+t},t.easeInOutQuint=function(n,t,e,u){return(n/=u/2)<1?e/2*n*n*n*n*n+t:e/2*((n-=2)*n*n*n*n+2)+t},t.easeInSine=function(n,t,e,u){return-e*Math.cos(n/u*(Math.PI/2))+e+t},t.easeOutSine=function(n,t,e,u){return e*Math.sin(n/u*(Math.PI/2))+t},t.easeInOutSine=function(n,t,e,u){return-e/2*(Math.cos(Math.PI*n/u)-1)+t},t.easeInExpo=function(n,t,e,u){return 0==n?t:e*Math.pow(2,10*(n/u-1))+t},t.easeOutExpo=function(n,t,e,u){return n==u?t+e:e*(-Math.pow(2,-10*n/u)+1)+t},t.easeInOutExpo=function(n,t,e,u){return 0==n?t:n==u?t+e:(n/=u/2)<1?e/2*Math.pow(2,10*(n-1))+t:e/2*(-Math.pow(2,-10*--n)+2)+t},t.easeInCirc=function(n,t,e,u){return-e*(Math.sqrt(1-(n/=u)*n)-1)+t},t.easeOutCirc=function(n,t,e,u){return e*Math.sqrt(1-(n=n/u-1)*n)+t},t.easeInOutCirc=function(n,t,e,u){return(n/=u/2)<1?-e/2*(Math.sqrt(1-n*n)-1)+t:e/2*(Math.sqrt(1-(n-=2)*n)+1)+t},t.easeInElastic=function(n,t,e,u){var a=0,r=e;if(0==n)return t;if(1==(n/=u))return t+e;if(a||(a=.3*u),r<Math.abs(e)){r=e;var i=a/4}else var i=a/(2*Math.PI)*Math.asin(e/r);return-(r*Math.pow(2,10*(n-=1))*Math.sin((n*u-i)*(2*Math.PI)/a))+t},t.easeOutElastic=function(n,t,e,u){var a=0,r=e;if(0==n)return t;if(1==(n/=u))return t+e;if(a||(a=.3*u),r<Math.abs(e)){r=e;var i=a/4}else var i=a/(2*Math.PI)*Math.asin(e/r);return r*Math.pow(2,-10*n)*Math.sin((n*u-i)*(2*Math.PI)/a)+e+t},t.easeInOutElastic=function(n,t,e,u){var a=0,r=e;if(0==n)return t;if(2==(n/=u/2))return t+e;if(a||(a=u*(.3*1.5)),r<Math.abs(e)){r=e;var i=a/4}else var i=a/(2*Math.PI)*Math.asin(e/r);return 1>n?-.5*(r*Math.pow(2,10*(n-=1))*Math.sin((n*u-i)*(2*Math.PI)/a))+t:r*Math.pow(2,-10*(n-=1))*Math.sin((n*u-i)*(2*Math.PI)/a)*.5+e+t},t.easeInBack=function(n,t,e,u,a){return void 0==a&&(a=1.70158),e*(n/=u)*n*((a+1)*n-a)+t},t.easeOutBack=function(n,t,e,u,a){return void 0==a&&(a=1.70158),e*((n=n/u-1)*n*((a+1)*n+a)+1)+t},t.easeInOutBack=function(n,t,e,u,a){return void 0==a&&(a=1.70158),(n/=u/2)<1?e/2*(n*n*(((a*=1.525)+1)*n-a))+t:e/2*((n-=2)*n*(((a*=1.525)+1)*n+a)+2)+t},t.easeInBounce=function(n,e,u,a){return u-t.easeOutBounce(a-n,0,u,a)+e},t.easeOutBounce=function(n,t,e,u){return(n/=u)<1/2.75?e*(7.5625*n*n)+t:2/2.75>n?e*(7.5625*(n-=1.5/2.75)*n+.75)+t:2.5/2.75>n?e*(7.5625*(n-=2.25/2.75)*n+.9375)+t:e*(7.5625*(n-=2.625/2.75)*n+.984375)+t},t.easeInOutBounce=function(n,e,u,a){return a/2>n?.5*t.easeInBounce(2*n,0,u,a)+e:.5*t.easeOutBounce(2*n-a,0,u,a)+.5*u+e}});
//# sourceMappingURL=TinyAnimate.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// Patch IE9 and below
try {
  document.createElement('DIV').style.setProperty('opacity', 0, '');
} catch (error) {
  CSSStyleDeclaration.prototype.getProperty = function(a) {
    return this.getAttribute(a);
  };
  
  CSSStyleDeclaration.prototype.setProperty = function(a,b) {
    return this.setAttribute(a, b + '');
  };

  CSSStyleDeclaration.prototype.removeProperty = function(a) {
    return this.removeAttribute(a);
  };
}

/**
 * Module Dependencies.
 */

var Emitter = __webpack_require__(19);
var query = __webpack_require__(20);
var after = __webpack_require__(21);
var has3d = __webpack_require__(25);
var ease = __webpack_require__(27);

/**
 * CSS Translate
 */

var translate = has3d
  ? ['translate3d(', ', 0)']
  : ['translate(', ')'];


/**
 * Export `Move`
 */

module.exports = Move;

/**
 * Get computed style.
 */

var style = window.getComputedStyle
  || window.currentStyle;

/**
 * Library version.
 */

Move.version = '0.5.0';

/**
 * Export `ease`
 */

Move.ease = ease;

/**
 * Defaults.
 *
 *   `duration` - default duration of 500ms
 *
 */

Move.defaults = {
  duration: 500
};

/**
 * Default element selection utilized by `move(selector)`.
 *
 * Override to implement your own selection, for example
 * with jQuery one might write:
 *
 *     move.select = function(selector) {
 *       return jQuery(selector).get(0);
 *     };
 *
 * @param {Object|String} selector
 * @return {Element}
 * @api public
 */

Move.select = function(selector){
  if ('string' != typeof selector) return selector;
  return query(selector);
};

/**
 * Initialize a new `Move` with the given `el`.
 *
 * @param {Element} el
 * @api public
 */

function Move(el) {
  if (!(this instanceof Move)) return new Move(el);
  if ('string' == typeof el) el = query(el);
  if (!el) throw new TypeError('Move must be initialized with element or selector');
  this.el = el;
  this._props = {};
  this._rotate = 0;
  this._transitionProps = [];
  this._transforms = [];
  this.duration(Move.defaults.duration)
};


/**
 * Inherit from `EventEmitter.prototype`.
 */

Emitter(Move.prototype);

/**
 * Buffer `transform`.
 *
 * @param {String} transform
 * @return {Move} for chaining
 * @api private
 */

Move.prototype.transform = function(transform){
  this._transforms.push(transform);
  return this;
};

/**
 * Skew `x` and `y`.
 *
 * @param {Number} x
 * @param {Number} y
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.skew = function(x, y){
  return this.transform('skew('
    + x + 'deg, '
    + (y || 0)
    + 'deg)');
};

/**
 * Skew x by `n`.
 *
 * @param {Number} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.skewX = function(n){
  return this.transform('skewX(' + n + 'deg)');
};

/**
 * Skew y by `n`.
 *
 * @param {Number} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.skewY = function(n){
  return this.transform('skewY(' + n + 'deg)');
};

/**
 * Translate `x` and `y` axis.
 *
 * @param {Number|String} x
 * @param {Number|String} y
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.translate =
Move.prototype.to = function(x, y){
  return this.transform(translate.join(''
    + fixUnits(x) + ', '
    + fixUnits(y || 0)));
};

/**
 * Translate on the x axis to `n`.
 *
 * @param {Number|String} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.translateX =
Move.prototype.x = function(n){
  return this.transform('translateX(' + fixUnits(n) + ')');
};

/**
 * Translate on the y axis to `n`.
 *
 * @param {Number|String} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.translateY =
Move.prototype.y = function(n){
  return this.transform('translateY(' + fixUnits(n) + ')');
};

/**
 * Scale the x and y axis by `x`, or
 * individually scale `x` and `y`.
 *
 * @param {Number} x
 * @param {Number} y
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.scale = function(x, y){
  return this.transform('scale('
    + x + ', '
    + (y || x)
    + ')');
};

/**
 * Scale x axis by `n`.
 *
 * @param {Number} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.scaleX = function(n){
  return this.transform('scaleX(' + n + ')')
};

/**
 * Apply a matrix transformation
 *
 * @param {Number} m11 A matrix coefficient
 * @param {Number} m12 A matrix coefficient
 * @param {Number} m21 A matrix coefficient
 * @param {Number} m22 A matrix coefficient
 * @param {Number} m31 A matrix coefficient
 * @param {Number} m32 A matrix coefficient
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.matrix = function(m11, m12, m21, m22, m31, m32){
  return this.transform('matrix(' + [m11,m12,m21,m22,m31,m32].join(',') + ')');
};

/**
 * Scale y axis by `n`.
 *
 * @param {Number} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.scaleY = function(n){
  return this.transform('scaleY(' + n + ')')
};

/**
 * Rotate `n` degrees.
 *
 * @param {Number} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.rotate = function(n){
  return this.transform('rotate(' + n + 'deg)');
};

/**
 * Set transition easing function to to `fn` string.
 *
 * When:
 *
 *   - null "ease" is used
 *   - "in" "ease-in" is used
 *   - "out" "ease-out" is used
 *   - "in-out" "ease-in-out" is used
 *
 * @param {String} fn
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.ease = function(fn){
  fn = ease[fn] || fn || 'ease';
  return this.setVendorProperty('transition-timing-function', fn);
};

/**
 * Set animation properties
 *
 * @param {String} name
 * @param {Object} props
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.animate = function(name, props){
  for (var i in props){
    if (props.hasOwnProperty(i)){
      this.setVendorProperty('animation-' + i, props[i])
    }
  }
  return this.setVendorProperty('animation-name', name);
}

/**
 * Set duration to `n`.
 *
 * @param {Number|String} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.duration = function(n){
  n = this._duration = 'string' == typeof n
    ? parseFloat(n) * 1000
    : n;
  return this.setVendorProperty('transition-duration', n + 'ms');
};

/**
 * Delay the animation by `n`.
 *
 * @param {Number|String} n
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.delay = function(n){
  n = 'string' == typeof n
    ? parseFloat(n) * 1000
    : n;
  return this.setVendorProperty('transition-delay', n + 'ms');
};

/**
 * Set `prop` to `val`, deferred until `.end()` is invoked.
 *
 * @param {String} prop
 * @param {String} val
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.setProperty = function(prop, val){
  this._props[prop] = val;
  return this;
};

/**
 * Set a vendor prefixed `prop` with the given `val`.
 *
 * @param {String} prop
 * @param {String} val
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.setVendorProperty = function(prop, val){
  this.setProperty('-webkit-' + prop, val);
  this.setProperty('-moz-' + prop, val);
  this.setProperty('-ms-' + prop, val);
  this.setProperty('-o-' + prop, val);
  return this;
};

/**
 * Set `prop` to `value`, deferred until `.end()` is invoked
 * and adds the property to the list of transition props.
 *
 * @param {String} prop
 * @param {String} val
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.set = function(prop, val){
  this.transition(prop);
  this._props[prop] = val;
  return this;
};

/**
 * Increment `prop` by `val`, deferred until `.end()` is invoked
 * and adds the property to the list of transition props.
 *
 * @param {String} prop
 * @param {Number} val
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.add = function(prop, val){
  if (!style) return;
  var self = this;
  return this.on('start', function(){
    var curr = parseInt(self.current(prop), 10);
    self.set(prop, curr + val + 'px');
  });
};

/**
 * Decrement `prop` by `val`, deferred until `.end()` is invoked
 * and adds the property to the list of transition props.
 *
 * @param {String} prop
 * @param {Number} val
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.sub = function(prop, val){
  if (!style) return;
  var self = this;
  return this.on('start', function(){
    var curr = parseInt(self.current(prop), 10);
    self.set(prop, curr - val + 'px');
  });
};

/**
 * Get computed or "current" value of `prop`.
 *
 * @param {String} prop
 * @return {String}
 * @api public
 */

Move.prototype.current = function(prop){
  return style(this.el).getPropertyValue(prop);
};

/**
 * Add `prop` to the list of internal transition properties.
 *
 * @param {String} prop
 * @return {Move} for chaining
 * @api private
 */

Move.prototype.transition = function(prop){
  if (!this._transitionProps.indexOf(prop)) return this;
  this._transitionProps.push(prop);
  return this;
};

/**
 * Commit style properties, aka apply them to `el.style`.
 *
 * @return {Move} for chaining
 * @see Move#end()
 * @api private
 */

Move.prototype.applyProperties = function(){
  for (var prop in this._props) {
    this.el.style.setProperty(prop, this._props[prop], '');
  }
  return this;
};

/**
 * Re-select element via `selector`, replacing
 * the current element.
 *
 * @param {String} selector
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.move =
Move.prototype.select = function(selector){
  this.el = Move.select(selector);
  return this;
};

/**
 * Defer the given `fn` until the animation
 * is complete. `fn` may be one of the following:
 *
 *   - a function to invoke
 *   - an instanceof `Move` to call `.end()`
 *   - nothing, to return a clone of this `Move` instance for chaining
 *
 * @param {Function|Move} fn
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.then = function(fn){
  // invoke .end()
  if (fn instanceof Move) {
    this.on('end', function(){
      fn.end();
    });
  // callback
  } else if ('function' == typeof fn) {
    this.on('end', fn);
  // chain
  } else {
    var clone = new Move(this.el);
    clone._transforms = this._transforms.slice(0);
    this.then(clone);
    clone.parent = this;
    return clone;
  }

  return this;
};

/**
 * Pop the move context.
 *
 * @return {Move} parent Move
 * @api public
 */

Move.prototype.pop = function(){
  return this.parent;
};

/**
 * Reset duration.
 *
 * @return {Move}
 * @api public
 */

Move.prototype.reset = function(){
  this.el.style.webkitTransitionDuration =
  this.el.style.mozTransitionDuration =
  this.el.style.msTransitionDuration =
  this.el.style.oTransitionDuration = '';
  return this;
};

/**
 * Start animation, optionally calling `fn` when complete.
 *
 * @param {Function} fn
 * @return {Move} for chaining
 * @api public
 */

Move.prototype.end = function(fn){
  var self = this;

  // emit "start" event
  this.emit('start');

  // transforms
  if (this._transforms.length) {
    this.setVendorProperty('transform', this._transforms.join(' '));
  }

  // transition properties
  this.setVendorProperty('transition-properties', this._transitionProps.join(', '));
  this.applyProperties();

  // callback given
  if (fn) this.then(fn);

  // emit "end" when complete
  after.once(this.el, function(){
    self.reset();
    self.emit('end');
  });

  return this;
};

/**
 * Fix value units
 *
 * @param {Number|String} val
 * @return {String}
 * @api private
 */

function fixUnits(val) {
  return 'string' === typeof val && isNaN(+val) ? val : val + 'px';
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

function one(selector, el) {
  return el.querySelector(selector);
}

exports = module.exports = function(selector, el){
  el = el || document;
  return one(selector, el);
};

exports.all = function(selector, el){
  el = el || document;
  return el.querySelectorAll(selector);
};

exports.engine = function(obj){
  if (!obj.one) throw new Error('.one callback required');
  if (!obj.all) throw new Error('.all callback required');
  one = obj.one;
  exports.all = obj.all;
  return exports;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var hasTransitions = __webpack_require__(22);
var emitter = __webpack_require__(23);

function afterTransition(el, callback) {
  if(hasTransitions(el)) {
    return emitter(el).bind(callback);
  }
  return callback.apply(el);
};

afterTransition.once = function(el, callback) {
  afterTransition(el, function fn(){
    callback.apply(el);
    emitter(el).unbind(fn);
  });
};

module.exports = afterTransition;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

/**
 * This will store the property that the current
 * browser uses for transitionDuration
 */
var property;

/**
 * The properties we'll check on an element
 * to determine if it actually has transitions
 * We use duration as this is the only property
 * needed to technically have transitions
 * @type {Array}
 */
var types = [
  "transitionDuration",
  "MozTransitionDuration",
  "webkitTransitionDuration"
];

/**
 * Determine the correct property for this browser
 * just once so we done need to check every time
 */
while(types.length) {
  var type = types.shift();
  if(type in document.body.style) {
    property = type;
  }
}

/**
 * Determine if the browser supports transitions or
 * if an element has transitions at all.
 * @param  {Element}  el Optional. Returns browser support if not included
 * @return {Boolean}
 */
function hasTransitions(el){
  if(!property) {
    return false; // No browser support for transitions
  }
  if(!el) {
    return property != null; // We just want to know if browsers support it
  }
  var duration = getComputedStyle(el)[property];
  return duration !== "" && parseFloat(duration) !== 0; // Does this element have transitions?
}

module.exports = hasTransitions;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module Dependencies
 */

var events = __webpack_require__(24);

// CSS events

var watch = [
  'transitionend'
, 'webkitTransitionEnd'
, 'oTransitionEnd'
, 'MSTransitionEnd'
, 'animationend'
, 'webkitAnimationEnd'
, 'oAnimationEnd'
, 'MSAnimationEnd'
];

/**
 * Expose `CSSnext`
 */

module.exports = CssEmitter;

/**
 * Initialize a new `CssEmitter`
 *
 */

function CssEmitter(element){
  if (!(this instanceof CssEmitter)) return new CssEmitter(element);
  this.el = element;
}

/**
 * Bind CSS events.
 *
 * @api public
 */

CssEmitter.prototype.bind = function(fn){
  for (var i=0; i < watch.length; i++) {
    events.bind(this.el, watch[i], fn);
  }
  return this;
};

/**
 * Unbind CSS events
 * 
 * @api public
 */

CssEmitter.prototype.unbind = function(fn){
  for (var i=0; i < watch.length; i++) {
    events.unbind(this.el, watch[i], fn);
  }
  return this;
};

/**
 * Fire callback only once
 * 
 * @api public
 */

CssEmitter.prototype.once = function(fn){
  var self = this;
  function on(){
    self.unbind(on);
    fn.apply(self.el, arguments);
  }
  self.bind(on);
  return this;
};



/***/ }),
/* 24 */
/***/ (function(module, exports) {


/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  if (el.addEventListener) {
    el.addEventListener(type, fn, capture);
  } else {
    el.attachEvent('on' + type, fn);
  }
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  if (el.removeEventListener) {
    el.removeEventListener(type, fn, capture);
  } else {
    el.detachEvent('on' + type, fn);
  }
  return fn;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {


var prop = __webpack_require__(26);

// IE <=8 doesn't have `getComputedStyle`
if (!prop || !window.getComputedStyle) {
  module.exports = false;

} else {
  var map = {
    webkitTransform: '-webkit-transform',
    OTransform: '-o-transform',
    msTransform: '-ms-transform',
    MozTransform: '-moz-transform',
    transform: 'transform'
  };

  // from: https://gist.github.com/lorenzopolidori/3794226
  var el = document.createElement('div');
  el.style[prop] = 'translate3d(1px,1px,1px)';
  document.body.insertBefore(el, null);
  var val = getComputedStyle(el).getPropertyValue(map[prop]);
  document.body.removeChild(el);
  module.exports = null != val && val.length && 'none' != val;
}


/***/ }),
/* 26 */
/***/ (function(module, exports) {


var styles = [
  'webkitTransform',
  'MozTransform',
  'msTransform',
  'OTransform',
  'transform'
];

var el = document.createElement('p');
var style;

for (var i = 0; i < styles.length; i++) {
  style = styles[i];
  if (null != el.style[style]) {
    module.exports = style;
    break;
  }
}


/***/ }),
/* 27 */
/***/ (function(module, exports) {


/**
 * CSS Easing functions
 */

module.exports = {
    'in':                'ease-in'
  , 'out':               'ease-out'
  , 'in-out':            'ease-in-out'
  , 'snap':              'cubic-bezier(0,1,.5,1)'
  , 'linear':            'cubic-bezier(0.250, 0.250, 0.750, 0.750)'
  , 'ease-in-quad':      'cubic-bezier(0.550, 0.085, 0.680, 0.530)'
  , 'ease-in-cubic':     'cubic-bezier(0.550, 0.055, 0.675, 0.190)'
  , 'ease-in-quart':     'cubic-bezier(0.895, 0.030, 0.685, 0.220)'
  , 'ease-in-quint':     'cubic-bezier(0.755, 0.050, 0.855, 0.060)'
  , 'ease-in-sine':      'cubic-bezier(0.470, 0.000, 0.745, 0.715)'
  , 'ease-in-expo':      'cubic-bezier(0.950, 0.050, 0.795, 0.035)'
  , 'ease-in-circ':      'cubic-bezier(0.600, 0.040, 0.980, 0.335)'
  , 'ease-in-back':      'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
  , 'ease-out-quad':     'cubic-bezier(0.250, 0.460, 0.450, 0.940)'
  , 'ease-out-cubic':    'cubic-bezier(0.215, 0.610, 0.355, 1.000)'
  , 'ease-out-quart':    'cubic-bezier(0.165, 0.840, 0.440, 1.000)'
  , 'ease-out-quint':    'cubic-bezier(0.230, 1.000, 0.320, 1.000)'
  , 'ease-out-sine':     'cubic-bezier(0.390, 0.575, 0.565, 1.000)'
  , 'ease-out-expo':     'cubic-bezier(0.190, 1.000, 0.220, 1.000)'
  , 'ease-out-circ':     'cubic-bezier(0.075, 0.820, 0.165, 1.000)'
  , 'ease-out-back':     'cubic-bezier(0.175, 0.885, 0.320, 1.275)'
  , 'ease-out-quad':     'cubic-bezier(0.455, 0.030, 0.515, 0.955)'
  , 'ease-out-cubic':    'cubic-bezier(0.645, 0.045, 0.355, 1.000)'
  , 'ease-in-out-quart': 'cubic-bezier(0.770, 0.000, 0.175, 1.000)'
  , 'ease-in-out-quint': 'cubic-bezier(0.860, 0.000, 0.070, 1.000)'
  , 'ease-in-out-sine':  'cubic-bezier(0.445, 0.050, 0.550, 0.950)'
  , 'ease-in-out-expo':  'cubic-bezier(1.000, 0.000, 0.000, 1.000)'
  , 'ease-in-out-circ':  'cubic-bezier(0.785, 0.135, 0.150, 0.860)'
  , 'ease-in-out-back':  'cubic-bezier(0.680, -0.550, 0.265, 1.550)'
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * DEVELOPED BY
 * GIL LOPES BUENO
 * gilbueno.mail@gmail.com
 *
 * WORKS WITH:
 * IE8*, IE 9+, FF 4+, SF 5+, WebKit, CH 7+, OP 12+, BESEN, Rhino 1.7+
 * For IE8 (and other legacy browsers) WatchJS will use dirty checking  
 *
 * FORK:
 * https://github.com/melanke/Watch.JS
 *
 * LICENSE: MIT
 */


(function (factory) {
    if (true) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        window.WatchJS = factory();
        window.watch = window.WatchJS.watch;
        window.unwatch = window.WatchJS.unwatch;
        window.callWatchers = window.WatchJS.callWatchers;
    }
}(function () {

    var WatchJS = {
        noMore: false,        // use WatchJS.suspend(obj) instead
        useDirtyCheck: false // use only dirty checking to track changes.
    },
    lengthsubjects = [];
    
    var dirtyChecklist = [];
    var pendingChanges = []; // used coalesce changes from defineProperty and __defineSetter__
    
    var supportDefineProperty = false;
    try {
        supportDefineProperty = Object.defineProperty && Object.defineProperty({},'x', {});
    } catch(ex) {  /* not supported */  }

    var isFunction = function (functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
    };

    var isInt = function (x) {
        return x % 1 === 0;
    };

    var isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    var isObject = function(obj) {
        return {}.toString.apply(obj) === '[object Object]';
    };
    
    var getObjDiff = function(a, b){
        var aplus = [],
        bplus = [];

        if(!(typeof a == "string") && !(typeof b == "string")){

            if (isArray(a) && b) {
                for (var i=0; i<a.length; i++) {
                    if (b[i] === undefined) aplus.push(i);
                }
            } else {
                for(var i in a){
                    if (a.hasOwnProperty(i)) {
                        if(b && b[i] === undefined) {
                            aplus.push(i);
                        }
                    }
                }
            }

            if (isArray(b) && a) {
                for (var j=0; j<b.length; j++) {
                    if (a[j] === undefined) bplus.push(j);
                }
            } else {
                for(var j in b){
                    if (b.hasOwnProperty(j)) {
                        if(a && a[j] === undefined) {
                            bplus.push(j);
                        }
                    }
                }
            }
        }

        return {
            added: aplus,
            removed: bplus
        }
    };

    var clone = function(obj){

        if (null == obj || "object" != typeof obj) {
            return obj;
        }

        var copy = obj.constructor();

        for (var attr in obj) {
            copy[attr] = obj[attr];
        }

        return copy;        

    }

    var defineGetAndSet = function (obj, propName, getter, setter) {
        try {
            Object.observe(obj, function(changes) {
                changes.forEach(function(change) {
                    if (change.name === propName) {
                        setter(change.object[change.name]);
                    }
                });
            });            
        } 
        catch(e) {
            try {
                Object.defineProperty(obj, propName, {
                    get: getter,
                    set: function(value) {        
                        setter.call(this,value,true); // coalesce changes
                    },
                    enumerable: true,
                    configurable: true
                });
            } 
            catch(e2) {
                try{
                    Object.prototype.__defineGetter__.call(obj, propName, getter);
                    Object.prototype.__defineSetter__.call(obj, propName, function(value) {
                        setter.call(this,value,true); // coalesce changes
                    });
                } 
                catch(e3) {
                    observeDirtyChanges(obj,propName,setter);
                    //throw new Error("watchJS error: browser not supported :/")
                }
            }
        }
    };

    var defineProp = function (obj, propName, value) {
        try {
            Object.defineProperty(obj, propName, {
                enumerable: false,
                configurable: true,
                writable: false,
                value: value
            });
        } catch(error) {
            obj[propName] = value;
        }
    };

    var observeDirtyChanges = function(obj,propName,setter) {
        dirtyChecklist[dirtyChecklist.length] = {
            prop:       propName,
            object:     obj,
            orig:       clone(obj[propName]),
            callback:   setter
        }        
    }
    
    var watch = function () {

        if (isFunction(arguments[1])) {
            watchAll.apply(this, arguments);
        } else if (isArray(arguments[1])) {
            watchMany.apply(this, arguments);
        } else {
            watchOne.apply(this, arguments);
        }

    };


    var watchAll = function (obj, watcher, level, addNRemove) {

        if ((typeof obj == "string") || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        if(isArray(obj)) {
            defineWatcher(obj, "__watchall__", watcher, level); // watch all changes on the array
            if (level===undefined||level > 0) {
                for (var prop = 0; prop < obj.length; prop++) { // watch objects in array
                   watchAll(obj[prop],watcher,level, addNRemove);
                }
            }
        } 
        else {
            var prop,props = [];
            for (prop in obj) { //for each attribute if obj is an object
                if (prop == "$val" || (!supportDefineProperty && prop === 'watchers')) {
                    continue;
                }

                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    props.push(prop); //put in the props
                }
            }
            watchMany(obj, props, watcher, level, addNRemove); //watch all items of the props
        }


        if (addNRemove) {
            pushToLengthSubjects(obj, "$$watchlengthsubjectroot", watcher, level);
        }
    };


    var watchMany = function (obj, props, watcher, level, addNRemove) {

        if ((typeof obj == "string") || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        for (var i=0; i<props.length; i++) { //watch each property
            var prop = props[i];
            watchOne(obj, prop, watcher, level, addNRemove);
        }

    };

    var watchOne = function (obj, prop, watcher, level, addNRemove) {
        if ((typeof obj == "string") || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        if(isFunction(obj[prop])) { //dont watch if it is a function
            return;
        }
        if(obj[prop] != null && (level === undefined || level > 0)){
            watchAll(obj[prop], watcher, level!==undefined? level-1 : level); //recursively watch all attributes of this
        }

        defineWatcher(obj, prop, watcher, level);

        if(addNRemove && (level === undefined || level > 0)){
            pushToLengthSubjects(obj, prop, watcher, level);
        }

    };

    var unwatch = function () {

        if (isFunction(arguments[1])) {
            unwatchAll.apply(this, arguments);
        } else if (isArray(arguments[1])) {
            unwatchMany.apply(this, arguments);
        } else {
            unwatchOne.apply(this, arguments);
        }

    };

    var unwatchAll = function (obj, watcher) {

        if (obj instanceof String || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        if (isArray(obj)) {
            var props = ['__watchall__'];
            for (var prop = 0; prop < obj.length; prop++) { //for each item if obj is an array
                props.push(prop); //put in the props
            }
            unwatchMany(obj, props, watcher); //watch all itens of the props
        } else {
            var unwatchPropsInObject = function (obj2) {
                var props = [];
                for (var prop2 in obj2) { //for each attribute if obj is an object
                    if (obj2.hasOwnProperty(prop2)) {
                        if (obj2[prop2] instanceof Object) {
                            unwatchPropsInObject(obj2[prop2]); //recurs into object props
                        } else {
                            props.push(prop2); //put in the props
                        }
                    }
                }
                unwatchMany(obj2, props, watcher); //unwatch all of the props
            };
            unwatchPropsInObject(obj);
        }
    };


    var unwatchMany = function (obj, props, watcher) {

        for (var prop2 in props) { //watch each attribute of "props" if is an object
            if (props.hasOwnProperty(prop2)) {
                unwatchOne(obj, props[prop2], watcher);
            }
        }
    };

    var timeouts = [],
        timerID = null;
    function clearTimerID() {
        timerID = null;
        for(var i=0; i< timeouts.length; i++) {
            timeouts[i]();
        }
        timeouts.length = 0;
    }
    var getTimerID= function () {
        if (!timerID)  {
            timerID = setTimeout(clearTimerID);
        }
        return timerID;
    }
    var registerTimeout = function(fn) { // register function to be called on timeout
        if (timerID==null) getTimerID();
        timeouts[timeouts.length] = fn;
    }
    
    // Track changes made to an array, object or an object's property 
    // and invoke callback with a single change object containing type, value, oldvalue and array splices
    // Syntax: 
    //      trackChange(obj, callback, recursive, addNRemove)
    //      trackChange(obj, prop, callback, recursive, addNRemove)
    var trackChange = function() {
        var fn = (isFunction(arguments[2])) ? trackProperty : trackObject ;
        fn.apply(this,arguments);
    }

    // track changes made to an object and invoke callback with a single change object containing type, value and array splices
    var trackObject= function(obj, callback, recursive, addNRemove) {
        var change = null,lastTimerID = -1;
        var isArr = isArray(obj);
        var level,fn = function(prop, action, newValue, oldValue) {
            var timerID = getTimerID();
            if (lastTimerID!==timerID) { // check if timer has changed since last update
                lastTimerID = timerID;
                change = {
                    type: 'update'
                }
                change['value'] = obj;
                change['splices'] = null;
                registerTimeout(function() {
                    callback.call(this,change);
                    change = null;
                });
            }
            // create splices for array changes
            if (isArr && obj === this && change !== null)  {                
                if (action==='pop'||action==='shift') {
                    newValue = [];
                    oldValue = [oldValue];
                }
                else if (action==='push'||action==='unshift') {
                    newValue = [newValue];
                    oldValue = [];
                }
                else if (action!=='splice') { 
                    return; // return here - for reverse and sort operations we don't need to return splices. a simple update will do
                }
                if (!change.splices) change.splices = [];
                change.splices[change.splices.length] = {
                    index: prop,
                    deleteCount: oldValue ? oldValue.length : 0,
                    addedCount: newValue ? newValue.length : 0,
                    added: newValue,
                    deleted: oldValue
                };
            }

        }  
        level = (recursive==true) ? undefined : 0;        
        watchAll(obj,fn, level, addNRemove);
    }
    
    // track changes made to the property of an object and invoke callback with a single change object containing type, value, oldvalue and splices
    var trackProperty = function(obj,prop,callback,recursive, addNRemove) { 
        if (obj && prop) {
            watchOne(obj,prop,function(prop, action, newvalue, oldvalue) {
                var change = {
                    type: 'update'
                }
                change['value'] = newvalue;
                change['oldvalue'] = oldvalue;
                if (recursive && isObject(newvalue)||isArray(newvalue)) {
                    trackObject(newvalue,callback,recursive, addNRemove);
                }               
                callback.call(this,change);
            },0)
            
            if (recursive && isObject(obj[prop])||isArray(obj[prop])) {
                trackObject(obj[prop],callback,recursive, addNRemove);
            }                           
        }
    }
    
    
    var defineWatcher = function (obj, prop, watcher, level) {
        var newWatcher = false;
        var isArr = isArray(obj);
        
        if (!obj.watchers) {
            defineProp(obj, "watchers", {});
            if (isArr) {
                // watch array functions
                watchFunctions(obj, function(index,action,newValue, oldValue) {
                    addPendingChange(obj, index, action,newValue, oldValue);
                    if (level !== 0 && newValue && (isObject(newValue) || isArray(newValue))) {
                        var i,n, ln, wAll, watchList = obj.watchers[prop];
                        if ((wAll = obj.watchers['__watchall__'])) {
                            watchList = watchList ? watchList.concat(wAll) : wAll;
                        }
                        ln = watchList ?  watchList.length : 0;
                        for (i = 0; i<ln; i++) {
                            if (action!=='splice') {
                                watchAll(newValue, watchList[i], (level===undefined)?level:level-1);
                            }
                            else {
                                // watch spliced values
                                for(n=0; n < newValue.length; n++) {
                                    watchAll(newValue[n], watchList[i], (level===undefined)?level:level-1);
                                }
                            }
                        }
                    }
                });
            }
        }

        if (!obj.watchers[prop]) {
            obj.watchers[prop] = [];
            if (!isArr) newWatcher = true;
        }

        for (var i=0; i<obj.watchers[prop].length; i++) {
            if(obj.watchers[prop][i] === watcher){
                return;
            }
        }

        obj.watchers[prop].push(watcher); //add the new watcher to the watchers array

        if (newWatcher) {
            var val = obj[prop];            
            var getter = function () {
                return val;                        
            };

            var setter = function (newval, delayWatcher) {
                var oldval = val;
                val = newval;                
                if (level !== 0 
                    && obj[prop] && (isObject(obj[prop]) || isArray(obj[prop]))
                    && !obj[prop].watchers) {
                    // watch sub properties
                    var i,ln = obj.watchers[prop].length; 
                    for(i=0; i<ln; i++) {
                        watchAll(obj[prop], obj.watchers[prop][i], (level===undefined)?level:level-1);
                    }
                }

                //watchFunctions(obj, prop);
                
                if (isSuspended(obj, prop)) {
                    resume(obj, prop);
                    return;
                }

                if (!WatchJS.noMore){ // this does not work with Object.observe
                    //if (JSON.stringify(oldval) !== JSON.stringify(newval)) {
                    if (oldval !== newval) {
                        if (!delayWatcher) {
                            callWatchers(obj, prop, "set", newval, oldval);
                        }
                        else {
                            addPendingChange(obj, prop, "set", newval, oldval);
                        }
                        WatchJS.noMore = false;
                    }
                }
            };

            if (WatchJS.useDirtyCheck) {
                observeDirtyChanges(obj,prop,setter);
            }
            else {
                defineGetAndSet(obj, prop, getter, setter);
            }
        }

    };

    var callWatchers = function (obj, prop, action, newval, oldval) {
        if (prop !== undefined) {
            var ln, wl, watchList = obj.watchers[prop];
            if ((wl = obj.watchers['__watchall__'])) {
                watchList = watchList ? watchList.concat(wl) : wl;
            }
            ln = watchList ? watchList.length : 0;
            for (var wr=0; wr< ln; wr++) {
                watchList[wr].call(obj, prop, action, newval, oldval);
            }
        } else {
            for (var prop in obj) {//call all
                if (obj.hasOwnProperty(prop)) {
                    callWatchers(obj, prop, action, newval, oldval);
                }
            }
        }
    };

    var methodNames = ['pop', 'push', 'reverse', 'shift', 'sort', 'slice', 'unshift', 'splice'];
    var defineArrayMethodWatcher = function (obj, original, methodName, callback) {
        defineProp(obj, methodName, function () {
            var index = 0;
            var i,newValue, oldValue, response;                        
            // get values before splicing array 
            if (methodName === 'splice') {
               var start = arguments[0];
               var end = start + arguments[1];
               oldValue = obj.slice(start,end);
               newValue = [];
               for(i=2;i<arguments.length;i++) {
                   newValue[i-2] = arguments[i];
               }
               index = start;
            } 
            else {
                newValue = arguments.length > 0 ? arguments[0] : undefined;
            } 

            response = original.apply(obj, arguments);
            if (methodName !== 'slice') {
                if (methodName === 'pop') {
                    oldValue = response;
                    index = obj.length;
                }
                else if (methodName === 'push') {
                    index = obj.length-1;
                }
                else if (methodName === 'shift') {
                    oldValue = response;
                }
                else if (methodName !== 'unshift' && newValue===undefined) {
                    newValue = response;
                }
                callback.call(obj, index, methodName,newValue, oldValue)
            }
            return response;
        });
    };

    var watchFunctions = function(obj, callback) {

        if (!isFunction(callback) || !obj || (obj instanceof String) || (!isArray(obj))) {
            return;
        }

        for (var i = methodNames.length, methodName; i--;) {
            methodName = methodNames[i];
            defineArrayMethodWatcher(obj, obj[methodName], methodName, callback);
        }

    };

    var unwatchOne = function (obj, prop, watcher) {
        if (prop) {
            if (obj.watchers[prop]) {
                if (watcher===undefined) {
                    delete obj.watchers[prop]; // remove all property watchers
                }
                else {
                    for (var i=0; i<obj.watchers[prop].length; i++) {
                        var w = obj.watchers[prop][i];
                        if (w == watcher) {
                            obj.watchers[prop].splice(i, 1);
                        }
                    }
                }
            }
        }
        else
        {
            delete obj.watchers;
        }
        removeFromLengthSubjects(obj, prop, watcher);
        removeFromDirtyChecklist(obj, prop);
    };
    
    // suspend watchers until next update cycle
    var suspend = function(obj, prop) {
        if (obj.watchers) {
            var name = '__wjs_suspend__'+(prop!==undefined ? prop : '');
            obj.watchers[name] = true;
        }
    }
    
    var isSuspended = function(obj, prop) {
        return obj.watchers 
               && (obj.watchers['__wjs_suspend__'] || 
                   obj.watchers['__wjs_suspend__'+prop]);
    }
    
    // resumes preivously suspended watchers
    var resume = function(obj, prop) {
        registerTimeout(function() {
            delete obj.watchers['__wjs_suspend__'];
            delete obj.watchers['__wjs_suspend__'+prop];
        })
    }

    var pendingTimerID = null;
    var addPendingChange = function(obj,prop, mode, newval, oldval) {
        pendingChanges[pendingChanges.length] = {
            obj:obj,
            prop: prop,
            mode: mode,
            newval: newval,
            oldval: oldval
        };
        if (pendingTimerID===null) {
            pendingTimerID = setTimeout(applyPendingChanges);
        }
    };
    
    
    var applyPendingChanges = function()  {
        // apply pending changes
        var change = null;
        pendingTimerID = null;
        for(var i=0;i < pendingChanges.length;i++) {
            change = pendingChanges[i];
            callWatchers(change.obj, change.prop, change.mode, change.newval, change.oldval);
        }
        if (change) {
            pendingChanges = [];
            change = null;
        }        
    }

    var loop = function(){

        // check for new or deleted props
        for(var i=0; i<lengthsubjects.length; i++) {

            var subj = lengthsubjects[i];

            if (subj.prop === "$$watchlengthsubjectroot") {

                var difference = getObjDiff(subj.obj, subj.actual);

                if(difference.added.length || difference.removed.length){
                    if(difference.added.length){
                        watchMany(subj.obj, difference.added, subj.watcher, subj.level - 1, true);
                    }

                    subj.watcher.call(subj.obj, "root", "differentattr", difference, subj.actual);
                }
                subj.actual = clone(subj.obj);


            } else {

                var difference = getObjDiff(subj.obj[subj.prop], subj.actual);

                if(difference.added.length || difference.removed.length){
                    if(difference.added.length){
                        for (var j=0; j<subj.obj.watchers[subj.prop].length; j++) {
                            watchMany(subj.obj[subj.prop], difference.added, subj.obj.watchers[subj.prop][j], subj.level - 1, true);
                        }
                    }

                    callWatchers(subj.obj, subj.prop, "differentattr", difference, subj.actual);
                }

                subj.actual = clone(subj.obj[subj.prop]);

            }

        }
        
        // start dirty check
        var n, value;
        if (dirtyChecklist.length > 0) {
            for (var i = 0; i < dirtyChecklist.length; i++) {
                n = dirtyChecklist[i];
                value = n.object[n.prop];
                if (!compareValues(n.orig, value)) {
                    n.orig = clone(value);
                    n.callback(value);
                }
            }
        }

    };

    var compareValues =  function(a,b) {
        var i, state = true;
        if (a!==b)  {
            if (isObject(a)) {
                for(i in a) {
                    if (!supportDefineProperty && i==='watchers') continue;
                    if (a[i]!==b[i]) {
                        state = false;
                        break;
                    };
                }
            }
            else {
                state = false;
            }
        }
        return state;
    }
    
    var pushToLengthSubjects = function(obj, prop, watcher, level){

        var actual;

        if (prop === "$$watchlengthsubjectroot") {
            actual =  clone(obj);
        } else {
            actual = clone(obj[prop]);
        }

        lengthsubjects.push({
            obj: obj,
            prop: prop,
            actual: actual,
            watcher: watcher,
            level: level
        });
    };

    var removeFromLengthSubjects = function(obj, prop, watcher){
        for (var i=0; i<lengthsubjects.length; i++) {
            var subj = lengthsubjects[i];

            if (subj.obj == obj) {
                if (!prop || subj.prop == prop) {
                    if (!watcher || subj.watcher == watcher) {
                        // if we splice off one item at position i
                        // we need to decrement i as the array is one item shorter
                        // so when we increment i in the loop statement we
                        // will land at the correct index.
                        // if it's not decremented, you won't delete all length subjects
                        lengthsubjects.splice(i--, 1);
                    }
                }
            }
        }

    };
    
    var removeFromDirtyChecklist = function(obj, prop){
        var notInUse;
        for (var i=0; i<dirtyChecklist.length; i++) {
            var n = dirtyChecklist[i];
            var watchers = n.object.watchers;
            notInUse = (
                n.object == obj 
                && (!prop || n.prop == prop)
                && watchers
                && (!prop || !watchers[prop] || watchers[prop].length == 0 )
            );
            if (notInUse)  {
                // we use the same syntax as in removeFromLengthSubjects
                dirtyChecklist.splice(i--, 1);
            }
        }

    };    

    setInterval(loop, 50);

    WatchJS.watch = watch;
    WatchJS.unwatch = unwatch;
    WatchJS.callWatchers = callWatchers;
    WatchJS.suspend = suspend; // suspend watchers    
    WatchJS.onChange = trackChange;  // track changes made to object or  it's property and return a single change object

    return WatchJS;

}));


/***/ }),
/* 29 */
/***/ (function(module, exports) {



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map