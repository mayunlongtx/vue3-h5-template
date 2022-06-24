import { Base64 } from 'js-base64';
import { getDev, getToken } from '@/utils';
import { getUrl, handleError, handleSuccess } from './utils';
import { mgop } from '@aligov/jssdk-mgop';
import { LOGIN_OUT_PATH } from '@/helpers';
export default function httpServer(config: any) {
  // 公共参数
  const publicParams = {
    ts: Date.now(),
  };
  let contentType = 'application/json';

  const {
    VITE_GLOB_MULTI_TENANT_TYPE: multiTenantType,
    VITE_GLOB_CLIENT_ID: clientId,
    VITE_GLOB_CLIENT_SECRET: clientSecret,
  } = import.meta.env;
  let headers: any = {
    'content-type': contentType,
    Authorization: `Basic ${Base64.encode(`${clientId}:${clientSecret}`)}`,
    // tenant: getTenant(),
  };
  // 、添加token
  const token = getToken();
  const nowDev = getDev()
  if (token) {
    headers.token = `Bearer ${token}`;
  }
   if (nowDev) {
    headers['x-system-env'] = `${nowDev}`;
  }
  // 增加租户编码
  if (config['meta']) {
    headers = Object.assign(headers, config['meta']);
  }
  //   http 默认配置
  const method = config?.method.toUpperCase();
  // 返回请求实例
  return new Promise((resolve, reject) => {
    let httpDefaultOpts = {
      api: getUrl(config.url),
      // host: 'https://mapi.zjzwfw.gov.cn/',
      // host: 'https://gov-bus.zjzwfw.gov.cn/',
      dataType: 'JSON',
      method, // POST, GET
      timeout: 10000,
      data: {},
      header: headers,
      appKey: 'wwjq4o4n+2001908337+qitsvf', // 必须
      onSuccess: (data) => {
        // console.log('data---zlb', data.data);
        handleSuccess(data, resolve, config);
      },
      onFail: (err) => {
        console.log('我错了');
        console.log(err, 'err');
        if (err.errorMessage == 'httpcode-401') {
          window.location.hash = LOGIN_OUT_PATH;
        }
        handleError(err, reject, config);
      },
    };
    httpDefaultOpts.data = {
      ...publicParams,
      ...(config.data || config.params || {}),
    };
    console.log('httpDefaultOpts------>', httpDefaultOpts);
    // 创建实例
    mgop(httpDefaultOpts);
  });
}
