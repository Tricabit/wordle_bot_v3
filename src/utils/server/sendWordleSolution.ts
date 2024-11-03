import axios from "axios";
import CONSTANTS from "../shared/constants";
import getCurrentDate from "../shared/getCurrentDate";
import { Interval } from "luxon";
const { JSDOM } = require("jsdom");

let sendWordleSolution = async (bot: any): Promise<void> => {
  const WORDFINDER_PAGE_URL =
    "https://wordfinder.yourdictionary.com/wordle/answers/";
  const WORDFINDER_PAGE_HEADING_REGEX = /Answer\s\(#(\d+)\)/;

  const wordleGameNumber = Interval.fromDateTimes(
    CONSTANTS.WORDLE_DAY_ONE,
    getCurrentDate()
  ).length("days");
  const resp = await axios.get(WORDFINDER_PAGE_URL);
  const dom = new JSDOM(resp.data);
  const spotlightWordleElement = dom.window.document.querySelector(
    "section > div.wordle-answer-section > h2"
  );
  const spotlightWordleNumber = parseInt(
    spotlightWordleElement?.textContent?.match(WORDFINDER_PAGE_HEADING_REGEX)[1]
  );
  const firstWordleTableRow = dom.window.document.querySelector(
    "section table tbody tr"
  );
  const firstWordleTableNumber = parseInt(
    firstWordleTableRow?.children[1]?.textContent?.trim()
  );
  let wordleAnswer = null;
  // Layout originale (ultima soluzione in un elemento separato)
  if (wordleGameNumber === spotlightWordleNumber) {
    wordleAnswer = dom.window.document
      .querySelector("section > div.wordle-answer-section span.answer")
      ?.textContent?.trim();
  } else if (wordleGameNumber === firstWordleTableNumber) {
    wordleAnswer = firstWordleTableRow?.children[2]?.textContent?.trim();
  }
  // Layout alternativo (ultima soluzione nella prima riga della tabella)
  if (!wordleAnswer?.match(CONSTANTS.WORDLE_SOLUTION_REGEX)) {
    if (wordleGameNumber === firstWordleTableNumber) {
      wordleAnswer =
        firstWordleTableRow?.children[2]?.children[1]?.textContent?.trim();
    } else if (wordleGameNumber === firstWordleTableNumber - 1) {
      wordleAnswer =
        firstWordleTableRow?.nextSibling?.children[2]?.textContent?.trim();
    }
  }
  if (!wordleAnswer?.match(CONSTANTS.WORDLE_SOLUTION_REGEX)) {
    wordleAnswer = null;
  }
  if (!!wordleAnswer) {
    await bot.telegram.sendMessage(
      process.env.GROUP_CHAT_ID,
      `La parola di oggi è: ||${wordleAnswer}||`,
      {
        parse_mode: "MarkdownV2",
      }
    );
  } else {
    await bot.telegram.sendMessage(
      process.env.PERSONAL_CHAT_ID,
      `Soluzione #${wordleGameNumber} non trovata sulla pagina web ${WORDFINDER_PAGE_URL}`
    );
  }
};

export default sendWordleSolution;
