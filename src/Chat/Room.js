import ChatBaseClass from "./BaseClass";
import ChatMessage from "./Message";

class ChatRoom extends ChatBaseClass {
  static _cssQuery = {
    title: "#_chat_header_area .mdRGT04Ttl",
    isFriend: "#_chat_header_add_btn",
    header: ".MdRGT04Head.mdRGT04Link",
    editNameButton:
      "#_chat_detail_area #_chat_contact_detail_view button.MdBtn01Edit01",
    messages: "#_chat_room_msg_list .MdRGT07Cont",
    input: "#_chat_room_input"
  };

  _data = {
    title: null,
    isFriend: null,
    messages: []
  };

  constructor(cssSelector) {
    super(cssSelector);
    this._createData();
  }

  /**
   * **********
   * Get data
   * **********
   */
  get title() {
    return this._getAndUpdateData("title", dom =>
      dom ? dom.textContent : null
    );
  }

  get isFriend() {
    return this._getAndUpdateData("isFriend", dom => (dom ? false : true));
  }

  get messages() {
    return this._getAndUpdateData("messages", doms =>
      doms ? [...doms].map(dom => new ChatMessage(dom)) : null
    );
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
    this.title;
    this.messages;
    this.isFriend;
  }
}

export default ChatRoom;
