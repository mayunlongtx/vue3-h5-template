import { showToast } from 'vant';
const devTips =  {
  mounted(el, binding) {
    el.handler = () => {
      // showToast('功能开发中...');
    };
    // 点击监听
    el.addEventListener('click', el.handler);
  },
  unmounted(el, binding) {
    el.removeEventListener('click', el.handler);
  },
};
export default devTips