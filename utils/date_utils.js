import {format, startOfWeek, endOfWeek} from 'date-fns';

export function getWeekRange(date) {
  const startDate = format(startOfWeek(date), 'yyyy-MM-dd');
  const endDate = format(endOfWeek(date), 'yyyy-MM-dd');
  return {startDate, endDate};
}

export function setUpDatePeriod(startDateQuery, endDateQuery) {
  let {startDate, endDate} = getWeekRange(new Date());
  if (startDateQuery != null) {
    startDate = format(new Date(startDateQuery), 'yyyy-MM-dd');
  }
  if (endDateQuery != null) {
    endDate = format(new Date(endDateQuery), 'yyyy-MM-dd');
  }
  return {startDate, endDate};
}
