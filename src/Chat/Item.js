import ChatBaseClass from "./BaseClass";

class ChatListItem extends ChatBaseClass {
  static _cssQuery = {
    title: ".mdCMN04Txt .mdCMN04Head .mdCMN04Ttl",
    description: ".mdCMN04Txt .mdCMN04Desc",
    latestTime: ".mdCMN04Opt .mdCMN04Date time",
    imageSrc: ".mdCMN04Img img",
    isActive: ".MdIcoBadge01:not(.MdNonDisp)"
  };

  _data = {
    id: null,
    title: null,
    imageSrc: null,
    description: null,
    latestTime: null,
    isSelected: null,
    isActive: null
  };

  constructor(dom) {
    super(dom);
    this._createData();
  }

  get id() {
    const { chatid } = this.dom.dataset;

    this._update("id", chatid);

    return chatid;
  }

  get title() {
    return this._getAndUpdateData("title", dom => dom.textContent);
  }

  get imageSrc() {
    return this._getAndUpdateData("imageSrc", dom => dom.src);
  }

  get description() {
    return this._getAndUpdateData("description", dom => dom.textContent);
  }

  get latestTime() {
    return this._getAndUpdateData("latestTime", dom => dom.textContent);
  }

  get isSelected() {
    const result = this.dom.parentElement.classList.contains("ExSelected");

    this._update("isSelected", result);

    return result;
  }

  get isActive() {
    return this._getAndUpdateData("isActive", dom => (dom ? true : false));
  }

  click = () => this.dom.click();

  refresh() {
    this.dom = document.querySelector("[data-chatid=" + this.getId() + "]");
    this._createData();

    return this;
  };

  _createData() {
    this.id;
    this.title;
    this.imageSrc;
    this.description;
    this.latestTime;
    this.isSelected;
    this.isActive;
  }
}

export default ChatListItem;
