let sendWarningReply = async (ctx: any, warning: string) => {
  console.log("Sending warning message: " + warning);
  await ctx.reply("OH ZIO " + warning, {
    reply_to_message_id: ctx.message.message_id,
  });
};

export default sendWarningReply;
