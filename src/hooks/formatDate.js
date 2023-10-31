import moment from "moment";

export const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const formatDay = (date) => {
  return moment(date).format("MM.DD");
};
export const formatTime = (time) => {
  const hours = parseInt(time / 60);
  const min = time % 60;
  return `${hours.toString().padStart(2, 0)}:${min.toString().padStart(2, 0)}`;
};

export const getTimeInMinutes = (time1) => {
  const t1 = time1.split(":").map((i) => parseInt(i));
  console.log(t1[0] * 60 + t1[1]);
  return t1[0] * 60 + t1[1];
};
