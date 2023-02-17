import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { getToken } from '@/utils/index';

import routes from '../pages/export';
import { LOGIN_OUT_PATH, LOGIN_PATH, LOGIN_SUCCESS_PATH } from '@/helpers';
console.log(routes);
const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
});
interface routerType {
  path: string;
  name: string;
}
// 白名单
const whiteList = [
  LOGIN_PATH,
  LOGIN_OUT_PATH,
  '/temporary/face',
  ...routes.map((item: routerType) => item.path),
];
let routerStack: string[] = [];
router.beforeEach((to: any, from: any, next) => {
  // console.log(to, from);
  if (!getToken() && !whiteList.includes(to.path)) {
    next(LOGIN_OUT_PATH);
  } else {
    if (to.name === routerStack[routerStack.length - 1]) {
      // 这里是后退
      routerStack.pop();
      from.meta.keepAlive = false;
      to.meta.keepAlive = true;
    } else {
      // 这里是前进
      routerStack.push(to.name);
    }
    document.title = to.meta.title;
    setTimeout(() => {
      next();
    });
  }
});
export default router;
