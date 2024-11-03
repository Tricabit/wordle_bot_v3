import { DateTime } from "luxon";

const getCurrentDateTime = (): DateTime<true> | DateTime<false> => {
  return DateTime.now().setZone("Europe/Rome");
};

export default getCurrentDateTime;
