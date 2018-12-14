import ChatList from "./Chat/List";
import ChatRoom from "./Chat/Room";
import ChatAdmin from "./Chat/Admin";
import ChatMessageList from "./Chat/MessageList";

const getChatList = () => new ChatList("#_chat_list_body");
const getChatMessageList = () => new ChatMessageList("#_chat_room_msg_list");
const getChatRoom = () => new ChatRoom("#rightSide");
const getChatAdmin = () =>
  new ChatAdmin({ list: getChatList(), room: getChatRoom() });

export { getChatList, getChatRoom, getChatAdmin, getChatMessageList };
