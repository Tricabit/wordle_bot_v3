import getCurrentDate from "./getCurrentDate";

//TODO: fare le interfacce per scores e player
const hasPlayerAlreadyPlayed = (scores: any, player: any) => {
  const today = getCurrentDate();
  return !!scores.daily_scores[today.year]?.[today.month]?.[
    today.day
  ]?.hasOwnProperty(player);
};

export default hasPlayerAlreadyPlayed;
