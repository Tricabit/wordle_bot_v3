import { getCurrentDateTime } from "..";

let botIsAcceptingMessages = () => {
  const now = getCurrentDateTime();
  return !(
    (now.hour === 23 && now.minute >= 50) ||
    (now.hour === 0 && now.minute <= 10)
  );
};

export default botIsAcceptingMessages;
