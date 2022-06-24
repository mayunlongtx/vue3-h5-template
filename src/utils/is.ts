import { ZLB_UI_STYLE } from '@/helpers';
import { useUiStyle } from '@/hooks/useZWJSBridge';

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isObject(val: any): val is Object {
  return val && Object.prototype.toString.call(val);
}

export function isDev() {
  const MODE = import.meta.env.MODE;
  // console.log('import.meta.env.MODE ----------> ', MODE);
  return ['development', 'test', 'release'].includes(MODE);
}

export function isCare() {
  // normal -> 标准模式
  // elder -> 适老模式
  const { styleStatus } = useUiStyle();
  console.log(styleStatus);
  return styleStatus !== ZLB_UI_STYLE;
}
