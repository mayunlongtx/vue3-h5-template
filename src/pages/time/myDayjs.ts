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
    text: generateText(dayAdd, isToday, isTomorrow, md),
    children: generateTimes(isToday, isTomorrow, dayAdd, md, config),
  };

  return result;
}

function generateText(dayAdd, isToday, isTomorrow, md, isShowWeek = true) {
  const week = `(${dayAdd.format('ddd')})`;
  const result = `${
    isToday
      ? '今天'
      : isTomorrow
      ? '明天'
      : isAfterTomorrow(Number(dayAdd.format('DD')))
      ? '后天'
      : md
  }${isShowWeek ? week : ''}`;
  return result;
}

// 需要一个生成时间的方法
export function generateTimes(
  isToday: boolean,
  isTomorrow: boolean,
  dayAdd: Dayjs,
  md,
  config: ConfigType,
) {
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
  let h = isToday ? H + 2 : H;
  for (h; h <= maxH; h++) {
    const newH = h < 10 ? '0' + h : h;
    const hObj = {
      id: `${dayAdd.format('DD')}${h}00`,
      label: `${generateText(dayAdd, isToday, isTomorrow, md, false)} ${newH}:00`,
      pId: dayAdd.format('YYYYMMDD'),
      text: `${newH}:00`,
      time: `${dayAdd.format('YYYY-MM-DD')} ${newH}:00:00`,
      date: {
        Y: dayAdd.format('YYYY'),
        M: dayAdd.format('MM'),
        D: dayAdd.format('DD'),
        h: newH,
        m: '00',
        s: '00',
      },
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

/**
 * 判断是不是需要把天数+1
 * @param lastTime 最大时间
 * @returns boolean 是否需要添加
 */
export function whetherNeedAddDay(lastTime) {
  if (lastTime - Number(dayjs().format('H')) < 2) {
    return true;
  } else if (lastTime - Number(dayjs().format('H')) == 2 && Number(dayjs().format('mm')) > 30) {
    return true;
  } else {
    return false;
  }
}

export { dayjs };
