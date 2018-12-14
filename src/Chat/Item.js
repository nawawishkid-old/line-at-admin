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
    return this._data.id;
  }

  get title() {
    return this._data.title;
  }
  get imageSrc() {
    return this._data.imageSrc;
  }
  get description() {
    return this._data.description;
  }
  get latestTime() {
    return this._data.latestTime;
  }
  get isSelected() {
    return this._data.isSelected;
  }
  get isActive() {
    return this._data.isActive;
  }

  getId = () => this.dom.dataset.chatid;

  getTitle = () => this._query("title").textContent;

  getImageSrc = () => this._query("imageSrc").src;

  getDescription = () => this._query("description").textContent;

  getLatestTime = () => this._query("latestTime").textContent;

  getIsSelected = () => this.dom.parentElement.classList.contains("ExSelected");

  getIsActive = () => !!this._query("isActive");

  click = () => this.dom.click();

  scrollIntoView = () => this.dom.scrollIntoView({ behavior: "smooth" });

  /**
   * Custom refresh
   */
  refresh() {
    this.dom = document.querySelector("[data-chatid=" + this.getId() + "]");
    this._createData();

    return this;
  }

  _createData() {
    this._update("id", this.getId());
    this._update("title", this.getTitle());
    this._update("imageSrc", this.getImageSrc());
    this._update("description", this.getDescription());
    this._update("latestTime", this.getLatestTime());
    this._update("isSelected", this.getIsSelected());
    this._update("isActive", this.getIsActive());
  }
}

export default ChatListItem;
