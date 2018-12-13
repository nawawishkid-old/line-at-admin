var gg = (function() {
  const Chat = (() => {
    const ORDER_KEYWORD = "gg";
    const chatList = {};
    const chatRoom = {
      constant: Object.freeze({
        CONVO_ISSUER_OWN: "own",
        CONVO_ISSUER_CLERK: "clerk",
        CONVO_ISSUER_CUSTOMER: "customer",
        CONVO_ISSUER_ALL: "all"
      }),
      helper: {
        getIssuers: () =>
          Object.keys(chatRoom.constant)
            .filter(
              constant =>
                constant.substring(0, "CONVO_ISSUER".length) === "CONVO_ISSUER"
            )
            .map(key => chatRoom.constant[key]),
        isIssuerExist: issuer =>
          chatRoom.helper.getIssuers().some(i => issuer === i)
      }
    };

    /**
     * List all chat
     */
    chatList.listAll = () => Dom.query("chatItem.title");

    /**
     * List all 'gg' chat title
     */
    chatList.listOrder = () =>
      Array.from(chatList.listAll()).filter(
        dom => dom.textContent.substr(0, 2) === ORDER_KEYWORD
      );

    /**
     * List all active chat
     */
    chatList.listActive = () => Dom.query("chatItem.active");

    /**
     * Count all 'gg' chat title
     */
    chatList.countAll = () => chatList.listAll().length;

    chatList.countOrder = () => chatList.listOrder().length;

    chatList.countActive = () => chatList.listActive().length;

    /**
     * Find chat by title based on 'gg' title
     */
    chatList.findOrder = keyword => {
      const orders = chatList.listOrder();

      if (!keyword) {
        return orders;
      }

      return orders.filter(utils.getFilterCaseInsensitive(keyword));
    };

    /**
     * Find chat by title
     */
    chatList.find = keyword => {
      const all = chatList.listAll();

      if (!keyword) {
        return all;
      }

      return Array.from(all).filter(utils.getFilterCaseInsensitive(keyword));
    };

    /**
     * Insert text into chat room's input
     */
    chatRoom.input = text => (Dom.query("chatRoom.input")[0].innerText = text);
    chatRoom.getConvos = (issuer = chatRoom.constant.CONVO_ISSUER_ALL) => {
      // Issuer validation
      const issuers = chatRoom.helper.getIssuers();

      if (!chatRoom.helper.isIssuerExist(issuer)) {
        throw new Error(
          "Invalid issuer: " +
            issuer +
            ". Valid issuers are " +
            issuers.join(",")
        );
      }

      // Querying
      const query = "chatRoom.message." + issuer;

      return Dom.query(query);
    };
    chatRoom.countConvos = issuer => chatRoom.getConvos(issuer).length;
    chatRoom.countConvoTurn = () => {
      const convos = [...chatRoom.getConvos()];
      const initialObj = { dom: convos[0], count: 1 };
      const reduceObj = convos.reduce((obj, dom) => {
        // count convo turn if current content class is not the same as previous content
        if (dom.classList[1] !== obj.dom.classList[1]) {
          obj.count++;
        }

        obj.dom = dom;

        return obj;
      }, initialObj);

      return reduceObj.count;
    };

    /**
     * Loop through each given chat dom to click and wait for given time
     *
     * @param {Array} doms Chat DOM list
     * @param {Function} callback A callback function
     * @param {Number} wait Number of milliseconds to wait for each chat before clicking
     */
    chatList.clickAll = (doms, callback, wait = 500) =>
      doms.reduce((time, dom) => {
        setTimeout(() => {
          dom.click();
          callback(dom);
        }, time);

        time += wait;

        return time;
      }, 0);

    /**
     * *****
     * Utils
     * *****
     */
    const utils = {};

    utils.getFilterCaseInsensitive = keyword => dom =>
      dom.textContent.toLowerCase().includes(keyword.toLowerCase());

    return {
      chatList,
      chatRoom,
      utils
    };
  })();

  const Convo = (() => {
    const template = {};

    template.confirm = {
      args: ["dayStart", "dayEnd", "orderId"],
      msg: `ได้ทำการสั่งซื้อเรียบร้อยนะครับ 
  ภายใน {{dayStart}}-{{dayEnd}} วันทำการนี้ กรุณารอรับโทรศัพท์ถ้าหากมีเบอร์แปลก ๆ 
  โทรมาครับเพราะอาจจะเป็นทางขนส่งติดต่อมาเรื่องการส่งสินค้า 
  ถ้าหากทางขนส่งหาที่อยู่คุณลูกค้าไม่เจอ ของจะถูกตีกลับมายังโกดังครับ 
  หมายเลขคำสั่งซื้อ {{orderId}}`
    };

    template.greeting = {
      args: [],
      msg: `สวัสดีครับคุณลูกค้า
HomeHuk ยินดีให้บริการครับ
`
    };

    const greet = () => template.greeting.msg;
    const confirm = (orderId, isBkk = false) =>
      getMsg("confirm", {
        dayStart: isBkk ? 3 : 4,
        dayEnd: isBkk ? 5 : 7,
        orderId
      });

    const getMsg = (msgName, userArg) => {
      const tmplt = template[msgName];
      const { args, msg } = tmplt;

      if (!tmplt) {
        throw new Error("Invalid template name: " + msgName);
      }

      return args.reduce(
        (msg, arg) =>
          msg.replace(new RegExp("{{" + arg + "}}", "g"), userArg[arg]),
        msg
      );
    };

    return { template, greet, confirm, getMsg };
  })();

  const Selector = (() => {
    const join = (...list) => list.join(" ");

    const chatList = () => "#_chat_list_body";
    const chatItem = {
      item: () => join(chatList(), ".MdCMN04Item"),
      title: () => join(chatItem.item(), ".mdCMN04Ttl"),
      description: () => join(chatItem.item(), ".mdCMN04Desc"),
      time: () => join(chatItem.item(), ".mdCMN04Date time"),
      selected: () => join(chatList(), ".ExSelected"),
      active: () => join(chatItem.item(), ".MdIcoBadge01:not(.MdNonDisp)")
    };
    const chatRoom = {
      input: "#_chat_room_input",
      content: () => "#_chat_room_msg_list .MdRGT07Cont",
      message: {
        all: () => `${chatRoom.content()}:not(.MdRGT10Notice)`,
        customer: () => `${chatRoom.content()}.mdRGT07Other`,
        own: () => `${chatRoom.content()}.mdRGT07Own:not(.mdRGT07Clerk)`,
        clerk: () => `${chatRoom.content()}.mdRGT07Clerk`
      }
    };
    const nav = {
      nav: () => ".MdLFT07Nav",
      chat: () => join(nav.nav(), ".mdLFT07Chats"),
      friends: () => join(nav.nav(), ".mdLFT07Friends"),
      settings: () => join(nav.nav(), ".mdLFT07Setting")
    };
    const page = {
      settings: {
        nav: "#settings_menu_list li a",
        content: {
          friends: {
            hidden: "#settings_friends_hidden_list ul li .MdCMN04Item",
            editButton:
              "#settings_friends_hidden_list ul li .MdCMN04Item button._settings_friends_edit"
          }
        }
      }
    };

    return { chatList, chatItem, chatRoom, nav, page };
  })();

  const Dom = (() => {
    const query = path => {
      const splittedPath = path.split(".");
      const query = splittedPath.reduce((sel, p) => {
        const q = sel[p];

        return typeof q === "function" ? q() : q;
      }, Selector);
      const doms = document.querySelectorAll(query);

      return doms.length > 1 ? [...doms] : doms;
    };

    return { query };
  })();

  return {
    chat: Chat,
    convo: Convo,
    selector: Selector,
    dom: Dom
  };
})();
