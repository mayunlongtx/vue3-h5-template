import { MenuTitle } from '@/enums/menu';
import { composeRight } from '@/utils';

let moduleFiles = import.meta.globEager('./**/*.vue');
let modules: any = {};
let routes: any = [];

for (const key in moduleFiles) {
  const module = moduleFiles[key];
  // 这里是为了过滤掉 单独的组件
  if (key.indexOf('/components/') == -1) {
    modules[key.replace(/(\.\/modules\/|\.js)/g, '')] = module.default;
  }
}

Object.keys(modules).forEach((item) => {
  modules[item]['nameSpaced'] = true;
  const modulePath = item.replace(/^\.\/(.*)\.\w+$/, '$1');
  let name = modulePath.replace(/\/index$/, '');
  // 1. 判断名称中是否包含了对应的目录
  // 2. 如果包含了  就根据枚举 将对应的 title 添加到meta 中
  // 3. 首页 登录页 中间页 做特殊处理
  const firstInd = modulePath.indexOf('/');
  const lastInd = item.lastIndexOf('/');

  const firstName = name.substring(0, firstInd);
  const lastName = item.substr(lastInd + 1, item.length);
  // 判断是否为模块首页
  if (lastInd != -1 && lastName == 'middle_page') {
    name = name.substr(0, lastInd);
  }
  // 判断是不是需要添加 title
  const  title = modules[item].pageTitle || MenuTitle.DEFAULT_TITLE;
  routes.push({
    path: `/${name == 'index' ? '' : name.toLowerCase()}`, // 这个判断是等于home首页，路径就默认为/ ，toLowerCase是转小写函数
    name: conversionName(name),
    meta: {
      title,
      // keepAlive: true,
    },
    component: modules[item],
  });
});
/**
 * 将 name 转为 大驼峰命名
 * 1.先将字符串中的 - 替换为 /
 * 2.再根据 / 分割成数组
 * 3.将数组循环改变第一个首字母为大写
 * 4.最后拼接返回
 * 通过组合函数实现
 * */
function replace(str: string): string {
  return str.replace(/[-_]/g, '/');
}
function division(str: string): string[] {
  return str.split('/');
}
function toHump(arr: string[]): string {
  return arr.reduce(
    (previous, current) => previous + current.replace(/^\w/, (s) => s.toUpperCase()),
    '',
  );
}

function conversionName(name: String) {
  return composeRight(toHump, division, replace)(name);
  // return name
  //   .replace(/[-_]/g, '/')
  //   .split('/')
  //   .reduce((previous, current) => previous + current.replace(/^\w/, (s) => s.toUpperCase()), '');
}
export default routes;
