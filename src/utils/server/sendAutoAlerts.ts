import getCurrentDateTime from "../shared/getCurrentDateTime";
import readScoresFile from "./readScoreFile";
import sendErrorStack from "./sendErrorStack";
import sendReminder from "./sendReminder";
import sendWordleSolution from "./sendWordleSolution";

let sendAutoAlerts = async (req: any, res: any, bot: any) => {
  try {
    const now = getCurrentDateTime();
    if (now.hour >= 23) {
      const scores = await readScoresFile();
      if (
        !scores.daily_scores?.[now.year]?.[now.month]?.[
          now.day
        ]?.hasOwnProperty("SIGICAGT")
      ) {
        await sendWordleSolution(bot);
      }
    } else if (now.hour >= 15) {
      const scores = await readScoresFile();
      if (
        !scores.daily_scores?.[now.year]?.[now.month]?.[
          now.day
        ]?.hasOwnProperty("SIGICAGT")
      ) {
        await sendReminder(scores, bot);
      }
    }
    res.status(200).end();
  } catch (err) {
    await sendErrorStack(err, bot);
    res.status(500).end();
  }
};

export default sendAutoAlerts;
