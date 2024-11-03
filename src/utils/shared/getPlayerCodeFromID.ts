const getPlayerCodeFromID = (senderID: string) => {
  const playerCode = JSON.parse(process.env.PLAYERS)
    .filter((item: string) => item.split(":").pop() === senderID.toString())
    .map((item: string) => item.split(":").shift());
  return playerCode.length !== 1 ? false : playerCode.shift();
};

export default getPlayerCodeFromID;
