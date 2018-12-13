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

  constructor(cssSelector) {
    super(cssSelector);
    this._createData();
  }

  /**
   * Get array of all ChatItems.
   *
   * @return {array} Array of all ChatItem.
   */
  get items() {
    return this._getAndUpdateData("items", doms =>
      [...doms].map(dom => new ChatItem(dom))
    );
  }

  get selectedItem() {
    const item = this.where("isSelected", true)[0];

    this._update("selectedItem", item);

    return item;
  }

  /**
   * Find ChatItem using keyword to be matched with given ChatItem._data key
   *
   * @see ChatList._getFindFilter()
   *
   * @return {array} Array of filtered ChatItem
   */
  find = (...args) => this.filter(this._getFindFilter(...args));

  /**
   * Filter ChatItem using its ._data property
   *
   * @param {string} key Name of ChatItem._data key
   * @param {*} value A filter function that accepts ChatItem._data[key] as an argument; or any data type to be matched with ChatItem._data[key]
   *
   * @return {array} Array of filtered ChatItem
   */
  where = (key, value) =>
    this.filter(
      typeof value === "function"
        ? item => value(item[key])
        : item => item[key] === value
    );

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
    const items = this.refresh().filter(filter);

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
    this.items;
    this.selectedItem;
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
