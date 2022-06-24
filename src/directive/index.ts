import devTips from './devTips'; // 引入指令
import callPhone from './callPhone';
import drag from './drag';

const directives = {
  // 指令对象
  devTips,
  callPhone,
  drag
};

export default {
  install(app) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key]);
    });
  },
};
