import { DateTime } from "luxon";

const UNICODE_GREEN_SQUARE = "\ud83d\udfe9";
const UNICODE_YELLOW_SQUARE = "\ud83d\udfe8";
const UNICODE_WHITE_SQUARE = "\u2b1c\ufe0f";
const UNICODE_WHITE_SQUARE_VAR = "\u2b1c";
const UNICODE_BLACK_SQUARE = "\u2b1b\ufe0f";
const UNICODE_BLACK_SQUARE_VAR = "\u2b1b";

const WORDLE_SOLUTION_REGEX = /^[A-Z]{5}$/;
const WORDLE_MSG_HEADING_REGEX = /Wordle (\d{1,3}(?:[,.]\d{3})*) ([1-6]|X)\/6/;
const WORDLE_DAY_ONE = DateTime.local(2021, 6, 19)
  .setZone("Europe/Rome")
  .startOf("day");
const THROUGHPUT_FIRST_CHALLENGE = DateTime.local(2023, 7, 17)
  .setZone("Europe/Rome")
  .startOf("day");

const MSG_WRONG_DATE = "NON È IL WORDLE DI OGGI";
const MSG_INCONSISTENT_BOARD = "NON FARE IL FURBO";
const MSG_UNKNOWN_SENDER = "NON SO CHI SEI";
const MSG_ALREADY_PLAYED = "OGGI HAI GIÀ GIOCATO";
const MSG_BOT_UNAVAILABLE = "STO DORMENDO";
const MSG_NICKNAME_NOT_RECEIVED = "NON MI HAI MANDATO IL NOME";
const MSG_NICKNAME_NOT_VALID = "QUESTO NOME NON VA BENE";

const SCORE_SYSTEM = new Map([
  ["1", 10],
  ["2", 7],
  ["3", 4],
  ["4", 3],
  ["5", 2],
  ["6", 0],
  ["X", -3],
]);

const BASE_SCORES_JSON = {
  stats: {
    by_player: {},
    by_month: {
      SIGICAGT: {},
    },
    by_year: {
      SIGICAGT: {},
    },
  },
  daily_scores: {},
  player_nicknames: {},
};

const CONSTANTS = {
  UNICODE_GREEN_SQUARE,
  UNICODE_YELLOW_SQUARE,
  UNICODE_WHITE_SQUARE,
  UNICODE_WHITE_SQUARE_VAR,
  UNICODE_BLACK_SQUARE,
  UNICODE_BLACK_SQUARE_VAR,
  WORDLE_SOLUTION_REGEX,
  WORDLE_MSG_HEADING_REGEX,
  WORDLE_DAY_ONE,
  THROUGHPUT_FIRST_CHALLENGE,
  MSG_WRONG_DATE,
  MSG_INCONSISTENT_BOARD,
  MSG_UNKNOWN_SENDER,
  MSG_ALREADY_PLAYED,
  MSG_BOT_UNAVAILABLE,
  MSG_NICKNAME_NOT_RECEIVED,
  MSG_NICKNAME_NOT_VALID,
  SCORE_SYSTEM,
  BASE_SCORES_JSON,
};

export default CONSTANTS;
