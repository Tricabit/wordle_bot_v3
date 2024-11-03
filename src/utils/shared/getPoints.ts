import CONSTANTS from "./constants";

const getPoints = (attempts: string) => {
  return CONSTANTS.SCORE_SYSTEM.get(attempts);
};

export default getPoints;
