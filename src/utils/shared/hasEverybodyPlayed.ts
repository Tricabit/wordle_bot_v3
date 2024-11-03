//TODO: fare l'interfaccia di scores

import getCurrentDate from "./getCurrentDate";

const hasEverybodyPlayed = (scores: any) => {
  const today = getCurrentDate();
  return (
    Object.keys(
      scores.daily_scores[today.year]?.[today.month]?.[today.day] || {}
    ).length === 6
  );
};

export default hasEverybodyPlayed;
