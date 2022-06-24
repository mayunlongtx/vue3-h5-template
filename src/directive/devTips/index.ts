import { Toast } from 'vant';
const devTips =  {
  mounted(el, binding) {
    el.handler = () => {
      Toast('功能开发中...');
    };
    // 点击监听
    el.addEventListener('click', el.handler);
  },
  unmounted(el, binding) {
    el.removeEventListener('click', el.handler);
  },
};
export default devTips