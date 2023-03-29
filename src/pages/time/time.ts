import { ref } from 'vue';
import { assign } from 'lodash-es';
import { ConfigType, DaysItemType } from './type';
import { dayjs, defaultConfig, generateDays, generateTimes, isAfterTomorrow } from './myDayjs';

export function useTime(opts?: ConfigType) {
  let config: ConfigType = defaultConfig;
  let days = ref<DaysItemType[]>([]);
  if (opts && Object.keys(opts).length) {
    config = assign(config, opts);
  }
  generate(config.interval);
  /**
   * 生成时间往后天数
   * @param dayNum number | string 需要生成的天数
   */
  function generate(dayNum?: number) {
    dayNum = dayNum || 7;
    for (let i = 0; i < dayNum; i++) {
      const dayAdd = dayjs(config.startTime).add(i, 'day');
      const D = dayAdd.format('YYYY-MM-DD');
      let H = Number(dayjs().format('hh'));
      const m = Number(dayjs().format('mm'));
      // 判断是不是当天
      const isToday = dayjs(D).isToday();
      // 这里判断 需不需要把今天的加进去
      // 生成对应时分秒
      if (isToday) {
        // 判断是不是大于30分钟了, 那这时候就需要 将 H + 1 小时
        if (m > 30) {
          H += 1;
        }
        if (H <= 19 - 3) {
          days.value.push(generateDays(dayAdd, D, config));
        }
      } else {
        days.value.push(generateDays(dayAdd, D, config));
      }
    }
  }
  return {
    days,
  };
}
