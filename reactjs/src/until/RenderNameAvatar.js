const handleRenderName = (chat, auth) => {
  if (!chat.isGroup) {
    if (chat.memberChats.length === 1) {
      return chat.memberChats[0].user?.name;
    } else {
      return chat.memberChats.find((el) => el.user?.id !== auth.user?.id).user
        ?.name;
    }
  } else {
    return chat?.name;
  }
};

const handleRenderAvatar = (chat, auth) => {
  if (!chat.isGroup) {
    if (chat.memberChats.length === 1) {
      return chat.memberChats[0].user?.avartar;
    } else {
      return chat.memberChats.find((el) => el.user?.id !== auth.user?.id).user
        ?.avartar;
    }
  } else {
    return chat?.image;
  }
};

const handleGetIds = (chat, auth) => {
  return chat.memberChats.map((el) => el.user.id);
};

export { handleRenderName, handleRenderAvatar, handleGetIds };
