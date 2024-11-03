//TODO: interfaccia scores

const getSIGICAGTDailyScoresOfMonth = (
  scores: any,
  year: number,
  month: number
) => {
  return Object.entries(scores.daily_scores[year]?.[month] || {})
    .filter(([, dailyScores]: any) => dailyScores.hasOwnProperty("SIGICAGT"))
    .map(([, dailyScores]: any) => dailyScores)
    .map((dailyScores) => {
      let dailyScoresCopy = { ...dailyScores };
      delete dailyScoresCopy.SIGICAGT;
      return dailyScoresCopy;
    });
};

export default getSIGICAGTDailyScoresOfMonth;
