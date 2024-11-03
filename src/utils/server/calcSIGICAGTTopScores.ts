const lo = require("lodash");

let calcSIGICAGTTopScores = (SIGICAGTDailyScores: any[]) => {
  const sortedScores = Object.entries(
    SIGICAGTDailyScores.reduce((acc, curr) => {
      Object.entries(curr).forEach(([player, score]) =>
        lo.set(acc, player, (acc[player] || 0) + score)
      );
      return acc;
    }, {})
  ).sort((a: any, b: any) => b[1] - a[1]);
  return sortedScores.reduce((acc: any, curr, index) => {
    if (curr[1] === acc[acc.length - 1]?.points) {
      acc.push({
        startPos: acc[acc.length - 1].startPos,
        player: curr[0],
        points: curr[1],
      });
    } else {
      acc.push({
        startPos: index + 1,
        player: curr[0],
        points: curr[1],
      });
    }
    return acc;
  }, []);
};

export default calcSIGICAGTTopScores;
