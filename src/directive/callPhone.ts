import { isDev } from '@/utils/is';
import { useCallPhone } from '@/hooks/useZWJSBridge';

const callPhone = {
  mounted(el, binding) {
    el.handler = () => {
      console.log(binding, 'binding');
      if (isDev()) {
        console.log('window call phone---->', binding.value);
        window.location.href = `tel:${binding.value}`;
      } else {
        console.log('zlb call phone--->', binding.value);
        useCallPhone(binding.value);
      }
    };
    // 点击监听
    el.addEventListener('click', el.handler);
  },
  unmounted(el) {
    el.removeEventListener('click', el.handler);
  },
};
export default callPhone;
