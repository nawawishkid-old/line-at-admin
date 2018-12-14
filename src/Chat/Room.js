import ChatBaseClass from "./BaseClass";
import ChatMessageList from "./MessageList";

class ChatRoom extends ChatBaseClass {
  static _cssQuery = {
    title: "#_chat_header_area .mdRGT04Ttl",
    isFriend: "#_chat_header_add_btn",
    header: ".MdRGT04Head.mdRGT04Link",
    editNameButton:
      "#_chat_detail_area #_chat_contact_detail_view button.MdBtn01Edit01",
    messageList: "#_chat_room_msg_list",
    messages: "#_chat_room_msg_list .MdRGT07Cont",
    input: "#_chat_room_input"
  };

  _data = {
    title: null,
    isFriend: null
  };

  constructor(cssSelector) {
    super(cssSelector);
    this.messageList = new ChatMessageList(
      this.constructor._cssQuery.messageList
    );
    this._createData();
  }

  get title() {
    return this._data.title;
  }

  get isFriend() {
    return this._data.isFriend;
  }

  /**
   * **********
   * Get data
   * **********
   */
  getTitle() {
    const dom = this._query("title");

    return dom ? dom.textContent : null;
  }

  getIsFriend() {
    const dom = this._query("isFriend");

    return dom ? false : true;
  }

  /**
   * **********
   * Interaction
   * **********
   */
  addFriend() {
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
  rename(name) {
    this._query("header").click();
    setTimeout(() => this._query("editNameButton").click(), 500);
  }

  /**
   * [PROPOSAL] Send message to current chat.
   *
   * @param {string} text Text to be sent.
   */
  sendMessage(text) {
    if (typeof text !== "string") {
      throw new TypeError("Input value must be string");
    }

    this._query("input").innerHTML = text;
  }

  _createData() {
    this._update("title", this.getTitle());
    this._update("isFriend", this.getIsFriend());
  }
}

export default ChatRoom;
