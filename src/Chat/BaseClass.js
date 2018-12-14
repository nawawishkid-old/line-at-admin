class ChatBaseClass {
  static _cssQuery = {};
  _cssSelector = null;
  _data = {};

  constructor(cssSelector) {
    if (typeof cssSelector === "string") {
      this._cssSelector = cssSelector;
      this._assignDom();
    } else {
      this.dom = cssSelector;
    }
  }

  refresh() {
    if (!this._cssSelector) {
      console.warn(
        "Could not refresh DOM: No CSS Selector given on instantiation."
      );
    } else {
      this._assignDom();
      this._createData();
    }

    return this;
  }

  toCsv() {
    const header = Object.keys(this._data)
      .map(key => JSON.stringify(key))
      .join(",");
    const content = Object.values(this._data)
      .map(value => {
        if (typeof value === "undefined" || value === null) {
          return JSON.stringify("");
        }

        return value.toCsv ? value.toCsv().content : JSON.stringify(value);
      })
      .join(",");

    return {
      header,
      content,
      all: header + "\n" + content
    };
  }

  toString() {
    return `[object] [${this.constructor.name}]`;
  }

  toJSON = () => this._data;

  /**
   * A method for .refresh() to call to update all the object._data
   */
  _createData() {}

  _assignDom() {
    this.dom = document.querySelector(this._cssSelector);
  }

  _query(key, all = false) {
    const method = all ? "querySelectorAll" : "querySelector";
    // Parse dot notation e.g. 'key.subkey1.subkey2'
    const splittedKey = key.split(".");
    let query = splittedKey.reduce(
      (queryObj, key) => queryObj[key],
      this.constructor._cssQuery
    );

    query = Array.isArray(query) ? query.join(" ") : query;

    return this.dom[method](query);
  }

  _update(key, value) {
    if (typeof this._data[key] === "undefined") {
      throw new Error("Unknown data property: " + key);
    }

    this._data[key] = value;
  }
}

export default ChatBaseClass;
