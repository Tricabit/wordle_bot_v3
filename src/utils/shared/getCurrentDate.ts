import { DateTime } from "luxon";

const getCurrentDate = (): DateTime<true> | DateTime<false> => {
  return DateTime.now().setZone("Europe/Rome").startOf("day");
};

export default getCurrentDate;
