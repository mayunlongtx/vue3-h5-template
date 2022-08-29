const callPhone = {
  mounted(el, binding) {
    el.handler = () => {
      console.log(binding, 'binding');
      window.location.href = `tel:${binding.value}`;
    };
    // 点击监听
    el.addEventListener('click', el.handler);
  },
  unmounted(el) {
    el.removeEventListener('click', el.handler);
  },
};
export default callPhone;
