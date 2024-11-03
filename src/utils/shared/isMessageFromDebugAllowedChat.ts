const isMessageFromDebugAllowedChat = (chatID: string): boolean => {
  return chatID.toString() === process.env.PERSONAL_CHAT_ID;
};

export default isMessageFromDebugAllowedChat;
