function useDateHelpers() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const currentTime = hours + ":" + minutes.substring(1, 5);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const currentDate = month[date.getMonth()];

  return {
    day,
    currentTime,
    currentDate,
  };
}

export default useDateHelpers;
