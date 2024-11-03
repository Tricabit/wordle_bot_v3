const isMessageFromAllowedChat = (chatID: string): boolean => {
  return (
    chatID.toString() === process.env.GROUP_CHAT_ID ||
    chatID.toString() === process.env.PERSONAL_CHAT_ID
  );
};

export default isMessageFromAllowedChat;
