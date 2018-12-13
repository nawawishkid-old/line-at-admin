import ChatList from "./Chat/List";
import ChatRoom from "./Chat/Room";
import ChatAdmin from "./Chat/Admin";

const getChatList = () => new ChatList("#_chat_list_body");

const getChatRoom = () => new ChatRoom("#rightSide");

const getChatAdmin = () =>
  new ChatAdmin({ list: getChatList(), room: getChatRoom() });

export { getChatList, getChatRoom, getChatAdmin };
