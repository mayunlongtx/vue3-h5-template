import { ref } from 'vue';
import { assign } from 'lodash-es';
import { ConfigType, DaysItemType } from './type';
import { dayjs, defaultConfig, generateDays, whetherNeedAddDay } from './myDayjs';

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
    const lastTime = config.endHour || 19;
    let i = 0;
    console.log(Number(dayjs().format('H')), '11');
    // 1. 如果当前时间 大于等于 需要创建的最大时间
    // 2. 当前时间  大于 最大时间 - 2，
    //     a. 判断时间是不是超过三十分钟了 超过 就需要将其天数 + 1
    if (whetherNeedAddDay(lastTime)) {
      dayNum += 1;
      i = 1;
    }

    // 1. 这里需要判断是不是已经超出 19点了 超出就认为今天无法服务了 只能明天了 ，然后整体加1
    for (i; i < dayNum; i++) {
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
        if (Number(dayjs().format('H')) <= lastTime) {
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
