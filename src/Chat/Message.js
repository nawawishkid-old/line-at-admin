import ChatBaseClass from "./BaseClass";

class ChatMessage extends ChatBaseClass {
  static _cssQuery = {
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
  };

  _data = {
    localId: null,
    contentType: null,
    content: null,
    issuerType: null,
    isRead: null,
    sentAt: null,
    issuer: null
  };

  constructor(dom) {
    super(dom);

    this._createData();
  }

  get localId() {
    return this._data.localId;
  }

  get contentType() {
    return this._data.contentType;
  }

  get content() {
    return this._data.content;
  }

  get sentAt() {
    return this._data.sentAt;
  }

  get issuerType() {
    return this._data.issuerType;
  }

  get issuer() {
    return this._data.issuer;
  }

  get isRead() {
    return this._data.isRead;
  }

  getLocalId = () => this.dom.dataset.localId;

  getContentType() {
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

    return type;
  }

  getContent() {
    const { contentType } = this;
    const dom = this._query("contentType." + contentType);

    return contentType === "text" ? dom.innerHTML : dom.src;
  }

  getSentAt() {
    const date = new Date(this._getDateTimestamp());
    const dateString = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ].join("/");
    const timeString = this._query("sentAt").textContent;

    if (!/^\d{1,2}:\d{2} (AM|PM)$/g.test(timeString)) {
      throw new Error(
        "Invalid timestring retrieved from " +
          this.constructor._cssQuery.sentAt +
          ": " +
          timeString
      );
    }

    const dateTimeString = [dateString, timeString].join(" ");
    const dateTimestamp = Date.parse(dateTimeString);

    return dateTimestamp;
  }

  getIssuerType() {
    const { classList } = this.dom;
    const { issuerType } = this.constructor._cssQuery;

    const data = Object.keys(issuerType).find(key =>
      classList.contains(issuerType[key].substring(1))
    );

    return data;
  }

  getIsRead() {
    if (this.issuerType === "customer") {
      return null;
    }

    return this._query("isRead") ? true : false;
  }

  getIssuer() {
    const dom = this._query("issuer");
    let issuer;

    if (dom) {
      issuer = dom.textContent;
    } else if (!dom && this.issuerType === "own") {
      issuer = "currentAdmin";
    } else {
      console.warn(
        "Could not detect issuer using " +
          this.constructor._cssQuery.issuer +
          ". This is technically impossible"
      );

      issuer = null;
    }

    return issuer;
  }

  _createData() {
    this._update("localId", this.getLocalId());
    this._update("contentType", this.getContentType());
    this._update("content", this.getContent());
    this._update("sentAt", this.getSentAt());
    this._update("issuerType", this.getIssuerType());
    this._update("issuer", this.getIssuer());
    this._update("isRead", this.getIsRead());
  }

  _getDateTimestamp() {
    let prevDom = this.dom.previousElementSibling;

    while (true) {
      let { localId } = prevDom.dataset;

      if (prevDom.classList.contains("mdRGT10Date") && localId) {
        return parseInt(localId);
      }

      prevDom = prevDom.previousElementSibling;
    }
  }
}

export default ChatMessage;
