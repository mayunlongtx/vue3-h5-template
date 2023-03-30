import dayjs, { Dayjs } from 'dayjs';
import IsLeapYear from 'dayjs/plugin/isLeapYear'; // 导入插件
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/zh-cn'; // 导入本地化语言
import IsToday from 'dayjs/plugin/isToday';
import IsTomorrow from 'dayjs/plugin/isTomorrow';
import { ConfigType, DaysItemType, ItemType } from './type';
dayjs.extend(IsLeapYear); // 使用插件
dayjs.extend(weekday);
dayjs.extend(IsToday);
dayjs.extend(IsTomorrow);
dayjs.locale('zh-cn'); // 使用本地化语言

export const defaultConfig: ConfigType = {
  startTime: new Date(),
  startHour: 8,
  endHour: 19,
  interval: 3,
  afterNumber: 14,
};

export function generateDays(dayAdd: Dayjs, day: Date | string, config: ConfigType) {
  const md = dayAdd.format('MM-DD');
  // 判断是不是当天
  const isToday = dayjs(day).isToday();
  // 判断是不是明天
  const isTomorrow = dayjs(day).isTomorrow();
  let result: DaysItemType = {
    id: dayAdd.format('YYYYMMDD'),
    pId: 0,
    text: generateText(),
    children: generateTimes(isToday, dayAdd, config),
  };
  function generateText() {
    const result = `${
      isToday
        ? '今天'
        : isTomorrow
        ? '明天'
        : isAfterTomorrow(Number(dayAdd.format('DD')))
        ? '后天'
        : md
    }(${dayAdd.format('ddd')})`;
    return result;
  }
  return result;
}

// 需要一个生成时间的方法
export function generateTimes(isToday: boolean, dayAdd: Dayjs, config: ConfigType) {
  let result: ItemType[] = [];
  let H: number = config.startHour || 8;
  // 如果是当天就需要将开始时间设置为当前时间往后累加的时间
  if (isToday) {
    H = Number(dayjs().format('H'));
  }
  // 计算插值 判断需要生成多少的时间数组
  let maxH: number = 19;
  if (config.endHour) {
    maxH = config.endHour;
  }
  for (let t = H; t <= maxH; t++) {
    const hObj = {
      id: `${dayAdd.format('DD')}${t}00`,
      label: `${dayAdd.format('MMDD')}${t}00`,
      pId: dayAdd.format('YYYYMMDD'),
      text: `${t}:00`,
      time: `${dayAdd.format('YYYY-MM-DD')} ${t}:00:00`,
    };
    result.push(hObj);
  }
  return result;
}

export function isAfterTomorrow(day: number) {
  const nowDay = Number(dayjs().format('DD'));
  return day - nowDay == 2;
}

export function getDate(date = new Date()) {
  return dayjs(date).format('YYYY-MM-DD');
}

export { dayjs };
