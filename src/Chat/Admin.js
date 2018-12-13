class ChatAdmin {
  _currentCustomerData = null;

  constructor({ list, room }) {
    console.log("list: ", list);
    console.log("room: ", room);
    this._addChatDependency("list", list, "ChatList");
    this._addChatDependency("room", room, "ChatRoom");
  }

  get item() {
    return this.list.refresh().selectedItem;
  }

  get chatData() {
    const { item } = this;

    if (!item) {
      console.warn("Please select any chat item.");

      return null;
    }

    return item._data;
  }

  get isFriend() {
    return this.room.isFriend;
  }

  sendMessage = message => this.room.sendMessage(message); // [PROPOSAL]

  rename = name => this.room.rename(name); // [PROPOSAL]

  addFriend = () => this.room.addFriend(); // [UNTESTED]

  sendToMany = (message, filter, wait = 500) =>
    this.list.filterAndClick(filter, () => this.sendMessage(message), wait);

  _addChatDependency(key, instance, className) {
    if (instance.constructor.name !== className) {
      throw new TypeError(
        "Expected " +
          className +
          " but " +
          instance.constructor.name +
          " given."
      );
    }

    this[key] = instance;
  }
}

export default ChatAdmin;
