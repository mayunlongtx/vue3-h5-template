export default {
  login: {
    name: '本地登陆初始化接口',
    dev: '/oauth/noToken/login',
    prod: 'mgop.minzheng.SYJsystem.loginByTicket',
  },
  loginByTicket: {
    name: '登陆初始化接口',
    dev: '/oauth/zww/noToken/login',
    prod: 'mgop.minzheng.SYJsystem.loginByTicket',
  },
  currentUserInfo: {
    name: '获取当前登录信息',
    dev: '/authority/online/currentInfo',
    prod: 'mgop.minzheng.SYJsystem.authorityBedcurrentInfo',
  },
  changeUserType: {
    name: '切换账号类型',
    dev: '/authority/online/changeUserType',
    prod: 'mgop.minzheng.SYJsystem.authorityChangeUserType',
  },
  // 下边是业务接口
};
