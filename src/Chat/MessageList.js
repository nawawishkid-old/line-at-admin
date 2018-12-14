import ChatMessage from "./Message";
import ChatBaseClass from "./BaseClass";

class ChatMessageList extends ChatBaseClass {
  static _cssQuery = {
    messages: ".MdRGT07Cont",
    prevMessageButton: "#_prev_msg_btn",
    notices: ".MdRGT10Notice",
    dates: ".MdRGT10Notice.mdRGT10Date time"
  };

  _data = {
    messages: [],
    participatedAdmins: [],
    conversationTurns: null,
    hasPreviousMessages: null
  };

  constructor(cssSelector) {
    super(cssSelector);
    this._createData();
  }

  get messages() {
    return this._data.messages;
  }

  get notices() {
    return this._query("notices", true);
  }

  get dates() {
    return this._query("dates", true);
  }

  get length() {
    return this.messages.length;
  }

  get conversationTurns() {
    return this._data.conversationTurns;
  }

  get participatedAdmins() {
    return this._data.participatedAdmins;
  }

  get hasPreviousMessages() {
    return this._data.hasPreviousMessages;
  }

  get firstMessage() {
    return this.messages[0];
  }

  get lastMessage() {
    return this.messages.slice(-1)[0];
  }

  getMessages = () =>
    [...this._query("messages", true)].map(dom => new ChatMessage(dom));

  getConversationTurns() {
    let turns = 0;

    this.messages.reduce((prev, current) => {
      // Count if current message issuer is not the same as previous message's
      if (current.issuer !== prev.issuer) {
        turns++;
      }

      return current;
    });

    return turns;
  }

  getParticipatedAdmins() {
    const admins = [];
    const msgs = this.where(
      "issuerType",
      type => type === "admin" || type === "own"
    );

    if (msgs.length === 1) {
      admins.push(msgs[0].issuer);
    } else {
      msgs.reduce((prev, current, index) => {
        const { issuer } = current;

        if (
          index === 1 ||
          (issuer !== prev.issuer && !admins.includes(issuer))
        ) {
          admins.push(issuer);
        }

        return current;
      });
    }

    return admins;
  }

  getHasPreviousMessages = () =>
    !this._query("prevMessageButton").classList.contains("MdNonDisp");

  /**
   * Filter collection using the ._data property
   *
   * @return {array} Array of filtered collection.
   */
  where(...args) {
    // If first argument is not an array
    // It means that there is only one where clause (filter)
    if (!Array.isArray(args[0])) {
      const [key, value] = args;

      return this.filter(this._getWhereFilter(key, value));
    }

    // Support multiple where filters.
    // Expecting each argument to be an array with length of 2
    // which the first index is a key string and the last is
    // a filter function or a value string to be matched.
    return args.reduce((messages, arg) => {
      const [key, value] = arg;

      return messages.filter(this._getWhereFilter(key, value));
    }, this.messages);
  }

  _getWhereFilter = (key, value) =>
    typeof value === "function"
      ? item => value(item[key])
      : item => item[key] === value;

  /**
   * Filter all ChatItem
   *
   * @param {function} filter Filter function.
   *
   * @return {array} Array of filtered items.
   */
  filter = filter => this.messages.filter(filter);

  _createData() {
    this._update("messages", this.getMessages());
    this._update("conversationTurns", this.getConversationTurns());
    this._update("participatedAdmins", this.getParticipatedAdmins());
    this._update("hasPreviousMessages", this.getHasPreviousMessages());
  }
}

export default ChatMessageList;
