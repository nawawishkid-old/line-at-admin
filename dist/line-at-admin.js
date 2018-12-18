// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"+h8f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChatBaseClass =
/*#__PURE__*/
function () {
  function ChatBaseClass(cssSelector) {
    var _this = this;

    _classCallCheck(this, ChatBaseClass);

    _defineProperty(this, "_cssSelector", null);

    _defineProperty(this, "_data", {});

    _defineProperty(this, "toJSON", function () {
      return _this._data;
    });

    if (typeof cssSelector === "string") {
      this._cssSelector = cssSelector;

      this._assignDom();
    } else {
      this.dom = cssSelector;
    }
  }

  _createClass(ChatBaseClass, [{
    key: "refresh",
    value: function refresh() {
      if (!this._cssSelector) {
        console.warn("Could not refresh DOM: No CSS Selector given on instantiation.");
      } else {
        this._assignDom();

        this._createData();
      }

      return this;
    }
  }, {
    key: "toCsv",
    value: function toCsv() {
      var header = Object.keys(this._data).map(function (key) {
        return JSON.stringify(key);
      }).join(",");
      var content = Object.values(this._data).map(function (value) {
        if (typeof value === "undefined" || value === null) {
          return JSON.stringify("");
        }

        return value.toCsv ? value.toCsv().content : JSON.stringify(value);
      }).join(",");
      return {
        header: header,
        content: content,
        all: header + "\n" + content
      };
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[object] [".concat(this.constructor.name, "]");
    }
  }, {
    key: "_createData",

    /**
     * A method for .refresh() to call to update all the object._data
     */
    value: function _createData() {}
  }, {
    key: "_assignDom",
    value: function _assignDom() {
      this.dom = document.querySelector(this._cssSelector);
    }
  }, {
    key: "_query",
    value: function _query(key) {
      var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var method = all ? "querySelectorAll" : "querySelector"; // Parse dot notation e.g. 'key.subkey1.subkey2'

      var splittedKey = key.split(".");
      var query = splittedKey.reduce(function (queryObj, key) {
        return queryObj[key];
      }, this.constructor._cssQuery);
      query = Array.isArray(query) ? query.join(" ") : query;
      return this.dom[method](query);
    }
  }, {
    key: "_update",
    value: function _update(key, value) {
      if (typeof this._data[key] === "undefined") {
        throw new Error("Unknown data property: " + key);
      }

      this._data[key] = value;
    }
  }]);

  return ChatBaseClass;
}();

_defineProperty(ChatBaseClass, "_cssQuery", {});

var _default = ChatBaseClass;
exports.default = _default;
},{}],"hwBT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseClass = _interopRequireDefault(require("./BaseClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChatListItem =
/*#__PURE__*/
function (_ChatBaseClass) {
  _inherits(ChatListItem, _ChatBaseClass);

  function ChatListItem(dom) {
    var _this;

    _classCallCheck(this, ChatListItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatListItem).call(this, dom));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_data", {
      id: null,
      title: null,
      imageSrc: null,
      description: null,
      latestTime: null,
      isSelected: null,
      isActive: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getId", function () {
      return _this.dom.dataset.chatid;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getTitle", function () {
      return _this._query("title").textContent;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getImageSrc", function () {
      return _this._query("imageSrc").src;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getDescription", function () {
      return _this._query("description").textContent;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getLatestTime", function () {
      return _this._query("latestTime").textContent;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getIsSelected", function () {
      return _this.dom.parentElement.classList.contains("ExSelected");
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getIsActive", function () {
      return !!_this._query("isActive");
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "click", function () {
      return _this.dom.click();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollIntoView", function () {
      return _this.dom.scrollIntoView({
        behavior: "smooth"
      });
    });

    _this._createData();

    return _this;
  }

  _createClass(ChatListItem, [{
    key: "refresh",

    /**
     * Custom refresh
     */
    value: function refresh() {
      this.dom = document.querySelector("[data-chatid=" + this.getId() + "]");

      this._createData();

      return this;
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this._update("id", this.getId());

      this._update("title", this.getTitle());

      this._update("imageSrc", this.getImageSrc());

      this._update("description", this.getDescription());

      this._update("latestTime", this.getLatestTime());

      this._update("isSelected", this.getIsSelected());

      this._update("isActive", this.getIsActive());
    }
  }, {
    key: "id",
    get: function get() {
      return this._data.id;
    }
  }, {
    key: "title",
    get: function get() {
      return this._data.title;
    }
  }, {
    key: "imageSrc",
    get: function get() {
      return this._data.imageSrc;
    }
  }, {
    key: "description",
    get: function get() {
      return this._data.description;
    }
  }, {
    key: "latestTime",
    get: function get() {
      return this._data.latestTime;
    }
  }, {
    key: "isSelected",
    get: function get() {
      return this._data.isSelected;
    }
  }, {
    key: "isActive",
    get: function get() {
      return this._data.isActive;
    }
  }]);

  return ChatListItem;
}(_BaseClass.default);

_defineProperty(ChatListItem, "_cssQuery", {
  title: ".mdCMN04Txt .mdCMN04Head .mdCMN04Ttl",
  description: ".mdCMN04Txt .mdCMN04Desc",
  latestTime: ".mdCMN04Opt .mdCMN04Date time",
  imageSrc: ".mdCMN04Img img",
  isActive: ".MdIcoBadge01:not(.MdNonDisp)"
});

var _default = ChatListItem;
exports.default = _default;
},{"./BaseClass":"+h8f"}],"7am4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseClass = _interopRequireDefault(require("./BaseClass"));

var _Item = _interopRequireDefault(require("./Item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChatList =
/*#__PURE__*/
function (_ChatBaseClass) {
  _inherits(ChatList, _ChatBaseClass);

  function ChatList(cssSelector) {
    var _this;

    var domsLimit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

    _classCallCheck(this, ChatList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatList).call(this, cssSelector));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_data", {
      items: [],
      selectedItem: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_cache", {
      doms: []
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getSelectedItem", function () {
      return _this.where("isSelected", true)[0];
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "find", function () {
      var _this2;

      return _this.filter((_this2 = _this)._getFindFilter.apply(_this2, arguments));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getWhereFilter", function (key, value) {
      return typeof value === "function" ? function (item) {
        return value(item[key]);
      } : function (item) {
        return item[key] === value;
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "filter", function (filter) {
      return _this.items.filter(filter);
    });

    _this.domsLimit = domsLimit;

    _this._createData();

    return _this;
  }

  _createClass(ChatList, [{
    key: "getItems",

    /**
     * Get array of all ChatItems.
     *
     * @return {array} Array of all ChatItem.
     */
    value: function getItems() {
      var cachedDoms = this._cache.doms;
      var doms;

      if (cachedDoms.length > 0) {
        doms = cachedDoms;
      } else {
        doms = this._query("items", true);
        this._cache.doms = doms;
      }

      return _toConsumableArray(doms).slice(0, this.domsLimit).map(function (dom) {
        return new _Item.default(dom);
      });
    }
  }, {
    key: "where",

    /**
     * Filter collection using the ._data property
     *
     * @return {array} Array of filtered collection.
     */
    value: function where() {
      var _this3 = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // If first argument is not an array
      // there is only one where clause (filter)
      if (!Array.isArray(args[0])) {
        var key = args[0],
            value = args[1];
        return this.filter(this._getWhereFilter(key, value));
      } // Support multiple where filters.
      // Expecting each argument to be an array with length of 2
      // which the first index is a key string and the last is
      // a filter function or a value string to be matched.


      return args.reduce(function (items, arg) {
        var _arg = _slicedToArray(arg, 2),
            key = _arg[0],
            value = _arg[1];

        return items.filter(_this3._getWhereFilter(key, value));
      }, this.items);
    }
  }, {
    key: "filterAndClick",

    /**
     * Click ChatItem of given filter
     *
     * @param {function} filter Filter function.
     * @param {function} callback Callback funtion to be called on clicking an item.
     * @param {number} wait Number of milliseconds to wait before clicking next item.
     *
     * @return {number} Number of items to be clicked.
     */
    value: function filterAndClick(filter, callback) {
      var wait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
      var items = this.filter(filter);
      items.reduce(function (time, item) {
        setTimeout(function () {
          item.click();
          callback(item);
        }, time);
        time += wait;
        return time;
      }, 0);
      return items.length;
    }
  }, {
    key: "_createData",
    value: function _createData() {
      // Clear cache
      this._cache.doms = [];

      this._update("items", this.getItems());

      this._update("selectedItem", this.getSelectedItem());
    }
    /**
     * Get filter function for .find()
     *
     * @param {string} keyword Keyword to search the items.
     * @param {string} prop this._data[prop].
     *
     * @return {function} Filter function.
     */

  }, {
    key: "_getFindFilter",
    value: function _getFindFilter(keyword) {
      var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "title";

      if (keyword.constructor.name === RegExp.name) {
        return function (item) {
          return keyword.test(item[prop]);
        };
      }

      return function (item) {
        return item[prop].toLowerCase().includes(keyword.toLowerCase());
      };
    }
  }, {
    key: "items",
    get: function get() {
      return this._data.items;
    }
  }, {
    key: "selectedItem",
    get: function get() {
      return this._data.selectedItem;
    }
  }, {
    key: "activeItems",
    get: function get() {
      return this.where("isActive", true);
    }
  }, {
    key: "length",
    get: function get() {
      return this.items.length;
    }
  }]);

  return ChatList;
}(_BaseClass.default);

_defineProperty(ChatList, "_cssQuery", {
  items: ".MdCMN04Item"
});

var _default = ChatList;
exports.default = _default;
},{"./BaseClass":"+h8f","./Item":"hwBT"}],"RAzx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseClass = _interopRequireDefault(require("./BaseClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChatMessage =
/*#__PURE__*/
function (_ChatBaseClass) {
  _inherits(ChatMessage, _ChatBaseClass);

  function ChatMessage(dom) {
    var _this;

    _classCallCheck(this, ChatMessage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatMessage).call(this, dom));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_data", {
      localId: null,
      contentType: null,
      content: null,
      issuerType: null,
      isRead: null,
      sentAt: null,
      issuer: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getLocalId", function () {
      return _this.dom.dataset.localId;
    });

    _this._createData();

    return _this;
  }

  _createClass(ChatMessage, [{
    key: "getContentType",
    value: function getContentType() {
      var _this$constructor$_cs = this.constructor._cssQuery,
          content = _this$constructor$_cs.content,
          contentType = _this$constructor$_cs.contentType;

      var _this$dom$querySelect = this.dom.querySelector(content),
          classList = _this$dom$querySelect.classList;

      var type = Object.keys(contentType).find(function (key) {
        return classList.contains(contentType[key][0].substring(1));
      });

      if (!type) {
        throw new Error("Could not detect message content type from given classes: " + classList.value);
      }

      return type;
    }
  }, {
    key: "getContent",
    value: function getContent() {
      var contentType = this.contentType;

      var dom = this._query("contentType." + contentType);

      return contentType === "text" ? dom.innerHTML : dom.src;
    }
  }, {
    key: "getSentAt",
    value: function getSentAt() {
      var date = new Date(this._getDateTimestamp());
      var dateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("/");

      var timeString = this._query("sentAt").textContent;

      if (!/^\d{1,2}:\d{2} (AM|PM)$/g.test(timeString)) {
        throw new Error("Invalid timestring retrieved from " + this.constructor._cssQuery.sentAt + ": " + timeString);
      }

      var dateTimeString = [dateString, timeString].join(" ");
      var dateTimestamp = Date.parse(dateTimeString);
      return dateTimestamp;
    }
  }, {
    key: "getIssuerType",
    value: function getIssuerType() {
      var classList = this.dom.classList;
      var issuerType = this.constructor._cssQuery.issuerType;
      var data = Object.keys(issuerType).find(function (key) {
        return classList.contains(issuerType[key].substring(1));
      });
      return data;
    }
  }, {
    key: "getIsRead",
    value: function getIsRead() {
      if (this.issuerType === "customer") {
        return null;
      }

      return this._query("isRead") ? true : false;
    }
  }, {
    key: "getIssuer",
    value: function getIssuer() {
      var dom = this._query("issuer");

      var issuer;

      if (dom) {
        issuer = dom.textContent;
      } else if (!dom && this.issuerType === "own") {
        issuer = "currentAdmin";
      } else {
        console.warn("Could not detect issuer using " + this.constructor._cssQuery.issuer + ". This is technically impossible");
        issuer = null;
      }

      return issuer;
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this._update("localId", this.getLocalId());

      this._update("contentType", this.getContentType());

      this._update("content", this.getContent());

      this._update("sentAt", this.getSentAt());

      this._update("issuerType", this.getIssuerType());

      this._update("issuer", this.getIssuer());

      this._update("isRead", this.getIsRead());
    }
  }, {
    key: "_getDateTimestamp",
    value: function _getDateTimestamp() {
      var prevDom = this.dom.previousElementSibling;

      while (true) {
        var localId = prevDom.dataset.localId;

        if (prevDom.classList.contains("mdRGT10Date") && localId) {
          return parseInt(localId);
        }

        prevDom = prevDom.previousElementSibling;
      }
    }
  }, {
    key: "localId",
    get: function get() {
      return this._data.localId;
    }
  }, {
    key: "contentType",
    get: function get() {
      return this._data.contentType;
    }
  }, {
    key: "content",
    get: function get() {
      return this._data.content;
    }
  }, {
    key: "sentAt",
    get: function get() {
      return this._data.sentAt;
    }
  }, {
    key: "issuerType",
    get: function get() {
      return this._data.issuerType;
    }
  }, {
    key: "issuer",
    get: function get() {
      return this._data.issuer;
    }
  }, {
    key: "isRead",
    get: function get() {
      return this._data.isRead;
    }
  }]);

  return ChatMessage;
}(_BaseClass.default);

_defineProperty(ChatMessage, "_cssQuery", {
  content: ".mdRGT07Msg",
  contentType: {
    text: [".mdRGT07Text", ".mdRGT07MsgTextInner"],
    image: [".mdRGT07Image", "img"],
    sticker: [".mdRGT07Sticker", "img"]
  },
  issuerType: {
    admin: ".mdRGT07Clerk",
    customer: ".mdRGT07Other",
    own: ".mdRGT07Own"
  },
  isRead: ".mdRGT07Opt .mdRGT07Read:not(.MdNonDisp)",
  sentAt: ".mdRGT07Date time",
  issuer: ".mdRGT07Ttl"
});

var _default = ChatMessage;
exports.default = _default;
},{"./BaseClass":"+h8f"}],"OvDg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Message = _interopRequireDefault(require("./Message"));

var _BaseClass = _interopRequireDefault(require("./BaseClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChatMessageList =
/*#__PURE__*/
function (_ChatBaseClass) {
  _inherits(ChatMessageList, _ChatBaseClass);

  function ChatMessageList(cssSelector) {
    var _this;

    _classCallCheck(this, ChatMessageList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatMessageList).call(this, cssSelector));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_data", {
      messages: [],
      participatedAdmins: [],
      conversationTurns: null,
      hasPreviousMessages: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMessages", function () {
      return _toConsumableArray(_this._query("messages", true)).map(function (dom) {
        return new _Message.default(dom);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getHasPreviousMessages", function () {
      return !_this._query("prevMessageButton").classList.contains("MdNonDisp");
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getWhereFilter", function (key, value) {
      return typeof value === "function" ? function (item) {
        return value(item[key]);
      } : function (item) {
        return item[key] === value;
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "filter", function (filter) {
      return _this.messages.filter(filter);
    });

    _this._createData();

    return _this;
  }

  _createClass(ChatMessageList, [{
    key: "getConversationTurns",
    value: function getConversationTurns() {
      var turns = 0;
      this.messages.reduce(function (prev, current) {
        // Count if current message issuer is not the same as previous message's
        if (current.issuer !== prev.issuer) {
          turns++;
        }

        return current;
      });
      return turns;
    }
  }, {
    key: "getParticipatedAdmins",
    value: function getParticipatedAdmins() {
      var admins = [];
      var msgs = this.where("issuerType", function (type) {
        return type === "admin" || type === "own";
      });

      if (msgs.length === 1) {
        admins.push(msgs[0].issuer);
      } else {
        msgs.reduce(function (prev, current, index) {
          var issuer = current.issuer;

          if (index === 1 || issuer !== prev.issuer && !admins.includes(issuer)) {
            admins.push(issuer);
          }

          return current;
        });
      }

      return admins;
    }
  }, {
    key: "where",

    /**
     * Filter collection using the ._data property
     *
     * @return {array} Array of filtered collection.
     */
    value: function where() {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // If first argument is not an array
      // It means that there is only one where clause (filter)
      if (!Array.isArray(args[0])) {
        var key = args[0],
            value = args[1];
        return this.filter(this._getWhereFilter(key, value));
      } // Support multiple where filters.
      // Expecting each argument to be an array with length of 2
      // which the first index is a key string and the last is
      // a filter function or a value string to be matched.


      return args.reduce(function (messages, arg) {
        var _arg = _slicedToArray(arg, 2),
            key = _arg[0],
            value = _arg[1];

        return messages.filter(_this2._getWhereFilter(key, value));
      }, this.messages);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this._update("messages", this.getMessages());

      this._update("conversationTurns", this.getConversationTurns());

      this._update("participatedAdmins", this.getParticipatedAdmins());

      this._update("hasPreviousMessages", this.getHasPreviousMessages());
    }
  }, {
    key: "messages",
    get: function get() {
      return this._data.messages;
    }
  }, {
    key: "notices",
    get: function get() {
      return this._query("notices", true);
    }
  }, {
    key: "dates",
    get: function get() {
      return this._query("dates", true);
    }
  }, {
    key: "length",
    get: function get() {
      return this.messages.length;
    }
  }, {
    key: "conversationTurns",
    get: function get() {
      return this._data.conversationTurns;
    }
  }, {
    key: "participatedAdmins",
    get: function get() {
      return this._data.participatedAdmins;
    }
  }, {
    key: "hasPreviousMessages",
    get: function get() {
      return this._data.hasPreviousMessages;
    }
  }, {
    key: "firstMessage",
    get: function get() {
      return this.messages[0];
    }
  }, {
    key: "lastMessage",
    get: function get() {
      return this.messages.slice(-1)[0];
    }
  }]);

  return ChatMessageList;
}(_BaseClass.default);

_defineProperty(ChatMessageList, "_cssQuery", {
  messages: ".MdRGT07Cont",
  prevMessageButton: "#_prev_msg_btn",
  notices: ".MdRGT10Notice",
  dates: ".MdRGT10Notice.mdRGT10Date time"
});

var _default = ChatMessageList;
exports.default = _default;
},{"./Message":"RAzx","./BaseClass":"+h8f"}],"pcWU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseClass = _interopRequireDefault(require("./BaseClass"));

var _MessageList = _interopRequireDefault(require("./MessageList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChatRoom =
/*#__PURE__*/
function (_ChatBaseClass) {
  _inherits(ChatRoom, _ChatBaseClass);

  function ChatRoom(cssSelector) {
    var _this;

    _classCallCheck(this, ChatRoom);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatRoom).call(this, cssSelector));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_data", {
      title: null,
      isFriend: null
    });

    _this.messageList = new _MessageList.default(_this.constructor._cssQuery.messageList);

    _this._createData();

    return _this;
  }

  _createClass(ChatRoom, [{
    key: "getTitle",

    /**
     * **********
     * Get data
     * **********
     */
    value: function getTitle() {
      var dom = this._query("title");

      return dom ? dom.textContent : null;
    }
  }, {
    key: "getIsFriend",
    value: function getIsFriend() {
      var dom = this._query("isFriend");

      return dom ? false : true;
    }
    /**
     * **********
     * Interaction
     * **********
     */

  }, {
    key: "addFriend",
    value: function addFriend() {
      if (this.isFriend) {
        console.warn("This friend has already been added");
        return;
      }

      this._query("isFriend").click();
    }
    /**
     * [PROPOSAL] Rename current customer.
     *
     * @param {string} name New name.
     */

  }, {
    key: "rename",
    value: function rename(name) {
      var _this2 = this;

      this._query("header").click();

      setTimeout(function () {
        return _this2._query("editNameButton").click();
      }, 500);
    }
    /**
     * [PROPOSAL] Send message to current chat.
     *
     * @param {string} text Text to be sent.
     */

  }, {
    key: "sendMessage",
    value: function sendMessage(text) {
      if (typeof text !== "string") {
        throw new TypeError("Input value must be string");
      }

      this._query("input").innerHTML = text;
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this._update("title", this.getTitle());

      this._update("isFriend", this.getIsFriend());
    }
  }, {
    key: "title",
    get: function get() {
      return this._data.title;
    }
  }, {
    key: "isFriend",
    get: function get() {
      return this._data.isFriend;
    }
  }]);

  return ChatRoom;
}(_BaseClass.default);

_defineProperty(ChatRoom, "_cssQuery", {
  title: "#_chat_header_area .mdRGT04Ttl",
  isFriend: "#_chat_header_add_btn",
  header: ".MdRGT04Head.mdRGT04Link",
  editNameButton: "#_chat_detail_area #_chat_contact_detail_view button.MdBtn01Edit01",
  messageList: "#_chat_room_msg_list",
  messages: "#_chat_room_msg_list .MdRGT07Cont",
  input: "#_chat_room_input"
});

var _default = ChatRoom;
exports.default = _default;
},{"./BaseClass":"+h8f","./MessageList":"OvDg"}],"TtJ9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChatAdmin =
/*#__PURE__*/
function () {
  function ChatAdmin(_ref) {
    var _this = this;

    var list = _ref.list,
        room = _ref.room;

    _classCallCheck(this, ChatAdmin);

    _defineProperty(this, "_currentCustomerData", null);

    _defineProperty(this, "sendMessage", function (message) {
      return _this.room.sendMessage(message);
    });

    _defineProperty(this, "rename", function (name) {
      return _this.room.rename(name);
    });

    _defineProperty(this, "addFriend", function () {
      return _this.room.addFriend();
    });

    _defineProperty(this, "sendToMany", function (message, filter) {
      var wait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
      return _this.list.filterAndClick(filter, function () {
        return _this.sendMessage(message);
      }, wait);
    });

    this._addChatDependency("list", list, "ChatList");

    this._addChatDependency("room", room, "ChatRoom");
  } // get item() {
  //   return this.list.refresh().selectedItem;
  // }
  // get chatData() {
  //   const { item } = this;
  //   if (!item) {
  //     console.warn("Please select any chat item.");
  //     return null;
  //   }
  //   return item._data;
  // }


  _createClass(ChatAdmin, [{
    key: "_addChatDependency",
    value: function _addChatDependency(key, instance, className) {
      if (instance.constructor.name !== className) {
        throw new TypeError("Expected " + className + " but " + instance.constructor.name + " given.");
      }

      this[key] = instance;
    }
  }, {
    key: "data",
    get: function get() {
      return {
        cover: this.list.selectedItem._data,
        room: this.room.messageList._data // chat: {
        //   id: chatData.id,
        //   numMessages: roomData.messages.length,
        //   numConvoTurns: roomData.conversationTurns,
        //   numParticipatedAdmins: roomData.participatedAdmins.length
        // }

      };
    }
  }]);

  return ChatAdmin;
}();

var _default = ChatAdmin;
exports.default = _default;
},{}],"guaG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChatMessageList = exports.getChatAdmin = exports.getChatRoom = exports.getChatList = void 0;

var _List = _interopRequireDefault(require("./Chat/List"));

var _Room = _interopRequireDefault(require("./Chat/Room"));

var _Admin = _interopRequireDefault(require("./Chat/Admin"));

var _MessageList = _interopRequireDefault(require("./Chat/MessageList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getChatList = function getChatList() {
  return new _List.default("#_chat_list_body");
};

exports.getChatList = getChatList;

var getChatMessageList = function getChatMessageList() {
  return new _MessageList.default("#_chat_room_msg_list");
};

exports.getChatMessageList = getChatMessageList;

var getChatRoom = function getChatRoom() {
  return new _Room.default("#rightSide");
};

exports.getChatRoom = getChatRoom;

var getChatAdmin = function getChatAdmin() {
  return new _Admin.default({
    list: getChatList(),
    room: getChatRoom()
  });
};

exports.getChatAdmin = getChatAdmin;
},{"./Chat/List":"7am4","./Chat/Room":"pcWU","./Chat/Admin":"TtJ9","./Chat/MessageList":"OvDg"}],"Focm":[function(require,module,exports) {
"use strict";

var _functions = require("./functions");

window.getChatAdmin = _functions.getChatAdmin;
},{"./functions":"guaG"}]},{},["Focm"], null)
//# sourceMappingURL=/line-at-admin.map