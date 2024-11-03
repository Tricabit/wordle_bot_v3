import CONSTANTS from "./constants";

const isMessageWordleScore = (messageText: string): boolean => {
  const heading = messageText.split("\n")[0];
  return !!heading.match(CONSTANTS.WORDLE_MSG_HEADING_REGEX);
};

export default isMessageWordleScore;
