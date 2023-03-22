import { MenuTitle } from '@/enums/menu';
import { composeRight } from '@/utils';

let routeFiles = import.meta.glob('../../pages/**/*.vue');
let routes: any = [];
for (const path in routeFiles) {
  const newPath = path.replace('../../pages/','./')
  const modulePath = newPath.replace(/^\.\/(.*)\.\w+$/, '$1');
  let name = modulePath.replace(/\/index$/, '');
  const firstInd = modulePath.indexOf('/');
  const lastInd = modulePath.lastIndexOf('/');
  const file: any = await routeFiles[path]();
  const component = file.default;
  const firstName = name.substring(0, firstInd);
  const lastName = modulePath.substr(lastInd + 1, modulePath.length);
  // 判断是否为模块首页
  if (lastInd != -1 && lastName == 'middle_page') {
    name = name.substr(0, lastInd);
  }
  // 判断是不是需要添加 title
  let title = component.pageTitle;
  // 这里是配置整个模块
  if (!component.pageTitle) {
    title = MenuTitle[firstName.toUpperCase()] || MenuTitle.DEFAULT;
  }
  console.log(title);
  routes.push({
    path: `/${name == 'index' ? '' : name.toLowerCase()}`, // 这个判断是等于home首页，路径就默认为/ ，toLowerCase是转小写函数
    name: conversionName(name),
    component: routeFiles[path],
    meta: {
      title,
    },
  });
}
routes.push({
  path: '/:pathMatch(.*)',
  redirect: '/notfound',
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
export { routes };
export default routes;
