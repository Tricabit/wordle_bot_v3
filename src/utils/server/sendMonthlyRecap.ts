import escapeMarkdownCharacters from "../shared/escapeMarkdownCharacters";
import getCurrentDate from "../shared/getCurrentDate";
import getSIGICAGTDailyScoresOfMonth from "../shared/getSIGICAGTDailyScoresOfMonth";
import calcSIGICAGTTopScores from "./calcSIGICAGTTopScores";
import readScoresFile from "./readScoreFile";
import lo from "lodash";
import writeScoresFile from "./writeScoreFile";
import sendErrorStack from "./sendErrorStack";

let sendMonthlyRecap = async (req: any, res: any, bot: any) => {
  try {
    const scores = await readScoresFile();
    // Il recap viene lanciato all'inizio del primo giorno del mese
    const yesterday = getCurrentDate().minus({ days: 1 });
    const currentMonthSIGICAGT = getSIGICAGTDailyScoresOfMonth(
      scores,
      yesterday.year,
      yesterday.month
    );
    if (currentMonthSIGICAGT.length === 0) {
      await bot.telegram.sendPhoto(
        process.env.GROUP_CHAT_ID,
        "https://i.kym-cdn.com/entries/icons/original/000/034/772/Untitled-1.png",
        {
          caption: "Questo mese non abbiamo mai giocato tutti...",
        }
      );
    } else {
      const scoresSIGICAGT = calcSIGICAGTTopScores(currentMonthSIGICAGT);
      const winners = scoresSIGICAGT
        .filter((item: any) => item.startPos === 1)
        .reduce((acc: any[], curr: any) => [...acc, curr.player], []);
      // Salvataggio dei vincitori nel file con i punteggi
      lo.setWith(
        scores,
        [
          "stats",
          "by_month",
          "SIGICAGT",
          yesterday.year,
          yesterday.month,
          "winners",
        ],
        winners,
        Object
      );
      await writeScoresFile(scores);
      // Invio del messaggio con la classifica finale
      const messageText = `*✨ Classifica finale del mese \\(${
        yesterday.month
      }/${yesterday.year}\\) ✨*\n
Vincitor${winners.length === 1 ? "e" : "i"}: 🏆 *${winners
        .map((playerCode: any) => scores.player_nicknames[playerCode])
        .join(", ")}* 🏆\n
Classifica completa:
${escapeMarkdownCharacters(
  scoresSIGICAGT.reduce(
    (acc: string, curr: any) =>
      `${acc}${curr.startPos}. ${scores.player_nicknames[curr.player]}: ${
        curr.points
      } punt${curr.points === 1 ? "o" : "i"}\n`,
    ""
  )
)}
`;
      await bot.telegram.sendMessage(process.env.GROUP_CHAT_ID, messageText, {
        parse_mode: "MarkdownV2",
      });
    }
    // Recap annuale (inviato solo ad inizio anno)
    if (yesterday.month === 12) {
      const months = Array.from(Array(12), (_, index) => index + 1);
      const currentYearSIGICAGT = months
        .map((month) =>
          getSIGICAGTDailyScoresOfMonth(scores, yesterday.year, month)
        )
        .flat();
      if (currentYearSIGICAGT.length !== 0) {
        const topSIGICAGTScores = calcSIGICAGTTopScores(currentYearSIGICAGT);
        const winnersByTotalPoints = topSIGICAGTScores
          .filter((item: any) => item.startPos === 1)
          .reduce((acc: any[], curr: any) => [...acc, curr.player], []);
        // NB: Se è stato salvato almeno un punteggio SIGICAGT allora c'è anche almeno un vincitore mensile
        const monthlyWins = Object.values(
          scores.stats.by_month.SIGICAGT[yesterday.year]
        )
          .map((item: any) => Object.values(item))
          .flat(2)
          .reduce(
            (acc: any, curr: any) => lo.set(acc, curr, (acc[curr] || 0) + 1),
            {}
          );
        const topMonthlyWins = calcSIGICAGTTopScores([monthlyWins]);
        const winnersByMonthlyWins = topMonthlyWins
          .filter((item: any) => item.startPos === 1)
          .reduce((acc: any[], curr: any) => [...acc, curr.player], []);
        // Salvataggio dei vincitori nel file con i punteggi
        lo.setWith(
          scores,
          [
            "stats",
            "by_year",
            "SIGICAGT",
            yesterday.year,
            "winners",
            "monthly_wins",
          ],
          winnersByMonthlyWins,
          Object
        );
        lo.setWith(
          scores,
          [
            "stats",
            "by_year",
            "SIGICAGT",
            yesterday.year,
            "winners",
            "total_score",
          ],
          winnersByTotalPoints,
          Object
        );
        await writeScoresFile(scores);
        // Invio del messaggio con la classifica finale
        const messageText = `*🎇 Classifica finale dell'anno ${
          yesterday.year
        } 🎇*\n
➕ *Punteggio totale*
${escapeMarkdownCharacters(
  topSIGICAGTScores
    .reduce(
      (acc: any[], curr: any) =>
        acc.concat(
          `${curr.startPos}. ${scores.player_nicknames[curr.player]}: ${
            curr.points
          } punt${curr.points === 1 ? "o" : "i"}`
        ),
      []
    )
    .join("\n")
)}
Vincitor${
          winnersByTotalPoints.length === 1 ? "e" : "i"
        }: 🏆 *${winnersByTotalPoints
          .map((playerCode: any) => scores.player_nicknames[playerCode])
          .join(", ")}* 🏆\n
🔝 *Numero di vittorie mensili*
${escapeMarkdownCharacters(
  topMonthlyWins
    .reduce(
      (acc: any[], curr: any) =>
        acc.concat(
          `${curr.startPos}. ${scores.player_nicknames[curr.player]}: ${
            curr.points
          } vittori${curr.points === 1 ? "a" : "e"}`
        ),
      []
    )
    .join("\n")
)}
Vincitor${
          winnersByMonthlyWins.length === 1 ? "e" : "i"
        }: 🏆 *${winnersByMonthlyWins
          .map((playerCode: any) => scores.player_nicknames[playerCode])
          .join(", ")}* 🏆
`;
        await bot.telegram.sendMessage(process.env.GROUP_CHAT_ID, messageText, {
          parse_mode: "MarkdownV2",
        });
      }
    }
    res.status(200).end();
  } catch (err) {
    await sendErrorStack(err, bot);
    res.status(500).end();
  }
};

export default sendMonthlyRecap;
