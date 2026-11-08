function addCalendarMonth(date) {
  const source = new Date(date);

  if (Number.isNaN(source.getTime())) {
    throw new Error('A valid date is required.');
  }

  const year = source.getFullYear();
  const month = source.getMonth();
  const day = source.getDate();

  const targetFirstDay = new Date(
    year,
    month + 1,
    1,
    source.getHours(),
    source.getMinutes(),
    source.getSeconds(),
    source.getMilliseconds()
  );

  const lastDayOfTargetMonth = new Date(
    targetFirstDay.getFullYear(),
    targetFirstDay.getMonth() + 1,
    0
  ).getDate();

  targetFirstDay.setDate(
    Math.min(day, lastDayOfTargetMonth)
  );

  return targetFirstDay;
}

module.exports = {
  addCalendarMonth,
};
