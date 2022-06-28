import dayjs from '@/utils/dayjs';

const isBetween = require('dayjs/plugin/isBetween');
const isToday = require('dayjs/plugin/isToday');
const isYesterday = require('dayjs/plugin/isYesterday');

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isBetween);
export const formatDate = (date) => {
  if (dayjs(date).isYesterday()) {
    return 'yesterday';
  }
  if (dayjs(date).isToday()) {
    return 'today';
  }
  if (dayjs(date).isBetween(dayjs(), dayjs().subtract(1, 'week'))) {
    return dayjs(date).format('dddd');
  }
  return dayjs(date).format('MMMM D[,] YYYY');
};
