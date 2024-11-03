import CONSTANTS from "./constants";

const wordleScoreIsSound = (messageText: string): boolean => {
  const heading = messageText.split("\n")[0];
  const formattedHeading = heading.match(CONSTANTS.WORDLE_MSG_HEADING_REGEX);

  if (!formattedHeading) return false;

  const result = formattedHeading[2];
  const attempts = result === "X" ? 6 : parseInt(result);
  const board = messageText.split("\n").slice(2);
  const boardWithLettersInsteadOfNumbers = board.map((row) =>
    row
      .replaceAll(CONSTANTS.UNICODE_BLACK_SQUARE, "B")
      .replaceAll(CONSTANTS.UNICODE_BLACK_SQUARE_VAR, "B")
      .replaceAll(CONSTANTS.UNICODE_YELLOW_SQUARE, "Y")
      .replaceAll(CONSTANTS.UNICODE_GREEN_SQUARE, "G")
      .replaceAll(CONSTANTS.UNICODE_WHITE_SQUARE, "W")
      .replaceAll(CONSTANTS.UNICODE_WHITE_SQUARE_VAR, "W")
  );

  const areAttemptsValid = board.length === attempts;
  const isBoardContentValid = boardWithLettersInsteadOfNumbers
    .join("")
    .match(/^([BYGW]{5})+$/);

  const lastBoardElement = boardWithLettersInsteadOfNumbers.pop();

  //TODO: Fix condition and remove the @ts-ignore
  const isScoreInconsistent =
    //@ts-ignore
    lastBoardElement?.match(/^GGGGG$/) === (result === "X");

  if (!areAttemptsValid) {
    console.log("W_WRONG_BOARD_LENGTH");
    return false;
  }
  if (!isBoardContentValid) {
    console.log("W_WRONG_BOARD_CONTENT");
    return false;
  }
  if (isScoreInconsistent) {
    console.log("W_INCONSISTENT_SCORE");
    return false;
  }
  return true;
};

export default wordleScoreIsSound;
