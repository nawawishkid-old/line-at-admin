class FireEvent {
  // dom = null;

  static key = {
    enter: (dom, option = {}) => FireEvent._key("enter", dom, option)
  };

  static clearText(dom) {
    dom.value = "";
  }

  static input(text, dom, option = {}) {
    const chars = text.split("");

    dom.addEventListener("keypress", function(e) {
      this.value += e.key;
    });

    dom.focus();

    chars.forEach(char => FireEvent._key(char, dom, option));
  }

  // to(dom) {
  //   this.dom = dom;
  // }

  // on(...events) {
  //   this.events[this.doms.length - 1] = events;
  // }

  static _key(key, dom, option = {}) {
    // const target = dom ? dom : this.dom;

    if (typeof dom === "undefined" || dom === null) {
      throw new Error("No DOM given to dispatch an event");
    }

    const { on, ...rest } = option;
    const event = on || "keypress";

    dom.dispatchEvent(new KeyboardEvent(event, { key, ...rest }));
  }
}

// export default FireEvent;
