import { useRouter } from 'vue-router';
import { isObject } from './is';
import AvatarMan from '@/assets/avatar-man.png';
import AvatarWomen from '@/assets/avatar-women.png';
import {
  LOGIN_SUCCESS_PATH,
  LOGIN_SUCCESS_RELATIVES_PATH,
  LOGIN_SUCCESS_SERVICE_PATH,
} from '@/helpers';
// import { codeList } from '@/api/Welfare';

const IMG_LIST = [];

// const router = useRouter();

export function getRandomImg() {
  return IMG_LIST[Math.floor(Math.random() * 5)];
}

/**
 *
 * 设置租户请求头
 *
 */
export function setDev(dev?: string) {
  dev && localStorage.setItem('xSystemEnv', dev);
}

/**
 *
 * 获取置租户请求头
 *
 */
export function getDev() {
  return getUser().env || 'prod';
}
// /设置token
export function setToken(token: string) {
  localStorage.setItem('token', token);
}
// 获取token'
export function getToken() {
  return localStorage.getItem('token');
}
// 删除 缓存信息
export function removeLocalStorage(key?: string) {
  if (key) {
    localStorage.removeItem(key);
  } else {
    localStorage.clear();
  }
}
// 设置用户信息
export function setUser(userInfo: any) {
  if (isObject(userInfo)) {
    setToken(userInfo.token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } else {
    localStorage.setItem('userInfo', userInfo);
  }
}

// 获取用户信息
export function getUser() {
  return JSON.parse(localStorage.getItem('userInfo') || '{}');
}
// 设置 tenant
export function setTenant(value: string) {
  localStorage.setItem('tenant', value);
}
// 获取 tenant
export function getTenant() {
  return localStorage.getItem('tenant') || '';
}

// 暂存代办信息
export function setApplyInfo(applyInfo: any) {
  if (isObject(applyInfo)) {
    localStorage.setItem('applyInfo', JSON.stringify(applyInfo));
  } else {
    localStorage.setItem('applyInfo', applyInfo);
  }
}

// 获取用户信息
export function getApplyInfo() {
  return JSON.parse(localStorage.getItem('applyInfo') || '{}');
}

// 退出登录
export function loginOut() {
  removeLocalStorage();
  // router.replace('/login');
}
// 手机号脱敏
export function encryptionPhone(phone: any) {
  return phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2');
}
// 身份证脱敏
export function encryptionIdCard(idCard: any) {
  if (null != idCard && idCard != undefined) {
    var pat = /(\d{4})\d*(\d{4})/;
    return idCard.replace(pat, '$1***********$2');
  } else {
    return '';
  }
}
// 姓名脱敏
export function encryptionName(name: any) {
  if (null != name && name != undefined) {
    if (name.length <= 3) {
      return '*' + name.substring(1, name.length);
    } else if (name.length > 3 && name.length <= 6) {
      return '**' + name.substring(2, name.length);
    } else if (name.length > 6) {
      return name.substring(0, 2) + '****' + name.substring(6, name.length);
    }
  } else {
    return '';
  }
}
// 邮箱脱敏
export function encryptionEmail(email: any) {
  let new_email = email;
  if (String(email).indexOf('@') > 0) {
    let str = email.split('@');
    let _s = '';
    if (str[0].length > 3) {
      //@前面多于3位
      for (let i = 3; i < str[0].length; i++) {
        _s += '*';
      }
      new_email = str[0].substr(0, 3) + _s + '@' + str[1];
    } else {
      //@前面小于等于于3位
      for (let i = 1; i < str[0].length; i++) {
        _s += '*';
      }
      new_email = str[0].substr(0, 1) + _s + '@' + str[1];
    }
  }
  return new_email;
}

/**
 *
 * 合并对象
 *
 */
export function marge(defaultObj: object, newObj: object) {
  return Object.assign(defaultObj, newObj);
}
// 初始化列表搜索条件
export function initParams(opt: any = {}) {
  return Object.assign(
    {
      current: 1,
      size: 10,
      model: {},
      order: '',
      sort: 'id',
      extra: {},
    },
    opt,
  );
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time.replace(/\-/g, '/')); // 兼容safari
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

// JS获取某月首尾日
export function getMonthDay(value) {
  var date = new Date(value);
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var firstdate = year + '-' + month + '-01';
  var day = new Date(year, month, 0);
  var lastdate = year + '-' + month + '-' + day.getDate();
  return { firstdate, lastdate };
}

// 获取指定日期到今天的相差天数
export function getDiffDate(targetDate) {
  let date1 = new Date(targetDate);
  let date2 = new Date();
  date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const diff = date2.getTime() - date1.getTime();
  const diffDate = diff / (24 * 60 * 60 * 1000);
  return diffDate + 1;
}

export function checkIdCard(val) {
  var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
  var code = val.substring(17);
  if (p.test(val)) {
    var sum = 0;
    for (var i = 0; i < 17; i++) {
      sum += val[i] * factor[i];
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      return true;
    }
  }
  return false;
}

export function checkPhone(val) {
  return /^1[3456789]\d{9}$/.test(val);
}
export function checkFixedLine(val) {
  return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(val);
}
// 根据身份证计算年龄 性别
export interface SexAndAge {
  sex?: string | number;
  age?: string | number;
}
export function analyzeIDCard(IDCord) {
  var sexAndAge: SexAndAge = {
    age: 0,
    sex: '未知',
  };
  //获取用户身份证号码
  var userCard = IDCord;
  //如果用户身份证号码为undefined则返回空
  if (!userCard) {
    return sexAndAge;
  }

  // 获取性别
  if (parseInt(userCard.substr(16, 1)) % 2 == 1) {
    sexAndAge.sex = '1 男';
  } else {
    sexAndAge.sex = '0 女';
  }

  // 获取出生日期
  // userCard.substring(6,10) + "-" + userCard.substring(10,12) + "-" + userCard.substring(12,14)
  var yearBirth = userCard.substring(6, 10);
  var monthBirth = userCard.substring(10, 12);
  var dayBirth = userCard.substring(12, 14);
  // 获取当前年月日并计算年龄
  var myDate = new Date();
  var monthNow = myDate.getMonth() + 1;
  var dayNow = myDate.getDate();
  var age = myDate.getFullYear() - yearBirth;
  if (monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)) {
    age--;
  }
  // 得到年龄
  sexAndAge.age = age;
  // 返回 性别和年龄
  return sexAndAge;
}
// 返还单位千米
export function getDistance(lng1, lng2, lat1, lat2) {
  var radLat1 = (lat1 * Math.PI) / 180.0;
  var radLat2 = (lat2 * Math.PI) / 180.0;
  var a = radLat1 - radLat2;
  var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  var s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2),
      ),
    );
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s;
}

/**
 *
 * 根据性别获取默认头像
 *
 */
export function getAvatarImg(sex?: string) {
  !sex && (sex = getUser().sex?.code);
  switch (sex) {
    case 'M':
      return AvatarMan;
    case 'W':
      return AvatarWomen;

    default:
      return AvatarMan;
  }
}

/**
 *
 * 根据不同角色跳转不同首页
 *
 */
export function jumpIndexPath(router) {
  // NURSE 护理人员 、ELDER 老人、 SERVER 服务人员 、OTHER 其他(亲属)
  var dictionary = [];
  router.replace(LOGIN_SUCCESS_PATH);
  // codeList({ types: ['RELATION_TYPE'] }).then((res: any) => {
  //   if (res.isSuccess) {
  //     dictionary = res.data.RELATION_TYPE;
  //     localStorage.setItem('RELATION_TYPE', JSON.stringify(dictionary));
  //     switch (getUser().currentUserType) {
  //       case 'ELDER':
  //         router.replace(LOGIN_SUCCESS_PATH);
  //         break;
  //       case 'OTHER':
  //         router.replace(LOGIN_SUCCESS_RELATIVES_PATH);
  //         break;
  //       default:
  //         router.replace(LOGIN_SUCCESS_SERVICE_PATH);
  //         break;
  //     }
  //   }
  // });
}

// 获取亲属关系
export function getRelationType() {
  if (localStorage.getItem('RELATION_TYPE')) {
    return localStorage.getItem('RELATION_TYPE');
  } else {
    fetchRelationType();
  }
}

// 获取亲属关系
export function fetchRelationType() {
  var dictionary = [];
  codeList({ types: ['RELATION_TYPE'] }).then((res: any) => {
    if (res.isSuccess) {
      dictionary = res.data.RELATION_TYPE;
      localStorage.setItem('RELATION_TYPE', JSON.stringify(dictionary));
      return JSON.stringify(dictionary);
    }
  });
}

// 获取亲属关系枚举
export function getRelationTypeEnum() {
  var relationType_S = getRelationType();
  var relationType = JSON.parse(relationType_S);
  var relationTypeEnum = {};
  relationType.forEach((item) => {
    relationTypeEnum[item.value] = item.text;
  });
  return relationTypeEnum;
}
