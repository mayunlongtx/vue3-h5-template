import { encryptionName, getUser } from './utils';

window.scriptFlag = false;

//初始化jsbridge
const excuteBridge = () => {
  ZWJSBridge.onReady(() => {
    console.log('加载成功回调，ZWJSBridge onReady');

    ZWJSBridge.getLocation()
      .then((result2) => {
        console.log(result2, 'result2');

        // // 单页应用路由切换后 或 在异步获取到 pv 日志所需的参数后再执行 sendPV:
        // aplus_queue.push({
        //     'action': 'aplus.sendPV', 'arguments': [{
        //         is_auto: false
        //     }, {
        //         // 自定义 PV 参数 key-value 键值对(只能是这种平铺的 json，不能做多层 嵌套)，如:
        //         long: result2.data.longitude,
        //         lati: result2.data.latitude,
        //     }]
        // })
      })
      .catch((error) => {
        console.log(error, 'getLocation');
      });
  });

  ZWJSBridge.onError((err) => {
    console.log(err, 'ZWJSBridge加载失败回调');
  });
};

export function trafficAnalysis() {
  excuteBridge();
  let configuration = {
    pageId: 'middle/',
    pageName: 'middle',
    pageUrl: '/',
  };
  let { pageId, pageName, pageUrl } = configuration;
  let userInfo = getUser();
  // userInfo = userInfo && JSON.parse(userInfo);
  console.log(userInfo, 'userInfo');
  if (!userInfo) {
    // return
  }
  // zwLoginName
  let userName = userInfo && (userInfo.nickName || userInfo.zwLoginName);
  userName = encryptionName(userName);
  let userId = userInfo && userInfo.zwUserId;
  // userName = '测试'
  // userId = 123
  console.log(userName, 'userName');
  console.log(userId, 'userId');
  if (!window.scriptFlag) {
    (function (w, d, s, q, i) {
      w[q] = w[q] || [];
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s);
      j.async = true;
      j.id = 'beacon-aplus';
      j.src = 'https://d.alicdn.com/alilog/mlog/aplus.js?id=202951085';
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'aplus_queue');

    window.scriptFlag = true;
  }
  // 如果是私有云部署还需要在上面那段 JS 后面紧接着添加日志域名埋点
  // 通常私有云日志服务端域名类似于:quickaplus-web-api.xxx.com.cn ，具体 域名需找交付同学要
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['aplus-rhost-v', 'alog.zjzwfw.gov.cn'],
  });
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['aplus-rhost-g', 'alog.zjzwfw.gov.cn'],
  });
  // 这个会落到 app_key 字段上
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['appId', '60506758'],
  });

  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['_user_id', userId],
  });

  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['_user_nick', userName],
  });

  // 如采集用户信息是异步行为需要先执行这个 BLOCK 埋点
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['_hold', 'BLOCK'],
  });

  // 单页应用 或 “单个页面”需异步补充 PV 日志参数还需进行如下埋点:
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['aplus-waiting', 'MAN'],
  });

  ZWJSBridge.getUserType()
    .then((result1) => {
      console.log(result1, 'result1');
      aplus_queue.push({
        action: 'aplus.sendPV',
        arguments: [
          {
            is_auto: false,
          },
          {
            // 自定义 PV 参数 key-value 键值对(只能是这种平铺的 json，不能做多层 嵌套)，如:
            miniAppId: '2001908337',
            miniAppName: '颐养智享',
            userType: result1.userType,
            pageId: pageId,
            pageName: pageName,
            pageUrl: pageUrl,
          },
        ],
      });
    })
    .catch((error) => {
      console.log(error, '我失败了？');
    });

  ZWJSBridge.getLocation()
    .then((result2) => {
      console.log(result2, 'result2');

      // 单页应用路由切换后 或 在异步获取到 pv 日志所需的参数后再执行 sendPV:
      aplus_queue.push({
        action: 'aplus.sendPV',
        arguments: [
          {
            is_auto: false,
          },
          {
            // 自定义 PV 参数 key-value 键值对(只能是这种平铺的 json，不能做多层 嵌套)，如:
            long: result2.longitude,
            lati: result2.latitude,
          },
        ],
      });
    })
    .catch((error) => {
      console.log(error);
    });

  // 如采集用户信息是异步行为，需要在设置完用户信息后执行这个 START 埋点 // 此时被 block 住的日志会携带上用户信息逐条发出
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['_hold', 'START'],
  });
}
