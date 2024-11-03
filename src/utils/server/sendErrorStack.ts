let sendErrorStack = async (error: any, bot: any) => {
  console.error(error);
  await bot.telegram.sendMessage(
    process.env.PERSONAL_CHAT_ID,
    "OPS! " + error.stack
  );
};

export default sendErrorStack;
