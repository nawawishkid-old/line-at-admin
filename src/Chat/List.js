import ChatBaseClass from "./BaseClass";
import ChatItem from "./Item";

class ChatList extends ChatBaseClass {
  static _cssQuery = {
    items: ".MdCMN04Item"
  };

  _data = {
    items: [],
    selectedItem: null
  };

  _cache = {
    doms: []
  };

  constructor(cssSelector, domsLimit = 100) {
    super(cssSelector);
    this.domsLimit = domsLimit;
    this._createData();
  }

  get items() {
    return this._data.items;
  }

  get selectedItem() {
    return this._data.selectedItem;
  }

  get activeItems() {
    return this.where("isActive", true);
  }

  get length() {
    return this.items.length;
  }

  /**
   * Get array of all ChatItems.
   *
   * @return {array} Array of all ChatItem.
   */
  getItems() {
    const cachedDoms = this._cache.doms;
    let doms;

    if (cachedDoms.length > 0) {
      doms = cachedDoms;
    } else {
      doms = this._query("items", true);

      this._cache.doms = doms;
    }

    return [...doms].slice(0, this.domsLimit).map(dom => new ChatItem(dom));
  }

  getSelectedItem = () => this.where("isSelected", true)[0];

  /**
   * Find ChatItem using keyword to be matched with given ChatItem._data key
   *
   * @see ChatList._getFindFilter()
   *
   * @return {array} Array of filtered ChatItem
   */
  find = (...args) => this.filter(this._getFindFilter(...args));

  /**
   * Filter collection using the ._data property
   *
   * @return {array} Array of filtered collection.
   */
  where(...args) {
    // If first argument is not an array
    // there is only one where clause (filter)
    if (!Array.isArray(args[0])) {
      const [key, value] = args;

      return this.filter(this._getWhereFilter(key, value));
    }

    // Support multiple where filters.
    // Expecting each argument to be an array with length of 2
    // which the first index is a key string and the last is
    // a filter function or a value string to be matched.
    return args.reduce((items, arg) => {
      const [key, value] = arg;

      return items.filter(this._getWhereFilter(key, value));
    }, this.items);
  }

  _getWhereFilter = (key, value) =>
    typeof value === "function"
      ? item => value(item[key])
      : item => item[key] === value;

  /**
   * Filter all ChatItem
   *
   * @param {function} filter Filter function.
   *
   * @return {array} Array of filtered items.
   */
  filter = filter => this.items.filter(filter);

  /**
   * Click ChatItem of given filter
   *
   * @param {function} filter Filter function.
   * @param {function} callback Callback funtion to be called on clicking an item.
   * @param {number} wait Number of milliseconds to wait before clicking next item.
   *
   * @return {number} Number of items to be clicked.
   */
  filterAndClick(filter, callback, wait = 500) {
    const items = this.filter(filter);

    items.reduce((time, item) => {
      setTimeout(() => {
        item.click();
        callback(item);
      }, time);

      time += wait;

      return time;
    }, 0);

    return items.length;
  }

  _createData() {
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
  _getFindFilter(keyword, prop = "title") {
    if (keyword.constructor.name === RegExp.name) {
      return item => keyword.test(item[prop]);
    }

    return item => item[prop].toLowerCase().includes(keyword.toLowerCase());
  }
}

export default ChatList;
