# Line@ Chat Adminstration

# TODO

- [x] Cancel update in getter method of all ChatBaseClass inheritances since it will unnecessarily reinstantiate class, use .refresh() before retrieve up-to-date data instead.
- [x] Convert human-readable time string to timestamp.
- [x] ChatItem.scrollIntoView()
- [ ] ChatRoom need to check the DOM when first page load, which means no chat item selected. Not checking this makes ChatRoom.isFriend always return true.

# ISSUES

- [ ] `chatList.refresh()` causes error: `Unknown data property: selectedItem` after cancel searching results on Line@ GUI (clicking x button on search bar of the chat list) because no chatItem selected. But I've tried select a chatItem, the error still exists. I have to reassign the whole ChatAdmin object so that the error disappear.
