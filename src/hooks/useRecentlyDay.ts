import { Toast } from 'vant';

export interface TimeItem {
  id: string;
  pId: string;
  text: string;
  time?: string;
  label?: string;
}
export interface Time extends TimeItem {
  children: TimeItem[];
}

export interface ConfigType {
  days?: number;
  maxHours?: number;
  minHours?: number;
  maxMinutes?: number;
  interval?: number;
}
export function useRecentlyDay(config?: ConfigType) {
  const defaultConfig: ConfigType = Object.assign(
    {
      days: 7,
      maxHours: 19,
      minHours: 8,
      maxMinutes: 30,
      interval: 2,
    },
    config,
  );
  const { days, maxHours, minHours, maxMinutes, interval } = defaultConfig;
  // 生成近期日期
  function getDay() {
    const allDays = days || 7;
    let { year: nowYear, month: nowMonth, day: nowDay, hour, minute, second } = getNowTime();
    let dayList: Time[] = [];
    const maxDay = getDaysOfMonth(nowYear, nowMonth);
    // 判断是不是超出了今年如果超出了就加一年 月份初始化为1 日期初始化为1
    nowMonth = addZero(nowMonth);
    for (let i = 0; i < allDays; i++) {
      // 如果是最后一天
      //  1. 判断今天还能不能预约？
      if (nowDay == maxDay) {
        // 不可以预约 那么就需要将月份 + 1 天数归 0
        if (!whetherApply()) {
          nowMonth = addZero(Number(nowMonth) + 1);
          nowDay = 0;
        } else {
          // 否则就还是默认时间
          nowMonth = addZero(nowMonth);
        }
      }
      // 如果不是最后一天
      // 就判断当天是不是可以预约
      // 不可以 就将天数+ 1否则就 只有 i > 0 时 再将天数 + 1
      // 如果是今天就不进行添加？
      if (!whetherApply() || i != 0) {
        nowDay = addZero(Number(nowDay) + 1);
      }
      const weekDay = nowDay;
      let { week } = getNowTime(`${nowYear}-${nowMonth}-${addZero(weekDay)}`);
      // Toast({
      //   message: `${nowYear}-${nowMonth}-${addZero(nowDay)}`,
      //   duration: 0,
      // });
      // 生成 children
      let children: TimeItem[] = generateHour(nowYear, nowDay, nowMonth);
      dayList.push({
        id: `${nowYear}${nowMonth}${nowDay}`,
        pId: '0',
        text: calculateDayName(nowDay, week, true, `${nowMonth}-${nowDay}`),
        children: <any>children,
      });
    }
    return dayList;
  }
  // 生成时间
  function generateHour(nowYear: any, nowDay: any, nowMonth: any, time?: any) {
    const nowInterval = interval || 2;
    const nowMaxHours = maxHours || 18;
    let { year, month, day, hour, minute } = getNowTime();
    let list: TimeItem[] = [];
    // 当前时间 往后顺延两小时
    // 规则：
    //      1. 如果当前时间大于16点30分，则无预约时间
    //      2. 如果当前时间小于16点30分，则当天的时间往后顺延两小时 最大不能超过 18:00
    // hour = nowDay > day ? minHours : Number(hour) + nowInterval;
    if (nowYear > year || nowMonth > month || Number(nowDay) > day) {
      hour = minHours;
    } else if (minute >= maxMinutes) {
      hour = Number(hour) + nowInterval + 1;
    } else {
      hour = Number(hour) + nowInterval;
    }

    // 生成当前时间 至 18:00 时间
    for (let i: any = Number(hour); i < nowMaxHours + 1; i++) {
      const { week } = getNowTime(
        `${nowYear}-${addZero(nowMonth)}-${addZero(nowDay)} ${i}:${minute}:00`,
      );
      i = addZero(i);
      let label = `${calculateDayName(nowDay, week, false, `${nowMonth}-${nowDay}`)} ${i}:00`;
      list.push({
        id: `${nowDay}${i}00`,
        pId: `${nowYear}${addZero(nowMonth)}${addZero(nowDay)}`,
        text: `${i}:00`,
        // :00
        time: `${nowYear}-${nowMonth}-${addZero(nowDay)} ${i}:00:00`,
        label,
      });
    }
    return list;
  }
  // 计算今天、明天、后天
  function calculateDayName(nowDay: number, week: number, showWeek: boolean = true, value?: any) {
    const { day } = getNowTime();
    // Toast({
    //   message: `${nowDay} ${week}`,
    //   duration: 0,
    // })
    let _str = value;
    const difference = nowDay - day;
    switch (difference) {
      case 0:
        _str = '今天';
        break;
      case 1:
        _str = '明天';
        break;
      case 2:
        _str = '后天';
        break;
      default:
        _str = value;
        break;
    }
    const weekName = ` (${calculateWeekName(week)})`;
    return `${_str}${showWeek ? weekName : ''}`;
  }
  // 计算周几
  function calculateWeekName(week: number) {
    switch (week) {
      case 0:
        return '周日';
      case 1:
        return '周一';
      case 2:
        return '周二';
      case 3:
        return '周三';
      case 4:
        return '周四';
      case 5:
        return '周五';
      case 6:
        return '周六';
      default:
        return '未知';
    }
  }
  // 判断今天是否还可以预约
  function whetherApply(hour: number = 19, minute: number = 30) {
    const { hour: nowHour, minute: nowMinute } = getNowTime();
    if (nowHour > maxHours) {
      return false;
    } else if (Number(nowHour) + interval > maxHours) {
      return false;
    } else if (Number(nowHour) + interval === maxHours) {
      return nowMinute < maxMinutes;
    } else {
      return true;
    }
  }
  // 获取当前时间
  function getNowTime(value?: any) {
    let date = value ? new Date(value) : new Date();
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    const week: number = date.getDay();
    let day: any = date.getDate();
    let hour: any = date.getHours();
    let minute: string | number = date.getMinutes();
    let second: string | number = date.getSeconds();
    // month = month < 10 ? '0' + month : month;
    // day = day < 10 ? '0' + day : day;
    // hour = hour < 10 ? '0' + hour : hour;
    // minute = minute < 10 ? '0' + minute : minute;
    // second = second < 10 ? '0' + second : second;
    return {
      year,
      month,
      week,
      day,
      hour,
      minute,
      second,
    };
  }
  // 计算字符串是否小于 10
  function addZero(value: any) {
    value = Number(value);
    return value < 10 ? `0${value}` : value;
  }
  /**
   * 获取某个月的总天数
   *
   */
  function getDaysOfMonth(year: any, month: any) {
    var date = new Date(year, month, 0);
    var days = date.getDate();
    return days;
  }
  return {
    getDay,
  };
}
