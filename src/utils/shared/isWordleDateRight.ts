import { Interval } from "luxon";
import CONSTANTS from "./constants";
import getCurrentDate from "./getCurrentDate";

const isWordleDateRight = (messageText: string): boolean => {
  const heading = messageText.split("\n")[0];
  const gameNumberArr = heading.match(CONSTANTS.WORDLE_MSG_HEADING_REGEX);

  if (!gameNumberArr) return false;

  const gameNumber = gameNumberArr[1];

  const wordleGameNumber = Interval.fromDateTimes(
    CONSTANTS.WORDLE_DAY_ONE,
    getCurrentDate()
  ).length("days");
  return wordleGameNumber === parseInt(gameNumber.replace(/[,.]/, ""));
};

export default isWordleDateRight;
