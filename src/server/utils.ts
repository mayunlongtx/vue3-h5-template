import AllAPi from '../api/AllAPi';
import { removeLocalStorage } from '@/utils';
import { TIMEOUT, OTHER, NOLOGIN } from './error-code';
import { Notify, Dialog } from 'vant';
import { LOGIN_OUT_PATH } from '@/helpers';
import { isDev } from '@/utils/is';
// 如果是本地开发环境就跳转到登录页面
const LOGIN_PATH = isDev() ? '/login' : LOGIN_OUT_PATH;

export function getUrl(key) {
  console.log(isDev(), 'isDev()');
  if (isDev()) {
    return AllAPi[key].dev;
  } else {
    return AllAPi[key].prod;
  }
}
// 成功处理函数
export function handleSuccess(res: any, resolve: Function, opts?: any) {
  let isAlert = opts.custom ? opts.custom['isAlert'] : false;
  isAlert = isAlert === undefined ? true : isAlert;
  const data = res.data;
  // console.log(data);
  if (data.isSuccess == false) {
    // 未登录
    if (NOLOGIN.includes(data.code)) {
      Dialog.alert({
        message: data.msg || data.message,
      }).then(() => {
        removeLocalStorage();
        window.location.hash = LOGIN_PATH;
      });
    } else {
      Notify({
        message: data.msg || data.message,
        type: 'primary',
      });
    }
  }
  resolve(data);
}

// 失败处理函数
export function handleError(error: any, reject: Function, opts?: any) {
  console.log(error, 'error');
  console.log(error.response);
  if (error.code == TIMEOUT) {
    Notify({
      message: '请求超时',
      type: 'danger',
    });
  } else if (error.response && error.response.data) {
    if (error.response.status === 500) {
      Notify({
        message: error.response.data,
        type: 'danger',
      });
    }
    if (NOLOGIN.includes(error.response.data.code)) {
      Dialog.alert({
        message: error.response.data.errorMsg || error.response.data.msg,
      }).then(() => {
        removeLocalStorage();
        window.location.hash = LOGIN_PATH;
      });
    } else {
      const resData = error.response.data;

      if (OTHER.includes(resData.code)) {
        Dialog.alert({
          message: resData.msg || resData.message,
        }).then(() => {
          removeLocalStorage();
          window.location.hash = LOGIN_PATH;
        });
      } else if (resData.msg) {
        console.log('我是不是错了？');
        Notify({
          message: resData.msg,
          type: 'primary',
        });
      } else if (resData.message) {
        Notify({
          message: resData.message,
          type: 'primary',
        });
        window.location.hash = LOGIN_PATH;
      }
    }
  } else if (error.message || error.msg) {
    Notify({
      message: error.message || error.msg,
      type: 'primary',
    });
  }
  reject(error);
}
