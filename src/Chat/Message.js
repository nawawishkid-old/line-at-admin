import ChatBaseClass from "./BaseClass";

class ChatMessage extends ChatBaseClass {
  static _cssQuery = {
    content: ".mdRGT07Msg",
    contentType: {
      text: [".mdRGT07Text", ".mdRGT07MsgTextInner"],
      image: [".mdRGT07Image", "img"],
      sticker: [".mdRGT07Sticker", "img"]
    },
    issuer: {
      admin: ".mdRGT07Clerk",
      customer: ".mdRGT07Other",
      own: ".mdRGT07Own"
    },
    isRead: ".mdRGT07Opt .mdRGT07Read:not(.MdNonDisp)",
    sentAt: ".mdRGT07Date time",
    adminName: ".mdRGT07Ttl"
  };

  _data = {
    contentType: null,
    content: null,
    issuer: null,
    isRead: null,
    sentAt: null,
    adminName: null
  };

  constructor(dom) {
    super(dom);
    
    this._createData();
  }

  get contentType() {
    const { content, contentType } = this.constructor._cssQuery;
    const { classList } = this.dom.querySelector(content);
    const type = Object.keys(contentType).find(key =>
      classList.contains(contentType[key][0].substring(1))
    );

    if (!type) {
      throw new Error(
        "Could not detect message content type from given classes: " +
          classList.value
      );
    }

    this._update("contentType", type);

    return type;
  }

  get content() {
    const { contentType } = this._data;

    return this._getAndUpdateData(
      "content",
      dom => (contentType === "text" ? dom.innerHTML : dom.src),
      "contentType." + contentType
    );
  }

  get sentAt() {
    return this._getAndUpdateData("sentAt", dom => dom.textContent);
  }

  get issuer() {
    const { classList } = this.dom;
    const { issuer } = this.constructor._cssQuery;

    const data = Object.keys(issuer).find(key =>
      classList.contains(issuer[key].substring(1))
    );

    this._update("issuer", data);

    return data;
  }

  get isRead() {
    const callback =
      this._data.issuer === "customer"
        ? () => null
        : dom => (dom ? true : false);

    return this._getAndUpdateData("isRead", callback);
  }

  get adminName() {
    return this._getAndUpdateData("adminName", dom => (dom ? dom.textContent : null));
  }

  _createData() {
    this.contentType;
    this.content;
    this.sentAt;
    this.issuer;
    this.isRead;
    this.adminName;
  }
}

export default ChatMessage;
