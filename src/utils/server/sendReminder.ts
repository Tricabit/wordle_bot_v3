import getCurrentDate from "../shared/getCurrentDate";

//TODO: fare interfaccia scores e rimuovere gli any
const sendReminder = async (scores: any, bot: any) => {
  const today = getCurrentDate();
  const playersWithoutScore = JSON.parse(process.env.PLAYERS)
    .map((item: any) => ({
      code: item.split(":").shift(),
      id: item.split(":").pop(),
      nickname: scores.player_nicknames[item.split(":").shift()],
    }))
    .filter(
      (item: any) =>
        !scores.daily_scores?.[today.year]?.[today.month]?.[
          today.day
        ]?.hasOwnProperty(item.code)
    );
  let messageText = `❗ Non hanno ancora giocato tutti\\! Manca${
    playersWithoutScore.length > 1 ? "no" : ""
  } all'appello:`;
  playersWithoutScore.forEach((player: any) => {
    messageText += `\n[${player.nickname}](tg://user?id=${player.id})`;
  });
  await bot.telegram.sendMessage(process.env.GROUP_CHAT_ID, messageText, {
    parse_mode: "MarkdownV2",
  });
};

export default sendReminder;
