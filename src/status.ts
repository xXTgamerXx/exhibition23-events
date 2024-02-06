import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function getStatus(startTime: Date, endTime: Date) {
  const date = new Date();
  let statusNum = 0;

  if (dayjs(date.getTime()).diff(startTime) > 1) {
    if (dayjs(date.getTime()).diff(endTime) > 1) {
      statusNum = 3;
    } else {
      statusNum = 2;
    }
  } else {
    statusNum = 1;
  }
  return statusNum;
}
