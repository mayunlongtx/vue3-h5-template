import { ref } from 'vue';
import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/zh-cn' // 导入本地化语言
dayjs.extend(isLeapYear) // 使用插件
dayjs.extend(weekday)
dayjs.locale('zh-cn') // 使用本地化语言



export function useTime() {
  const days = ref([]);
//   console.log(dayjs().format());
// 第一步
// console.log(dayjs().weekday(-7).format('YYYY-MM-DD HH:mm:ss'));
// console.log(dayjs().format('dddd'));
// console.log(dayjs().add(1,'day').format('YYYY-MM-DD HH:mm:ss'));

generate(7)
function generate(day: number | string) {
	for (let i = 0; i < day; i++) {
		console.log(dayjs().add(i,'day').format('YYYY-MM-DD'));
	}
}

  return {
    days,
  };
}
