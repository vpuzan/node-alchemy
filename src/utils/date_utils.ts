import { format, startOfWeek, endOfWeek, parse } from 'date-fns';

export function getWeekRange(date: string) {
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
  const startDate = format(startOfWeek(parsedDate), 'yyyy-MM-dd');
  const endDate = format(endOfWeek(parsedDate), 'yyyy-MM-dd');
  return { startDate, endDate };
}

export function setUpDatePeriod(startDateQuery: string, endDateQuery: string) {
  let startDate = format(startOfWeek(new Date()), 'yyyy-MM-dd');
  let endDate = format(endOfWeek(new Date()), 'yyyy-MM-dd');

  if (startDateQuery) {
    startDate = format(parse(startDateQuery, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd');
  }

  if (endDateQuery) {
    endDate = format(parse(endDateQuery, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd');
  }

  return { startDate, endDate };
}