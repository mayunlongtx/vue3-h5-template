// main.ts
import { createRouter, createWebHashHistory } from 'vue-router';
import { MenuTitle } from '@/enums/menu';
import { composeRight } from '@/utils';
import { getToken } from '@/utils/index';
import { LOGIN_OUT_PATH, LOGIN_PATH } from '@/helpers';
// 白名单
const whiteList = [LOGIN_PATH, LOGIN_OUT_PATH];
async function generateRoutes() {
  const routeFiles = import.meta.glob('../pages/**/*.vue');
  const routes: any = [];

  for (const path in routeFiles) {
    const importer = routeFiles[path];
    const newPath = path.replace('../pages/', './');
    const modulePath = newPath.replace(/^\.\/(.*)\.\w+$/, '$1');
    let name = modulePath.replace(/\/index$/, '');

    const firstInd = modulePath.indexOf('/');
    const lastInd = modulePath.lastIndexOf('/');

    const file: any = await importer();
    const component = file.default;

    const firstName = name.substring(0, firstInd);
    const lastName = modulePath.substr(lastInd + 1, modulePath?.length);

    if (lastInd !== -1 && lastName === 'middle_page') {
      name = name.substr(0, lastInd);
    }

    let title = component.pageTitle;
    if (!component.pageTitle) {
      title = MenuTitle[firstName.toUpperCase()] || MenuTitle.DEFAULT;
    }

    routes.push({
      path: `/${name === 'index' ? '' : name.toLowerCase()}`,
      name: conversionName(name),
      component: component,
      meta: {
        title,
      },
    });
  }

  routes.push({
    path: '/:pathMatch(.*)',
    redirect: '/notfound',
  });

  return routes;
}

async function setupRouter() {
  const routes = await generateRoutes();

  const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes,
  });
  router.beforeEach((to: any, from: any, next) => {
    console.log(to, from, 'to, from', getToken(), whiteList.includes(to.path));
    if (!getToken() && !whiteList.includes(to.path)) {
      next(LOGIN_PATH);
    } else {
      next();

      document.title = to.meta.title;
      // if (to.name === routerStack[routerStack.length - 1]) {
      //   // 这里是后退
      //   routerStack.pop();
      //   from.meta.keepAlive = false;
      //   to.meta.keepAlive = true;
      // } else {
      //   // 这里是前进
      //   routerStack.push(to.name);
      // }
      // document.title = to.meta.title;
      // setTimeout(() => {
      //   next();
      // });
    }
  });
  return router;
}

const routerPromise = setupRouter();

export default routerPromise;

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

function conversionName(name: string) {
  return composeRight(toHump, division, replace)(name);
}
