import { describe, test, expect } from 'vitest';
import { dayjs } from './myDayjs';
import { useTime } from './time';

describe('general time', () => {
  // test('测试其他日期时间创建', () => {
  //   const { days } = useTime({
  //     interval: 1,
  //     startTime: '2025-03-30',
  //     startHour: 18,
  //     endHour: 19,
  //   });
  //   expect(days.value).toEqual([
  //     {
  //       id: '20250330',
  //       pId: 0,
  //       text: '03-30(周日)',
  //       children: [
  //         {
  //           id: '301800',
  //           label: '03301800',
  //           pId: '20250330',
  //           text: '18:00',
  //           time: '2025-03-30 18:00:00',
  //         },
  //         {
  //           id: '301900',
  //           label: '03301900',
  //           pId: '20250330',
  //           text: '19:00',
  //           time: '2025-03-30 19:00:00',
  //         },
  //       ],
  //     },
  //   ]);
  // });
  test('测试日期时间创建', () => {
    const dayAdd = dayjs();
    const { days } = useTime({
      interval: 1,
      startHour: 18,
      endHour: 19,
    });
    const equalList = [];
    // 这里使用 生成数组函数去根据传入方法生成

    expect(days.value).toEqual([
      {
        id: '20230327',
        pId: 0,
        text: '今天(周一)',
        children: [
          {
            id: '271800',
            label: '03271800',
            pId: '20230327',
            text: '18:00',
            time: '2023-03-27 18:00:00',
          },
          {
            id: '271900',
            label: '03271900',
            pId: '20230327',
            text: '19:00',
            time: '2023-03-27 19:00:00',
          },
        ],
      },
    ]);
  });
});
