import { isDev } from "@/utils/is";

export function useZWJSBridge() {
  excuteBridge();
  // 埋点
  function useMonitorTrace() {}
  // 返回需要值
  return { useMonitorTrace };
}
// ui 样式获取设置
export function useUiStyle() {
  excuteBridge();
  let styleStatus = 'normal';
  // 设置 uiStyle
  setUiStyle();
  // 获取 uiStyle
  function uiStyle() {
    excuteBridge();
    return new Promise((resolve, reject) => {
      ZWJSBridge.getUiStyle({})
        .then((result) => {
          console.log(result, 'resultresultresultresult');
          setUiStyleLocalStorage(result.uiStyle);
          styleStatus = result.uiStyle;
          console.log(styleStatus, 'styleStatusstyleStatusstyleStatusstyleStatus');
          resolve({
            style: result.uiStyle,
          });
        })
        .catch((error) => {
          styleStatus = 'normal';
          setUiStyleLocalStorage('catch 标准模式兼容');
          console.log(error);
          reject(error);
        });
    });
  }
  // 设置 uiStyle
  async function setUiStyle() {
    await uiStyle();
  }
  if(isDev()) {
   styleStatus = localStorage.getItem('uiStyle') || 'normal' 
  }
  // 设置 uiStyle 到 localStorage
  function setUiStyleLocalStorage(value) {
    localStorage.setItem('uiStyle', value);
  }
  return {
    styleStatus,
  };
}

// 设置 title
export function useSetTitle(title: string) {
  excuteBridge();
  ZWJSBridge.setTitle({
    title,
  })
    .then((result) => {
      console.log('####### enter ZWJSBridge result.  ##########');
      console.log(result);
      console.log(`title:${title}--->设置成功`);
    })
    .catch((error) => {
      console.log('########  enter ZWJSBridge error. #########');
      console.log(error);
    });
}

// 拨打电话
export function useCallPhone(phone: number | string) {
  console.log('callPhone', phone);
  excuteBridge();
  ZWJSBridge.phoneCall({
    corpId: phone,
  })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}
// 打开页面
export function useOpenLink(url: string) {
  excuteBridge();
  ZWJSBridge.openLink({
    url,
  })
    .then((result) => {
      console.log(result);
      console.log(`我打开了一个新页面: --- > ${url}`);
    })
    .catch((error) => {
      console.log(error);
      console.log(`我打开了一个新页面失败了`);
    });
}
// 获取定位
export function useGetLocation(callBack) {
  return new Promise((resolve, reject) => {
    ZWJSBridge.getLocation()
      .then((result) => {
        console.log(`获取地址成功----location`);
        console.log(result);
        resolve(result);
        // callBack && typeof callBack == 'function' && callBack(result);
      })
      .catch((error) => {
        console.log(`获取地址失败----location`);
        console.log(error);
        reject(error);
      });
  });
}

// 单选弹框
interface ActionsType {
  actions: [];
  title: string;
  callBack: Function;
}
export function useActionSheet(opts: ActionsType) {
  const { actions, title, callBack } = opts;
  excuteBridge();
  ZWJSBridge.actionSheet({
    title,
    cancelButton: '取消',
    otherButtons: actions,
  })
    .then((data) => {
      // data => {buttonIndex: 0}
      callBack(data);
    })
    .catch((error) => {
      console.log(`弹窗错误:${error}`);
    });
}

// 初始化jsbridge
function excuteBridge() {
  ZWJSBridge.onReady(() => {
    console.log('初始化完成后，执行bridge方法');
  });
  return;
}
