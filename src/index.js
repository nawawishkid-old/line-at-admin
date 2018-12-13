import { getChatList, getChatRoom, getChatAdmin } from "./functions";

(window => {
  const chatList = getChatList();
  const chatRoom = getChatRoom();

  window.ca = getChatAdmin({
    chatList,
    chatRoom
  });
})(window);
